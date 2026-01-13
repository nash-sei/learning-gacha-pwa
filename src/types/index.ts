export type Difficulty = 'easy' | 'normal' | 'hard';

export interface User {
  id: string;
  name: string;
  coins: number;
  monthlyCoins: number; // Reset monthly
  treeCoins: number; // Coins on the tree (unharvested)
  lastPlayedDate: string; // ISO Date string YYYY-MM-DD
  dailyGachaCount: number;
  unlockedSeals: string[]; // Seal IDs
  monthlyHarvestedCoins: number; // Coins harvested this month
  questionClearCounts: Record<string, number>; // Track how many times each question was answered correctly
  monsters: MonsterInstance[]; // Monster placements on home screen
}

// Monster placement on home screen
export interface MonsterInstance {
  id: string;
  imageData: string; // Base64 data URL
  x: number; // 0-100 (percentage)
  y: number; // 0-100 (percentage)
  scale: number; // 0.1 - 2.0
  name?: string;
}

export interface Seal {
  id: string;
  name: string;
  imageUrl: string;
  rarity: 'N' | 'R' | 'SR' | 'UR';
  description?: string;
  obtainedAt?: string;
}

export interface GameSettings {
  maxDailyGacha: number;
  maxMonthlyCoins: number;
  coinRewards: {
    [key in Difficulty]: number; // Average reward
  };
  parentPasscode?: string;
  customSeals?: Seal[]; // User-defined seals for gacha
}

export const DEFAULT_SETTINGS: GameSettings = {
  maxDailyGacha: 3,
  maxMonthlyCoins: 1000,
  coinRewards: {
    easy: 15,
    normal: 22,
    hard: 30,
  },
  parentPasscode: '0000', // Default
  customSeals: [], // Empty array, user adds their own
};
