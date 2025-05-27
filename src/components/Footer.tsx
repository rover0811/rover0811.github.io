import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Kim Hyunsoo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;