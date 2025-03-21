"use client";
import React, { useState, useRef, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

// 폭죽 파티클을 위한 인터페이스
interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  opacity: number;
  angle: number;
  scale: number;
}

// 폭죽 컴포넌트
const Firework: React.FC<{ 
  x: number; 
  y: number; 
  color: string;
  particles?: number;
  onComplete?: () => void; 
}> = ({ x, y, color, particles = 30, onComplete }) => {
  const [particlesArray, setParticlesArray] = useState<FireworkParticle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());
  
  // 랜덤 색상 생성
  const getRandomFireworkColor = () => {
    const colors = [
      "#FF5252", // 빨강
      "#FF7B25", // 주황
      "#FFEB3B", // 노랑
      "#66BB6A", // 초록
      "#29B6F6", // 파랑
      "#7C4DFF", // 보라
      "#EC407A", // 분홍
      "#3D5AFE", // 인디고
      "#B388FF", // 라벤더
      "#00BCD4", // 청록
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    console.log("폭죽 생성됨:", { x, y });
    
    // 파티클 초기화
    const newParticles: FireworkParticle[] = [];
    for (let i = 0; i < particles; i++) {
      const angle = (Math.PI * 2 / particles) * i;
      const speed = 6 + Math.random() * 8; // 속도 대폭 증가
      
      newParticles.push({
        id: i,
        x,
        y,
        size: 6 + Math.random() * 10, // 파티클 크기 조정 (10~25 → 6~16)
        color: color || getRandomFireworkColor(),
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        opacity: 1,
        angle,
        scale: 1.2 // 초기 스케일 조정 (1.5 → 1.2)
      });
    }
    setParticlesArray(newParticles);
    startTimeRef.current = Date.now();

    // 애니메이션 시작
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const duration = 2000; // 애니메이션 지속 시간 약간 감소
      
      if (elapsed > duration) {
        if (onComplete) onComplete();
        return;
      }
      
      setParticlesArray(prev => prev.map(particle => {
        // 중력 및 감속 효과 (속도 증가를 위해 감속 계수 조정)
        const newVelX = particle.velocity.x * 0.97; // 수평 감속 감소
        const newVelY = particle.velocity.y * 0.97 + 0.08; // 중력 효과 증가
        
        return {
          ...particle,
          x: particle.x + newVelX,
          y: particle.y + newVelY,
          opacity: 1 - (elapsed / duration),
          scale: particle.scale * 0.995 // 스케일 감소 속도 조정
        };
      }));
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [x, y, color, particles, onComplete]);
  
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {particlesArray.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `scale(${particle.scale})`,
            zIndex: 1 // z-index를 낮게 설정하여 글씨 뒤에서 터지도록 함
          }}
        />
      ))}
    </div>
  );
};

// 폭죽 컨테이너 컴포넌트
const FireworkContainer: React.FC<{ active: boolean }> = ({ active }) => {
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    // 초기 폭죽 설정
    const initialFireworks: { id: number; x: number; y: number; color: string }[] = [];
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    for (let i = 0; i < 5; i++) {
      initialFireworks.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height * 0.7, // 상단 70% 영역에 집중
        color: ""
      });
    }
    
    setFireworks(initialFireworks);
    
    // 시간 간격을 두고 추가 폭죽 생성
    const interval = setInterval(() => {
      setFireworks(prev => {
        if (prev.length < 15) { // 최대 15개 제한
          return [
            ...prev, 
            {
              id: Date.now(),
              x: Math.random() * width,
              y: Math.random() * height * 0.7,
              color: ""
            }
          ];
        }
        return prev;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, [active]);
  
  const removeFirework = (id: number) => {
    setFireworks(prev => prev.filter(fw => fw.id !== id));
  };
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {fireworks.map(fw => (
        <Firework 
          key={fw.id} 
          x={fw.x} 
          y={fw.y} 
          color={fw.color}
          onComplete={() => removeFirework(fw.id)}
        />
      ))}
    </div>
  );
};

export default function HeroScrollSection() {
  const [imageError, setImageError] = useState(false);
  const titleRef = useRef(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const todaysSectionRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isTodaysSectionInView = useInView(todaysSectionRef, {
    once: false,
    amount: 0,
    margin: "-100px 0px -100px 0px"
  });
  const controls = useAnimation();
  const [fireworksTriggered, setFireworksTriggered] = useState(false);
  const [fireworkPositions, setFireworkPositions] = useState<{ x: number; y: number }[]>([]);
  const [mobileOrder, setMobileOrder] = useState<{
    ai: number;
    today: number;
    vocabulary: number;
  }>({ ai: 1, today: 2, vocabulary: 0 });
  const [isMobile, setIsMobile] = React.useState(true);

  // 스크롤 감지 추가
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (window.scrollY > 10) { // 아주 작은 스크롤에도 반응
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 모바일용 순서 설정
    // AI 번역기능은 1, 오늘의 학습은 2로 고정
    setMobileOrder({
      ai: 1, // AI 번역기능 항상 첫 번째
      today: 2, // 오늘의 학습 항상 두 번째
      vocabulary: 0 // 모바일에서는 표시하지 않음
    });
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 애니메이션 딜레이 계산 함수
  const getAnimationDelay = (section: 'ai' | 'today' | 'vocabulary', isMobile: boolean) => {
    if (isMobile) {
      // 모바일에서는 order 값이 작은 순서대로 애니메이션
      const orderValue = mobileOrder[section];
      return orderValue === 0 ? 0 : 0.15 + (orderValue - 1) * 0.3;
    }
    // 데스크톱에서는 인덱스 순서대로
    const desktopOrder = { ai: 3, today: 1, vocabulary: 2 };
    return 0.15 + (desktopOrder[section] - 1) * 0.3;
  };

  // 화면에 들어올 때마다 애니메이션 재실행
  useEffect(() => {
    if (isInView) {
      // 애니메이션 시작
      controls.start("visible");
      
      // 텍스트 애니메이션과 거의 동시에 폭죽 발생
      setTimeout(() => {
        if (spanRef.current) {
          const rect = spanRef.current.getBoundingClientRect();
          
          // 창 크기에 따른 상대적 위치 계산
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          // 오른쪽과 왼쪽에 폭죽 위치 설정
          const rightPosition = {
            x: rect.right - 120, // 단어 뒷부분에서 더 왼쪽으로
            y: rect.top - (rect.height * 0.2) // 단어보다 더 위에서 터지도록
          };
          
          const leftPosition = {
            x: rect.left + 50, // 단어 앞부분에서 약간 오른쪽으로
            y: rect.top - (rect.height * 0.15) // 오른쪽 폭죽보다 살짝 낮게
          };
          
          console.log("폭죽 위치들:", { rightPosition, leftPosition, rect });
          
          setFireworkPositions([rightPosition, leftPosition]);
          setFireworksTriggered(true);
        }
      }, 50); // 애니메이션 지연 시간을 50ms로 최소화
    } else {
      // 뷰에서 벗어나면 애니메이션 리셋
      controls.start("hidden");
      setFireworksTriggered(false); // 뷰에서 벗어났을 때 폭죽 상태 리셋
    }
  }, [isInView, controls]);

  // 전체 텍스트 애니메이션을 위한 variants
  const titleVariants = {
    hidden: { 
      scale: 0.5, 
      opacity: 0, 
      y: 70,
      rotateX: 25 
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 7,
        stiffness: 70,
        duration: 1.4
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden pb-10 relative">
      {/* 폭죽 애니메이션 - 양쪽에서 동시에 등장 */}
      {fireworksTriggered && fireworkPositions.map((position, index) => (
        <div key={index} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <Firework 
            x={position.x} 
            y={position.y} 
            color=""
            particles={90} // 파티클 개수
          />
        </div>
      ))}
      
      <ContainerScroll
        titleComponent={
          <>
            <div ref={titleRef} className="relative">
              <motion.div
                className="text-center"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleVariants}
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                <h1 className="text-7xl md:text-8xl font-extrabold text-gray-800 drop-shadow-xl mb-12 tracking-tight leading-tight">
                  효율적인 영어 학습을 위한 <br />
                  <span 
                    ref={spanRef}
                    className="text-7xl md:text-[10rem] font-black mt-4 md:mt-6 leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 inline-block drop-shadow-2xl"
                  >
                    맞춤형 단어장
                  </span>
                </h1>
              </motion.div>
            </div>
          </>
        }
      >
        <div className="relative h-full w-full">
          {!imageError ? (
            <Image
              src="/vocab-app-dashboard.jpg"
              alt="영어 단어장 앱 대시보드"
              fill
              className="rounded-2xl object-cover object-top sm:object-left-top"
              style={{
                objectPosition: 'center top',
                objectFit: 'cover'
              }}
              priority
              onError={() => setImageError(true)}
            />
          ) : null}
          
          {/* 항상 렌더링되는 대체 콘텐츠 - 이미지가 로드되지 않으면 전체 화면을 차지 */}
          <div className={`${!imageError ? 'absolute inset-0 opacity-0' : ''} flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl h-full`}>
            <div className="w-full max-w-4xl p-8">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">E</div>
                  <span className="text-xl font-bold text-gray-800">영어 단어장</span>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100"></div>
                  <div className="h-8 w-8 rounded-full bg-indigo-100"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 오늘의 학습 섹션 */}
                {(!isMobile || mobileOrder.today > 0) && (
                  <motion.div 
                    ref={todaysSectionRef}
                    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${isMobile ? `order-${mobileOrder.today}` : 'md:order-1'}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isMobile ? (isTodaysSectionInView || hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }) : { opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: isMobile ? 0 : getAnimationDelay('today', false),
                      ease: "easeOut"
                    }}
                  >
                    <motion.h3 
                      className="font-medium text-gray-800 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isMobile ? (isTodaysSectionInView || hasScrolled ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }) : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: isMobile ? 0.1 : getAnimationDelay('today', false) + 0.1 }}
                    >오늘의 학습</motion.h3>
                    <motion.div 
                      className="h-32 bg-gray-50 rounded-lg mb-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isMobile ? (isTodaysSectionInView || hasScrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }) : { opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: isMobile ? 0.2 : getAnimationDelay('today', false) + 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isMobile ? (isTodaysSectionInView || hasScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }) : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: isMobile ? 0.3 : getAnimationDelay('today', false) + 0.3 }}
                    >
                      <span className="text-sm text-gray-500">진행률: 65%</span>
                      <div className="h-2 w-32 bg-gray-100 rounded-full">
                        <motion.div 
                          className="h-2 bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={isMobile ? (isTodaysSectionInView || hasScrolled ? { width: "65%" } : { width: 0 }) : { width: "65%" }}
                          transition={{ duration: 0.5, delay: isMobile ? 0.4 : getAnimationDelay('today', false) + 0.4 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* 내 단어장 섹션 */}
                {(!isMobile || mobileOrder.vocabulary > 0) && (
                  <motion.div 
                    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${isMobile ? `order-${mobileOrder.vocabulary}` : 'md:order-2'}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: getAnimationDelay('vocabulary', isMobile),
                      ease: "easeOut"
                    }}
                  >
                    <motion.h3 
                      className="font-medium text-gray-800 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: getAnimationDelay('vocabulary', isMobile) + 0.1 }}
                    >내 단어장</motion.h3>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: getAnimationDelay('vocabulary', isMobile) + 0.2 }}
                      >
                        <span>serendipity</span>
                        <span className="text-sm text-gray-500">우연한 발견</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: getAnimationDelay('vocabulary', isMobile) + 0.3 }}
                      >
                        <span>ephemeral</span>
                        <span className="text-sm text-gray-500">덧없는</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: getAnimationDelay('vocabulary', isMobile) + 0.4 }}
                      >
                        <span>quintessential</span>
                        <span className="text-sm text-gray-500">전형적인</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* AI 번역 기능 섹션 */}
                <motion.div 
                  className={`md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100 ${isMobile ? `order-${mobileOrder.ai}` : 'md:order-3'}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: getAnimationDelay('ai', isMobile),
                    ease: "easeOut"
                  }}
                >
                  <motion.h3 
                    className="font-medium text-gray-800 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: getAnimationDelay('ai', isMobile) + 0.1 }}
                  >AI 번역 기능</motion.h3>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <motion.div 
                      className="w-full md:flex-1 bg-white p-4 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: getAnimationDelay('ai', isMobile) + 0.2 }}
                    >
                      <p className="text-gray-800 mb-2">The quintessential example of serendipity is...</p>
                      <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                    </motion.div>
                    <motion.div 
                      className="flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: getAnimationDelay('ai', isMobile) + 0.3 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="w-full md:flex-1 bg-white p-4 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: getAnimationDelay('ai', isMobile) + 0.4 }}
                    >
                      <p className="text-gray-800 mb-2">우연한 발견의 전형적인 예는...</p>
                      <div className="h-6 w-24 bg-gray-100 rounded-full"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
} 