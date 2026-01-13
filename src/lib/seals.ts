import type { Seal, Difficulty } from "../types";

// Default seals (used only if no custom seals are defined)
export const DEFAULT_SEALS: Seal[] = [
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

// Keep SEALS for backward compatibility
export const SEALS = DEFAULT_SEALS;

export const getRandomSeal = (difficulty: Difficulty = 'easy', customSeals?: Seal[]): Seal => {
  // Use custom seals if provided and not empty, otherwise fall back to defaults
  const sealsToUse = (customSeals && customSeals.length > 0) ? customSeals : DEFAULT_SEALS;
  
  const rand = Math.random();
  let rarity: Seal['rarity'] = 'N';
  
  // Weights based on Difficulty
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

  const candidates = sealsToUse.filter(s => s.rarity === rarity);
  // Fallback if no seal of that rarity, pick any
  if (candidates.length === 0) {
    return sealsToUse[Math.floor(Math.random() * sealsToUse.length)];
  }
  
  return candidates[Math.floor(Math.random() * candidates.length)];
};

