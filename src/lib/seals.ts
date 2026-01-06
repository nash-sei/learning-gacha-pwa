import type { Seal, Difficulty } from "../types";

// Using placeholder images or generated ones later. 
// For now, use colored placeholders or simple SVGs via data URI? 
// Or just external placeholder services.
// Let's use simple shapes or colors for MVP.

export const SEALS: Seal[] = [
  // Normal
  { id: 's1', name: 'スライムボール', rarity: 'N', imageUrl: 'https://placehold.co/200x200/4ade80/white?text=Slime', description: 'ぷるぷるしている' },
  { id: 's2', name: 'ヒヨコナイト', rarity: 'N', imageUrl: 'https://placehold.co/200x200/facc15/white?text=Hiyoko', description: 'よちよちあるく' },
  { id: 's3', name: 'バットマン', rarity: 'N', imageUrl: 'https://placehold.co/200x200/94a3b8/white?text=Bat', description: 'よるにとぶ' },

  // Rare
  { id: 's4', name: 'ファイアウルフ', rarity: 'R', imageUrl: 'https://placehold.co/200x200/ef4444/white?text=Wolf', description: 'ほのおをまとっている' },
  { id: 's5', name: 'アクアタートル', rarity: 'R', imageUrl: 'https://placehold.co/200x200/3b82f6/white?text=Turtle', description: 'かたいこうら' },

  // Super Rare
  { id: 's6', name: 'サンダーバード', rarity: 'SR', imageUrl: 'https://placehold.co/200x200/fbbf24/white?text=Thunder', description: 'かみなりのトリ' },
  { id: 's7', name: 'アイスドラゴン', rarity: 'SR', imageUrl: 'https://placehold.co/200x200/a5f3fc/white?text=Dragon', description: 'こおりのいぶき' },

  // Ultra Rare
  { id: 's8', name: 'キングゴールデン', rarity: 'UR', imageUrl: 'https://placehold.co/200x200/fbbf24/000000?text=KING', description: 'おうさま' },
];

export const getRandomSeal = (difficulty: Difficulty = 'easy'): Seal => {
  const rand = Math.random();
  let rarity: Seal['rarity'] = 'N';
  
  // Weights based on Difficulty
  // Easy: 3% UR, 10% SR, 30% R, 57% N
  // Normal: 5% UR, 20% SR, 40% R, 35% N
  // Hard: 10% UR, 30% SR, 40% R, 20% N
  
  if (difficulty === 'hard') {
      if (rand < 0.10) rarity = 'UR';
      else if (rand < 0.40) rarity = 'SR';
      else if (rand < 0.80) rarity = 'R';
      else rarity = 'N';
  } else if (difficulty === 'normal') {
      if (rand < 0.05) rarity = 'UR';
      else if (rand < 0.25) rarity = 'SR';
      else if (rand < 0.65) rarity = 'R';
      else rarity = 'N';
  } else {
      // Easy (Default)
      if (rand < 0.03) rarity = 'UR';
      else if (rand < 0.13) rarity = 'SR';
      else if (rand < 0.43) rarity = 'R';
      else rarity = 'N';
  }

  const candidates = SEALS.filter(s => s.rarity === rarity);
  // Fallback if no seal of rarity
  if (candidates.length === 0) return SEALS[0];
  
  return candidates[Math.floor(Math.random() * candidates.length)];
};
