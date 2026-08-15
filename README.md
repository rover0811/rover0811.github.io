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

## 글 쓰기

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
