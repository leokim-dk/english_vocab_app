'use client';

import React from 'react';
import Header from './landing/Header';
import HeroScrollSection from './landing/Hero/index';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import UserExperience from './landing/UserExperience';
import FAQ from './landing/FAQ';
import CTA from './landing/CTA';
import Footer from './landing/Footer';

export function LandingPage() {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 새로운 히어로 섹션 */}
      <HeroScrollSection />

      {/* 주요 기능 섹션 */}
      <Features />

      {/* 사용 방법 섹션 */}
      <HowItWorks />

      {/* 사용자 경험 섹션 */}
      <UserExperience />

      {/* FAQ 섹션 */}
      <FAQ />

      {/* 행동 유도 섹션 */}
      <CTA />

      {/* 푸터 */}
      <Footer />


    </div>
  );
}