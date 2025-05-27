import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Kim Hyunsoo</h1>
            <p className="text-sm text-gray-600">Python Developer</p>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-800 hover:text-teal-600 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col py-4 px-4">
            <li className="py-2">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-800 hover:text-teal-600 transition-colors w-full text-left"
              >
                About
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-800 hover:text-teal-600 transition-colors w-full text-left"
              >
                Projects
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-800 hover:text-teal-600 transition-colors w-full text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;