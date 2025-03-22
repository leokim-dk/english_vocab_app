import React from 'react';

export default function UserExperience() {
  return (
    <section className="py-28 lg:py-36 bg-gradient-to-br from-blue-50 via-indigo-50 to-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
          <div className="w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4">
          <div className="w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1 rounded-full">입증된 효과</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            사용자들의 놀라운 학습 결과
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            수천 명의 사용자들이 경험한 실제 학습 효율성 향상 사례를 확인하세요.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {/* 통계 1 */}
          <div className="relative bg-white p-8 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-indigo-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-700">효율성 향상</h3>
                  </div>
                </div>
                
                <div className="text-4xl font-bold flex items-baseline">
                  <span className="inline-block transform transition-transform duration-700 group-hover:translate-y-[-0.5rem] group-hover:translate-x-[0.5rem] text-blue-600">85</span>
                  <span className="inline-block text-blue-600 transform transition-transform duration-700 group-hover:translate-y-[-0.5rem] group-hover:translate-x-[0.5rem]">%</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600">사용자들의 영어 학습 효율성이 측정 가능하게 향상되었습니다.</p>
            </div>
          </div>
          
          {/* 통계 2 */}
          <div className="relative bg-white p-8 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-700">암기 속도</h3>
                  </div>
                </div>
                
                <div className="text-4xl font-bold flex items-baseline">
                  <span className="inline-block transform transition-transform duration-700 group-hover:translate-y-[-0.5rem] group-hover:translate-x-[0.5rem] text-indigo-600">2</span>
                  <span className="inline-block text-indigo-600 transform transition-transform duration-700 group-hover:translate-y-[-0.5rem] group-hover:translate-x-[0.5rem]">배</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600">일반 학습 방법보다 단어 암기 속도가 두 배 빨라집니다.</p>
            </div>
          </div>
          
          {/* 통계 3 */}
          <div className="relative bg-white p-8 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-pink-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-700">학습량</h3>
                  </div>
                </div>
                
                <div className="text-4xl font-bold flex items-baseline">
                  <span className="inline-block transform transition-transform duration-700 group-hover:translate-y-[-0.5rem] group-hover:translate-x-[0.5rem] text-purple-600">1000</span>
                  <span className="inline-block text-purple-600 transform transition-transform duration-700 group-hover:translate-y-[-0.5rem] group-hover:translate-x-[0.5rem]">+</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600">한 달 안에 학습 및 기억할 수 있는 평균 단어 수입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 