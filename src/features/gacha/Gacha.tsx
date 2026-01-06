import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import type { Difficulty, User } from '../../types';
import { LucideGift, LucideStar } from 'lucide-react';
import { motion } from 'framer-motion';

interface GachaProps {
  difficulty: Difficulty;
  onBack: () => void;
  onDanger?: () => void;
}

export const Gacha = ({ difficulty, onBack, onDanger }: GachaProps) => {
  const { user, settings, updateUser } = useGame();
  const [phase, setPhase] = useState<'ready' | 'animating' | 'result' | 'danger'>('ready');
  const [rewardCoin, setRewardCoin] = useState(0);

  // Calculate rewards but don't commit until animation finishes (or start)
  const handlePull = () => {
    if (!user) return;
    if (user.dailyGachaCount >= settings.maxDailyGacha) {
        alert('今日のガチャはもう終わり！'); // Should handle this better in UI
        onBack();
        return;
    }

    setPhase('animating');

    // Calculate Coin
    const baseCoin = settings.coinRewards[difficulty];
    const variance = Math.floor(Math.random() * 10) - 5; // +/- 5
    const coin = Math.max(1, baseCoin + variance);

    // Animation delay
    setTimeout(() => {
        const nextGachaCount = user.dailyGachaCount + 1;
        
        const newUser: User = {
            ...user,
            coins: Math.min(settings.maxMonthlyCoins, user.coins + coin),
            monthlyCoins: Math.min(settings.maxMonthlyCoins, user.monthlyCoins + coin),
            dailyGachaCount: nextGachaCount,
        };
        updateUser(newUser);

        setRewardCoin(coin);
        setPhase('result');
    }, 2500);
  };
  
  if (phase === 'danger') {
      return (
          <div className="full-screen center-content" style={{ background: '#300', color: 'red' }}>
             <div 
                className="glass-panel"
                style={{ 
                    border: '4px solid red', 
                    padding: '2rem', 
                    textAlign: 'center',
                    animation: 'pulse-border 1s infinite' // Use CSS keyframe or simple style
                }}
             >
                 <motion.h1 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ fontSize: '3rem', fontWeight: 'bold' }}
                 >
                    WARNING!!
                 </motion.h1>
                 <p style={{ fontSize: '1.5rem', margin: '1rem 0', color: 'white' }}>
                    きけんモード はつどう！
                 </p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                        onClick={onDanger}
                        style={{ 
                            padding: '1rem 2rem', 
                            fontSize: '1.5rem', 
                            background: 'red', 
                            color: 'white', 
                            border: '2px solid white', 
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        ちょうせんする
                    </button>
                    <button 
                        onClick={onBack}
                        style={{ 
                            padding: '1rem', 
                            background: '#3b82f6', // Blue to differentiate from red "Challenge"
                            color: 'white', 
                            border: '2px solid white',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}
                    >
                        にげる（ホームへ）
                    </button>
                 </div>
             </div>
          </div>
      );
  }

  if (phase === 'ready') {
      return (
          <div className="full-screen center-content">
              <div style={{ textAlign: 'center' }}>
                  <motion.div 
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                      <LucideGift size={128} color="var(--color-primary)" />
                  </motion.div>
                  <h2 className="text-gradient" style={{ fontSize: '2rem', margin: '2rem 0' }}>
                      ごほうびガチャ！
                  </h2>
                  <button 
                    onClick={handlePull}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                  >
                      ひく！
                  </button>
              </div>
          </div>
      );
  }

  if (phase === 'animating') {
       return (
          <div className="full-screen center-content" style={{ background: 'black' }}>
               <motion.div
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0], rotate: 720 }}
                 transition={{ duration: 2 }}
               >
                   <LucideStar size={200} color="gold" />
               </motion.div>
          </div>
       );
  }

  return (
      <div className="full-screen center-content" style={{ backgroundImage: 'radial-gradient(circle, #fff, #f0f9ff)' }}>
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
              <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Get!</h2>
              
              {/* Seal removed for normal gacha */}
              {/* <div style={{ margin: '2rem 0' }}>
                  <img src={rewardSeal.imageUrl} alt={rewardSeal.name} style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
                  <h3 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{rewardSeal.name}</h3>
                  <span className={`badge ${rewardSeal.rarity}`} style={{ fontSize: '1.2rem', padding: '0.2rem 1rem', background: 'gold', borderRadius: '1rem' }}>
                      {rewardSeal.rarity}
                  </span>
              </div> */}

              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: '1rem', marginTop: '2rem' }}>
                  + {rewardCoin} コイン
              </div>

               <p style={{ marginBottom: '2rem', color: 'var(--color-text-sub)', fontWeight: 'bold' }}>
                  のこり: {user ? settings.maxDailyGacha - user.dailyGachaCount : 0} 回
              </p>
              
               <button 
                  onClick={() => {
                      // user is possibly null in TS strict mode
                      if (user && user.dailyGachaCount >= settings.maxDailyGacha) {
                          setPhase('danger');
                      } else {
                          onBack();
                      }
                  }}
                  style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'var(--color-primary)',
                      color: 'white',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1.2rem'
                  }}
                >
                  OK
                </button>
          </div>
      </div>
  );
};
