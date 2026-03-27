import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DivinationMode, DivinationState, DivinationResult } from './types';
import { ModeToggle } from './components/ModeToggle';
import { ChineseScene } from './components/ChineseScene';
import { WesternScene } from './components/WesternScene';
import { ResultPanel } from './components/ResultPanel';
import { generateDivination } from './services/llm';
import { cn } from './lib/utils';

export default function App() {
  const [currentMode, setCurrentMode] = useState<DivinationMode>('chinese');
  const [divinationState, setDivinationState] = useState<DivinationState>('initial');
  const [result, setResult] = useState<DivinationResult | null>(null);

  const handleModeChange = (mode: DivinationMode) => {
    if (divinationState === 'interacting' || divinationState === 'processing') return;
    setCurrentMode(mode);
    setDivinationState('initial');
    setResult(null);
  };

  const handleStartInteraction = () => {
    setDivinationState('interacting');
  };

  const handleInteractionComplete = async () => {
    setDivinationState('processing');
    try {
      // 在这里调用 LLM 服务
      const res = await generateDivination(currentMode);
      setResult(res);
      setDivinationState('result');
    } catch (error) {
      console.error("Failed to generate divination:", error);
      // 如果出错，重置回初始状态或显示错误提示
      setDivinationState('initial');
    }
  };

  const handleReset = () => {
    setDivinationState('initial');
    setResult(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-900 text-neutral-100 font-sans selection:bg-amber-500/30">
      {/* Background Scenes with Crossfade */}
      <AnimatePresence mode="wait">
        {currentMode === 'chinese' ? (
          <ChineseScene
            key="chinese"
            divinationState={divinationState}
            onStart={handleStartInteraction}
            onComplete={handleInteractionComplete}
          />
        ) : (
          <WesternScene
            key="western"
            divinationState={divinationState}
            onStart={handleStartInteraction}
            onComplete={handleInteractionComplete}
          />
        )}
      </AnimatePresence>

      {/* Top Navigation / Mode Toggle */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto scale-110 md:scale-125">
          <ModeToggle currentMode={currentMode} onChange={handleModeChange} disabled={divinationState !== 'initial'} />
        </div>
      </div>

      {/* Result Panel Overlay */}
      <AnimatePresence>
        {divinationState === 'result' && result && (
          <ResultPanel result={result} onReset={handleReset} mode={currentMode} />
        )}
      </AnimatePresence>
    </div>
  );
}
