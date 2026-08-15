---
title: "블로그를 Hugo + Hextra로 옮겼습니다"
date: 2026-08-16T00:00:00+09:00
authors:
  - name: 김현수
tags:
  - Hugo
  - Blog
excludeSearch: false
---

기존에 Vite + React로 만들었던 포트폴리오 사이트를 걷어내고, **Hugo + Hextra** 기반의 마크다운 블로그로 새로 시작합니다.

<!--more-->

## 왜 옮겼나

- **마크다운이 곧 글이다** — 글쓰기에 집중하고 싶었습니다. 컴포넌트를 짜는 대신 `.md` 파일 하나면 포스트가 됩니다.
- **가볍고 빠르다** — Hugo는 Go 단일 바이너리로 빌드가 밀리초 단위입니다.
- **기술 블로그에 필요한 게 다 들어있다** — 전체검색(FlexSearch), 다크모드, TOC, 코드 복사, 수식, 다이어그램이 기본 내장.

## 코드 하이라이팅

```python
from airflow import DAG
from airflow.operators.python import PythonOperator


def extract():
    return {"rows": 1000}


with DAG("sample_pipeline", schedule="@daily") as dag:
    PythonOperator(task_id="extract", python_callable=extract)
```

## 콜아웃

{{< callout type="info" >}}
Hextra의 콜아웃은 `info`, `warning`, `error` 타입을 지원합니다.
{{< /callout >}}

## 수식 (KaTeX)

인라인 수식 $E = mc^2$ 도, 블록 수식도 됩니다.

$$
\text{TDEE} = \text{BMR} + \text{NEAT} + \text{TEF} + \text{EAT}
$$

## 다이어그램 (Mermaid)

```mermaid
flowchart LR
    A[Source] --> B[Airflow ETL]
    B --> C[(PostgreSQL)]
    C --> D[Dashboard]
```

## 다음 계획

- Obsidian vault의 글을 골라 블로그로 발행하는 워크플로우 구성
- 데이터 엔지니어링 학습 기록 연재

앞으로 이곳에 배운 것과 삽질한 것을 꾸준히 남기겠습니다.
