import { motion } from 'motion/react';
import { DivinationMode } from '../types';
import { cn } from '../lib/utils';
import { Moon, Sun } from 'lucide-react';

interface ModeToggleProps {
  currentMode: DivinationMode;
  onChange: (mode: DivinationMode) => void;
  disabled?: boolean;
}

export function ModeToggle({ currentMode, onChange, disabled }: ModeToggleProps) {
  return (
    <div className="relative flex items-center p-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
      <button
        onClick={() => onChange('chinese')}
        disabled={disabled}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors z-10",
          currentMode === 'chinese' ? "text-amber-900" : "text-white/70 hover:text-white",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Sun className="w-4 h-4" />
        <span>铜钱卦</span>
      </button>

      <button
        onClick={() => onChange('western')}
        disabled={disabled}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors z-10",
          currentMode === 'western' ? "text-indigo-900" : "text-white/70 hover:text-white",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Moon className="w-4 h-4" />
        <span>塔罗牌</span>
      </button>

      {/* Active Pill Background */}
      <motion.div
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full z-0",
          currentMode === 'chinese' ? "bg-amber-100" : "bg-indigo-100"
        )}
        initial={false}
        animate={{
          x: currentMode === 'chinese' ? 4 : '100%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
