import { DivinationResult } from '../types';

// 简化的六十四卦数据（示例，包含核心卦象）
export const CHINESE_HEXAGRAMS: Record<number, DivinationResult> = {
  1: { title: "乾为天 · 龙德在田", content: "咳咳，你抽到了纯阳之卦！这可是大吉。小狐狸瞧你最近气场全开，像条潜龙要上天啦。稳住，别飘，听我的，现在就是你大展身手的好时机！" },
  2: { title: "坤为地 · 厚德载物", content: "咳咳，这是纯阴之卦，讲究一个『稳』字。别急着往前冲，像大地一样静静积蓄力量吧。小狐狸觉得你现在最需要的是睡个好觉，好运自然会来敲门。" },
  11: { title: "地天泰 · 三阳开泰", content: "咳咳，泰卦到，好运绕！天地交感，万物通畅。你瞧，之前那些烦心事儿都要烟消云散啦。稳啦稳啦，小狐狸先在这里给你道个喜！" },
  12: { title: "天地否 · 守静待时", content: "咳咳，这卦象有点『堵』。现在不是硬碰硬的时候，缩回尾巴躲一躲不丢人。听我的，先静观其变，等这阵歪风过去，咱又是好汉一条！" },
  63: { title: "水火既济 · 功成名就", content: "咳咳，事情办得差不多啦，正处于最完美的平衡点。不过小狐狸得提醒你，越是这时候越要小心『晚节不保』，守住现在的成果就是最大的胜利！" },
  64: { title: "火水未济 · 黎明之前", content: "咳咳，虽然还没到终点，但希望就在前头。就像小狐狸抓蝴蝶，最后那一扑最关键。别泄气，再坚持一下下，好戏才刚刚开始呢！" },
  // 更多卦象可以根据需要补充...
};

// 塔罗牌数据（包含大阿卡纳）
export const WESTERN_TAROT: Record<number, DivinationResult> = {
  0: { title: "愚人", content: "嘿，感觉到了吗？一段全新的旅程正在你脚下展开。别怕摔跤，星辰在说，有时候盲目的勇气也是一种天赋。放轻松，像个孩子一样去冒险吧。" },
  1: { title: "魔术师", content: "嘿，你手里已经握住了改变一切的钥匙。火、水、风、土都在你的掌控之中。星辰在说，别再犹豫了，你的创造力正处于巅峰，去变个奇迹出来吧。" },
  2: { title: "女祭司", content: "嘿，嘘...静下心来。现在的答案不在外面，而在你的直觉里。月光温柔地提醒你，有些秘密不需要现在揭开，保持那份神秘的洞察力就好。" },
  6: { title: "恋人", content: "嘿，这是一个关于选择和契合的时刻。不只是爱情，更是心灵的共鸣。星辰在说，跟随你的心去选择那个让你感到温暖的方向，那就是正确的路。" },
  10: { title: "命运之轮", content: "嘿，转动开始了。命运的齿轮从不停歇，现在的低谷只是为了下一次的高峰做准备。放轻松，顺应这股潮流，你会发现一切都是最好的安排。" },
  17: { title: "星星", content: "嘿，在黑暗中，你是最亮的那颗星。希望从未熄灭，只是在等待你抬头发现。星辰在说，保持那份纯粹的信念，你的愿望正在宇宙中回响。" },
  21: { title: "世界", content: "嘿，圆满的终点，也是更高层次的起点。你已经完成了一个重要的周期。星辰在说，享受这一刻的成就感吧，整个宇宙都在为你鼓掌。" },
  // 更多牌意可以根据需要补充...
};

/**
 * 模拟三钱法算卦 (中式)
 * 每次抛3枚硬币，重复6次形成6爻
 */
export function calculateIChing(): DivinationResult {
  // 简化逻辑：直接从六十四卦库中随机抽取一个（实际玄学中也是随机性体现）
  const keys = Object.keys(CHINESE_HEXAGRAMS).map(Number);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return CHINESE_HEXAGRAMS[randomKey];
}

/**
 * 模拟塔罗抽牌 (西式)
 */
export function calculateTarot(): DivinationResult {
  const keys = Object.keys(WESTERN_TAROT).map(Number);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return WESTERN_TAROT[randomKey];
}
