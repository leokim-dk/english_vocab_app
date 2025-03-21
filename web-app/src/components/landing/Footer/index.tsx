import React from 'react';

export function Footer() {
  return (
    <footer className="py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-tl from-blue-500 to-indigo-600 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute left-0 top-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 로고 및 간략한 설명 */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <svg className="h-10 w-10 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">영단어 학습기</span>
            </div>
            <p className="text-gray-400 mb-6">
              AI 기반 맞춤형 영어 단어 학습 서비스로, 효율적인 어휘력 향상을 돕습니다. 똑똑한 학습 방법으로 영어 실력을 키워보세요.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* 링크 섹션 1 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white">메뉴</h3>
            <ul className="space-y-4">
              <li><a href="#features" className="hover:text-white hover:underline transition-colors">주요 기능</a></li>
              <li><a href="#how-it-works" className="hover:text-white hover:underline transition-colors">사용 방법</a></li>
              <li><a href="#user-experience" className="hover:text-white hover:underline transition-colors">사용자 경험</a></li>
              <li><a href="#faq" className="hover:text-white hover:underline transition-colors">자주 묻는 질문</a></li>
            </ul>
          </div>
          
          {/* 링크 섹션 2 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white">리소스</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white hover:underline transition-colors">이용 가이드</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">블로그</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">API 문서</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">개발자 정보</a></li>
            </ul>
          </div>
          
          {/* 연락처 */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white">문의하기</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@vocabapp.com</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>서울특별시 강남구 테헤란로 123</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>02-123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 영단어 학습기. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm hover:text-white hover:underline transition-colors">개인정보 처리방침</a>
              <a href="#" className="text-sm hover:text-white hover:underline transition-colors">이용약관</a>
              <a href="#" className="text-sm hover:text-white hover:underline transition-colors">쿠키 정책</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 