# rover0811.github.io

[Hugo](https://gohugo.io/) + [Hextra](https://github.com/imfing/hextra) 기반 개인 기술 블로그.

## 로컬 실행

```bash
git clone --recurse-submodules https://github.com/rover0811/rover0811.github.io.git
cd rover0811.github.io
hugo server
```

`http://localhost:1313` 에서 미리보기.

> 이미 클론했는데 테마가 비어 있으면: `git submodule update --init --recursive`

## 글 쓰기 (웹 CMS)

`https://rover0811.github.io/admin/` 에 접속하면 [Sveltia CMS](https://sveltiacms.app/)로
브라우저에서 글을 쓰고 GitHub에 바로 커밋할 수 있습니다. (아래 "CMS 최초 설정" 필요)

로그인 방법 3가지:
- **GitHub(으)로 로그인** — Cloudflare Worker 설정 후 원클릭 로그인
- **액세스 토큰으로 로그인** — GitHub PAT 붙여넣기 (Worker 없이 즉시 사용 가능)
- **로컬 저장소로 작업** — 로컬 클론 폴더를 직접 편집

## CMS 최초 설정 (GitHub OAuth 로그인 활성화)

`admin/config.yml`의 `base_url`을 실제 Worker 주소로 바꿔야 "GitHub 로그인"이 작동합니다.

1. **Cloudflare Worker 배포** — [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
   저장소의 "Deploy to Cloudflare Workers" 버튼으로 배포.
   배포되면 `https://sveltia-cms-auth.<서브도메인>.workers.dev` 주소가 나옴 (복사).
2. **GitHub OAuth App 등록** — <https://github.com/settings/applications/new>
   - Application name: `Sveltia CMS` (자유)
   - Homepage URL: `https://rover0811.github.io/`
   - Authorization callback URL: `<WORKER_URL>/callback`
   - 등록 후 **Client ID** 확인 + **Generate a new client secret**로 **Client Secret** 생성
3. **Worker 환경변수 설정** — Cloudflare 대시보드 → `sveltia-cms-auth` → Settings → Variables:
   - `GITHUB_CLIENT_ID`: 위 Client ID
   - `GITHUB_CLIENT_SECRET`: 위 Client Secret (Encrypt 권장)
   - `ALLOWED_DOMAINS`: `rover0811.github.io`
4. **config.yml 수정** — `static/admin/config.yml`의 `base_url`을 Worker 주소로 교체 후 커밋:
   ```yaml
   backend:
     name: github
     repo: rover0811/rover0811.github.io
     branch: main
     base_url: https://sveltia-cms-auth.rover0811.workers.dev
   ```

> Worker 없이 당장 쓰려면: admin에서 **"액세스 토큰으로 로그인"** → 안내 링크로 PAT 생성해 붙여넣기.

## 글 쓰기 (직접 파일 추가)

`content/blog/` 아래에 `.md` 파일을 추가하면 포스트가 됩니다.

```markdown
---
title: "제목"
date: 2026-08-16T00:00:00+09:00
authors:
  - name: 김현수
tags:
  - Data Engineering
---

본문...

<!--more-->

이후 내용은 목록에서 접힘.
```

- 코드블록, 콜아웃(`{{< callout >}}`), Mermaid(` ```mermaid `), KaTeX(`$...$`, `$$...$$`) 지원
- `date`가 미래면 목록에 안 뜸 — KST 자정 직후엔 시각까지 명시(`T00:00:00+09:00`)

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동 빌드·배포.
GitHub 저장소 Settings → Pages → Source 를 **GitHub Actions** 로 설정해야 함.

## Obsidian vault → 블로그 발행 (향후 계획)

현재는 `content/blog/`에 직접 작성. 나중에 Obsidian vault의 노트를 골라 발행하려면:

1. vault에서 발행할 노트에 `publish: true` 같은 frontmatter 플래그를 둔다
2. 발행 스크립트로 해당 노트만 `content/blog/`로 복사하며 변환:
   - Obsidian `[[wikilink]]` → Hugo 상대링크 또는 텍스트
   - 이미지 첨부(`![[img.png]]`) → `static/` 또는 page bundle로 이동
   - frontmatter 정규화(title/date/tags/authors)
3. 후보 도구: `obsidian-export`(Rust CLI), 또는 rsync + 간단한 sed/python 변환 스크립트
4. vault는 iCloud라 별도 repo와 분리 유지 — 발행 스크립트만 이 repo에 두는 것을 권장
