import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { HeroScrollSection } from '@/components/HeroScrollSection';
import { Header } from '@/components/landing/Header';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { UserExperience } from '@/components/landing/UserExperience';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export function LandingPage() {
  // 모달 상태 관리
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // 로그인/회원가입 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 네비게이션 상태 관리
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // FAQ 아코디언 상태 관리
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
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

  // 모달 핸들러
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  // 섹션 스크롤 핸들러
  const scrollToSection = (sectionId: string) => {
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

  // FAQ 토글 함수
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // 인증 핸들러
  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isRegisterModalOpen) {
        // 회원가입
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요!');
      } else {
        // 로그인
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setMessage(error.message || '오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }
  
  // 모달 외부 클릭 시 닫기
  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLoginModal();
      closeRegisterModal();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header 
        isNavVisible={isNavVisible}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />

      {/* 새로운 히어로 섹션 */}
      <HeroScrollSection onRegisterClick={openRegisterModal} />

      {/* 주요 기능 섹션 */}
      <Features />

      {/* 사용 방법 섹션 */}
      <HowItWorks />

      {/* 사용자 경험 섹션 */}
      <UserExperience />

      {/* FAQ 섹션 */}
      <FAQ openRegisterModal={openRegisterModal} />

      {/* 행동 유도 섹션 */}
      <CTA openRegisterModal={openRegisterModal} />

      {/* 푸터 */}
      <Footer />
      
      {/* 모바일에서 하단 공간 추가 */}
      <div className="md:hidden h-20"></div>

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">로그인</h2>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  로그인 상태 유지
                </label>
              </div>

              {message && (
                <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                  {message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  '로그인'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <button
                  onClick={() => {
                    closeLoginModal();
                    openRegisterModal();
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  회원가입
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 회원가입 모달 */}
      {isRegisterModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">회원가입</h2>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  최소 6자 이상의 비밀번호를 입력해주세요
                </p>
              </div>

              {message && (
                <div className={`p-4 rounded-lg ${
                  message.includes('확인') 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-red-50 text-red-600'
                } text-sm`}>
                  {message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  '회원가입'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <button
                  onClick={() => {
                    closeRegisterModal();
                    openLoginModal();
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  로그인
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}