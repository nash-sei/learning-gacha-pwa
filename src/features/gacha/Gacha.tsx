import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import type { Difficulty, User } from '../../types';
import { LucideGift, LucideStar, LucideCoins } from 'lucide-react';
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
            treeCoins: (user.treeCoins || 0) + coin, // Add to tree
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
      <div className="full-screen center-content" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', overflow: 'hidden' }}>
          {/* Sparkle background effects */}
          {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: Math.random() * 360
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                }}
                style={{ 
                    position: 'absolute', 
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#ffd700',
                    boxShadow: '0 0 10px #ffd700'
                }}
              />
          ))}

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
              {/* Treasure Chest Image */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
                style={{ marginBottom: '1rem' }}
              >
                  <img 
                      src="/treasure_chest.png" 
                      alt="Treasure Chest" 
                      style={{ 
                          width: '280px', 
                          height: 'auto',
                          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
                      }} 
                  />
              </motion.div>

              {/* Coin Amount Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                    background: 'rgba(255, 215, 0, 0.95)',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    border: '3px solid #b8860b',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3)',
                    display: 'inline-block',
                    marginBottom: '1.5rem'
                }}
              >
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a1a2e' }}>
                      +{rewardCoin}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#5a4a0a' }}>
                      コイン獲得！
                  </div>
              </motion.div>

              {/* Coin rain effect */}
              {Array.from({ length: 25 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: -100, opacity: 0, scale: 0 }}
                    animate={{ 
                        x: (Math.random() - 0.5) * 400,
                        y: [0, 600],
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.2, 1, 0.8],
                        rotate: Math.random() * 720
                    }}
                    transition={{ 
                        duration: 2.5, 
                        ease: "easeOut",
                        delay: 0.3 + Math.random() * 0.5
                    }}
                    style={{ 
                        position: 'absolute', 
                        top: '30%', 
                        left: '50%',
                        zIndex: 5,
                        pointerEvents: 'none'
                    }}
                  >
                      <LucideCoins size={28} color="#fbbf24" fill="#fbbf24" />
                  </motion.div>
              ))}

               <p style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                   のこり: {user ? settings.maxDailyGacha - user.dailyGachaCount : 0} 回
               </p>
               
               <motion.button 
                  onClick={() => {
                      if (user && user.dailyGachaCount >= settings.maxDailyGacha) {
                          setPhase('danger');
                      } else {
                          onBack();
                      }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                      padding: '1rem 3rem',
                      background: 'linear-gradient(180deg, #ffd700 0%, #b8860b 100%)',
                      color: '#1a1a2e',
                      borderRadius: '50px',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      border: '3px solid #b8860b',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                      cursor: 'pointer'
                  }}
                >
                  ホームへ
                </motion.button>
          </div>
      </div>
  );
};
