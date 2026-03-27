import { DivinationMode, DivinationResult } from '../types';
import { calculateIChing, calculateTarot } from './divinationData';

/**
 * 本地生成占卜结果，不再调用远程 LLM
 * 模拟小狐狸的思考过程
 */
export async function generateDivination(mode: DivinationMode): Promise<DivinationResult> {
  // 模拟小狐狸思考的仪式感延迟 (1.5s - 2.5s)
  const delay = 1500 + Math.random() * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  try {
    if (mode === 'chinese') {
      return calculateIChing();
    } else {
      return calculateTarot();
    }
  } catch (error) {
    console.error('Local divination error:', error);
    return {
      title: '小狐狸打了个盹',
      content: mode === 'chinese' 
        ? '咳咳，抱歉啊，刚刚风太大，小狐狸没听清卦象。要不你再试一次？' 
        : '嘿，感觉星辰刚才有点害羞，没给我明确的指引。再抽一次试试看？',
    };
  }
}
