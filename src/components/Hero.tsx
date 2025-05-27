import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          안녕하세요, 저는 <span className="text-teal-600">김현수</span>입니다
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          데이터 엔지니어링과 자동화에 열정을 가진 Python 개발자입니다.
          <br />
          효율적인 시스템 설계와 안정적인 인프라 구축을 추구합니다.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#projects"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            프로젝트 보기
          </a>
          <a
            href="https://github.com/rover0811"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 