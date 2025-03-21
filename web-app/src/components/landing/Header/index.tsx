import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isNavVisible: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string, e: React.MouseEvent) => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

export function Header({
  isNavVisible,
  activeSection,
  scrollToSection,
  openLoginModal,
  openRegisterModal
}: HeaderProps) {
  return (
    <header 
      className={`sticky top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">E</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">영어 단어장</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a 
            href="#" 
            onClick={(e) => scrollToSection('home', e)}
            className={`relative text-gray-600 hover:text-blue-600 transition-colors ${
              activeSection === 'home' ? 'text-blue-600 font-medium' : ''
            }`}
          >
            홈
            {activeSection === 'home' && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </a>
          <a 
            href="#features" 
            onClick={(e) => scrollToSection('features', e)}
            className={`relative text-gray-600 hover:text-blue-600 transition-colors ${
              activeSection === 'features' ? 'text-blue-600 font-medium' : ''
            }`}
          >
            기능
            {activeSection === 'features' && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => scrollToSection('how-it-works', e)}
            className={`relative text-gray-600 hover:text-blue-600 transition-colors ${
              activeSection === 'how-it-works' ? 'text-blue-600 font-medium' : ''
            }`}
          >
            사용 방법
            {activeSection === 'how-it-works' && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </a>
          <a 
            href="#faq" 
            onClick={(e) => scrollToSection('faq', e)}
            className={`relative text-gray-600 hover:text-blue-600 transition-colors ${
              activeSection === 'faq' ? 'text-blue-600 font-medium' : ''
            }`}
          >
            FAQ
            {activeSection === 'faq' && (
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
            )}
          </a>
        </nav>
        <div className="space-x-2">
          <Button variant="outline" onClick={openLoginModal} className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all">로그인</Button>
          <Button onClick={openRegisterModal} variant="primary" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all">회원가입</Button>
        </div>
      </div>
    </header>
  );
} 