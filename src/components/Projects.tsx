import React, { useState, useMemo } from 'react';
import ProjectCard, { ProjectProps } from './ProjectCard';

const projectsData: ProjectProps[] = [
  {
    title: "Mail Agent - 뤼튼 서비스 출시",
    category: "뤼튼",
    problem: "복잡한 메일 본문의 맥락을 유지하며 실시간 요약 및 자동 분류가 필요한 상황에서, Multi-Agent 기반의 지능형 메일 처리 시스템 개발",
    features: [
      "Langgraph를 활용한 Multi-Agent 워크플로우 설계",
      "복잡한 메일 본문의 맥락 유지 실시간 요약",
      "자동 분류 시스템 구현"
    ],
    highlights: [
      "Locust를 활용한 시나리오 기반 부하 테스트 수행",
      "평균 30초 고지연 LLM 추론 플로우를 60 RPS 환경에서 P95 40초 이내로 방어",
      "시스템 안정성 입증 및 뤼튼 내 서비스 출시"
    ],
    impact: [
      "뤼튼 내 정식 서비스로 출시",
      "60 RPS 환경에서 P95 40초 이내 응답 달성"
    ],
    technologies: ["Langgraph", "Multi-Agent", "Locust", "Python", "LLM"]
  },
  {
    title: "AI 기반 검색 기능 ETL 파이프라인",
    category: "뤼튼",
    problem: "채용, 주식, 웹소설 등 다양한 도메인의 데이터를 AI 기반 검색 기능에 최적화하여 제공하기 위한 ETL 파이프라인 및 LLM tool 개발",
    features: [
      "Apache Airflow ETL 파이프라인 설계 및 개발",
      "채용, 주식, 웹소설 ETL 파이프라인 운용",
      "ElasticSearch, BigQuery 데이터 적재"
    ],
    highlights: [
      "ElasticSearch 쿼리 도메인별 튜닝으로 Recall@5 0.7에서 0.9로 개선",
      "RRF, CC, Embedding 차원 및 벤더 등 다변량 수치 조절",
      "LLM tool(채용, 주식) 개발"
    ],
    impact: [
      "전체 뤼튼 tool call 답변의 25% 차지",
      "일평균 57,000번 tool call 호출 처리",
      "Recall@5 0.7 → 0.9 개선"
    ],
    technologies: ["Apache Airflow", "ElasticSearch", "BigQuery", "Python", "LLM"]
  },
  {
    title: "Crack 웹소설 프로젝트",
    category: "뤼튼",
    problem: "카카오페이지, 노벨피아 등 다양한 소설 플랫폼의 데이터를 통합하여 웹소설 생성 모델용 고품질 데이터셋 구축",
    features: [
      "다양한 소설 플랫폼 데이터 표준화된 통합 스키마 설계",
      "메달리온 단계별 LLM 정제 및 변환 파이프라인",
      "나무위키 게시글 지식그래프 기반 데이터 ingestion"
    ],
    highlights: [
      "카카오페이지, 노벨피아 등 플랫폼 데이터 일관성 확보",
      "Asyncio 기반 Producer/Consumer 패턴 공용 라이브러리 개발",
      "Rate limit 걸면서 동시성 확보"
    ],
    impact: [
      "웹소설 생성 모델용 고품질 데이터셋 구축",
      "데이터 일관성 확보 및 분석 효율성 제고"
    ],
    technologies: ["Python", "Asyncio", "LLM", "Knowledge Graph", "ETL"]
  },
  {
    title: "Apache Airflow ETL Pipeline Infrastructure",
    category: "군복무",
    problem: "기존 오케스트레이터의 불안정, 의존성 높은 작업의 연결 실패시 전체 워크플로우의 실패, 중앙 집중식 로깅의 부재로 인한 문제점을 해결하는 ETL 파이프라인 구축",
    features: [
      "스케줄링 및 트리거, 워크플로우 오케스트레이터",
      "Real-time Monitoring: Grafana + Prometheus 메트릭 수집",
      "분산 처리 환경 구축을 통한 성능 최적화"
    ],
    highlights: [
      "모든 Window 서버에서 공통적으로 사용하는 WSL2 표준 CentOS 5 이미지 빌드",
      "Gitlab runner 기반 워크플로우 배포",
      "Celery 기반 30대 가량 분산환경 구축"
    ],
    impact: [
      "30대 서버 분산 환경에서 안정적 운영",
      "장애 발생 시 자동 알림 및 재시도 로직으로 수동 개입 최소화",
      "Grafana 대시보드를 통한 실시간 파이프라인 상태 모니터링 체계 구축"
    ],
    technologies: ["Apache Airflow", "Redis", "Grafana", "Prometheus", "Docker", "Celery", "WSL2", "GitLab CI/CD"],
    githubUrl: "https://github.com/rover0811/airflow-docker-metrics"
  },
  {
    title: "Daily Fuel Management Automation",
    category: "군복무",
    problem: "월 10만 행 유류 데이터를 실 운영서버에서 수동 입력, 단 한 건의 오차도 허용되지 않는 critical 업무를 위한 fault-tolerant asyncio 시스템 구축",
    features: [
      "Production-safe Batch: 개발서버 없이 실 운영서버에서 안전한 대량 데이터 처리",
      "Zero-error Processing: 월 10만 행 데이터 무결성 보장 및 트랜잭션 롤백",
      "Dependency Orchestration: 복잡한 API 체인을 State Machine으로 안전하게 관리"
    ],
    highlights: [
      "프로덕션 직접 배포: 개발서버 부재로 운영서버 직접 배치 → comprehensive logging과 safe rollback 구현",
      "데이터 무결성: 10만 행 처리 중 실패 시 변경된 데이터에 대해 보상 http 요청하여 롤백",
      "ERP 시스템 한계: 동시 접속 제한 → connection pooling과 rate limiting으로 안정성 확보"
    ],
    impact: [
      "월 10만 행 데이터 무결성 유지하며 자동 처리",
      "21개월 운영 기간 중 데이터 오류 0건",
      "운영서버 직접 배포 환경에서 롤백 메커니즘 구현"
    ],
    technologies: ["Python", "Asyncio"]
  },
  {
    title: "Kubernetes 기반 고성능 시스템 설계 및 부하 테스트",
    category: "사이드 프로젝트",
    problem: "8 CPU Minikube 환경에서 24,000 QPS (초당 쿼리) 목표를 달성하기 위한 최적화된 Kubernetes 배포 및 부하 테스트 설정이 필요한 상황에서, 리소스 제약 환경에서의 고성능 시스템 아키텍처 설계 문제를 해결",
    features: [
      "FastAPI + Redis 기반 고성능 아키텍처: 6개 FastAPI 파드와 3개 Redis 파드로 구성된 분산 시스템",
      "Nginx Ingress 최적화: keepalive 연결 1000개, 요청 처리량 10000으로 설정하여 24K RPS 대응",
      "Locust 부하 테스트: gevent + httpclient 기반 12000개 동시 연결 지원하는 최적화된 테스트 환경",
      "자동 확장 시스템: HPA와 PDB를 통한 CPU/메모리 기반 파드 자동 확장 및 고가용성 보장"
    ],
    highlights: [
      "리소스 최적화: 총 6.5 CPU, 8GB 메모리로 24K QPS 목표 설계",
      "성능 측정 달성: 동시 사용자 2000명 환경에서 최대 9000 RPS 실측 성능 확인",
      "트러블슈팅 경험: minikube tunnel FD 고갈 문제 해결, 포트포워딩 안정화 구현",
    ],
    impact: [
      "Minikube 환경에서 9K RPS 달성 (동시 사용자 2,000명)",
      "HPA/PDB 기반 자동 확장 및 고가용성 설계",
      "Nginx Ingress 튜닝으로 연결 병목 해결 경험"
    ],
    technologies: ["Kubernetes", "FastAPI", "Redis", "Nginx"],
    githubUrl: "https://github.com/ssuperpower-developer/system-design-interview-study/pull/1"
  },
  {
    title: "Cloudflare Proxy - IP 로테이션 프록시 서버",
    category: "사이드 프로젝트",
    problem: "프록시 서비스 비용(ScraperAPI $49/월, ZenRows $69/월, Bright Data $499/월)을 내기 싫은데 IP 로테이션을 어떻게 구현할 것인가?",
    features: [
      "Cloudflare Workers 무료 tier로 IP 로테이션 구현",
      "Worker 개수 무제한 → N개 Worker = N × 10만 요청/일",
      "전 세계 300+ 에지 노드 → 다양한 IP 풀",
      "라운드로빈 방식 Worker 선택으로 IP 분산"
    ],
    highlights: [
      "완전 무료: 유료 프록시 서비스 대비 $0 비용",
      "FastAPI 기반 Main Server + Cloudflare Worker 아키텍처",
      "Terraform을 활용한 GCP Cloud Run 배포 자동화",
      "Worker Pool 관리 및 Cloudflare API 연동"
    ],
    impact: [
      "프록시 비용 100% 절감: $49~499/월 → $0",
      "일일 N × 10만 요청 처리 가능",
      "다양한 IP 풀로 크롤링 안정성 확보"
    ],
    technologies: ["Cloudflare Workers", "FastAPI", "Terraform", "GCP Cloud Run", "Docker"],
    githubUrl: "https://github.com/rover0811/cloudflare_proxy"
  },
  {
    title: "UiPath Packager - Python to UiPath 자동 변환 라이브러리",
    category: "군복무",
    problem: "기존 UiPath Orchestrator의 불안정성으로 인한 워크플로우 실패, UiPath 프로세스 개발의 높은 복잡성 및 긴 개발 주기, 의존성 높은 작업 연결 실패 시 전체 워크플로우 중단 문제를 해결. 최종 산출물이 반드시 UiPath여야 하는 환경적 제약으로 인해 Python 코드를 UiPath로 변환하는 라이브러리 개발",
    features: [
      "UiPath-Python 마이그레이션 라이브러리: UiPath 프로세스를 Python으로 자동 변환",
      "안정적인 오케스트레이터: Apache Airflow + Redis + Celery 기반 워크플로우 관리",
      "실시간 모니터링: Grafana + Prometheus 기반 파이프라인 상태 추적"
    ],
    highlights: [
      "XAML 구조 파싱: Python 코드를 UiPath XAML 구조로 자동 변환하는 파서 개발",
      "리버스 엔지니어링: MITM 프록시로 UiPath Orchestrator ↔ Robot 통신 프로토콜 분석 및 모킹"
    ],
    impact: [
      "Python 기반 개발로 UiPath 대비 개발 생산성 향상",
      "연간 26개 자동화 프로젝트 배포",
      "반복 업무 5,000시간 자동화 달성"
    ],
    technologies: ["Python", "UiPath"]
  },
  {
    title: "EAT-SSU - 서버리스 학식 정보 자동화 플랫폼",
    category: "사이드 프로젝트",
    problem: "숭실대 학생들이 식당별 메뉴를 확인하기 위해 여러 사이트를 방문해야 하는 불편함을 AWS Lambda 기반 서버리스 아키텍처로 3개 식당 메뉴를 실시간 수집하여 통합 서비스 제공",
    features: [
      "Multi-Restaurant Crawling: 도담식당, 학생식당, 기숙사식당 메뉴 동시 수집",
      "GPT-4 Menu Classification: 메인메뉴와 사이드메뉴 자동 분류로 사용자 경험 향상",
      "Serverless Auto-Scaling: AWS Lambda + EventBridge 스케줄링으로 안정적 서비스 운영",
      "Real-time Notification: Slack 웹훅 연동으로 메뉴 업데이트 실시간 알림"
    ],
    highlights: [
      "비동기 크롤링 최적화: aiohttp + asyncio로 3개 식당 동시 처리하여 응답속도 70% 향상",
      "서버리스 아키텍처 설계: Lambda 함수별 역할 분리와 Step Functions으로 워크플로우 관리",
      "GPT 함수 호출 구현: OpenAI Function Calling으로 메뉴 분류 정확도 95% 달성",
      "CI/CD 파이프라인: GitHub Actions로 테스트 자동화 및 무중단 배포 구현"
    ],
    impact: [
      "3,000+ 명 월간 활성 사용자 확보",
      "23년 숭실대학교 IT대학 소프트웨어 공모전 금상 수상",
      "일일 API 호출 15,000+ 회 안정적 처리",
      "3개 식당 메뉴 실시간 수집 및 통합 제공"
    ],
    technologies: ["AWS Lambda", "EventBridge", "Step Functions", "OpenAI GPT-4", "Asyncio", "GitHub Actions"],
    githubUrl: "https://github.com/EAT-SSU/Food-Crawling"
  },

  {
    title: "WhisperLive 기반 실시간 음성 퀴즈 생성 시스템",
    category: "사이드 프로젝트",
    problem: "기존 상시 서버 운영으로 인한 높은 인프라 비용과 모바일 환경에서의 실시간 음성 처리 및 피드백 시스템 부재 문제를 해결",
    features: [
      "실시간 음성 스트리밍: WebSocket 기반 실시간 STT 처리",
      "AI 기반 퀴즈 생성: Google Vertex AI 임베딩 + RAG 프로세서를 통한 맞춤형 퀴즈 생성",
      "비용 효율적 서버리스 아키텍처: GCP Cloud Run 기반 요청 시에만 활성화되는 컨테이너 배포",
      "완전 자동화된 CI/CD: GitHub Actions 기반 무중단 배포 파이프라인"
    ],
    highlights: [
      "비용 최적화 아키텍처: Cloud Run Scale-to-Zero 기능으로 유휴 시간 비용 제거 (min-instances=0)",
      "오픈소스 기여: WhisperLive 컨테이너라이징 및 웹소켓 기능 개선",
      "벡터 데이터베이스: Pinecone 벡터 DB를 활용한 효율적인 임베딩 저장소 구축",
      "AI 통합: Claude API 연동을 통한 고품질 퀴즈 생성 엔진 구현",
      "DevOps 자동화: GitHub Actions + GCP Artifact Registry 기반 커밋 해시 태깅 및 조건부 배포"
    ],
    impact: [
      "Cloud Run Scale-to-Zero로 유휴 비용 제거",
      "WhisperLive 오픈소스 PR 머지 (#373)",
      "ASK2025 학술대회 프로시딩 채택"
    ],
    technologies: ["Python", "WebSocket", "GCP Cloud Run", "Vertex AI", "Pinecone", "Claude API", "GitHub Actions", "Docker"],
    githubUrl: "https://github.com/0361Team/0361-server"
  },
  {
    title: "HR Document Verification System",
    category: "군복무",
    problem: "월 200+ 인사 문서의 첨부파일 형식/내용 검증과 내부 DB 대조를 수작업으로 처리하여 누락 발생 문제를 OCR 엔진 연동과 HTTP API 기반 실시간 데이터 검증 시스템으로 해결",
    features: [
      "Multi-format OCR Processing: PDF, HWPX, DOCX 첨부파일에서 텍스트 추출 후 구조화",
      "Real-time Data Validation: 추출된 인사정보를 내부 DB와 HTTP API로 실시간 대조",
      "Automated Verification Pipeline: OCR → 데이터 파싱 → API 검증 → 결과 리포트 자동 생성"
    ],
    highlights: [
      "OCR 엔진 연동: 다양한 문서 형식의 텍스트 추출 정확도 향상을 위한 전처리 파이프라인 구축",
      "보안 시스템 로그인: JavaScript 콜스택 분석으로 보안 모듈과의 websocket 통신과정 30개의 메시지의 로직 파악 후 모킹하여 로그인 쿠키 획득",
      "대용량 배치 처리: 200+ 문서 동시 처리 시 병렬 처리 안정성 확보"
    ],
    impact: [
      "월 200+ 문서 자동 검증 파이프라인 구축",
      "첨부파일 누락 사전 감지로 반려율 감소",
      "OCR + API 연동으로 수작업 검증 프로세스 대체"
    ],
    technologies: ["Python", "Asyncio"]
  },
  {
    title: "HWPX Document Automation Library",
    category: "군복무",
    problem: "반복적인 한글 산출물 업무 수작업 처리로 RPA팀에 지속적인 개발 요청, 그러나 라이브러리가 부재하여 한글 산출물에 대한 작업에 대해서 처리하지 못함",
    features: [
      "Template Processing: 동적 데이터 삽입 및 문서 생성",
      "Batch Operations: 대량 문서 일괄 처리",
      "글자, 이미지, 표, 서식 등에 대하여 파이썬으로 조작"
    ],
    highlights: [
      "win32com객체로 한글 내부 로직을 모방하여 동일한 기능 구현",
      "XML 기반 HWPX 형식 문서 조작을 위한 전용 파서 개발"
    ],
    impact: [
      "월 1,000건 이상 한글 문서 자동 생성",
      "템플릿 기반 문서 생성으로 서식 일관성 확보",
      "팀 내 공용 라이브러리로 채택되어 지속 사용 중"
    ],
    technologies: ["Python", "win32com", "HWPX"]
  },
  {
    title: "RPA CLI Tool for Project Automation",
    category: "군복무",
    problem: "팀 내 프로젝트 셋업과 배포 과정이 수작업으로 진행되어 팀 컨벤션과 불일치하여 경로 문제 발생",
    features: [
      "표준 폴더구조 + Poetry + CI/CD 자동 생성",
      "의존성 lock 파일 관리",
      "Nexus Pypi 패키징 후 업로드",
      "UiPath Orchestrator 연동 배포"
    ],
    highlights: [
      "CLI Framework: argparse → Click 마이그레이션으로 확장성 개선",
      "Configuration: Python dict → YAML 기반 설정으로 가독성 향상"
    ],
    impact: [
      "팀 내 프로젝트 구조 표준화 달성",
      "Poetry + Nexus 연동 배포 파이프라인 구축",
      "신규 프로젝트 boilerplate 자동 생성"
    ],
    technologies: ["Python", "UiPath", "Nexus", "CI/CD"]
  },
  {
    title: "OpenGrade - 융합특성화자유전공학부 성적 기반 전과 등수 분석 시스템",
    category: "사이드 프로젝트",
    problem: "융특 학생들의 전과 시 경쟁력 파악 어려움과 성적 데이터 수동 수집 및 분석의 비효율성 문제를 해결",
    features: [
      "자동화된 성적 스크래핑: 숭실대학교 유세인트 포털 연동",
      "전과별 점수 계산: 컴퓨터학부/소프트웨어학부 맞춤형 가중치 적용",
      "실시간 등수 분석: MySQL 기반 성적 데이터베이스 구축 및 순위 제공"
    ],
    highlights: [
      "동적 DOM 최적화: WebDriverWait + Expected Conditions로 성적 테이블 로딩 대기 시간 최소화",
      "견고한 웹 스크래핑: Selenium + BeautifulSoup 기반 다중 iframe 네비게이션 및 동적 요소 처리",
      "FastAPI 기반 REST API: 토큰 기반 인증 및 학기별/연도별 성적 조회 엔드포인트 제공",
      "SQLAlchemy ORM: MySQL 연동 성적 데이터 CRUD 및 자동 점수 계산 로직"
    ],
    impact: [
      "융특 학생 대상 전과 경쟁력 분석 서비스 제공",
      "학부별 가중치 적용 점수 자동 계산",
      "FastAPI 기반 REST API로 성적 데이터 제공"
    ],
    technologies: ["Python", "FastAPI", "Selenium", "BeautifulSoup"],
    githubUrl: "https://github.com/ssuperpower-developer/OpenGrade"
  },

  {
    title: "Nexus 기반 Private PyPI 서버 구축 및 패키지 배포 프로세스 표준화",
    category: "군복무",
    problem: "GitLab 직접 배포로 인한 버전 관리 부재, git clone 기반 배포로 인한 의존성 충돌 및 환경 불일치, 프로젝트 내부 라이브러리 중복 관리로 인한 코드베이스 비대화 문제를 해결",
    features: [
      "Private PyPI 서버: Nexus Repository Manager 기반 내부 패키지 저장소 구축",
      "패키지 배포 자동화: Poetry + Nexus 연동으로 패키지 빌드/업로드 원클릭 처리",
      "버전 관리 표준화: Semantic Versioning 기반 의존성 관리 체계 확립"
    ],
    highlights: [
      "Nexus Repository 서버 구축: Private PyPI 저장소로 내부 패키지 중앙 집중 관리",
      "Poetry 의존성 관리: pyproject.toml 기반 패키지 메타데이터 및 의존성 정의 표준화",
      "배포 파이프라인 자동화: 패키지 빌드 → Nexus 업로드 → 버전 태깅까지 원클릭 처리",
      "환경 분리: 개발/스테이징/프로덕션 환경별 패키지 저장소 격리 운영"
    ],
    impact: [
      "내부 패키지 버전 관리 체계 확립",
      "git clone 기반 배포에서 pip install 방식으로 전환",
      "중복 코드 제거로 프로젝트 간 의존성 명확화"
    ],
    technologies: ["Nexus", "PyPI"]
  }
];

const categories = ['뤼튼', '군복무', '사이드 프로젝트'] as const;

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('뤼튼');

  // 카테고리별 프로젝트 개수 계산
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = projectsData.filter(p => p.category === cat).length;
    });
    return counts;
  }, []);

  // 선택된 범주에 따라 프로젝트 필터링
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Projects</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          데이터 엔지니어링과 자동화에 중점을 둔 프로젝트들을 소개합니다.
        </p>
      </div>

      {/* 필터 섹션 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* 범주 필터 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">Category</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedCategory === category
                    ? 'border-teal-600 bg-teal-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selectedCategory === category
                    ? 'border-teal-600 bg-teal-600'
                    : 'border-gray-300 bg-white'
                }`}>
                  {selectedCategory === category && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  selectedCategory === category ? 'text-teal-700' : 'text-gray-700'
                }`}>
                  {category} ({categoryCounts[category]})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;