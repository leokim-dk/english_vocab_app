import React, { useState, useEffect, useRef } from 'react';

export function HowItWorks() {
  // 스크롤 애니메이션 상태 관리
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const howItWorksRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  // 스탑포인트 배열 정의 (0%, 10%, 37%, 63%, 90%, 100%)
  const stopPoints = [0, 0.1, 0.37, 0.63, 0.9, 1];
  
  // 각 단계별 스탑포인트 매핑
  const stepStopPoints = [0.1, 0.37, 0.63, 0.9];

  // 초기 로드 시 scrollProgress 초기화
  useEffect(() => {
    setScrollProgress(0);
    
    // CSS 애니메이션 관련 스타일 추가
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes smoothMove {
        0%, 100% { transform: translate(-50%, -50%); }
        50% { transform: translate(-50%, -48%); }
      }
      
      .smooth-dot {
        animation: smoothMove 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 스크롤 애니메이션 관찰 설정
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.3
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepIndex = parseInt(entry.target.getAttribute('data-step-index') || '0');
          if (stepIndex >= 0 && stepIndex < 4) {
            // 해당 단계를 가시적으로 설정
            setVisibleSteps(prev => {
              const newVisibleSteps = [...prev];
              newVisibleSteps[stepIndex] = true;
              return newVisibleSteps;
            });
            
            // 현재 활성화된 단계 인덱스 업데이트
            setActiveStepIndex(stepIndex);
            
            // 가운데 점을 해당 단계의 스탑포인트로 즉시 이동
            setScrollProgress(stepStopPoints[stepIndex]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    // 각 단계 요소를 관찰
    stepRefs.current.forEach(step => {
      if (step) observer.observe(step);
    });

    return () => {
      stepRefs.current.forEach(step => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  // 스크롤 위치에 따른 연결선 이동 처리
  useEffect(() => {
    const section = howItWorksRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const updateSectionMetrics = () => {
      const rect = section.getBoundingClientRect();
      setSectionHeight(rect.height);
      setSectionTop(window.scrollY + rect.top);
    };

    updateSectionMetrics();
    window.addEventListener('resize', updateSectionMetrics);

    return () => {
      window.removeEventListener('resize', updateSectionMetrics);
    };
  }, []);

  // 연결선 색상 애니메이션은 스크롤 없이 활성 단계에 따라 처리
  useEffect(() => {
    if (activeStepIndex >= 0) {
      // 활성 단계에 따라 연결선 높이 설정
      setScrollProgress(stepStopPoints[activeStepIndex]);
    }
  }, [activeStepIndex]);

  return (
    <section 
      id="how-it-works" 
      className="py-12 md:py-28 lg:py-36 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      ref={howItWorksRef}
    >
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* SVG removed */}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4 md:mb-24">
          <span className="bg-indigo-100 text-indigo-800 text-base font-medium px-4 py-1 rounded-full">간편한 사용법</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            네 단계로 완성하는 영어 학습
          </h2>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            복잡한 설정 없이 단계별로 쉽게 따라 할 수 있습니다.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* 스크롤 애니메이션 연결선 */}
          <div 
            ref={lineRef}
            className="hidden md:block absolute h-full w-1 bg-transparent overflow-visible z-20"
            style={{
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            {/* 연결선 - 배경 */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-full"></div>
            
            {/* 연결선 - 색상 애니메이션 */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500 rounded-full"
              style={{ 
                height: `${scrollProgress * 100}%`,
                opacity: 0.9,
                boxShadow: '0 0 12px rgba(79, 70, 229, 0.4)',
                transition: 'height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                willChange: 'height',
              }}
            ></div>
            
            {/* 현재 위치 점 (스크롤에 따라 이동) */}
            <div 
              className="absolute w-12 h-12 bg-white rounded-full shadow-xl border-[3px] border-indigo-500 z-10 smooth-dot"
              style={{
                top: `${scrollProgress * 100}%`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                willChange: 'top, transform',
              }}
            >
              <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 smooth-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-8 md:space-y-24 lg:space-y-28 relative">
            {/* 단계 1 */}
            <div 
              ref={(el: HTMLDivElement | null): void => { stepRefs.current[0] = el; }}
              data-step-index="0"
              className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-20"
            >
              <div 
                className={`w-full md:w-1/2 relative flex justify-center h-96 order-1 transition-all duration-1000 ease-out ${
                  visibleSteps[0] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 translate-y-12 md:translate-y-0 md:-translate-x-24'
                }`}
              >
                <div className="absolute top-8 left-0 w-full h-full flex items-center justify-center">
                  <div className="w-80 h-64 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative">
                    <div className="absolute -left-8 md:-left-12 -top-8 md:-top-12 w-16 md:w-24 h-16 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-blue-400 z-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">1</div>
                    </div>
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <span className="text-lg font-medium text-gray-600">입력</span>
                      <span className="text-base bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">번역</span>
                    </div>
                    <div className="border border-gray-200 rounded p-3 mb-3 bg-gray-50">
                      <p className="text-lg">efficient</p>
                    </div>
                    <div className="border border-gray-200 rounded p-3 bg-blue-50">
                      <p className="text-lg text-gray-800">효율적인</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 단계 1 - 텍스트 */}
              <div 
                className={`w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:pl-16 order-2 transition-all duration-1000 ease-out ${
                  visibleSteps[0] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 -translate-y-12 md:translate-y-0 md:translate-x-24'
                }`}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">단어 입력 또는 번역</h3>
                <p className="text-gray-600 text-xl md:text-2xl">한국어나 영어로 단어나 문장을 입력하고 Meta의 Llama를 활용해 정확한 번역 결과를 확인합니다.</p>
              </div>
            </div>
            
            {/* 단계 2 */}
            <div 
              ref={(el: HTMLDivElement | null): void => { stepRefs.current[1] = el; }}
              data-step-index="1"
              className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-20"
            >
              <div 
                className={`w-full md:w-1/2 relative flex justify-center h-96 order-1 md:order-2 transition-all duration-1000 ease-out ${
                  visibleSteps[1] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 translate-y-12 md:translate-y-0 md:translate-x-24'
                }`}
              >
                <div className="absolute top-8 right-0 w-full h-full flex items-center justify-center">
                  <div className="w-80 h-64 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative">
                    <div className="absolute -right-8 md:-right-12 -top-8 md:-top-12 w-16 md:w-24 h-16 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-indigo-400 z-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">2</div>
                    </div>
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <span className="text-lg font-medium text-gray-600">단어장</span>
                      <button className="text-base bg-green-100 text-green-800 px-2 py-0.5 rounded-full">저장 완료</button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
                        <span className="text-lg">vocabulary</span>
                        <span className="text-base">단어장</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
                        <span className="text-lg">efficient</span>
                        <span className="text-base">효율적인</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 단계 2 - 텍스트 */}
              <div 
                className={`w-full md:w-1/2 text-center md:text-right mt-6 md:mt-0 md:pr-16 order-2 md:order-1 transition-all duration-1000 ease-out ${
                  visibleSteps[1] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 -translate-y-12 md:translate-y-0 md:-translate-x-24'
                }`}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">단어장에 저장</h3>
                <p className="text-gray-600 text-xl md:text-2xl">번역된 단어를 내 단어장에 쉽게 저장하고 필요에 따라 카테고리나 태그를 추가할 수 있습니다.</p>
              </div>
            </div>
            
            {/* 단계 3 */}
            <div 
              ref={(el: HTMLDivElement | null): void => { stepRefs.current[2] = el; }}
              data-step-index="2"
              className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-20"
            >
              <div 
                className={`w-full md:w-1/2 relative flex justify-center h-96 order-1 transition-all duration-1000 ease-out ${
                  visibleSteps[2] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 translate-y-12 md:translate-y-0 md:-translate-x-24'
                }`}
              >
                <div className="absolute top-8 left-0 w-full h-full flex items-center justify-center">
                  <div className="w-80 h-64 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative">
                    <div className="absolute -left-8 md:-left-12 -top-8 md:-top-12 w-16 md:w-24 h-16 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-purple-400 z-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">3</div>
                    </div>
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <span className="text-lg font-medium text-gray-600">학습 모드</span>
                      <span className="text-base bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">복습중</span>
                    </div>
                    <div className="p-4 bg-purple-50 rounded flex flex-col items-center justify-center h-32">
                      <p className="text-2xl font-medium text-center">efficient</p>
                      <p className="text-lg text-gray-500 mt-3">뜻을 떠올려보세요...</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 단계 3 - 텍스트 */}
              <div 
                className={`w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:pl-16 order-2 transition-all duration-1000 ease-out ${
                  visibleSteps[2] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 -translate-y-12 md:translate-y-0 md:translate-x-24'
                }`}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">정기적 학습</h3>
                <p className="text-gray-600 text-xl md:text-2xl">저장된 단어를 정기적으로 복습하여 기억에 정착시키고 장기 기억으로 전환합니다.</p>
              </div>
            </div>
            
            {/* 단계 4 */}
            <div 
              ref={(el: HTMLDivElement | null): void => { stepRefs.current[3] = el; }}
              data-step-index="3"
              className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-20"
            >
              <div 
                className={`w-full md:w-1/2 relative flex justify-center h-96 order-1 md:order-2 transition-all duration-1000 ease-out ${
                  visibleSteps[3] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 translate-y-12 md:translate-y-0 md:translate-x-24'
                }`}
              >
                <div className="absolute top-8 right-0 w-full h-full flex items-center justify-center">
                  <div className="w-80 h-64 bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 relative">
                    <div className="absolute -right-8 md:-right-12 -top-8 md:-top-12 w-16 md:w-24 h-16 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-pink-400 z-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">4</div>
                    </div>
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <span className="text-lg font-medium text-gray-600">학습 분석</span>
                      <span className="text-base bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">주간 보고서</span>
                    </div>
                    <div className="flex justify-around items-end h-32 p-3 bg-gray-50 rounded">
                      <div className="w-8 bg-gradient-to-t from-pink-500 to-purple-400 rounded-t h-1/3"></div>
                      <div className="w-8 bg-gradient-to-t from-pink-500 to-purple-400 rounded-t h-1/2"></div>
                      <div className="w-8 bg-gradient-to-t from-pink-500 to-purple-400 rounded-t h-3/4"></div>
                      <div className="w-8 bg-gradient-to-t from-pink-500 to-purple-400 rounded-t h-2/3"></div>
                      <div className="w-8 bg-gradient-to-t from-pink-500 to-purple-400 rounded-t h-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 단계 4 - 텍스트 */}
              <div 
                className={`w-full md:w-1/2 text-center md:text-right mt-6 md:mt-0 md:pr-16 order-2 md:order-1 transition-all duration-1000 ease-out ${
                  visibleSteps[3] 
                    ? 'opacity-100 translate-y-0 translate-x-0 md:translate-y-0 md:translate-x-0' 
                    : 'opacity-0 -translate-y-12 md:translate-y-0 md:-translate-x-24'
                }`}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">진행 상황 확인</h3>
                <p className="text-gray-600 text-xl md:text-2xl">학습 진행 상황을 시각적 대시보드로 확인하고 분석하여 지속적인 학습 능률을 높입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes smooth-pulse {
          0% {
            opacity: 0.7;
            transform: scale(0.96);
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.02);
            box-shadow: 0 0 25px rgba(79, 70, 229, 0.8);
          }
          100% {
            opacity: 0.7;
            transform: scale(0.96);
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
          }
        }
        
        .smooth-pulse {
          animation: smooth-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
} 