import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '../lib/utils';

interface TarotDivinationProps {
  onStart: () => void;
  onComplete: () => void;
  disabled?: boolean;
}

export function TarotDivination({ onStart, onComplete, disabled }: TarotDivinationProps) {
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFanned, setIsFanned] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!disabled) {
      setIsShuffling(false);
      setIsFanned(false);
      setIsCardSelected(false);
      controls.set({ x: 0, y: 0, rotateZ: 0, scale: 1, opacity: 1, zIndex: 0 });
    }
  }, [disabled, controls]);

  const handleShuffleAndFan = () => {
    if (disabled || isShuffling || isFanned) return;
    setIsShuffling(true);
    onStart();

    // Shuffle animation (fake it by moving cards left/right and back)
    controls.start((i) => ({
      x: [0, i % 2 === 0 ? -100 : 100, 0],
      y: [0, -20, 0],
      rotateZ: [0, (Math.random() - 0.5) * 20, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: 2,
        delay: i * 0.05,
      }
    }));

    // Independent timeout for shuffle completion
    setTimeout(() => {
      setIsShuffling(false);
      setIsFanned(true);

      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 180 : 300;
      const angleStep = isMobile ? 20 : 15;

      controls.start((i) => {
        const total = 5;
        const index = i - Math.floor(total / 2);
        const angle = index * angleStep;
        const x = Math.sin(angle * Math.PI / 180) * radius;
        const y = radius - Math.cos(angle * Math.PI / 180) * radius;

        return {
          x: x,
          y: -y,
          rotateZ: angle,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
            delay: i * 0.08,
          }
        };
      });
    }, 2600);
  };

  const handleCardClick = (i: number) => {
    // 移除 disabled 检查，因为在 interacting 状态下 disabled 为 true
    if (!isFanned || isCardSelected) return;
    setIsCardSelected(true);
    
    const isMobile = window.innerWidth < 768;

    // Select card animation
    controls.start((index) => {
      if (index === i) {
        return {
          x: 0,
          y: isMobile ? -160 : -200,
          scale: isMobile ? 1.4 : 1.2,
          rotateZ: 0,
          zIndex: 50,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        };
      } else {
        return {
          opacity: 0,
          transition: { duration: 0.4, ease: "easeOut" }
        };
      }
    });

    // Independent timeout to guarantee state progression
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-end h-full z-10 perspective-1000 pb-16 md:pb-32">
      <div className="relative w-20 h-32 md:w-32 md:h-48 cursor-pointer mb-8" onClick={!isFanned ? handleShuffleAndFan : undefined}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            custom={i}
            animate={controls}
            initial={{ x: 0, y: 0, rotateZ: 0 }}
            className={cn(
              "absolute inset-0 rounded-xl bg-indigo-900 border-2 border-indigo-400 shadow-xl overflow-hidden transform-gpu",
              "flex flex-col items-center justify-center",
              isFanned && !isCardSelected && "hover:shadow-[0_0_30px_rgba(129,140,248,0.6)]"
            )}
            style={{ 
              transformOrigin: 'bottom center',
              zIndex: 10 - i 
            }}
            whileHover={isFanned && !isCardSelected ? { y: -20, scale: 1.05 } : {}}
            onClick={(e) => {
              if (isFanned) {
                e.stopPropagation();
                handleCardClick(i);
              }
            }}
          >
            {/* Card Back Design */}
            <div className="absolute inset-1 border border-indigo-500/50 rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 rotate-45 border border-indigo-400/30 flex items-center justify-center">
                <div className="w-8 h-8 border border-indigo-400/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p 
        className={cn(
          "absolute bottom-16 text-indigo-200/80 tracking-widest text-sm font-medium transition-opacity duration-500 whitespace-nowrap",
          isShuffling || isFanned || disabled ? "opacity-0" : "opacity-100"
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isShuffling || isFanned || disabled ? 0 : 1, y: 0 }}
      >
        点击牌堆，洗牌抽卡
      </motion.p>
    </div>
  );
}
