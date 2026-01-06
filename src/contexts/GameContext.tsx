import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, GameSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';
import { storage } from '../lib/storage';
// import { v4 as uuidv4 } from 'uuid'; // Removed to avoid dependency

// Simple ID generator if uuid is not available
const generateId = () => Math.random().toString(36).substring(2, 9);

interface GameContextType {
  user: User | null;
  settings: GameSettings;
  createUser: (name: string) => void;
  updateUser: (user: User) => void;
  updateSettings: (settings: GameSettings) => void;
  resetDaily: () => void; // Check if day changed
  customQuestions: any[];
  addCustomQuestions: (questions: any[]) => void;
  clearCustomQuestions: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // Load data
    const loadedUser = storage.getUser();
    const loadedSettings = storage.getSettings();
    
    if (loadedUser) {
        // Daily Reset Check
        const today = new Date().toISOString().split('T')[0];
        if (loadedUser.lastPlayedDate !== today) {
            const updatedUser = { ...loadedUser, dailyGachaCount: 0, lastPlayedDate: today };
            setUser(updatedUser);
            storage.saveUser(updatedUser);
        } else {
            setUser(loadedUser);
        }
    }
    setSettings(loadedSettings);
  }, []);

  const createUser = (name: string) => {
    const newUser: User = {
      id: generateId(),
      name,
      coins: 0,
      monthlyCoins: 0,
      lastPlayedDate: new Date().toISOString().split('T')[0],
      dailyGachaCount: 0,
      unlockedSeals: []
    };
    setUser(newUser);
    storage.saveUser(newUser);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    storage.saveUser(updatedUser);
  };
  
  const updateSettings = (newSettings: GameSettings) => {
      setSettings(newSettings);
      storage.saveSettings(newSettings); // Ensure storage.ts has saveSettings
  };

  const [customQuestions, setCustomQuestions] = useState<any[]>([]);

  useEffect(() => {
    // Load custom questions
    const loadedQuestions = localStorage.getItem('learning_gacha_custom_questions');
    if (loadedQuestions) {
        try {
            setCustomQuestions(JSON.parse(loadedQuestions));
        } catch (e) {
            console.error("Failed to parse custom questions", e);
        }
    }
  }, []);

  const addCustomQuestions = (newQuestions: any[]) => {
      // Logic to merge and prevent duplicates could ideally be here, 
      // but users might want to overwrite. For now, we append but filter by exact ID match if IDs provided.
      // Or simply simple append.
      // Let's go with: Append new ones.
      
      const updated = [...customQuestions, ...newQuestions];
      setCustomQuestions(updated);
      localStorage.setItem('learning_gacha_custom_questions', JSON.stringify(updated));
  };

  const clearCustomQuestions = () => {
      setCustomQuestions([]);
      localStorage.removeItem('learning_gacha_custom_questions');
  }
  
  const resetDaily = () => {
      // Manual trigger if needed, mostly handled in useEffect
      if (!user) return;
      const today = new Date().toISOString().split('T')[0];
       if (user.lastPlayedDate !== today) {
            const updatedUser = { ...user, dailyGachaCount: 0, lastPlayedDate: today };
            updateUser(updatedUser);
        }
  };

  return (
    <GameContext.Provider value={{ user, settings, createUser, updateUser, updateSettings, resetDaily, customQuestions, addCustomQuestions, clearCustomQuestions } as any}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
