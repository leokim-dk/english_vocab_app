'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export function FAQ() {
  // FAQ 아코디언 상태 관리
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);


  
  // FAQ 토글 함수
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };



  
  // CTA 섹션으로 스크롤
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
      const offset = 80; // 헤더 높이만큼 오프셋
      const elementPosition = ctaSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  

  return (
    <section id="faq" className="py-28 lg:py-36 bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute left-0 top-0 h-full w-1/3 transform -translate-x-1/4 text-indigo-100" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full">자주 묻는 질문</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            궁금한 점이 있으신가요?
          </h2>
          <p className="mt-6 text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            사용자들이 가장 자주 묻는 질문들과 답변을 모았습니다.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {/* FAQ 아코디언 */}
          <div className="group">
            <div 
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-l-4 border-blue-500 transform hover:scale-[1.01]"
              onClick={() => toggleFAQ(0)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">사용 비용은 얼마인가요?</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out 
                  ${openFAQs.includes(0) ? 'bg-blue-600 text-white transform rotate-180' : 'bg-blue-100 text-blue-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQs.includes(0) ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className={`text-gray-600 lg:text-lg transform transition-all duration-300 ease-in-out ${openFAQs.includes(0) ? 'translate-y-0 opacity-100' : 'translate-y-[-8px] opacity-0'}`}>
                  기본 기능은 무료로 이용 가능합니다. 고급 기능은 추후 구독 서비스로 제공될 예정입니다. 현재 모든 핵심 기능을 무료로 이용하실 수 있습니다.
                </div>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div 
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-l-4 border-indigo-500 transform hover:scale-[1.01]"
              onClick={() => toggleFAQ(1)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">얼마나 많은 단어를 저장할 수 있나요?</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out 
                  ${openFAQs.includes(1) ? 'bg-indigo-600 text-white transform rotate-180' : 'bg-indigo-100 text-indigo-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQs.includes(1) ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className={`text-gray-600 lg:text-lg transform transition-all duration-300 ease-in-out ${openFAQs.includes(1) ? 'translate-y-0 opacity-100' : 'translate-y-[-8px] opacity-0'}`}>
                  무제한으로 단어를 저장할 수 있습니다. 필요한 만큼 단어장을 활용하세요. 저장 용량에 제한이 없어 학습 효율을 극대화할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div 
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-l-4 border-purple-500 transform hover:scale-[1.01]"
              onClick={() => toggleFAQ(2)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">오프라인에서도 사용 가능한가요?</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out 
                  ${openFAQs.includes(2) ? 'bg-purple-600 text-white transform rotate-180' : 'bg-purple-100 text-purple-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQs.includes(2) ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className={`text-gray-600 lg:text-lg transform transition-all duration-300 ease-in-out ${openFAQs.includes(2) ? 'translate-y-0 opacity-100' : 'translate-y-[-8px] opacity-0'}`}>
                  현재는 온라인 서비스만 제공되고 있습니다. 오프라인 기능은 추후 업데이트 예정입니다. 개발 로드맵에 오프라인 모드가 포함되어 있으며, 빠른 시일 내에 제공할 계획입니다.
                </div>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div 
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-l-4 border-pink-500 transform hover:scale-[1.01]"
              onClick={() => toggleFAQ(3)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300">다른 기기에서도 동기화되나요?</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out 
                  ${openFAQs.includes(3) ? 'bg-pink-600 text-white transform rotate-180' : 'bg-pink-100 text-pink-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQs.includes(3) ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className={`text-gray-600 lg:text-lg transform transition-all duration-300 ease-in-out ${openFAQs.includes(3) ? 'translate-y-0 opacity-100' : 'translate-y-[-8px] opacity-0'}`}>
                  네, 계정에 로그인하면 모든 기기에서 동일한 단어장에 접근할 수 있습니다. PC, 태블릿, 스마트폰 등 다양한 기기에서 끊김 없이 학습을 이어갈 수 있습니다.
                </div>
              </div>
            </div>
          </div>
          
          <div className="group">
            <div 
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer border-l-4 border-blue-500 transform hover:scale-[1.01]"
              onClick={() => toggleFAQ(4)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">AI 번역은 얼마나 정확한가요?</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out 
                  ${openFAQs.includes(4) ? 'bg-blue-600 text-white transform rotate-180' : 'bg-blue-100 text-blue-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQs.includes(4) ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className={`text-gray-600 lg:text-lg transform transition-all duration-300 ease-in-out ${openFAQs.includes(4) ? 'translate-y-0 opacity-100' : 'translate-y-[-8px] opacity-0'}`}>
                  Meta의 오픈소스 Llama를 활용한 번역 시스템은 최신 자연어 처리 기술을 적용하여 높은 정확도를 제공합니다. 전문적인 용어와 일상적인 표현 모두 자연스럽게 번역하도록 최적화되어 있습니다.
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <button 
              onClick={scrollToCTA} 
              className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg"
            >
              앱 다운로드하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 