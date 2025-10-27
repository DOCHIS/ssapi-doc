#!/usr/bin/env node

/**
 * contents/ 디렉토리의 마크다운 파일들을 읽어서 schemas/projects.json 생성
 *
 * 디렉토리 구조:
 * contents/
 *   projects/YYYY-MM-프로젝트명/index.md
 *   affiliates/YYYY-MM-제휴사명/index.md (기존 제휴사)
 *   partners/YYYY-MM-파트너명/index.md (새로운 파트너)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootDir = path.join(__dirname, '../..');
const contentsDir = path.join(rootDir, 'contents');
const outputPath = path.join(rootDir, 'schemas/projects.json');
const historyPath = path.join(rootDir, 'schemas/history.json');
const staticImgDir = path.join(rootDir, 'static/img');

/**
 * 디렉토리의 모든 index.md 파일 찾기
 */
function findIndexFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const indexFiles = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.md');
      if (fs.existsSync(indexPath)) {
        indexFiles.push({ indexPath, dirPath: fullPath, dirName: entry.name });
      }
    }
  }

  return indexFiles;
}

/**
 * 마크다운 파일 파싱
 */
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);

  return {
    frontmatter: data,
    body: body.trim(),
    filePath
  };
}

/**
 * 날짜를 "YY년 MM월 DD일" 형식으로 변환
 */
function formatDateKorean(dateStr) {
  if (!dateStr || dateStr === 'null' || typeof dateStr !== 'string') return '';
  const [year, month, day] = dateStr.split('-');
  return `${year.slice(2)}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

/**
 * 기간 문자열 생성
 */
function createPeriodString(startDate, endDate) {
  const start = formatDateKorean(startDate);
  if (!endDate || endDate === 'null' || typeof endDate !== 'string') {
    return `${start} ~`;
  }

  const [startYear, startMonth] = startDate.split('-');
  const [endYear, endMonth, endDay] = endDate.split('-');

  if (startYear === endYear) {
    // 같은 해인 경우
    return `${start} ~ ${parseInt(endMonth)}월 ${parseInt(endDay)}일`;
  } else {
    // 다른 해인 경우
    return `${start} ~ ${formatDateKorean(endDate)}`;
  }
}

/**
 * 디렉토리에서 image.* 파일 자동 찾기
 */
function findImageFile(dirPath) {
  if (!fs.existsSync(dirPath)) return null;

  const entries = fs.readdirSync(dirPath);
  const imageFile = entries.find(file => /^image\.(png|jpg|jpeg|gif|webp)$/i.test(file));

  return imageFile ? path.join(dirPath, imageFile) : null;
}

/**
 * 최적화된 이미지 경로 반환
 * optimize-images.js로 배포된 이미지의 퍼블릭 경로 계산
 */
function getImagePath(dirPath, category) {
  // 디렉토리에서 image.* 파일 자동 찾기
  const sourceImagePath = findImageFile(dirPath);

  if (!sourceImagePath) {
    console.warn(`⚠️  원본 이미지를 찾을 수 없음: ${dirPath}`);
    return null;
  }

  // 원본 이미지의 해시 계산 (optimize-images.js와 동일)
  const crypto = require('crypto');
  const imageContent = fs.readFileSync(sourceImagePath);
  const hash = crypto.createHash('md5').update(imageContent).digest('hex').substring(0, 12);

  // static/img에 배포된 최적화 이미지 경로 (항상 .png)
  const optimizedFileName = `${hash}.png`;
  const targetDir = path.join(staticImgDir, 'projects');
  const optimizedPath = path.join(targetDir, optimizedFileName);

  // 배포된 이미지가 없으면 경고
  if (!fs.existsSync(optimizedPath)) {
    console.warn(`⚠️  배포된 이미지가 없음: ${optimizedFileName}`);
    console.warn(`   먼저 'npm run optimize-images'를 실행하세요.`);
    return null;
  }

  // 퍼블릭 경로 반환
  return `/img/projects/${optimizedFileName}`;
}

/**
 * 제휴사/파트너 처리 공통 함수
 */
function processPartnerType(dirName, type) {
  const targetDir = path.join(contentsDir, dirName);
  if (!fs.existsSync(targetDir)) return [];

  const indexFiles = findIndexFiles(targetDir);
  const items = [];

  for (const { indexPath, dirPath, dirName } of indexFiles) {
    const { frontmatter, body } = parseMarkdownFile(indexPath);

    const logo = getImagePath(dirPath, type);

    const item = {
      type: type,
      logo: logo,
      name: frontmatter.name,
      subtitle: frontmatter.subtitle || '',
      description: body,
      link: frontmatter.link || []
    };

    // 제휴사(affiliate)만 startDate/endDate 사용
    if (type === 'affiliate') {
      // startDate를 문자열로 변환 (gray-matter가 Date 객체로 파싱하는 경우 대비)
      const startDate = frontmatter.startDate instanceof Date
        ? frontmatter.startDate.toISOString().split('T')[0]
        : String(frontmatter.startDate);

      const endDate = frontmatter.endDate instanceof Date
        ? frontmatter.endDate.toISOString().split('T')[0]
        : (frontmatter.endDate ? String(frontmatter.endDate) : null);

      item.startDate = startDate;
      item._startDate = startDate; // 정렬용

      // endDate가 있을 때만 추가
      if (endDate) {
        item.endDate = endDate;
      }
    }

    items.push(item);
  }

  // 제휴사는 시작일 기준 정렬, 파트너는 이름순 정렬
  if (type === 'affiliate') {
    items.sort((a, b) => String(b._startDate).localeCompare(String(a._startDate)));
    return items.map(({ _startDate, ...rest }) => rest);
  } else {
    items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }
}

/**
 * 제휴사 처리
 */
function processAffiliates() {
  return processPartnerType('affiliates', 'affiliate');
}

/**
 * 파트너 처리
 */
function processPartners() {
  return processPartnerType('partners', 'partner');
}

/**
 * 프로젝트 처리
 */
function processProjects(category) {
  const projectsDir = path.join(contentsDir, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const indexFiles = findIndexFiles(projectsDir);
  const projects = [];

  for (const { indexPath, dirPath, dirName } of indexFiles) {
    const { frontmatter } = parseMarkdownFile(indexPath);

    // 카테고리 필터링
    if (frontmatter.category !== category) continue;

    // Date 객체를 문자열로 변환
    const startDate = frontmatter.startDate instanceof Date
      ? frontmatter.startDate.toISOString().split('T')[0]
      : String(frontmatter.startDate);

    const endDate = frontmatter.endDate instanceof Date
      ? frontmatter.endDate.toISOString().split('T')[0]
      : (frontmatter.endDate ? String(frontmatter.endDate) : null);

    const logo = getImagePath(dirPath, 'project');

    const project = {
      logo: logo,
      organizer: frontmatter.organizer,
      contentName: frontmatter.contentName,
      category: frontmatter.category,
      startDate: startDate,
      broadcastLink: frontmatter.broadcastLink,
      _startDate: startDate // 정렬용
    };

    // endDate가 있을 때만 추가
    if (endDate) {
      project.endDate = endDate;
    }

    if (frontmatter.participants) {
      project.participants = frontmatter.participants;
    }

    if (frontmatter.noticeLink) {
      project.noticeLink = frontmatter.noticeLink;
    }

    projects.push(project);
  }

  // 시작일 기준 내림차순 정렬 (최신순)
  projects.sort((a, b) => String(b._startDate).localeCompare(String(a._startDate)));

  // 정렬용 필드 제거
  return projects.map(({ _startDate, ...rest }) => rest);
}

/**
 * history.json도 함께 읽어서 포함 (기존 구조 유지)
 */
function loadHistory() {
  if (fs.existsSync(historyPath)) {
    return JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  }
  return [];
}

/**
 * 빌드 실행
 */
function main() {
  console.log('📦 프로젝트 데이터 빌드 시작...\n');

  const result = {
    affiliates: processAffiliates(),
    partners: processPartners(),
    minecraft: processProjects('minecraft'),
    zomboid: processProjects('zomboid'),
    history: loadHistory()
  };

  console.log(`✓ 제휴사: ${result.affiliates.length}개`);
  console.log(`✓ 파트너: ${result.partners.length}개`);
  console.log(`✓ 마인크래프트: ${result.minecraft.length}개`);
  console.log(`✓ 좀보이드: ${result.zomboid.length}개`);
  console.log(`✓ 히스토리: ${result.history.length}개`);

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n✅ 생성 완료: ${outputPath}`);
}

main();
