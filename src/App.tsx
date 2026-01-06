import { useState, useEffect } from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import { Home } from './features/home/Home';
import { Quiz } from './features/quiz/Quiz';
import { Gacha } from './features/gacha/Gacha';
import { SealList } from './features/collection/SealList';
import type { Difficulty } from './types';
import { getRandomSeal } from './lib/seals';
import { motion } from 'framer-motion';

import { Settings } from './features/settings/Settings';

// Helper for Seal Result
const SealResult = ({ onBack }: any) => {
    const { user, updateUser } = useGame();
    const [newSeal, setNewSeal] = useState<any>(null);

    // Effect to generate seal ONLY ONCE when mounted
    useEffect(() => {
        if (!user) return;
        
        const seal = getRandomSeal();
        setNewSeal(seal);

        // Save to user
        const isNew = !user.unlockedSeals.includes(seal.id);
        const updatedSeals = isNew ? [...user.unlockedSeals, seal.id] : user.unlockedSeals;
        const updatedUser = { ...user, unlockedSeals: updatedSeals };
        
        updateUser(updatedUser);
    }, []); // Empty dependency array to run once

    if (!newSeal) return <div>Loading...</div>;

    return (
         <div className="full-screen center-content">
             <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                 <h2 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '2rem' }}>SEAL GET!</h2>
                 
                 <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 1 }}
                    style={{ margin: '2rem auto' }}
                 >
                    <img src={newSeal.imageUrl} alt={newSeal.name} style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
                 </motion.div>

                 <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{newSeal.name}</h3>
                 <span className={`badge ${newSeal.rarity}`} style={{ fontSize: '1.2rem', padding: '0.3rem 1.5rem', background: 'gold', borderRadius: '2rem' }}>
                      {newSeal.rarity}
                 </span>
                 <p style={{ marginTop: '1rem', color: 'var(--color-text-sub)' }}>{newSeal.description}</p>
                 
                 <button onClick={onBack} style={{ marginTop: '2rem', padding: '1rem 3rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                     ホームへ
                 </button>
             </div>
         </div>
    )
};

type Screen = 'home' | 'quiz' | 'gacha' | 'settings' | 'extra_quiz' | 'seal_result' | 'zukan';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [lastDifficulty, setLastDifficulty] = useState<Difficulty>('easy');

  return (
    <div style={{ background: 'var(--color-background)', minHeight: '100vh' }}>
      {currentScreen === 'home' && (
        <Home 
          onStartQuiz={() => setCurrentScreen('quiz')}
          onOpenSettings={() => setCurrentScreen('settings')}
          onOpenZukan={() => setCurrentScreen('zukan')}
        />
      )}
      {currentScreen === 'quiz' && (
        <Quiz 
            mode="normal"
            onBack={() => setCurrentScreen('home')}
            onComplete={(success: boolean, diff: Difficulty) => {
                if(success) {
                    setLastDifficulty(diff);
                    setCurrentScreen('gacha'); 
                } else {
                    setCurrentScreen('home');
                }
            }} 
        />
      )}
      {currentScreen === 'gacha' && (
        <Gacha 
            difficulty={lastDifficulty} 
            onBack={() => setCurrentScreen('home')} 
            onDanger={() => setCurrentScreen('extra_quiz')}
        />
      )}
      
      {currentScreen === 'extra_quiz' && (
          <Quiz
            mode="extra"
            initialDifficulty={lastDifficulty}
            onBack={() => setCurrentScreen('home')} // Give up
            onComplete={(success: boolean) => {
                if (success) {
                    // Logic to add seal should happen here or inside SealResult?
                    // Let's do it in SealResult or passed as callback
                    setCurrentScreen('seal_result');
                } else {
                    setCurrentScreen('home');
                }
            }}
          />
      )}

      {currentScreen === 'seal_result' && <SealResult onBack={() => setCurrentScreen('home')} />}

      {currentScreen === 'zukan' && <SealList onBack={() => setCurrentScreen('home')} />}

      {currentScreen === 'settings' && <Settings onBack={() => setCurrentScreen('home')} />}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;

// Force HMR Update
