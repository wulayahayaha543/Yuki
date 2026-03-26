import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '../lib/utils';

interface CoinDivinationProps {
  onStart: () => void;
  onComplete: () => void;
  disabled?: boolean;
}

export function CoinDivination({ onStart, onComplete, disabled }: CoinDivinationProps) {
  const [isTossing, setIsTossing] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!disabled) {
      setIsTossing(false);
      controls.set({ y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 });
    }
  }, [disabled, controls]);

  const handleToss = () => {
    if (disabled || isTossing) return;
    setIsTossing(true);
    onStart();

    // Fire and forget animations to prevent hanging
    controls.start((i) => ({
      y: [0, -300, 0],
      rotateX: [0, 1080 + Math.random() * 360, 0],
      rotateY: [0, 720 + Math.random() * 360, 0],
      rotateZ: [0, Math.random() * 360, 0],
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.5, 1],
        delay: i * 0.1,
      }
    })).then(() => {
      controls.start((i) => ({
        y: [0, -40, 0, -15, 0],
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: i * 0.05,
        }
      }));
    });

    // Independent timeout to guarantee state progression
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <div className="relative flex flex-col items-center justify-end h-full z-10 pb-24 md:pb-32">
      <div className="flex gap-6 md:gap-8 mb-8 perspective-1000">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            animate={controls}
            className="w-20 h-20 rounded-full bg-amber-600/90 border-4 border-amber-800 shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={!isTossing && !disabled ? { scale: 1.05, y: -5 } : {}}
            whileTap={!isTossing && !disabled ? { scale: 0.95 } : {}}
            onClick={handleToss}
          >
            {/* Inner square hole of ancient Chinese coin */}
            <div className="w-6 h-6 border-2 border-amber-900 bg-neutral-900/50 transform-gpu" />
          </motion.div>
        ))}
      </div>
      
      <motion.p 
        className={cn(
          "text-amber-100/80 tracking-widest text-sm font-medium transition-opacity duration-500 whitespace-nowrap",
          isTossing || disabled ? "opacity-0" : "opacity-100"
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isTossing || disabled ? 0 : 1, y: 0 }}
      >
        点击铜钱，诚心求问
      </motion.p>
    </div>
  );
}
