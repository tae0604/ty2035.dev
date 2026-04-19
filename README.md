# ty2035.dev — 포트폴리오 (Astro)

유태영(Tae Young Ryu · @ty2035) 개인 포트폴리오.
**Astro**로 만들어서 블로그와 엔트리 작품을 전부 **Markdown 파일로 관리**할 수 있어요.

---

## 📁 폴더 구조

```
ty2035-portfolio/
├─ package.json            ← 의존성 (Astro 5)
├─ astro.config.mjs        ← Astro 설정
├─ tsconfig.json
├─ .gitignore
│
├─ public/                 ← 정적 파일 (그대로 복사됨)
│  ├─ ty2035.svg           ← 프사 · 파비콘
│  ├─ _headers             ← Cloudflare 캐시/보안 헤더
│  └─ thumbnails/          ← (선택) 프로젝트 스크린샷
│
├─ src/
│  ├─ content/
│  │  ├─ config.ts         ← 블로그/프로젝트 스키마 정의
│  │  ├─ blog/             ← ⭐ 블로그 글을 여기에 .md로 쓴다
│  │  │  ├─ hello-world.md
│  │  │  └─ what-entry-taught-me.md
│  │  └─ projects/         ← ⭐ 엔트리 작품을 여기에 .md로 추가
│  │     ├─ project-one.md
│  │     ├─ project-two.md
│  │     └─ …
│  │
│  ├─ layouts/
│  │  ├─ BaseLayout.astro  ← 모든 페이지 공통 (nav, footer)
│  │  └─ PostLayout.astro  ← 블로그 포스트 전용
│  │
│  ├─ components/          ← 재사용 컴포넌트들
│  │  ├─ Nav.astro
│  │  ├─ Footer.astro
│  │  ├─ Hero.astro
│  │  ├─ IdentityCard.astro
│  │  ├─ About.astro
│  │  ├─ Works.astro
│  │  ├─ ProjectRow.astro
│  │  ├─ Writing.astro
│  │  └─ Connect.astro
│  │
│  ├─ pages/               ← ⭐ 각 파일 = 하나의 URL
│  │  ├─ index.astro       → /
│  │  └─ blog/
│  │     └─ [slug].astro   → /blog/hello-world/ 같은 자동 경로
│  │
│  ├─ scripts/
│  │  └─ client.js         ← 시계, 커서 글로우, 복사 등
│  │
│  └─ styles/
│     ├─ global.css        ← 메인 스타일 (베이스 색 #262C3E)
│     └─ blog.css          ← 블로그 포스트 전용 타이포그래피
│
└─ README.md               ← 이 파일
```

---

## 🚀 처음 시작하기

### 1. Node.js 설치
Astro는 Node.js 18 이상이 필요합니다.
[nodejs.org](https://nodejs.org)에서 LTS 버전 다운로드 → 설치.

설치 확인:
```bash
node -v    # v18.x 이상이면 OK
npm -v
```

### 2. 의존성 설치
VS Code 터미널에서 이 폴더로 이동한 뒤:
```bash
npm install
```
(처음에는 1-2분 걸림 — `node_modules/` 폴더가 생성됩니다)

### 3. 개발 서버 실행
```bash
npm run dev
```
→ `http://localhost:4321` 에서 미리보기 가능.
**파일을 저장하면 브라우저가 자동으로 업데이트됩니다.**

### 4. 배포용 빌드
```bash
npm run build
```
→ `dist/` 폴더에 정적 HTML/CSS/JS가 생성됩니다. 이걸 Cloudflare Pages가 서빙해요.

---

## ✍️ 블로그 글 쓰는 법

### 새 글 추가

1. `src/content/blog/` 폴더에 새 `.md` 파일 만들기 (예: `why-i-love-entry.md`)
   > 파일명 규칙: 영문 소문자 + 하이픈(-)만 (한글·공백 X). 이 이름이 URL이 됩니다. → `/blog/why-i-love-entry/`

2. 파일 맨 위에 **frontmatter**를 쓰고 그 아래 본문을 Markdown으로:

```markdown
---
title: "Why I love Entry"
description: "블록 언어가 알려준 것들."
date: 2026-05-01
tags: ["entry", "learning"]
readTime: "5 min read"
---

여기부터 본문. Markdown 문법 그대로 씁니다.

## 소제목

**굵게**, *기울임*, [링크](https://example.com), `인라인 코드`.

- 리스트 항목 1
- 리스트 항목 2

> 인용문도 됩니다.
> <cite>— 누군가</cite>

```js
// 코드 블록도
console.log("hello");
```

![이미지 설명](/thumbnails/my-image.png)
```

3. **그게 끝이에요.** 저장하면:
   - 자동으로 `/blog/why-i-love-entry/` 페이지가 생성됨
   - 홈페이지의 Writing 섹션에 자동으로 최신순으로 추가됨
   - 링크 · 날짜 · 태그 · 읽는 시간 모두 자동 표시

### frontmatter 필드 정리

| 필드 | 필수 | 설명 |
|-----|-----|-----|
| `title` | ✅ | 글 제목 |
| `description` | ✅ | 요약 (홈페이지 리스트에 표시) |
| `date` | ✅ | 작성일 (`YYYY-MM-DD` 형식) |
| `tags` | | 태그 배열 — `["tag1", "tag2"]` |
| `readTime` | | "5 min read" 같은 문자열 |
| `draft` | | `true`로 두면 공개되지 않음 (작성 중일 때) |

### 초안 저장

아직 공개하기 싫으면 frontmatter에:
```yaml
draft: true
```
추가하면 홈페이지 Writing 섹션에도, `/blog/` URL에도 안 나타납니다.

---

## 🎮 엔트리 작품 추가/수정

블로그랑 똑같은 방식이에요.

### 새 작품 추가

`src/content/projects/` 폴더에 새 `.md` 파일 만들기:

```markdown
---
title: "내 최신 게임"
description: "엔트리로 만든 점프 플랫포머. 레벨 30개 포함."
year: 2026
url: "https://playentry.org/project/실제ID"
tags: ["Game", "Platformer"]
thumbColor: "warm"
thumbIcon: "triangle"
order: 0
---
```

저장하면 **홈페이지 Works 섹션 맨 위에 자동 등장**.

### frontmatter 필드

| 필드 | 필수 | 설명 |
|-----|-----|-----|
| `title` | ✅ | 작품 제목 |
| `description` | ✅ | 한줄 설명 |
| `year` | ✅ | 제작 연도 (숫자) |
| `url` | | 엔트리 링크 (없으면 `#`으로 처리됨) |
| `tags` | | 태그 배열 — `["Game", "Entry"]` |
| `order` | | 낮을수록 위에 표시. 기본 99 |
| `featured` | | `false`로 하면 홈페이지에 안 나타남 |
| `thumbColor` | | `warm` / `cool` / `sun` / `fresh` / `muted` / `navy` |
| `thumbIcon` | | `circle` / `square` / `triangle` / `wave` / `dots` / `ring` |
| `thumbImage` | | 실제 스크린샷 경로 (예: `/thumbnails/my-game.png`) |

### 썸네일을 실제 스크린샷으로 바꾸기

1. 이미지를 `public/thumbnails/` 에 저장 (권장: **512×512 정사각형 PNG**)
   예: `public/thumbnails/my-game.png`

2. 해당 프로젝트 `.md`의 frontmatter에 추가:
   ```yaml
   thumbImage: "/thumbnails/my-game.png"
   ```

3. `thumbColor`, `thumbIcon`은 무시되고 이미지가 표시됩니다.

---

## 🚀 GitHub + Cloudflare Pages 배포

### Step 1 — GitHub 저장소 만들기

1. [github.com](https://github.com) 로그인 → 우상단 `+` → **New repository**
2. 이름: `ty2035.dev` (추천), **Public** 선택, Create
3. 다음 화면의 `git remote add origin ...` URL 복사해두기

### Step 2 — 로컬에서 업로드

VS Code 터미널(이 폴더에서):

```bash
# Git 초기화
git init
git branch -M main

# 처음이라면 본인 정보 한 번 설정
git config --global user.name "Tae Young Ryu"
git config --global user.email "mail@ty2035.dev"

# 모든 파일 커밋
git add .
git commit -m "Initial Astro portfolio"

# GitHub 저장소 연결 (URL 본인 것으로!)
git remote add origin https://github.com/ty2035/ty2035.dev.git

# 업로드
git push -u origin main
```

### Step 3 — Cloudflare Pages 연결

1. [dash.cloudflare.com](https://dash.cloudflare.com) 로그인
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. GitHub 권한 허용 → 저장소 `ty2035.dev` 선택
4. **Build settings** (⚠️ 중요):
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: (비워두기)
5. **Environment variables**: 필요 없음
6. **Save and Deploy** → 2-3분 기다리면 완료

`https://ty2035-dev.pages.dev` 같은 임시 주소가 생성됩니다.

### Step 4 — 본인 도메인 연결

1. 프로젝트 페이지 → **Custom domains** → **Set up a custom domain**
2. `ty2035.dev` 입력 → Cloudflare 도메인이면 자동으로 DNS 설정됨
3. 1-5분 뒤 `https://ty2035.dev` 로 접속 가능

### Step 5 — 글쓸 때마다

```bash
# 새 글 파일 만들고 작성 후
git add .
git commit -m "new post: why I love entry"
git push
```

Cloudflare가 자동으로 재빌드하고 30초-1분 안에 라이브에 반영됩니다.

---

## 🎨 컬러 커스터마이징

`src/styles/global.css` 최상단에 모든 색이 변수로 정의되어 있습니다:

```css
:root {
  --bg: #262C3E;           /* 베이스 네이비 */
  --fg: #f5f5f7;           /* 본문 텍스트 */
  --accent: #ff7a3a;       /* 오렌지 액센트 */
  --brand-navy: #262C3E;   /* 프사 로고 네이비 */
  ...
}
```

`--accent`만 바꾸면 전체 사이트의 포인트 색이 바뀝니다.

---

## 🧪 자주 쓰는 명령어

```bash
npm run dev        # 개발 서버 (localhost:4321)
npm run build      # 배포용 빌드 → dist/
npm run preview    # 빌드된 걸 로컬에서 미리보기
```

---

## 🧹 문제 해결

**`npm install` 오류?**
→ Node.js 18+ 버전 확인 (`node -v`)

**빌드 오류 "Unknown file extension"?**
→ `src/content/config.ts` 가 제대로 있는지 확인

**Cloudflare 빌드 실패?**
→ 빌드 설정에서 **Framework preset**을 `Astro`로 지정했는지 확인

**로컬에서는 되는데 배포 후 CSS가 깨진다?**
→ 절대 경로 확인. `/ty2035.svg` 같이 슬래시로 시작해야 함

**글 추가했는데 안 보인다?**
→ 1) frontmatter에 `draft: true` 가 있진 않은지 확인
→ 2) 파일명에 한글·공백이 있는지 확인 (영문+하이픈만!)
→ 3) `date`가 미래 날짜면 아직 안 보일 수 있음

---

## 📝 체크리스트 — 배포 전 마지막 점검

- [ ] `src/content/projects/` 의 5개 프로젝트를 실제 본인 작품으로 교체 (또는 삭제)
- [ ] 각 프로젝트의 `url`을 실제 엔트리 작품 URL로
- [ ] `src/components/Hero.astro` 의 meta rows 내용 확인
- [ ] `src/components/About.astro` 의 자기소개 본문 확인
- [ ] `src/content/blog/hello-world.md` 를 실제 첫 포스트로 채우기 (또는 삭제)
- [ ] `npm run build` 가 에러 없이 통과하는지 확인
- [ ] Cloudflare Pages 에서 **Framework preset: Astro** 설정
- [ ] `ty2035.dev` 도메인 연결 & HTTPS 활성화 확인

---

## 라이선스

본인 포트폴리오로 자유롭게 수정하세요.  
다른 사람이 그대로 복제해서 쓰는 건 말려주세요 🙂

—

Built with [Astro](https://astro.build). Last updated Apr 2026.
