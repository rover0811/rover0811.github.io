import React from 'react';

export interface ProjectProps {
  title: string;
  problem: string;
  features: string[];
  highlights: string[];
  impact: string[];
  technologies: string[];
  githubUrl?: string;
  category: '프로젝트' | '라이브러리' | '인프라';
}

const ProjectCard: React.FC<ProjectProps> = ({ 
  title, 
  problem, 
  features, 
  highlights, 
  impact,
  technologies,
  githubUrl
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">🎯 Problem & Solution</h4>
          <p className="text-gray-700">{problem}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">🚀 Core Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">🛠 Technical Highlights</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">📊 Impact</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {impact.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;