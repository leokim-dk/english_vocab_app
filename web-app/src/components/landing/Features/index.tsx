import React from 'react';

export function Features() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-50 rounded-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-indigo-50 rounded-full opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full">강력한 기능</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            학습 효율을 높이는 주요 기능
          </h2>
          <p className="mt-6 text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            강력한 AI 번역부터 개인화된 학습 분석까지, 영어 학습을 위한 모든 기능을 제공합니다.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* AI 기반 번역 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-8">
              {/* Meta 로고 - 흰색 Facebook 로고 */}
              <svg className="w-10 h-10" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,19.5c0-4.6,2.3-9.4,5-9.4c1.5,0,2.7,0.9,4.6,3.6c-1.8,2.8-2.9,4.5-2.9,4.5c-2.4,3.8-3.2,4.6-4.5,4.6  C5.9,22.9,5,21.7,5,19.5 M20.7,17.8L19,15c-0.4-0.7-0.9-1.4-1.3-2c1.5-2.3,2.7-3.5,4.2-3.5c3,0,5.4,4.5,5.4,10.1  c0,2.1-0.7,3.3-2.1,3.3S23.3,22,20.7,17.8 M16.4,11c-2.2-2.9-4.1-4-6.3-4C5.5,7,2,13.1,2,19.5c0,4,1.9,6.5,5.1,6.5  c2.3,0,3.9-1.1,6.9-6.3c0,0,1.2-2.2,2.1-3.7c0.3,0.5,0.6,1,0.9,1.6l1.4,2.4c2.7,4.6,4.2,6.1,6.9,6.1c3.1,0,4.8-2.6,4.8-6.7  C30,12.6,26.4,7,22.1,7C19.8,7,18,8.8,16.4,11" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-4">AI 기반 번역</h3>
            <p className="text-gray-600 lg:text-lg">Meta의 오픈소스 Llama로 자연스럽고 정확한 번역을 통해 실제 사용되는 표현을 학습할 수 있습니다.</p>
          </div>
          
          {/* 개인 단어장 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-8">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-4">개인 단어장</h3>
            <p className="text-gray-600 lg:text-lg">필요한 단어만 모아 자신만의 단어장을 만들고 효율적으로 학습할 수 있습니다.</p>
          </div>
          
          {/* 간편한 검토 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-8">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-4">간편한 검토</h3>
            <p className="text-gray-600 lg:text-lg">언제 어디서나 내 단어장에 접근하고 효과적인 방법으로 저장된 단어를 복습합니다.</p>
          </div>
          
          {/* 학습 분석 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white mb-8">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold mb-4">학습 분석</h3>
            <p className="text-gray-600 lg:text-lg">내 학습 패턴과 진행 상황을 시각화하여 더 효과적인 학습 계획을 세울 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 