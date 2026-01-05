import React from 'react';

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
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-6 project-card">
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 transition-colors text-sm whitespace-nowrap no-print"
          >
            GitHub ↗
          </a>
        )}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-xs rounded-full whitespace-nowrap tech-tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Problem & Solution */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1 text-sm">Problem & Solution</h4>
        <p className="text-gray-700 text-sm leading-relaxed">{problem}</p>
      </div>

      {/* Core Features */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1 text-sm">Core Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-0.5 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="leading-relaxed">{feature}</li>
          ))}
        </ul>
      </div>

      {/* Technical Highlights */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-1 text-sm">Technical Highlights</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-0.5 text-sm">
          {highlights.map((highlight, index) => (
            <li key={index} className="leading-relaxed">{highlight}</li>
          ))}
        </ul>
      </div>

      {/* Impact */}
      <div>
        <h4 className="font-medium text-gray-900 mb-1 text-sm">Impact</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-0.5 text-sm">
          {impact.map((item, index) => (
            <li key={index} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
