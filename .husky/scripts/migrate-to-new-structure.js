#!/usr/bin/env node

/**
 * 기존 마크다운 파일들을 새로운 구조로 마이그레이션
 * name -> contentName
 * link[0] -> broadcastLink
 * link[1] -> noticeLink (선택적)
 * host 필드 추가 (organizer)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootDir = path.join(__dirname, '../..');
const contentsDir = path.join(rootDir, 'contents');

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
 * 프로젝트 마크다운 파일 마이그레이션
 */
function migrateProjects() {
  const projectsDir = path.join(contentsDir, 'projects');
  if (!fs.existsSync(projectsDir)) {
    console.log('⚠️  projects 디렉토리가 없습니다.');
    return 0;
  }

  const indexFiles = findIndexFiles(projectsDir);
  let migrated = 0;

  for (const { indexPath, dirName } of indexFiles) {
    const content = fs.readFileSync(indexPath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);

    // 이미 새 구조면 스킵
    if (frontmatter.contentName && frontmatter.organizer) {
      console.log(`⏭️  스킵: ${dirName} (이미 마이그레이션됨)`);
      continue;
    }

    // 새 구조로 변환
    const newFrontmatter = {
      organizer: frontmatter.host || frontmatter.organizer || '알 수 없음',
      contentName: frontmatter.contentName || frontmatter.name,
      category: frontmatter.category,
      startDate: frontmatter.startDate,
      image: frontmatter.image,
    };

    // 선택적 필드들
    if (frontmatter.endDate) {
      newFrontmatter.endDate = frontmatter.endDate;
    }

    if (frontmatter.participants) {
      newFrontmatter.participants = frontmatter.participants;
    }

    // 링크 처리
    if (frontmatter.broadcastLink) {
      newFrontmatter.broadcastLink = frontmatter.broadcastLink;
    } else if (frontmatter.link && frontmatter.link.length > 0) {
      newFrontmatter.broadcastLink = frontmatter.link[0];
    }

    if (frontmatter.noticeLink) {
      newFrontmatter.noticeLink = frontmatter.noticeLink;
    } else if (frontmatter.link && frontmatter.link.length > 1) {
      newFrontmatter.noticeLink = frontmatter.link[1];
    }

    // 새 마크다운 생성
    const newContent = matter.stringify(body, newFrontmatter);
    fs.writeFileSync(indexPath, newContent, 'utf8');

    console.log(`✅ 마이그레이션: ${dirName}`);
    migrated++;
  }

  return migrated;
}

/**
 * 메인 실행
 */
function main() {
  console.log('🔄 마크다운 파일 마이그레이션 시작...\n');

  const migratedProjects = migrateProjects();

  console.log(`\n✅ 완료: ${migratedProjects}개 프로젝트 마이그레이션`);
}

main();
