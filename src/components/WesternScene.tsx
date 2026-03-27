import { motion, AnimatePresence } from 'motion/react';
import { DivinationState } from '../types';
import { CanvasParticles } from './CanvasParticles';
import { TarotDivination } from './TarotDivination';

interface WesternSceneProps {
  key?: string;
  divinationState: DivinationState;
  onStart: () => void;
  onComplete: () => void;
}

export function WesternScene({ divinationState, onStart, onComplete }: WesternSceneProps) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-indigo-950 via-slate-900 to-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Floating Theme Image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[280px] h-[280px] md:w-[550px] md:h-[550px] opacity-70 -translate-y-12 md:-translate-y-16"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
          <img
            src="https://i.postimg.cc/nVm3Yhqh/image_0.png"
            alt="Western Divination Theme"
            className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
      
      <CanvasParticles mode="western" />

      {/* Main Interaction Area */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <TarotDivination 
          onStart={onStart}
          onComplete={onComplete} 
          disabled={divinationState !== 'initial'} 
        />

        {/* Processing Indicator */}
        <AnimatePresence>
          {divinationState === 'processing' && (
            <motion.div 
              className="absolute bottom-10 text-indigo-200/80 tracking-widest text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="flex items-center gap-3">
                <motion.span 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-indigo-200/30 border-t-indigo-200 rounded-full inline-block"
                />
                小狐狸正在倾听星辰的指引...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dark overlay for result state */}
      <motion.div
        className="absolute inset-0 bg-black/60 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: divinationState === 'result' ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}
