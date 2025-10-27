#!/usr/bin/env node

/**
 * 프로젝트 이미지 최적화 스크립트
 * - contents/ 디렉토리의 원본 이미지를 읽어서 최적화
 * - 최대 200x200px로 리사이즈, PNG로 변환, 메타데이터 제거
 * - 최적화된 이미지를 static/img/에 배포
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const rootDir = path.join(__dirname, '../..');
const contentsDir = path.join(rootDir, 'contents');
const staticImgDir = path.join(rootDir, 'static/img');

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
 * 이미지가 속한 카테고리 판단 (프로젝트 or 제휴사)
 */
function getImageCategory(imagePath) {
  const relativePath = path.relative(contentsDir, imagePath);
  if (relativePath.startsWith('affiliates')) {
    return 'affiliate';
  }
  return 'project';
}

/**
 * 이미지 최적화 및 static/img에 배포
 */
async function processImage(imagePath, maxSize = 200) {
  try {
    // 원본 이미지를 버퍼로 읽기
    const imageBuffer = fs.readFileSync(imagePath);
    const image = sharp(imageBuffer);
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

    // 원본 이미지의 해시 계산 (build-projects.js와 동일한 해시 사용)
    const hash = crypto.createHash('md5').update(imageBuffer).digest('hex').substring(0, 12);

    // PNG로 변환하고 메타데이터 제거하여 버퍼로 저장
    const processedBuffer = await processedImage
      .png({ compressionLevel: 9 })
      .withMetadata({}) // 메타데이터 제거
      .toBuffer();

    // 카테고리에 따라 저장 경로 결정
    const category = getImageCategory(imagePath);
    const targetDir = category === 'affiliate'
      ? path.join(staticImgDir, 'partners')
      : path.join(staticImgDir, 'projects');

    // 대상 디렉토리 생성
    fs.mkdirSync(targetDir, { recursive: true });

    // 해시 기반 파일명으로 PNG 저장
    const targetFileName = `${hash}.png`;
    const targetPath = path.join(targetDir, targetFileName);

    // 파일이 이미 존재하면 스킵 (같은 해시 = 같은 이미지)
    if (fs.existsSync(targetPath)) {
      log(`이미 최적화됨 (스킵): ${targetFileName}`, 'INFO');
    } else {
      fs.writeFileSync(targetPath, processedBuffer);
      log(`저장 완료: ${category === 'affiliate' ? 'partners' : 'projects'}/${targetFileName}`, 'SUCCESS');
    }

    const publicPath = category === 'affiliate'
      ? `/img/partners/${targetFileName}`
      : `/img/projects/${targetFileName}`;

    return {
      originalPath: imagePath,
      originalSize: [metadata.width, metadata.height],
      newSize: Math.max(metadata.width, metadata.height) > maxSize
        ? [maxSize, maxSize]
        : [metadata.width, metadata.height],
      originalFormat: metadata.format,
      newFormat: 'png',
      processedAt: new Date().toISOString(),
      targetPath: targetPath,
      publicPath: publicPath,
      hash: hash
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
    return;
  }

  // contents 디렉토리에서 image.* 파일 찾기
  const imageFiles = findImageFiles(contentsDir);

  if (imageFiles.length === 0) {
    log('처리할 image.* 파일을 찾을 수 없습니다.', 'WARNING');
    return;
  }

  log(`\n총 ${imageFiles.length}개의 image.* 파일을 찾았습니다.\n`, 'INFO');

  let processedCount = 0;

  for (const imagePath of imageFiles) {
    const relativePath = path.relative(rootDir, imagePath);
    log(`\n이미지 처리 시작: ${relativePath}`, 'PROCESS');

    // 이미지 처리
    await processImage(imagePath);
    processedCount++;
  }

  log(`\n✅ 이미지 최적화 완료!`, 'SUCCESS');
  log(`처리됨: ${processedCount}개`, 'INFO');
}

main().catch(error => {
  log(`치명적 오류: ${error.message}`, 'ERROR');
  process.exit(1);
});
