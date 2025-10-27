# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

SSAPI는 숲(아프리카TV)과 치지직의 실시간 채팅 및 후원 데이터를 제공하는 한국 스트리밍 API 서비스입니다. 이 프로젝트는 Docusaurus 3.7.0 기반의 문서화 사이트로, 애니메이션이 적용된 커스텀 랜딩 페이지와 포괄적인 API 문서를 제공합니다.

**핵심 기술 스택:**
- Docusaurus 3.7.0 (React 기반 정적 사이트 생성기)
- React 18
- SCSS 모듈 (컴포넌트 스타일링)
- Framer Motion (애니메이션)
- OpenAPI 3.0 (REST API 문서 자동 생성)

## 개발 명령어

### 기본 명령어

```bash
# 개발 서버 시작 (핫 리로드 활성화)
npm start
# 또는
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 로컬 테스트
npm run serve

# Docusaurus 캐시 삭제 (빌드 이슈 발생 시 사용)
npm run clear
```

### API 문서화

```bash
# OpenAPI 스펙으로부터 REST API 문서 재생성
npm run rest-api-generate
```

이 명령어는 `schemas/rest-api.yaml`을 처리하여 `docs/rest-api/`에 개별 `.api.mdx` 파일들을 생성합니다. OpenAPI 스펙 수정 후 실행하세요.

### 국제화 (i18n)

```bash
# i18n 폴더로 번역 가능한 문자열 추출
npm run write-translations

# 마크다운 제목에 ID 추가 (i18n 지원 향상)
npm run write-heading-ids
```

### 프로젝트 관리

```bash
# contents/ 디렉토리의 마크다운 파일로부터 projects.json 생성
npm run build-projects

# contents/ 디렉토리의 이미지 최적화
npm run optimize-images

# pre-commit 훅 실행 (이미지 최적화 + 프로젝트 빌드 + 변경사항 스테이징)
npm run precommit
```

이 프로젝트는 **파일 기반 콘텐츠 관리 시스템**을 사용합니다:
- `contents/projects/` 및 `contents/affiliates/`에 개별 마크다운 파일 저장
- 각 프로젝트는 독립된 디렉토리: `contents/projects/YYYY-MM-프로젝트명/index.md`
- 이미지는 마크다운 파일과 함께 저장: `contents/projects/YYYY-MM-프로젝트명/image.png`
- 빌드 스크립트가 마크다운 파일들을 `schemas/projects.json`으로 통합 (자동 생성, 직접 편집 금지)
- 이미지는 캐시 무효화를 위해 MD5 해시 기반 파일명으로 `static/img/projects/` 또는 `static/img/partners/`에 복사됨

## 아키텍처 개요

### 커스텀 랜딩 페이지 + 문서화 하이브리드

일반적인 Docusaurus 사이트와 달리, 이 프로젝트는 기본 문서 홈페이지 대신 **커스텀 React 랜딩 페이지**(`src/pages/index.js`)를 사용합니다. 랜딩 페이지는 마케팅에 초점을 맞춘 애니메이션 섹션들로 구성되어 있으며, 문서는 내비게이션 바를 통해 접근합니다.

### 디렉토리 구조

```
ssapi-doc/
├── docs/                    # 마크다운 문서 파일
│   ├── intro/              # 소개 페이지
│   ├── socket/             # Socket API 문서
│   ├── rest-api/           # 자동 생성된 REST API 문서 (편집 금지)
│   ├── schemas/            # 데이터 스키마 정의 (.schema.mdx)
│   ├── additional/         # 참조 테이블 및 정책
│   └── contact/            # 연락처 정보
├── contents/                # 파일 기반 콘텐츠 관리 (원본 데이터)
│   ├── projects/           # 프로젝트 마크다운 파일 (YYYY-MM-프로젝트명/index.md)
│   └── affiliates/         # 제휴사 마크다운 파일 (YYYY-MM-제휴사명/index.md)
├── src/
│   ├── components/
│   │   ├── Landing/        # 랜딩 페이지 섹션 (Hero, Features 등)
│   │   └── Docs/           # 문서 전용 컴포넌트 (ServerList 등)
│   ├── pages/
│   │   └── index.js        # 커스텀 랜딩 페이지 (기본값 대체)
│   └── css/
│       └── custom.css      # 전역 테마 커스터마이징
├── schemas/
│   ├── rest-api.yaml       # OpenAPI 3.0 스펙 (REST API 원본)
│   ├── projects.json       # contents/로부터 자동 생성 (편집 금지)
│   └── history.json        # 히스토리 데이터 (빌드 스크립트가 읽음)
├── static/img/             # 정적 자산 (contents/에서 자동 복사)
│   ├── projects/           # 프로젝트 이미지 (해시 기반 파일명)
│   └── partners/           # 파트너/제휴사 이미지 (해시 기반 파일명)
├── .husky/
│   └── scripts/            # 빌드 및 최적화 스크립트
│       ├── build-projects.js      # 마크다운 → JSON 변환기
│       ├── optimize-images.js     # Sharp를 사용한 이미지 최적화
│       └── migrate-to-new-structure.js  # 마이그레이션 스크립트
└── blog/                   # 블로그 포스트 (.mdx)
```

### 주요 파일

- **`docusaurus.config.js`** - 사이트 설정, 플러그인, 내비게이션 바, 푸터
- **`sidebars.js`** - 사이드바 설정 (문서 구조로부터 자동 생성)
- **`schemas/rest-api.yaml`** - OpenAPI 스펙 (REST API 문서의 원본)
- **`schemas/projects.json`** - `contents/`로부터 자동 생성 (직접 편집 금지)
- **`contents/projects/YYYY-MM-프로젝트명/index.md`** - 프로젝트 데이터 (원본)
- **`src/pages/index.js`** - 커스텀 랜딩 페이지 진입점
- **`.husky/scripts/build-projects.js`** - 마크다운을 JSON으로 변환
- **`.husky/scripts/optimize-images.js`** - Sharp를 사용한 이미지 최적화

### 컴포넌트 아키텍처

**랜딩 페이지 섹션** (`src/components/Landing/`):
- 모듈화된 자체 포함 컴포넌트, `.module.scss` 스타일링 사용
- 데이터 기반 (`schemas/projects.json` 읽음)
- Framer Motion 애니메이션으로 시각적 효과
- 섹션: Hero, Metrics, Features, MinecraftSupport, SuccessStories, FeaturedProjects, ProjectsList, Statistics, CTA
- **FeaturedProjects**: 참여자 수 기준 상위 8개 프로젝트 표시
  - `participants > 0`인 프로젝트 필터링
  - `participants` 기준 내림차순 정렬
  - 상위 8개 프로젝트 선택 (`.slice(0, 8)`)
  - 그리드 레이아웃: 4×2 (4열, 2행)
  - 반응형: 데스크톱 4×2, 태블릿 4×2, 모바일 2×4
  - 이미지는 1:1 비율로 패딩 포함하여 표시 (크롭하지 않음)

**문서 컴포넌트** (`src/components/Docs/`):
- 문서 페이지용 재사용 가능 컴포넌트
- 예시: OtherProjects, PartnerCards, ProjectHistory, ServerList
- **ServerList**: 연도 구분자와 반복되는 헤더가 있는 테이블 형식으로 프로젝트 표시
  - `schemas/projects.json`에서 읽음
  - 연도별로 그룹화하여 `colspan` 헤더 사용
  - 날짜를 "MM월 DD일" 형식으로 표시 (한국어 형식)
  - 반응형: 데스크톱 테이블 → 모바일 카드

### OpenAPI 우선 REST API 문서화

REST API 문서는 `schemas/rest-api.yaml`로부터 **자동 생성**됩니다:

1. `schemas/rest-api.yaml` 편집하여 엔드포인트 추가/수정
2. `npm run rest-api-generate` 실행하여 문서 재생성
3. `docs/rest-api/`에 개별 `.api.mdx` 파일 생성됨
4. 사이드바는 자동 생성되며 OpenAPI 태그로 그룹화됨

**중요:** `docs/rest-api/`의 파일들은 절대 수동으로 편집하지 마세요 - 덮어쓰여집니다. 항상 원본 YAML 파일을 편집하세요.

### 스타일링 패턴

- **컴포넌트 범위 스타일**: 컴포넌트별 스타일에는 `.module.scss` 파일 사용
- **전역 재정의**: 테마 전체 커스터마이징에는 `src/css/custom.css` 사용
- **CSS 변수**: 테마 설정(라이트/다크 모드)을 위해 `custom.css`에 정의
- **SCSS 지원**: `docusaurus-plugin-sass`를 통해 활성화
- **반응형 그리드 레이아웃**: 명시적 중단점을 가진 CSS Grid 사용
  - 데스크톱: 4열 (예: `grid-template-columns: repeat(4, 1fr)`)
  - 태블릿: 컴포넌트에 따라 3-4열 (중단점: 1200px)
  - 모바일: 1-2열 (중단점: 768px)
- **테이블 레이아웃**: 가로 스크롤 방지를 위해 `table-layout: fixed`와 백분율 기반 열 너비 사용
- **이미지 종횡비**: 정사각형 이미지를 크롭하지 않으려면 `aspect-ratio: 1 / 1`과 `object-fit: contain` 사용

### 사이드바 및 내비게이션

사이드바는 `docs/` 폴더 구조로부터 **자동 생성**됩니다:

- 각 디렉토리의 `_category_.json` 파일로 제어
- 마크다운 파일의 `sidebar_position` 프론트매터로 순서 지정
- 이모지 레이블은 `_category_.json`에 설정 (예: "💚 Socket API")

새 문서 페이지 추가 방법:
1. 적절한 `docs/` 하위 디렉토리에 `.md` 또는 `.mdx` 파일 생성
2. 필요시 `sidebar_position` 프론트매터 추가
3. 다음 빌드 시 사이드바 자동 업데이트

## 콘텐츠 관리 워크플로우

### 새 프로젝트 추가

**중요: `schemas/projects.json`을 직접 편집하지 마세요. 항상 `contents/`의 마크다운 파일을 편집하세요.**

1. 프로젝트 디렉토리 생성: `contents/projects/YYYY-MM-프로젝트명/`
2. 프론트매터와 함께 `index.md` 생성:
   ```yaml
   ---
   organizer: 주최자명
   contentName: 컨텐츠명
   category: minecraft  # 또는 zomboid
   startDate: 2024-03-08T00:00:00.000Z
   endDate: 2024-04-05T00:00:00.000Z  # 선택사항
   participants: 260  # 선택사항, 정수형이어야 함
   image: image.png
   broadcastLink: https://ch.sooplive.co.kr/example
   noticeLink: https://example.com/notice  # 선택사항
   ---
   ```
3. 같은 디렉토리에 프로젝트 로고를 `image.png` (또는 .jpg, .gif, .webp)로 추가
4. `npm run precommit` 실행하여:
   - 이미지 최적화 (200x200 리사이즈, PNG 변환, 메타데이터 제거)
   - 마크다운 파일로부터 `schemas/projects.json` 생성
   - 해시 기반 파일명으로 이미지를 `static/img/projects/`에 복사
   - 커밋을 위한 변경사항 스테이징
5. 프로젝트가 자동으로 랜딩 페이지와 ServerList 컴포넌트에 표시됨

### REST API 문서 업데이트

1. OpenAPI 3.0 문법을 사용하여 `schemas/rest-api.yaml` 편집
2. `npm run rest-api-generate` 실행
3. `docs/rest-api/`의 생성된 문서 확인
4. YAML과 생성된 `.api.mdx` 파일 모두 커밋

### 날짜 형식

이 프로젝트는 UI 컴포넌트에서 **한국어 날짜 형식**을 사용합니다:
- 저장: ISO 8601 형식 (`2024-03-08T00:00:00.000Z`)
- 표시: "MM월 DD일" 형식 (예: "03월 08일")
- 종료일이 없는 기간: "03월 08일 ~" (틸드 포함)
- 같은 해 범위: "03월 08일 ~ 04월 05일" (종료일에서 연도 생략)
- 다른 해 범위: "23년 12월 25일 ~ 24년 01월 15일" (양쪽 연도 표시)

## 빌드 스크립트

### .husky/scripts/build-projects.js

`contents/`의 마크다운 파일들을 `schemas/projects.json`으로 변환:
- `contents/projects/` 및 `contents/affiliates/`에서 `index.md` 파일 스캔
- gray-matter를 사용하여 프론트매터 파싱
- 캐시 무효화를 위해 MD5 해시 기반 파일명으로 이미지를 `static/img/`에 복사
- `startDate` 기준으로 정렬 (최신순)
- 카테고리별로 프로젝트 그룹화: `minecraft`, `zomboid`, `partners`
- 히스토리 데이터를 위해 `schemas/history.json`과 병합
- 통합된 JSON을 `schemas/projects.json`에 출력

### .husky/scripts/optimize-images.js

Sharp를 사용하여 `contents/` 디렉토리의 이미지 최적화:
- 모든 `image.*` 파일 찾기 (PNG, JPG, JPEG, GIF, WebP)
- 최대 200x200px로 리사이즈 (종횡비 유지, 1:1로 크롭)
- 최대 압축(레벨 9)으로 PNG 변환
- 모든 메타데이터 제거 (EXIF 등)
- `bin/data/backups/`에 백업 생성
- 재처리 방지를 위해 MD5 해시로 처리된 이미지 추적
- 모든 작업을 `bin/data/logs/`에 로깅

**중요**: 이 스크립트들은 커밋 전에 `npm run precommit`을 통해 자동으로 실행됩니다.

## 플러그인 설정

### docusaurus-plugin-openapi-docs

`docusaurus.config.js`에서 설정:
```javascript
{
  id: "rest-api",
  config: {
    ssapi: {
      specPath: "schemas/rest-api.yaml",
      outputDir: "docs/rest-api",
      sidebarOptions: { groupPathsBy: "tag" },
      showSchemas: true
    }
  }
}
```

### 커스텀 DocItemComponent

사이트는 커스텀 API 문서 컴포넌트를 사용합니다:
```javascript
docs: {
  docItemComponent: "@theme/ApiItem"
}
```

이는 향상된 API 문서 렌더링을 위해 `docusaurus-theme-openapi-docs`에서 제공됩니다.

## 국제화 (i18n)

사이트는 한국어(`ko-KR`)를 기본 로케일로 설정합니다:
```javascript
i18n: {
  defaultLocale: "ko-KR",
  locales: ["ko-KR"]
}
```

번역 파일은 `i18n/ko-KR/`에 구성됩니다:
- `docusaurus-plugin-content-docs/` - 문서 번역
- `docusaurus-plugin-content-blog/` - 블로그 번역
- `docusaurus-theme-classic/` - 테마 UI 번역

## 빌드 및 배포

### 로컬 테스트

```bash
npm run build
npm run serve
```

`http://localhost:3000`에서 접근

### 중요한 빌드 참고사항

- 사이트는 `build/` 디렉토리로 빌드됨 (gitignore됨)
- `static/`의 정적 자산은 `build/` 루트로 복사됨
- YAML이 변경되면 자동 생성된 REST API 문서를 재생성해야 함
- 예상치 못한 빌드 동작 발생 시 캐시 삭제 (`npm run clear`)

## Git 워크플로우

- **메인 브랜치**: `main`
- **현재 브랜치**: `features`
- 편집 URL은 GitHub를 가리킴: `https://github.com/DOCHIS/ssapi-doc`
- Husky 훅이 `.husky/`에 pre-commit 체크를 위해 설정됨

## 프로젝트 맥락

SSAPI는 2024년 2월 이후 500억+ 요청을 처리했으며, 약 2,500명의 스트리머와 약 100명의 개발자에게 서비스를 제공하고 있습니다. 문서는 다음을 강조합니다:
- 성능 최적화 (낮은 대역폭 사용)
- 통합 용이성
- 이중 언어 지원 (한국어 우선, 다른 언어로 확장 가능)
- REST API와 함께 실시간 Socket.IO API

## 주의사항

1. **자동 생성 파일 편집 금지**:
   - `docs/rest-api/*.api.mdx` - `schemas/rest-api.yaml`로부터 생성됨
   - `schemas/projects.json` - `contents/` 마크다운 파일로부터 생성됨
   - `static/img/projects/` 및 `static/img/partners/` - `contents/`로부터 복사됨
2. **항상 원본 파일 편집**:
   - REST API의 경우: `schemas/rest-api.yaml` 편집 후 `npm run rest-api-generate` 실행
   - 프로젝트의 경우: `contents/projects/YYYY-MM-프로젝트명/index.md` 편집 후 `npm run build-projects` 실행
3. **프로젝트 데이터 워크플로우**: `contents/`의 마크다운 파일 → 빌드 스크립트 → `schemas/projects.json` → React 컴포넌트
4. **이미지 최적화**: `contents/`의 이미지는 자동으로 최적화되고 PNG로 변환되며 MD5 해시 기반 파일명으로 `static/img/`에 복사됨
5. **커스텀 홈페이지** - 기본 Docusaurus 홈페이지는 `src/pages/index.js`로 대체됨
6. **SCSS 임포트** - 컴포넌트 스타일에는 `.module.scss` 사용, 인라인 CSS 사용 금지
7. **마크다운의 이미지 경로** - `/img/...`로 참조 (`static/` 접두사 없음)
8. **사이드바 자동 생성** - 폴더 구조와 `_category_.json` 파일로 제어, `sidebars.js`가 아님
9. **날짜 형식** - ISO 8601로 저장, 한국어 형식("MM월 DD일")으로 표시
10. **참여자 필드** - 정수형이어야 하며 문자열이 아님
11. **Pre-commit 워크플로우** - 커밋 전에 항상 `npm run precommit`을 실행하여 이미지를 최적화하고 projects.json을 빌드하세요

## 문제 해결

### 테이블의 가로 스크롤

테이블에서 원하지 않는 가로 스크롤이 표시되는 경우:
1. 테이블 요소에 `table-layout: fixed` 사용
2. 열 너비를 픽셀이 아닌 백분율로 설정
3. 셀에 `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis` 추가
4. 필요시 폰트 크기와 패딩 줄이기
5. 테이블 래퍼에 `overflow-x: hidden` 설정

### 마크다운 추가 후 프로젝트가 표시되지 않음

1. 프론트매터 문법이 유효한 YAML인지 확인
2. `category` 필드가 `minecraft` 또는 `zomboid`인지 확인
3. `npm run build-projects` 실행하여 `schemas/projects.json` 재생성
4. 콘솔에서 파싱 오류 확인
5. 이미지 파일이 `index.md`와 같은 디렉토리에 존재하는지 확인

### 이미지가 표시되지 않거나 잘림

1. 프로젝트 쇼케이스 이미지의 경우: `aspect-ratio: 1 / 1`과 `object-fit: contain`, 패딩 사용
2. 크롭해야 하는 로고의 경우: `object-fit: cover` 사용
3. 새 이미지 처리를 위해 `npm run optimize-images` 실행
4. 이미지 경로가 올바른지 확인 (`static/img/`의 MD5 해시 기반 파일명)

### 빌드 캐시 문제

개발 중 예상치 못한 동작이 발생하는 경우:
```bash
npm run clear
npm run build
```

이렇게 하면 Docusaurus 캐시가 삭제되고 처음부터 다시 빌드됩니다.

## CRITICAL: File Editing on Windows

### ⚠️ MANDATORY: Always Use Backslashes on Windows for File Paths

**When using Edit or MultiEdit tools on Windows, you MUST use backslashes (`\`) in file paths, NOT forward slashes (`/`).**

#### ❌ WRONG - Will cause errors:
```
Edit(file_path: "D:/repos/project/file.tsx", ...)
MultiEdit(file_path: "D:/repos/project/file.tsx", ...)
```

#### ✅ CORRECT - Always works:
```
Edit(file_path: "D:\repos\project\file.tsx", ...)
MultiEdit(file_path: "D:\repos\project\file.tsx", ...)
```