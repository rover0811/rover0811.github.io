import React, { useState } from 'react';

export interface ProjectProps {
  title: string;
  problem: string;
  features: string[];
  highlights: string[];
  impact: string[];
  technologies: string[];
  githubUrl?: string;
  category: string | string[];
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden project-card">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
              {technologies.map((tech, index) => (
                <span key={index} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-teal-50 text-teal-700 text-xs rounded-full whitespace-nowrap tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 no-print">
            {githubUrl && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 transition-colors text-sm sm:text-base"
              >
                GitHub ↗
              </a>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="sm:hidden text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? '접기 ▲' : '자세히 보기 ▼'}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">🎯 Problem & Solution</h4>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{problem}</p>
        </div>
        
        <div className={`sm:block ${isExpanded ? 'block' : 'hidden'}`}>
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">🚀 Core Features</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              {features.map((feature, index) => (
                <li key={index} className="leading-relaxed">{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">🛠 Technical Highlights</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              {highlights.map((highlight, index) => (
                <li key={index} className="leading-relaxed">{highlight}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">📊 Impact</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              {impact.map((item, index) => (
                <li key={index} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;