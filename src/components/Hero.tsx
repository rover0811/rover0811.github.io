import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Data Engineer <span className="text-teal-600">김현수</span>입니다
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 px-2">
          데이터 파이프라인의 설계, 구축, 운영까지 전 과정을 오너십 갖고 책임지는 개발자입니다.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Python</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Web Scraping</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Apache Airflow</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Docker</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Cloud</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 