import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Interested in collaborating or have questions about my work?
          Feel free to reach out through any of the channels below.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <a 
            href="mailto:rover0811@hotmail.com" 
            className="flex items-center gap-2 text-gray-800 hover:text-teal-600 transition-colors"
          >
            <Mail size={20} />
            <span>rover0811@hotmail.com</span>
          </a>
          
          <a 
            href="https://github.com/rover0811" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-gray-800 hover:text-teal-600 transition-colors"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/resumeforhyunsoo/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-gray-800 hover:text-teal-600 transition-colors"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;