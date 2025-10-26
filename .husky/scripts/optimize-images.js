#!/usr/bin/env node

/**
 * 프로젝트 이미지 최적화 스크립트
 * - contents/ 디렉토리의 모든 image.* 파일을 찾아서 최적화
 * - 이미지를 최대 200x200px로 리사이즈
 * - PNG로 변환
 * - 메타데이터 제거
 * - 처리된 이미지 추적
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const rootDir = path.join(__dirname, '../..');
const contentsDir = path.join(rootDir, 'contents');
const dataDir = path.join(rootDir, 'bin/data');
const backupDir = path.join(dataDir, 'backups');
const logDir = path.join(dataDir, 'logs');
const processedFile = path.join(dataDir, 'processed_images.json');

// 컬러 출력용
const colors = {
  blue: '\x1b[94m',
  green: '\x1b[92m',
  yellow: '\x1b[93m',
  red: '\x1b[91m',
  reset: '\x1b[0m'
};

/**
 * 로그 메시지 출력
 */
function log(message, type = 'INFO') {
  const icons = {
    INFO: `${colors.blue}💬${colors.reset}`,
    SUCCESS: `${colors.green}💫${colors.reset}`,
    WARNING: `${colors.yellow}⭐${colors.reset}`,
    ERROR: `${colors.red}❌${colors.reset}`,
    PROCESS: `${colors.blue}💠${colors.reset}`
  };

  console.log(`${icons[type] || icons.INFO} ${message}`);
}

/**
 * 파일의 MD5 해시 계산
 */
function calculateFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * 백업 생성
 */
function createBackup(filePath) {
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    const filename = path.basename(filePath);
    const dirName = path.basename(path.dirname(filePath));
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupPath = path.join(backupDir, `${timestamp}_${dirName}_${filename}`);
    fs.copyFileSync(filePath, backupPath);
    log(`백업 생성: ${backupPath}`, 'SUCCESS');
  } catch (error) {
    log(`백업 실패: ${error.message}`, 'ERROR');
    throw error;
  }
}

/**
 * 이미지 처리
 */
async function processImage(imagePath, maxSize = 200) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    log(`원본 크기: ${metadata.width}x${metadata.height}, 포맷: ${metadata.format}`, 'INFO');

    let processedImage = image;

    // 이미지가 maxSize보다 큰 경우에만 처리
    if (Math.max(metadata.width, metadata.height) > maxSize) {
      // 1:1 비율로 자르기
      const minDimension = Math.min(metadata.width, metadata.height);
      const left = Math.floor((metadata.width - minDimension) / 2);
      const top = Math.floor((metadata.height - minDimension) / 2);

      processedImage = processedImage
        .extract({
          left: left,
          top: top,
          width: minDimension,
          height: minDimension
        })
        .resize(maxSize, maxSize, {
          kernel: sharp.kernel.lanczos3
        });

      log(`리사이즈: ${maxSize}x${maxSize}`, 'PROCESS');
    } else {
      log(`이미지가 ${maxSize}px보다 작아 원본 크기 유지`, 'INFO');
    }

    // PNG로 변환하고 메타데이터 제거
    await processedImage
      .png({ compressionLevel: 9 })
      .withMetadata({}) // 메타데이터 제거
      .toFile(imagePath + '.tmp');

    // 임시 파일을 원본으로 교체
    fs.unlinkSync(imagePath);
    fs.renameSync(imagePath + '.tmp', imagePath);

    log(`이미지 처리 완료: ${path.basename(imagePath)}`, 'SUCCESS');

    return {
      originalSize: [metadata.width, metadata.height],
      newSize: Math.max(metadata.width, metadata.height) > maxSize
        ? [maxSize, maxSize]
        : [metadata.width, metadata.height],
      originalFormat: metadata.format,
      newFormat: 'png',
      processedAt: new Date().toISOString()
    };
  } catch (error) {
    log(`이미지 처리 실패: ${error.message}`, 'ERROR');
    throw error;
  }
}

/**
 * 디렉토리를 재귀적으로 탐색하여 image.* 파일 찾기
 */
function findImageFiles(dir) {
  const imageFiles = [];

  function scanDir(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && /^image\.(png|jpg|jpeg|gif|webp)$/i.test(entry.name)) {
        imageFiles.push(fullPath);
      }
    }
  }

  scanDir(dir);
  return imageFiles;
}

/**
 * 메인 함수
 */
async function main() {
  log('🎨 이미지 최적화 시작...', 'PROCESS');

  // contents 디렉토리 확인
  if (!fs.existsSync(contentsDir)) {
    log(`contents 디렉토리를 찾을 수 없습니다: ${contentsDir}`, 'WARNING');
    log('아직 마이그레이션을 실행하지 않았다면 npm run migrate를 먼저 실행하세요.', 'INFO');
    return;
  }

  // 필요한 디렉토리 생성
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(backupDir, { recursive: true });
  fs.mkdirSync(logDir, { recursive: true });

  // 처리된 이미지 목록 로드
  let processedImages = {};
  if (fs.existsSync(processedFile)) {
    processedImages = JSON.parse(fs.readFileSync(processedFile, 'utf8'));
  }

  // contents 디렉토리에서 image.* 파일 찾기
  const imageFiles = findImageFiles(contentsDir);

  if (imageFiles.length === 0) {
    log('처리할 image.* 파일을 찾을 수 없습니다.', 'WARNING');
    return;
  }

  log(`\n총 ${imageFiles.length}개의 image.* 파일을 찾았습니다.\n`, 'INFO');

  let processedCount = 0;
  let skippedCount = 0;

  for (const imagePath of imageFiles) {
    const relativePath = path.relative(rootDir, imagePath);

    // 원본 파일 해시 계산
    const originalHash = calculateFileHash(imagePath);

    // 이미 처리된 이미지인지 확인
    const isProcessed = Object.values(processedImages).some(
      info => info.relativePath === relativePath && info.originalHash === originalHash
    );

    if (isProcessed) {
      skippedCount++;
      continue;
    }

    log(`\n이미지 처리 시작: ${relativePath}`, 'PROCESS');

    // 백업 생성
    createBackup(imagePath);

    // 이미지 처리
    const processResult = await processImage(imagePath);

    // 처리 후 해시 계산
    const processedHash = calculateFileHash(imagePath);

    // 처리 완료 기록
    processedImages[processedHash] = {
      relativePath: relativePath,
      processedAt: new Date().toISOString(),
      originalHash: originalHash,
      processDetails: processResult
    };

    // 처리 기록 저장
    fs.writeFileSync(processedFile, JSON.stringify(processedImages, null, 2), 'utf8');

    processedCount++;
  }

  log(`\n✅ 이미지 최적화 완료!`, 'SUCCESS');
  log(`처리됨: ${processedCount}개, 건너뜀: ${skippedCount}개`, 'INFO');
}

main().catch(error => {
  log(`치명적 오류: ${error.message}`, 'ERROR');
  process.exit(1);
});
