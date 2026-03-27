import { motion } from 'motion/react';
import { DivinationResult, DivinationMode } from '../types';
import { cn } from '../lib/utils';
import { RefreshCw } from 'lucide-react';

interface ResultPanelProps {
  result: DivinationResult;
  onReset: () => void;
  mode: DivinationMode;
}

export function ResultPanel({ result, onReset, mode }: ResultPanelProps) {
  const isChinese = mode === 'chinese';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        className={cn(
          "relative w-full max-w-2xl p-6 md:p-12 rounded-[2rem] overflow-hidden",
          "backdrop-blur-xl border-t border-l flex flex-col items-center text-center shadow-[0_30px_100px_rgba(0,0,0,0.6)]",
          isChinese 
            ? "bg-amber-950/20 border-amber-500/10 text-amber-50" 
            : "bg-indigo-950/20 border-indigo-500/10 text-indigo-50"
        )}
        initial={{ opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, scale: 1, backdropFilter: "blur(24px)" }}
        exit={{ opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative background glow */}
        <div className={cn(
          "absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[120px] opacity-30 animate-pulse",
          isChinese ? "bg-amber-600" : "bg-indigo-600"
        )} />
        
        <motion.h2 
          className={cn(
            "text-3xl md:text-5xl mb-8 tracking-wider leading-tight",
            isChinese ? "font-chinese text-amber-200" : "font-serif italic text-indigo-200"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {result.title}
        </motion.h2>

        <motion.div 
          className="w-24 h-px bg-current opacity-30 mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          <p className={cn(
            "text-base md:text-xl leading-relaxed font-light",
            isChinese ? "tracking-widest" : "tracking-wide"
          )}>
            {result.content}
          </p>
        </motion.div>

        <motion.button
          onClick={onReset}
          className={cn(
            "mt-12 flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all",
            "border backdrop-blur-md hover:scale-105 active:scale-95 group",
            isChinese 
              ? "border-amber-500/30 text-amber-200 hover:bg-amber-500/10" 
              : "border-indigo-500/30 text-indigo-200 hover:bg-indigo-500/10"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
          <span className="tracking-[0.2em]">重寻天机</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
