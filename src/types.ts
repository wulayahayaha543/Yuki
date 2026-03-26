export type DivinationMode = 'chinese' | 'western';
export type DivinationState = 'initial' | 'interacting' | 'processing' | 'result';

export interface DivinationResult {
  title: string;
  content: string;
}
