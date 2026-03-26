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
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      <motion.div
        className={cn(
          "relative w-full max-w-md p-8 md:p-12 rounded-3xl overflow-hidden",
          "backdrop-blur-xl border flex flex-col items-center text-center shadow-2xl",
          isChinese 
            ? "bg-amber-950/40 border-amber-800/50 text-amber-50" 
            : "bg-indigo-950/40 border-indigo-800/50 text-indigo-50"
        )}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
        <div className={cn(
          "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20",
          isChinese ? "bg-amber-500" : "bg-indigo-500"
        )} />
        <div className={cn(
          "absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20",
          isChinese ? "bg-rose-500" : "bg-purple-500"
        )} />

        <motion.h2 
          className={cn(
            "text-2xl md:text-3xl font-serif mb-6 tracking-wide",
            isChinese ? "text-amber-200" : "text-indigo-200"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {result.title}
        </motion.h2>

        <motion.div 
          className="w-12 h-px bg-current opacity-20 mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        <motion.p 
          className="text-base md:text-lg leading-relaxed opacity-90 font-light mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {result.content}
        </motion.p>

        <motion.button
          onClick={onReset}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all",
            "border hover:bg-white/10 active:scale-95",
            isChinese 
              ? "border-amber-700/50 text-amber-200 hover:border-amber-500/50" 
              : "border-indigo-700/50 text-indigo-200 hover:border-indigo-500/50"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>重新占卜</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
