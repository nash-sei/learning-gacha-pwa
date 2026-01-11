import { DEFAULT_SETTINGS } from '../types';
import type { User, GameSettings } from '../types';

const STORAGE_KEY_USER = 'learning_gacha_user';
const STORAGE_KEY_SETTINGS = 'learning_gacha_settings';

export const storage = {
  getUser: (): User | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (!data) return null;
      
      const parsed = JSON.parse(data);
      
      // Migration / Validation
      const safeUser: User = {
          id: parsed.id || 'unknown',
          name: parsed.name || 'Unknown',
          coins: typeof parsed.coins === 'number' ? parsed.coins : 0,
          monthlyCoins: typeof parsed.monthlyCoins === 'number' ? parsed.monthlyCoins : 0,
          lastPlayedDate: parsed.lastPlayedDate || new Date().toISOString().split('T')[0],
          dailyGachaCount: typeof parsed.dailyGachaCount === 'number' ? parsed.dailyGachaCount : 0,
          unlockedSeals: Array.isArray(parsed.unlockedSeals) ? parsed.unlockedSeals : [],
          treeCoins: typeof parsed.treeCoins === 'number' ? parsed.treeCoins : 0
      };
      
      return safeUser;
    } catch (e) {
      console.error('Failed to load user', e);
      return null;
    }
  },

  saveUser: (user: User) => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  },

  getSettings: (): GameSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch (e) {
      console.error('Failed to load settings', e);
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: (settings: GameSettings) => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },
  
  clear: () => {
      localStorage.removeItem(STORAGE_KEY_USER);
  }
};
