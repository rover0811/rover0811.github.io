import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="pt-32 pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          I'm a Python developer specializing in data engineering and automation solutions. 
          With extensive experience in ETL pipeline infrastructure, document processing, and RPA development, 
          I focus on creating efficient systems that transform manual workflows into scalable, automated processes.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Python</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Data Engineering</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">ETL</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Automation</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Apache Airflow</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Document Processing</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">RPA</span>
        </div>
      </div>
    </section>
  );
};

export default About;