import os
import json
import shutil
from datetime import datetime
from PIL import Image, PngImagePlugin
import hashlib
import logging

class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def setup_logging(log_dir: str) -> logging.Logger:
    """로깅 설정을 초기화합니다"""
    os.makedirs(log_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = os.path.join(log_dir, f"image_processing_{timestamp}.log")
    
    logger = logging.getLogger("ImageProcessor")
    logger.setLevel(logging.INFO)
    
    # 파일 핸들러
    file_handler = logging.FileHandler(log_file, encoding='utf-8')
    file_handler.setLevel(logging.INFO)
    file_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(file_formatter)
    
    # 콘솔 핸들러
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_formatter = logging.Formatter('%(message)s')
    console_handler.setFormatter(console_formatter)
    
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

def log_message(logger: logging.Logger, message: str, status: str = "INFO"):
    """로그 메시지를 콘솔과 파일에 출력합니다"""
    status_indicators = {
        "INFO": f"{Colors.BLUE}💬 {Colors.RESET}",
        "SUCCESS": f"{Colors.GREEN}💫 {Colors.RESET}",
        "WARNING": f"{Colors.YELLOW}⭐ {Colors.RESET}",
        "ERROR": f"{Colors.RED}❌ {Colors.RESET}",
        "PROCESS": f"{Colors.BLUE}💠 {Colors.RESET}",
    }
    
    indicator = status_indicators.get(status, status_indicators["INFO"])
    console_message = f"{indicator} {message}"
    logger.info(message)
    print(console_message)

def calculate_file_hash(file_path: str) -> str:
    """파일의 MD5 해시를 계산합니다"""
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def create_backup(file_path: str, backup_dir: str, logger: logging.Logger) -> None:
    """원본 파일을 백업합니다"""
    try:
        os.makedirs(backup_dir, exist_ok=True)
        filename = os.path.basename(file_path)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = os.path.join(backup_dir, f"{timestamp}_{filename}")
        shutil.copy2(file_path, backup_path)
        log_message(logger, f"백업 생성 완료: {backup_path}", "SUCCESS")
    except Exception as e:
        log_message(logger, f"백업 생성 실패: {str(e)}", "ERROR")
        raise

def process_image(image_path: str, max_size: int = 200, logger: logging.Logger = None) -> dict:
    """이미지를 처리하고 처리 결과를 반환합니다"""
    try:
        # 이미지 열기
        with Image.open(image_path) as img:
            # 이미지 정보 수집
            original_size = img.size
            original_format = img.format
            original_mode = img.mode
            
            # RGBA 모드로 변환 (투명 배경 지원)
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # 이미지가 max_size보다 작으면 원본 크기 유지
            if max(original_size) <= max_size:
                log_message(logger, f"이미지가 {max_size}px보다 작아 원본 크기 유지: {original_size}", "INFO")
                new_size = original_size
            else:
                # 1:1 비율로 자르기
                min_dimension = min(original_size)
                left = (original_size[0] - min_dimension) // 2
                top = (original_size[1] - min_dimension) // 2
                right = left + min_dimension
                bottom = top + min_dimension
                
                img = img.crop((left, top, right, bottom))
                
                # 리사이즈
                img = img.resize((max_size, max_size), Image.Resampling.LANCZOS)
                new_size = (max_size, max_size)
            
            # 메타데이터 제거
            meta = PngImagePlugin.PngInfo()
            
            # 저장
            img.save(image_path, "PNG", pnginfo=meta)
            log_message(logger, f"이미지 처리 완료: {image_path}", "SUCCESS")
            
            # 처리 결과 반환
            return {
                "original_size": original_size,
                "new_size": new_size,
                "original_format": original_format,
                "original_mode": original_mode,
                "new_format": "PNG",
                "new_mode": "RGBA",
                "processed_at": datetime.now().isoformat()
            }
            
    except Exception as e:
        log_message(logger, f"이미지 처리 실패: {str(e)}", "ERROR")
        raise

def main():
    # 경로 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    source_dir = os.path.join(os.path.dirname(base_dir), "static", "img", "projects")
    data_dir = os.path.join(base_dir, "data")
    backup_dir = os.path.join(data_dir, "backups")
    log_dir = os.path.join(data_dir, "logs")
    processed_file = os.path.join(data_dir, "processed_images.json")
    
    # 로거 설정
    logger = setup_logging(log_dir)
    
    # 소스 디렉토리 존재 확인
    if not os.path.exists(source_dir):
        log_message(logger, f"소스 디렉토리를 찾을 수 없습니다: {source_dir}", "ERROR")
        return
    
    # 필요한 디렉토리 생성
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(backup_dir, exist_ok=True)
    
    # 처리된 이미지 목록 로드
    processed_images = {}
    if os.path.exists(processed_file):
        with open(processed_file, 'r', encoding='utf-8') as f:
            processed_images = json.load(f)
    
    # 이미지 처리
    for filename in os.listdir(source_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            image_path = os.path.join(source_dir, filename)
            
            # 원본 파일 해시 계산
            original_hash = calculate_file_hash(image_path)
            
            # 이미 처리된 이미지인지 확인 (파일명과 해시로 확인)
            is_processed = False
            for hash_value, info in processed_images.items():
                if info['filename'] == filename and info['original_hash'] == original_hash:
                    is_processed = True
                    break
            
            if is_processed:
                continue
            
            log_message(logger, f"이미지 처리 시작: {filename}", "PROCESS")
            
            # 백업 생성
            create_backup(image_path, backup_dir, logger)
            
            # 이미지 처리
            process_result = process_image(image_path, logger=logger)
            
            # 처리 후 해시 계산
            processed_hash = calculate_file_hash(image_path)
            
            # 처리 완료 기록
            processed_images[processed_hash] = {
                "filename": filename,
                "processed_at": datetime.now().isoformat(),
                "original_hash": original_hash,
                "process_details": process_result
            }
            
            # 처리 기록 저장
            with open(processed_file, 'w', encoding='utf-8') as f:
                json.dump(processed_images, f, indent=2, ensure_ascii=False)
            
    log_message(logger, "모든 이미지 처리 완료", "SUCCESS")

if __name__ == "__main__":
    main() 