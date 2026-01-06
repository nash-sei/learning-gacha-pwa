export type Difficulty = 'easy' | 'normal' | 'hard';

export interface User {
  id: string;
  name: string;
  coins: number;
  monthlyCoins: number; // Reset monthly
  lastPlayedDate: string; // ISO Date string YYYY-MM-DD
  dailyGachaCount: number;
  unlockedSeals: string[]; // Seal IDs
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
}

export const DEFAULT_SETTINGS: GameSettings = {
  maxDailyGacha: 3,
  maxMonthlyCoins: 1000,
  coinRewards: {
    easy: 15,
    normal: 22,
    hard: 30,
  },
};
