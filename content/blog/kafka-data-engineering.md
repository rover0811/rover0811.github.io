---
title: "Kafka로 들여다본 데이터 엔지니어링"
date: 2026-07-01T11:53:31+09:00
categories:
  - Data Engineering
tags:
  - Kafka
  - 시스템디자인
  - 발표
---

Q 핵심 니즈: 내 경험을 이력서에 쓰고 싶다

A 단순 경험 나열을 원하는 건 아님!

A' 그렇다고 한다면 STAR형식으로 쓰자

Q 


Situation은 이미 주어진 상황이고 Task는 나에게 주어진 추상적인 목표 (Task를 주도적으로 만드는 경우도 있겠지만 차치하고)

----
S와 T를 어떻게 interpret해서 구체적인 plan(=architecture)로 어떻게 만들고, Result로 어떻게 평가할 것인가?

A 관측해야한다!

Q 무엇을?

A 지표를!

Q 어떤 것을 지표로 삼을 것인가?

A 비즈니스 지표를, metric 지표를

A 비기능 요구사항의 우선순위를 정하는 것이 설계자의 핵심 역량이다


## Part 0 Pain point (그대로 유지)
네이버 면접 Q11: "성과는 냈는데 무엇을 측정할지 몰라 증명 못 했다"


## Part 1 설계자의 첫 질문은 "무엇을 측정할까?"

1. 기능적 요구사항
2. 비기능적 요구사항

기능은 당연하고, 진짜 설계는 ==어떤 품질을 우선할까?== 에서 갈림

## Part 2 Observability 측정의 인프라

==지표를 정하고, 측정 가능하게 해야함==

모니터링과 관측성은 다르다
단순 모니터링을 넘어, 모르는 문제를 사후에 물어볼 수 있는 능력

Observability
1. log
2. trace
3. metric

처음부터 심기

MTTR(Time to Restore)을 줄이는 유일한 길 = 빨리 원인을 찾는 능력




## Part 3 그래서 뭘 심을가?

1. latency
2. traffic
3. errors
4. saturation

각 시스템 지표와 비즈니스 지표를 매핑하는 능력

DORA

1. Deployment Frequency
2. Lead time
3. Change Failure Rate
4. Time to restore

우리 팀 일 잘하나?"의 표준 답.

## Part 4 지표의 함정

1. Goodhart's law
2. 꼬리 털림
3. 허영 지표


---

시스템 디자인 5가지 영역

1. 확률/운용과학 계열 (성능·용량)
2. 분산시스템 이론 계열 (일관성·합의)
3. 정보이론/부호화 계열 (데이터 표현·전송)
4. 제어이론 계열 (안정성·피드백)
5. 경제학/게임이론 계열 (자원·트레이드오프)

수동 관측과 능동 실험

1. 확률,운용과학 -> 부하테스트 설계
2. 분산시스템 이론 -> Scale out을 어떻게 할 것인가?
	1. Kafka ISR
	2. 리더선출
	3. DB 복제
3. 정보 이론 부호화
	1. 해싱
	2. 샤딩, 로드밸런싱
	3. Schema registry
4. 제어이론
	1. 오토 스케일링
	2. 서킷 브레이커
5. 경제학 게임이론
	1. 트레이드오프 사고

이걸 Mail Agent 설계로 다시 타임랩스해서 돌아가서 해보자

POC 단일 컨슈머 baseline 성능평가

그당시에도 claude-code를 쓰긴 했는데 그당시에는 왜 못잡았을까?


----


## Act 1

1. 목적: DE가 고려하는 시스템 디자인요소가 무엇이 있을까?, Kafka에 대한 간략한 소개

## Act 2
1. Queing theory slide
2. ddia slide
3. fundametal slide
4. mapping slide
## Act 3
1. Why Kafka
	1. 직접 메시징, 브로커
	2. 지속성+알림
2. mapping slide와 kafka mapping
3. producer
4. broker
5. consumer
6. 매핑 회수

## Act 4
1. 시스템 디자인에 대한 중요도

```
---
markmap:
  colorFreezeLevel: 2
---

# Queueing Theory

## 기초 모델
- Little's Law (L=λW)
- M/M/1 큐 (단일 서버)
- M/M/c 큐 (다중 서버)
- Kendall 표기법 (A/S/c)
- M/G/1, G/G/1

## 실전 직결 (DE 핵심)
- 이용률-지연 곡선 W∝1/(1-ρ)
- 꼬리 지연 (P95/P99)
- 병목 분석 (bottleneck)
- Erlang C

## 확장성 (아키텍트)
- Universal Scalability Law (USL)
- Amdahl's Law
- Gustafson's Law

## 네트워크 / 시스템 응용
- Queueing Networks (Jackson)
- backpressure / flow control
- Loss systems (M/M/c/c)

## 고급 / 학술
- Heavy-traffic 근사
- Fluid / Diffusion 근사
- Priority queues
```

```
---
markmap:
  colorFreezeLevel: 2
---

# DDIA (Kleppmann, 2017)

## Part I. 데이터 시스템 기초
- 1. 신뢰성·확장성·유지보수
- 2. 데이터 모델과 질의 언어
- 3. 저장소와 검색
- 4. 부호화와 진화

## Part II. 분산 데이터
- 5. 복제
- 6. 파티셔닝
- 7. 트랜잭션
- 8. 분산 시스템의 어려움
- 9. 일관성과 합의

## Part III. 파생 데이터
- 10. 배치 처리
- 11. 스트림 처리 (오늘)
- 12. 데이터 시스템의 미래
```

![[Pasted image 20260705013728.png]]![[Pasted image 20260705014450.png]]
![[Pasted image 20260705014512.png]]
![[Pasted image 20260705022104.png]]
```

---
markmap:
  colorFreezeLevel: 2
---

# Kafka Design (공식 문서)

## Motivation
- 통합 실시간 데이터 플랫폼
- high-throughput + low-latency + fault-tolerance

## Persistence (저장)
- Don't fear the filesystem (순차 I/O)
- Constant Time Suffices (append = O(1))
- 소비 후 삭제 X, 오래 보관

## Efficiency (효율)
- Batch (message set)
- Zero-copy (sendfile)
- End-to-end 압축

## The Producer
- Load balancing (파티션 키 해싱)
- Asynchronous send (배치)

## The Consumer
- Push vs Pull (Kafka는 pull)
- Consumer Position (offset)
- Rewind / 재소비

## Message Delivery Semantics
- At most once
- At least once
- Exactly once

## Replication
- ISR (In-Sync Replicas)
- Leader election
- Availability vs Durability
```

---

## 매핑 표 (Act2 mapping slide)


| 계열      | Queueing Theory                        | DDIA                                             | Fundamentals           |
| ------- | -------------------------------------- | ------------------------------------------------ | ---------------------- |
| 성능·용량   | Little's Law, 이용률-지연 곡선, P95/P99, 병목분석 | Ch1 신뢰성·확장성, Ch11 스트림(컨슈머 랙·백프레셔)                | Ch7 수집(처리량·확장성)        |
| 분산·일관성  | —                                      | Ch5 복제, Ch6 파티셔닝, Ch9 일관성·합의, Ch11 스트림(순서보장·CDC) | Ch5 소스 시스템             |
| 데이터 표현  | —                                      | Ch3 저장·검색, Ch4 부호화·진화, Ch11 스트림(이벤트·로그·컴팩션)      | Ch6 저장(직렬화·압축)         |
| 안정성·피드백 | 백프레셔, Loss systems                     | Ch8 분산의 어려움, Ch11 스트림(내결함성·재처리)                  | Undercurrents(DataOps) |
| 트레이드오프  | USL, Queueing Networks                 | Ch7 트랜잭션, Ch11 스트림(AMQP vs 로그기반)                 | Ch4 기술선택, FinOps       |

### Act3 회수 표 (Kafka 열 추가)

| 계열 | Kafka |
|---|---|
| 성능·용량 | 파티션 = 병렬 한계, 컨슈머 랙, backpressure |
| 분산·일관성 | ISR, 리더 선출, 복제, 순서 보장 |
| 데이터 표현 | append-only 로그, offset, persistence |
| 안정성·피드백 | pull 모델, 재소비(rewind), 재처리 |
| 트레이드오프 | AMQP vs 로그기반, acks(무손실 vs 지연) |


