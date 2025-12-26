// Summary generation pools and rules
// Part A: Affirmative texts (肯定句文本)
// Part B: Smoothing texts (润滑句文本)
// Part C: Call-to-action texts (文本)

import { DIMENSION } from './const';

// Level constants
export const LEVEL = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Part A Pool - triggerCondition is { dimension, level }
export const POOL_A = [
  // 求知力 高
  {
    triggerCondition: { dimension: DIMENSION.CURIOSITY, level: LEVEL.HIGH },
    text: '你的求知力很高，代表你愿意主动学习与成长，是典型的"持续进步型父母"。',
  },
  {
    triggerCondition: { dimension: DIMENSION.CURIOSITY, level: LEVEL.HIGH },
    text: '你很擅长思考问题背后的逻辑，这是许多父母不具备的重要优势。',
  },
  {
    triggerCondition: { dimension: DIMENSION.CURIOSITY, level: LEVEL.HIGH },
    text: '孩子会从你身上学到"遇到问题可以思考和探索"，这是最好的成长示范。',
  },
  // 社交力 高
  {
    triggerCondition: { dimension: DIMENSION.SOCIAL, level: LEVEL.HIGH },
    text: '你的社交风格让家庭氛围更轻松温暖，孩子在你身边也更自然放开。',
  },
  {
    triggerCondition: { dimension: DIMENSION.SOCIAL, level: LEVEL.HIGH },
    text: '你能轻松营造温度和互动，让孩子更愿意跟你沟通自己的世界。',
  },
  {
    triggerCondition: { dimension: DIMENSION.SOCIAL, level: LEVEL.HIGH },
    text: '你的高社交力让你成为孩子的情绪缓冲器，是亲子关系的润滑剂。',
  },
  // 自控力 高
  {
    triggerCondition: { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.HIGH },
    text: '你的自控力让孩子在你身边更有安全感，也更容易建立秩序感。',
  },
  {
    triggerCondition: { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.HIGH },
    text: '家庭稳定的节奏感，很大一部分来自你自己稳定的自我管理能力。',
  },
  {
    triggerCondition: { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.HIGH },
    text: '你能先稳住自己，这会成为孩子未来情绪管理最好的榜样。',
  },
  // 情绪调节力 高
  {
    triggerCondition: { dimension: DIMENSION.EMOTION, level: LEVEL.HIGH },
    text: '你的情绪稳定性让孩子感到安心，这是建立安全依恋的关键因素。',
  },
  {
    triggerCondition: { dimension: DIMENSION.EMOTION, level: LEVEL.HIGH },
    text: '你能在困难时保持平静，孩子会下意识模仿你的稳定模式。',
  },
  {
    triggerCondition: { dimension: DIMENSION.EMOTION, level: LEVEL.HIGH },
    text: '孩子跟你在一起时，能更自在地表达情绪，因为你不会被轻易触发。',
  },
  // 合作力 高
  {
    triggerCondition: { dimension: DIMENSION.COOPERATION, level: LEVEL.HIGH },
    text: '你的合作力让你能自然倾听，是孩子愿意亲近的重要原因。',
  },
  {
    triggerCondition: { dimension: DIMENSION.COOPERATION, level: LEVEL.HIGH },
    text: '孩子会因为你的沟通方式而更愿意主动说达自己的想法。',
  },
  {
    triggerCondition: { dimension: DIMENSION.COOPERATION, level: LEVEL.HIGH },
    text: '你身上的温柔耐心，会成为孩子人生中非常重要的力量。',
  },
  // 和谐型 高
  {
    triggerCondition: { dimension: DIMENSION.BALANCED, level: LEVEL.HIGH },
    text: '你的和谐风格让亲子关系特别温暖，孩子愿意跟你说心里话。',
  },
  {
    triggerCondition: { dimension: DIMENSION.BALANCED, level: LEVEL.HIGH },
    text: '你在冲突时仍然能看到孩子的需求，这是宝贵的能力。',
  },
  {
    triggerCondition: { dimension: DIMENSION.BALANCED, level: LEVEL.HIGH },
    text: '孩子会因为你的稳定与温柔，发展很好的情绪安全感。',
  },
  // 结构型 高
  {
    triggerCondition: { dimension: DIMENSION.STRUCTURED, level: LEVEL.HIGH },
    text: '你的结构能力让孩子的生活有秩序，这会成为未来自律的重要基础。',
  },
  {
    triggerCondition: { dimension: DIMENSION.STRUCTURED, level: LEVEL.HIGH },
    text: '孩子在你这里知道"事情怎么做"，未来会更稳定与踏实。',
  },
  {
    triggerCondition: { dimension: DIMENSION.STRUCTURED, level: LEVEL.HIGH },
    text: '家庭节奏的稳定，很大程度来自你的结构能力。',
  },
  // 自由型 高
  {
    triggerCondition: { dimension: DIMENSION.FREE_RANGED, level: LEVEL.HIGH },
    text: '你的自由风格保护孩子的自主性，是创造力的土壤。',
  },
  {
    triggerCondition: { dimension: DIMENSION.FREE_RANGED, level: LEVEL.HIGH },
    text: '孩子会因为你不压迫、不控制，而更愿意主动尝试新事物。',
  },
  {
    triggerCondition: { dimension: DIMENSION.FREE_RANGED, level: LEVEL.HIGH },
    text: '你带给孩子的松弛感，会让他变得更自在、更真实。',
  },
  // 行为节奏 高(快)
  {
    triggerCondition: { dimension: DIMENSION.PACE, level: LEVEL.HIGH },
    text: '孩子反应快，进入状态快，是天然的探索优势。',
  },
  {
    triggerCondition: { dimension: DIMENSION.PACE, level: LEVEL.HIGH },
    text: '孩子的节奏快，会为家庭带来很多能量与惊喜。',
  },
  // 行为节奏 中
  {
    triggerCondition: { dimension: DIMENSION.PACE, level: LEVEL.MEDIUM },
    text: '孩子节奏平衡，是最稳定、最容易带的类型。',
  },
  // 行为节奏 低(慢)
  {
    triggerCondition: { dimension: DIMENSION.PACE, level: LEVEL.LOW },
    text: '孩子节奏慢，是深度型气质，会更细腻、更稳。',
  },
  {
    triggerCondition: { dimension: DIMENSION.PACE, level: LEVEL.LOW },
    text: '孩子喜欢先观察再行动，这是谨慎而聪慧的特质。',
  },
  // 情绪敏感度 高
  {
    triggerCondition: { dimension: DIMENSION.SENSITIVITY, level: LEVEL.HIGH },
    text: '孩子的敏感让他更能察觉别人忽略的细节，是天生的"情绪雷达"。',
  },
  // 情绪敏感度 中
  {
    triggerCondition: { dimension: DIMENSION.SENSITIVITY, level: LEVEL.MEDIUM },
    text: '孩子的情绪反应恰到好处，在敏感和稳定间有自然平衡。',
  },
  // 情绪敏感度 低
  {
    triggerCondition: { dimension: DIMENSION.SENSITIVITY, level: LEVEL.LOW },
    text: '孩子情绪稳定，不易受外界影响，是非常安心的气质。',
  },
  // 专注自律 高
  {
    triggerCondition: { dimension: DIMENSION.FOCUS, level: LEVEL.HIGH },
    text: '孩子沉浸能力强，是典型的"深度学习型"优势。',
  },
  {
    triggerCondition: { dimension: DIMENSION.FOCUS, level: LEVEL.HIGH },
    text: '孩子坚持度强，这是未来学习的重要能力。',
  },
  // 专注自律 中
  {
    triggerCondition: { dimension: DIMENSION.FOCUS, level: LEVEL.MEDIUM },
    text: '孩子适度专注，是非常好带的平衡型气质。',
  },
  // 专注自律 低
  {
    triggerCondition: { dimension: DIMENSION.FOCUS, level: LEVEL.LOW },
    text: '孩子思维灵活、切换快，是"多通道型"孩子的典型气质。',
  },
];

// Part B Pool - triggerCondition is an array of conditions that must all be met
export const POOL_B = [
  {
    triggerCondition: [
      { dimension: DIMENSION.EMOTION, level: LEVEL.LOW },
      { dimension: DIMENSION.STRUCTURED, level: LEVEL.HIGH },
    ],
    conflictType: '父母内部冲突',
    text: '你重视规则，但情绪调节力偏低，会让你在坚持时更容易累，也更容易被孩子触发。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.EMOTION, level: LEVEL.LOW },
      { dimension: DIMENSION.BALANCED, level: LEVEL.HIGH },
    ],
    conflictType: '父母内部冲突',
    text: '你希望温柔带孩子，但情绪调节力偏低，会让你在冲突时容易出现"越努力越疲惫"的循环。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.LOW },
      { dimension: DIMENSION.STRUCTURED, level: LEVEL.HIGH },
    ],
    conflictType: '父母内部冲突',
    text: '你非常看重秩序，但自控力偏低会让你不自觉对孩子更严苛，从而更容易有对立感。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.CURIOSITY, level: LEVEL.HIGH },
      { dimension: DIMENSION.FREE_RANGED, level: LEVEL.HIGH },
    ],
    conflictType: '父母内部冲突',
    text: '你给孩子自由，但内心又极敏感和追求正确方法，会让你长期处在"纠结"状态。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.SOCIAL, level: LEVEL.LOW },
      { dimension: DIMENSION.BALANCED, level: LEVEL.HIGH },
    ],
    conflictType: '父母内部冲突',
    text: '你希望维持关系，但社交力偏低，让你在沟通中容易累、也更敏感。',
  },
  // {
  //   triggerCondition: [
  //     { dimension: DIMENSION.PACE, level: LEVEL.HIGH },
  //     { dimension: DIMENSION.PACE, level: LEVEL.LOW },
  //   ],
  //   conflictType: '亲子节奏冲突',
  //   text: '你的节奏快，而孩子是慢热型，生活中容易出现"你越急他越慢"的循环。',
  // },
  // {
  //   triggerCondition: [
  //     { dimension: DIMENSION.PACE, level: LEVEL.HIGH },
  //     { dimension: DIMENSION.SENSITIVITY, level: LEVEL.HIGH },
  //   ],
  //   conflictType: '亲子情绪冲突',
  //   text: '你的速度快、节奏快，会让敏感孩子跟不上，表现出受挫或卡住。',
  // },
  // {
  //   triggerCondition: [
  //     { dimension: DIMENSION.SENSITIVITY, level: LEVEL.LOW },
  //     { dimension: DIMENSION.SENSITIVITY, level: LEVEL.HIGH },
  //   ],
  //   conflictType: '亲子情绪冲突',
  //   text: '你对外界稳定，但孩子容易受刺激，这会让你误会他"玻璃心"，孩子也觉得"不被理解"。',
  // },
  {
    triggerCondition: [
      { dimension: DIMENSION.FREE_RANGED, level: LEVEL.HIGH },
      { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.LOW },
    ],
    conflictType: '亲子自律冲突',
    text: '你的自由理念和孩子低自控力，会让生活变成"无规则状态的无力管理"。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.STRUCTURED, level: LEVEL.HIGH },
      { dimension: DIMENSION.SENSITIVITY, level: LEVEL.HIGH },
    ],
    conflictType: '亲子情绪冲突',
    text: '你的规则遇到孩子的敏感，会让孩子觉得"压力太大"，你觉得"怎么又哭了"。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.SENSITIVITY, level: LEVEL.HIGH },
      { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.LOW },
    ],
    conflictType: '孩子内部冲突',
    text: '孩子感受强，反应快，恢复慢，你看到的"不听话"往往是调节速度跟不上。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.PACE, level: LEVEL.HIGH },
      { dimension: DIMENSION.SELF_DISCIPLINE, level: LEVEL.LOW },
    ],
    conflictType: '孩子内部冲突',
    text: '孩子反应快但自控不足，是"冲动但不是故意"的组合。',
  },
  {
    triggerCondition: [
      { dimension: DIMENSION.PACE, level: LEVEL.LOW },
      { dimension: DIMENSION.SENSITIVITY, level: LEVEL.HIGH },
    ],
    conflictType: '孩子内部冲突',
    text: '孩子需要时间进入状态又容易被打断，是典型的"深度型"容易在日常中被误解。',
  },
];

// Part C Pool - call-to-action texts (always available)
export const POOL_C = [
  '在深度解读里，我们可以一起找到你们家真正的卡点，并给一个不改变你个性的轻松带娃方式。',
  '如果你愿意，我可以帮你建立属于你们家的节奏，不焦虑、不对抗，让孩子更愿意配合。',
  '如果你愿意深入了解，我可以和你分享，为啥你孩子为什么这样？你为什么会这样？你们之间最关键的匹配点是什么？',
  '你会看到一个"更顺、更轻松"的育儿路线，而不是不断试错的方式。',
  '我可以帮你把你的性格、教养方式和孩子气质匹配出专属育儿路线。',
  '如果你愿意，我可以帮你一起梳理你们的亲子关系，看哪些是你已经做得很好的地方，看哪些问题根本不是你的错，只是双方没找到好的节奏方向。',
  '如果你愿意了解更多，接下来的我会陪你一起走。',
  '我很愿意帮你一起，让方法真正贴到你的生活，不用靠意志力硬撑。',
  '你现在已经走出了最困难的第一步，剩下的我会陪你一起走。',
  '如果你愿意，我可以在深度解读里帮你找到最省力的、最符合你风格的带娃方式，让你每天轻松很多。',
];

// Helper function to get score level
function getScoreLevel(score) {
  if (score >= 3.5) return LEVEL.HIGH;
  if (score >= 2.5) return LEVEL.MEDIUM;
  return LEVEL.LOW;
}

// Check if a single condition is met
function checkSingleCondition(cond, scores) {
  const { dimension, level } = cond;
  const score = scores[dimension] || 0;
  const actualLevel = getScoreLevel(score);
  return actualLevel === level;
}

// Check if all conditions in an array are met
function checkConditions(conditions, scores) {
  if (!conditions) return true;
  return conditions.every((cond) => checkSingleCondition(cond, scores));
}

// Select one item from Part A pool
function selectFromPoolA(scores) {
  const eligibleItems = POOL_A.filter((item) =>
    checkSingleCondition(item.triggerCondition, scores)
  );

  if (eligibleItems.length === 0) return null;

  // Pick randomly from eligible items
  const randomIndex = Math.floor(Math.random() * eligibleItems.length);
  return eligibleItems[randomIndex];
}

// Select one item from Part B pool
function selectFromPoolB(scores) {
  const eligibleItems = POOL_B.filter((item) => checkConditions(item.triggerCondition, scores));

  if (eligibleItems.length === 0) return null;

  // Pick randomly from eligible items
  const randomIndex = Math.floor(Math.random() * eligibleItems.length);
  return eligibleItems[randomIndex];
}

// Select one item from Part C pool (always available)
function selectFromPoolC() {
  const randomIndex = Math.floor(Math.random() * POOL_C.length);
  return POOL_C[randomIndex];
}

// Main function to generate summary
export function generateSummary(scores) {
  const partA = selectFromPoolA(scores);
  const partB = selectFromPoolB(scores);
  const partC = selectFromPoolC();

  return {
    partA: partA ? partA.text : null,
    partB: partB ? { text: partB.text, conflictType: partB.conflictType } : null,
    partC,
  };
}

export default generateSummary;
