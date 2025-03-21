"use client";
import React, { useRef, useMemo } from "react";
import { useScroll, useTransform, motion, MotionValue, AnimatePresence } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.95] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(
    scrollYProgress, 
    [0, 0.5],
    isMobile ? [0, -100] : [0, -200]
  );
  
  // 배경 요소들의 속성을 미리 계산하여 저장
  const circles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: `circle-${i}`,
      width: 100 + (i * 50),
      height: 100 + (i * 50),
      left: `${10 + (i * 15)}%`,
      top: `${5 + (i * 15)}%`,
      opacity: 0.18 + (i * 0.02),
      delay: i * 0.5,
      duration: 20 + i * 2,
      xMove: 30 + (i * 10),
      yMove: 20 + (i * 10),
      scale: 0.1 + (i * 0.05),
      color: i % 2 === 0 ? 'from-blue-400/25 to-indigo-500/25' : 'from-indigo-300/25 to-blue-600/25'
    }));
  }, []);
  
  const squares = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `square-${i}`,
      width: 60 + (i * 40),
      height: 60 + (i * 40),
      left: `${60 - (i * 10)}%`,
      top: `${10 + (i * 16)}%`,
      opacity: 0.2 + (i * 0.02),
      rotate: i * 45,
      delay: i * 0.7,
      duration: 25 + i * 3,
      xMove: 40 - (i * 5),
      yMove: 30 - (i * 3),
      rotateEnd: 360 + (i * 45),
      color: i % 2 === 0 ? 'bg-blue-500/20' : 'bg-indigo-500/20'
    }));
  }, []);
  
  const stars = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: `star-${i}`,
      size: 2 + (i % 4),
      left: `${(i * 100 / 30) % 100}%`,
      top: `${10 + ((i * 80 / 30) % 80)}%`,
      delay: (i % 5) * 0.5,
      duration: 1 + (i % 3)
    }));
  }, []);

  return (
    <div
      className="h-[70rem] md:h-[85rem] flex items-center justify-center relative p-2 md:p-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 고정된 그라데이션 배경 (motion.div에서 일반 div로 변경) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white opacity-60"
        />
        
        {/* Moving shapes - circles */}
        <div className="absolute inset-0">
          {circles.map((circle) => (
            <motion.div
              key={circle.id}
              className={`absolute rounded-full bg-gradient-to-br ${circle.color}`}
              style={{
                width: circle.width,
                height: circle.height,
                left: circle.left,
                top: circle.top,
                opacity: circle.opacity,
              }}
              animate={{
                x: [0, circle.xMove, 0],
                y: [0, circle.yMove, 0],
                scale: [1, 1 + circle.scale, 1],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: circle.delay,
              }}
            />
          ))}
        </div>
        
        {/* Moving shapes - squares */}
        <div className="absolute inset-0">
          {squares.map((square) => (
            <motion.div
              key={square.id}
              className={`absolute rounded-lg ${square.color}`}
              style={{
                width: square.width,
                height: square.height,
                left: square.left,
                top: square.top,
                opacity: square.opacity,
                rotate: `${square.rotate}deg`,
              }}
              animate={{
                x: [0, square.xMove, 0],
                y: [0, square.yMove, 0],
                rotate: [`${square.rotate}deg`, `${square.rotateEnd}deg`],
              }}
              transition={{
                duration: square.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: square.delay,
              }}
            />
          ))}
        </div>
        
        {/* Twinkling star effect */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-indigo-500"
              style={{
                width: star.size,
                height: star.size,
                left: star.left,
                top: star.top,
              }}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="py-10 md:py-40 w-full relative z-10"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [marginTop, setMarginTop] = React.useState(-28);
  const [aspectRatio, setAspectRatio] = React.useState('aspect-[0.7/1]');

  // 화면 크기에 따라 마진과 비율 계산
  const updateDimensions = React.useCallback((width: number) => {
    if (typeof window === 'undefined') return;
    
    // 모든 화면 크기에서 화면 비율에 따른 동적 마진 계산
    let marginScale = 0.4; // 모바일 비율은 그대로 유지
    let dynamicMargin;
    
    // 데스크톱 (768px 초과)
    if (width > 768) {
      marginScale = 0.08; // 데스크톱 비율 
      setAspectRatio('aspect-[0.7/1]');
    } 
    // 중형 모바일 (390px 초과 ~ 768px 이하)
    else if (width > 390) {
      marginScale = 0.4; // 중형 모바일 비율
      setAspectRatio('aspect-[0.58/1]');
    }
    // 소형 모바일 (390px 이하)
    else {
      marginScale = 0.4; // 소형 모바일 비율
      setAspectRatio('aspect-[0.58/1]');
    }
    
    // 화면 너비에 비례하여 마진 계산
    dynamicMargin = Math.round(width * marginScale);
    
    // 데스크톱에서는 최소 및 최대 마진 값 설정
    if (width > 768) {
      dynamicMargin = Math.max(70, Math.min(110, dynamicMargin));
    }
    // 중형 모바일에서는 최소 및 최대 마진 값 설정
    else if (width <= 768 && width > 390) {
      dynamicMargin = Math.max(180, Math.min(215, dynamicMargin));
    }
    // 소형 모바일에서는 최소 마진 값 설정
    else if (width <= 390) {
      dynamicMargin = Math.max(120, dynamicMargin);
    }
    
    // px 값으로 저장 (음수로 저장)
    setMarginTop(-dynamicMargin);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      updateDimensions(width);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 정리 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateDimensions]);

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        marginTop: `${marginTop}px`,
      }}
      className={`max-w-5xl mx-auto h-[48rem] md:h-[43.5rem] ${aspectRatio} w-full border-4 border-border p-2 md:p-6 bg-background rounded-[30px] shadow-2xl bg-white`}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-muted md:rounded-2xl md:p-4">
        <div style={{ paddingTop: '0px' }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}; 