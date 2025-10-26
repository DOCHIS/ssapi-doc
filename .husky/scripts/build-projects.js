#!/usr/bin/env node

/**
 * contents/ 디렉토리의 마크다운 파일들을 읽어서 schemas/projects.json 생성
 * 날짜순으로 정렬하고 이미지 최적화도 함께 수행
 *
 * 디렉토리 구조:
 * contents/
 *   projects/YYYY-MM-프로젝트명/index.md
 *   affiliates/YYYY-MM-제휴사명/index.md
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
 * 이미지 경로 생성 (static/img로 복사)
 * 이미지 내용의 해시를 파일명으로 사용하여 캐싱 및 중복 방지
 */
function getImagePath(dirPath, imageName, category) {
  if (!imageName) return null;

  const sourceImagePath = path.join(dirPath, imageName);
  if (!fs.existsSync(sourceImagePath)) return null;

  // 이미지 파일 내용의 해시 계산
  const crypto = require('crypto');
  const imageContent = fs.readFileSync(sourceImagePath);
  const hash = crypto.createHash('md5').update(imageContent).digest('hex').substring(0, 12);

  // static/img/projects 또는 static/img/partners로 복사
  const targetDir = category === 'affiliate'
    ? path.join(staticImgDir, 'partners')
    : path.join(staticImgDir, 'projects');

  fs.mkdirSync(targetDir, { recursive: true });

  const ext = path.extname(imageName);
  const targetFileName = `${hash}${ext}`;
  const targetPath = path.join(targetDir, targetFileName);

  // 파일 복사 (이미 존재하면 스킵 - 같은 해시 = 같은 이미지)
  try {
    if (!fs.existsSync(targetPath)) {
      fs.copyFileSync(sourceImagePath, targetPath);
    }
    return category === 'affiliate'
      ? `/img/partners/${targetFileName}`
      : `/img/projects/${targetFileName}`;
  } catch (error) {
    console.warn(`⚠️  이미지 복사 실패: ${error.message}`);
    return null;
  }
}

/**
 * 제휴사 처리
 */
function processAffiliates() {
  const affiliatesDir = path.join(contentsDir, 'affiliates');
  if (!fs.existsSync(affiliatesDir)) return [];

  const indexFiles = findIndexFiles(affiliatesDir);
  const affiliates = [];

  for (const { indexPath, dirPath, dirName } of indexFiles) {
    const { frontmatter, body } = parseMarkdownFile(indexPath);

    const logo = getImagePath(dirPath, frontmatter.image, 'affiliate');

    // startDate를 문자열로 변환 (gray-matter가 Date 객체로 파싱하는 경우 대비)
    const startDate = frontmatter.startDate instanceof Date
      ? frontmatter.startDate.toISOString().split('T')[0]
      : String(frontmatter.startDate);

    const endDate = frontmatter.endDate instanceof Date
      ? frontmatter.endDate.toISOString().split('T')[0]
      : (frontmatter.endDate ? String(frontmatter.endDate) : null);

    const affiliate = {
      type: 'affiliate',
      logo: logo || frontmatter.image, // fallback to original if copy fails
      name: frontmatter.name,
      subtitle: frontmatter.subtitle || '',
      startDate: startDate,
      description: body,
      link: frontmatter.link || [],
      _startDate: startDate // 정렬용
    };

    // endDate가 있을 때만 추가
    if (endDate) {
      affiliate.endDate = endDate;
    }

    affiliates.push(affiliate);
  }

  // 시작일 기준 내림차순 정렬 (최신순)
  affiliates.sort((a, b) => String(b._startDate).localeCompare(String(a._startDate)));

  // 정렬용 필드 제거
  return affiliates.map(({ _startDate, ...rest }) => rest);
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

    const logo = getImagePath(dirPath, frontmatter.image, 'project');

    const project = {
      logo: logo || frontmatter.image,
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
    partners: processAffiliates(),
    minecraft: processProjects('minecraft'),
    zomboid: processProjects('zomboid'),
    history: loadHistory()
  };

  console.log(`✓ 제휴사: ${result.partners.length}개`);
  console.log(`✓ 마인크래프트: ${result.minecraft.length}개`);
  console.log(`✓ 좀보이드: ${result.zomboid.length}개`);
  console.log(`✓ 히스토리: ${result.history.length}개`);

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n✅ 생성 완료: ${outputPath}`);
}

main();
