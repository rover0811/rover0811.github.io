import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Python 엔지니어 <span className="text-teal-600">김현수</span>입니다
        </h1>
        <p className="text-xl text-gray-700 mb-8">
        데이터 엔지니어링과 자동화에 열정을 가진 Python 개발자입니다.<br />
        효율적인 시스템 설계와 안정적인 인프라 구축을 추구합니다.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Python</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Web Scraping</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Apache Airflow</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Docker</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Cloud</span>
        </div>
        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-white text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
          >
            연락하기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 