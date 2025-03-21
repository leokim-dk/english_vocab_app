'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  // 네비게이션 상태 관리
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // 섹션 스크롤 핸들러
  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // 헤더 높이만큼 오프셋
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 네비게이션 표시/숨김 처리
      if (currentScrollY <= 0) {
        // 페이지 최상단일 때는 항상 표시
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // 아래로 스크롤
        setIsNavVisible(false);
      } else {
        // 위로 스크롤
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // 현재 섹션 감지
      const sections = ['home', 'features', 'how-it-works', 'faq'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const openExternalLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <header 
      className={`sticky top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm transition-all duration-500 ease-in-out ${
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
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
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
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
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
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}
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
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('faq');
            }}
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
          <Button 
            variant="outline" 
            onClick={() => openExternalLink('https://apps.apple.com/app/id_here')}
            className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            <span className="inline max-[450px]:hidden md:hidden ml-2">iOS</span>
            <span className="hidden md:inline lg:hidden ml-2">iOS 앱</span>
            <span className="hidden lg:inline ml-2">iOS 앱 다운로드</span>
          </Button>
          <Button 
            variant="primary"
            onClick={() => openExternalLink('https://play.google.com/store/apps/details?id=id_here')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <span className="inline max-[450px]:hidden md:hidden ml-2">Android</span>
            <span className="hidden md:inline lg:hidden ml-2">Android 앱</span>
            <span className="hidden lg:inline ml-2">Android 앱 다운로드</span>
          </Button>
        </div>
      </div>
    </header>
  );
} 