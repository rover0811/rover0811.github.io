import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-gray-900">
              Portfolio
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#experience" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Experience
            </a>
            <a href="#projects" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Projects
            </a>
            <a href="https://github.com/rover0811" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 