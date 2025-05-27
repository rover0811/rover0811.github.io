import React, { useState, useMemo } from 'react';
import ProjectCard, { ProjectProps } from './ProjectCard';

const projectsData: ProjectProps[] = [
  {
    title: "UiPath Packager - Python to UiPath 자동 변환 라이브러리",
    category: "라이브러리",
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
      "생산성 800% 향상: 연간 프로젝트 처리량 3개 → 26개",
      "반복 업무 5,000시간 자동화 달성"
    ],
    technologies: ["Python", "UiPath"]
  },
  {
    title: "WhisperLive 기반 실시간 음성 퀴즈 생성 시스템",
    category: "프로젝트",
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
      "인프라 비용 80% 절감: 상시 서버 → 서버리스 아키텍처 전환",
      "실시간 음성 처리 지연시간 최소화 (< 100ms)",
      "배포 시간 95% 단축: 수동 배포 30분 → 자동화 배포 1.5분",
      "ASK2025 학술대회 프로시딩 채택으로 기술적 우수성 인정",
      "오픈소스 기여를 통한 WhisperLive 생태계 발전 기여"
    ],
    technologies: ["Python", "WebSocket", "GCP Cloud Run", "Vertex AI", "Pinecone", "Claude API", "GitHub Actions", "Docker"],
    githubUrl: "https://github.com/0361Team/0361-server"
  },
  {
    title: "OpenGrade - 융합특성화자유전공학부 성적 기반 전과 등수 분석 시스템",
    category: "프로젝트",
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
      "성적 조회 시간 90% 단축: 수동 계산 30분 → 자동화 3분",
      "융특 학생 전과 의사결정 지원을 위한 객관적 데이터 제공",
      "실시간 등수 업데이트로 경쟁력 파악 용이성 향상"
    ],
    technologies: ["Python", "FastAPI", "Selenium", "BeautifulSoup"],
    githubUrl: "https://github.com/ssuperpower-developer/OpenGrade"
  },
  {
    title: "Apache Airflow ETL Pipeline Infrastructure",
    category: "인프라",
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
      "ETL 처리 성능 300% 향상",
      "시스템 장애 복구 시간 95% 단축",
      "파이프라인 모니터링 완전 자동화"
    ],
    technologies: ["Apache Airflow", "Redis", "Grafana", "Prometheus", "Docker", "Celery", "WSL2", "GitLab CI/CD"],
    githubUrl: "https://github.com/rover0811/airflow-docker-metrics"
  },
  {
    title: "EAT-SSU - 서버리스 학식 정보 자동화 플랫폼",
    category: "프로젝트",
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
      "사용자 규모: 3,000+ 명 활성 사용자 확보",
      "23년 숭실대학교 IT대학 소프트웨어 공모전 금상 수상",
      "일일 API 호출 15,000+ 회 안정적 처리",
      "메뉴 수집 실패율 0.2% 미만 달성"
    ],
    technologies: ["AWS Lambda", "EventBridge", "Step Functions", "OpenAI GPT-4", "Asyncio", "GitHub Actions"],
    githubUrl: "https://github.com/EAT-SSU/Food-Crawling"
  },
  {
    title: "Daily Fuel Management Automation",
    category: "프로젝트",
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
      "데이터 처리 시간 90% 단축",
      "오류율 0% 달성",
      "야간 자동화로 업무 시간 확보"
    ],
    technologies: ["Python", "Asyncio"]
  },
  {
    title: "HR Document Verification System",
    category: "프로젝트",
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
      "검증 시간 3인이 매일 6시간 소모 → 프로그램 상 10분",
      "첨부파일 누락률 8% → 0.1%",
      "내부 데이터 대조 정확도 95%+ 달성"
    ],
    technologies: ["Python", "Asyncio"]
  },
  {
    title: "HWPX Document Automation Library",
    category: "라이브러리",
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
      "문서 작성 시간 85% 단축",
      "수작업 오류율 99% 감소",
      "월 평균 1000+ 문서 자동 생성"
    ],
    technologies: ["Python", "win32com", "HWPX"]
  },
  {
    title: "RPA CLI Tool for Project Automation",
    category: "라이브러리",
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
      "새 프로젝트 셋업 시간 단축",
      "개발팀 프로젝트 구조 표준화",
      "배포 과정 완전 자동화"
    ],
    technologies: ["Python", "UiPath", "Nexus", "CI/CD"]
  },
  {
    title: "Nexus 기반 Private PyPI 서버 구축 및 패키지 배포 프로세스 표준화",
    category: "인프라",
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
      "배포 안정성 100% 향상: 버전 충돌 및 의존성 이슈 완전 해결",
      "패키지 배포 시간 단축: 수동 git clone → 자동화된 패키지 설치",
      "코드베이스 크기 감소: 중복 라이브러리 제거로 프로젝트 구조 최적화"
    ],
    technologies: ["Nexus", "PyPI"]
  }
];

const categories = ['프로젝트', '라이브러리', '인프라'] as const;

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // 모든 프로젝트에서 사용된 기술 스택을 추출하고 중복 제거
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projectsData.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // 선택된 범주와 기술에 따라 프로젝트 필터링
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = !selectedCategory || project.category === selectedCategory;
      const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
      return matchesCategory && matchesTech;
    });
  }, [selectedCategory, selectedTech]);

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
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 기술 스택 필터 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">Technologies</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTech(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedTech 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Technologies
            </button>
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTech === tech 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;