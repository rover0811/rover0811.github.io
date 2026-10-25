---
title: "SK하이닉스의 하루를 AI 시그널로 다시 보기"
layout: ai-signal
toc: false
description: "주가가 급변하면 차트 위에 원인 문구를 붙이는 AI 시그널을 16배속 리플레이로 보여 줍니다."
video: "ai-signal/signal-replay-16x.mp4"
poster: "ai-signal/poster.png"
links:
  - name: "설계 문서"
    url: "https://github.com/rover0811/invest_view/blob/feat/ai-signal-article-character/docs/design/22-ai-signal-spec.md"
  - name: "구현 PR"
    url: "https://github.com/rover0811/invest_view/pull/49"
excludeSearch: true
noindex: true
llms: false
sitemap:
  disable: true
---

주가가 급변하면 차트 위에 원인 문구를 붙이고, 같은 원인이면 문구를 유지합니다. 2026-10-14 장 시작부터 장 마감까지를 16배속으로 재생합니다.
