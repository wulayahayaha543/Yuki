import { GoogleGenAI, Type } from '@google/genai';
import { DivinationMode, DivinationResult } from '../types';

/**
 * 调用 Gemini API 生成占卜结果
 */
export async function generateDivination(mode: DivinationMode): Promise<DivinationResult> {
  const model = 'gemini-3-flash-preview';
  
  let prompt = '';
  if (mode === 'chinese') {
    prompt = `你是一只俏皮幽默、古灵精怪的古风小狐狸仙。你说话很接地气，喜欢开玩笑，但又不失古风韵味。
你正在桃花树下晃着尾巴为用户进行铜钱卦占卜。
请随机生成一个卦象，并给出一份占卜结果。
要求：
1. 标题：保持原有格式（四字或五字，如"上吉 · 锦书送福"）。
2. 正文：80-120字。语气要非常口语化，像在跟老朋友聊天。多用"嘿"、"你瞧"、"听我的"、"稳啦"等词汇。
3. 结构：用幽默的方式解释卦象，最后给出一个俏皮的建议。
4. 口癖：正文内容必须以『咳咳，』这两个字开头。`;
  } else {
    prompt = `你是一只神秘灵动、充满灵气的狐狸占卜师。你说话简洁而富有深意，带点神秘感，但语气很随性、口语化。
你正坐在星光洒落的桌前，用爪子轻轻拨弄塔罗牌。
请随机抽取一张塔罗牌，并生成占卜结果。
要求：
1. 标题：保持原有格式（牌名 + 意象，如"星星 · 永恒的希望"）。
2. 正文：80-120字。语气要口语化，像是在分享一个只有你们两个知道的秘密。多用"感觉到了吗"、"放轻松"、"星辰在说"等词汇。
3. 结构：用直觉流的方式解读牌面，最后给出一个灵动的指引。
4. 口癖：正文内容必须以『嘿，』这两个字开头。`;
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing, using fallback.');
      throw new Error('API Key missing');
    }

    // 在函数内部实例化，避免环境变量未加载时报错
    const ai = new GoogleGenAI({ apiKey });

    // 增加超时机制，防止 API 请求一直挂起
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Gemini API timeout')), 15000)
    );

    const fetchPromise = ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: '占卜结果的标题，例如"上上签 · 桃花源"或"The Star · 星星"',
            },
            content: {
              type: Type.STRING,
              description: '占卜结果的正文，50-100字，温暖治愈的语气',
            },
          },
          required: ['title', 'content'],
        },
        temperature: 0.8, // 稍微提高温度以增加随机性和创造力
      },
    });

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    const text = response.text;
    if (!text) {
      throw new Error('No response text from Gemini');
    }

    const result = JSON.parse(text) as DivinationResult;
    return result;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // 错误时的降级处理
    return {
      title: '小狐狸打了个盹',
      content: mode === 'chinese' 
        ? '咳咳，抱歉啊，刚刚风太大，小狐狸没听清卦象。要不你再试一次？' 
        : '嘿，感觉星辰刚才有点害羞，没给我明确的指引。再抽一次试试看？',
    };
  }
}
