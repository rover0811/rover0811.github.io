import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  const projects = [
    {
      title: "데이터 파이프라인 자동화 시스템",
      problem: "수동 데이터 처리로 인한 비효율성과 오류 발생 문제를 해결",
      features: [
        "Apache Airflow 기반 ETL 파이프라인 구축",
        "실시간 데이터 모니터링 대시보드",
        "자동화된 데이터 품질 검증"
      ],
      highlights: [
        "Python과 Airflow를 활용한 확장 가능한 파이프라인 설계",
        "Docker 컨테이너화로 배포 자동화",
        "데이터 검증 및 에러 핸들링 시스템 구현"
      ],
      impact: [
        "데이터 처리 시간 80% 단축",
        "인적 오류 95% 감소",
        "운영 비용 60% 절감"
      ],
      technologies: ["Python", "Apache Airflow", "Docker", "PostgreSQL"],
      githubUrl: "https://github.com/rover0811/data-pipeline",
      keywords: ["데이터 엔지니어링", "자동화", "ETL", "인프라"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;