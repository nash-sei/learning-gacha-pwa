import { useState, useMemo } from 'react';
import { useGame } from '../../contexts/GameContext';
import { SEALS } from '../../lib/seals';
import { LucideArrowLeft, LucideLock, LucideX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Seal } from '../../types';

interface SealListProps {
  onBack: () => void;
}

export const SealList = ({ onBack }: SealListProps) => {
  const { user, settings } = useGame();
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);

  // Use custom seals if available, otherwise use default SEALS
  const sealsToDisplay = useMemo(() => {
    return (settings?.customSeals && settings.customSeals.length > 0) 
      ? settings.customSeals 
      : SEALS;
  }, [settings]);

  if (!user) return null;

  return (
    <div className="full-screen" style={{ padding: '1rem', background: '#f8fafc', overflowY: 'auto' }}>
      <header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '2rem',
          position: 'sticky',
          top: 0,
          background: '#f8fafc',
          zIndex: 10,
          padding: '1rem 0'
      }}>
        <button 
            onClick={onBack}
            style={{ 
                background: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                padding: '0.5rem',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                marginRight: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <LucideArrowLeft size={24} color="var(--color-text)" />
        </button>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-text)' }}>
            シールずかん
        </h1>
        <div style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            {user.unlockedSeals.length} / {sealsToDisplay.length}
        </div>
      </header>

      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: '1rem',
          paddingBottom: '2rem'
      }}>
        {sealsToDisplay.map((seal) => {
          const isUnlocked = user.unlockedSeals.includes(seal.id);

          return (
            <div 
                key={seal.id} 
                onClick={() => isUnlocked && setSelectedSeal(seal)}
                className="glass-panel"
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    padding: '1rem',
                    opacity: isUnlocked ? 1 : 0.7,
                    filter: isUnlocked ? 'none' : 'grayscale(100%)',
                    background: isUnlocked ? 'white' : '#e2e8f0',
                    cursor: isUnlocked ? 'pointer' : 'default',
                    transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => isUnlocked && (e.currentTarget.style.transform = 'scale(0.95)')}
                onMouseUp={(e) => isUnlocked && (e.currentTarget.style.transform = 'scale(1)')}
                onMouseLeave={(e) => isUnlocked && (e.currentTarget.style.transform = 'scale(1)')}
            >
                <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isUnlocked ? 'transparent' : '#cbd5e1',
                    borderRadius: 'var(--radius-md)',
                    position: 'relative'
                }}>
                    {isUnlocked ? (
                        <img 
                            src={seal.imageUrl} 
                            alt={seal.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                    ) : (
                        <LucideLock size={32} color="#94a3b8" />
                    )}
                    
                    {/* Rarity Badge */}
                    <div style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        background: getRarityColor(seal.rarity),
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        {seal.rarity}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '0.9rem', 
                        marginBottom: '0.2rem',
                        color: isUnlocked ? 'var(--color-text)' : 'var(--color-text-sub)'
                    }}>
                        {isUnlocked ? seal.name : '？？？'}
                    </div>
                    {isUnlocked && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-sub)' }}>
                            {seal.description}
                        </div>
                    )}
                </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSeal && (
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}
                onClick={() => setSelectedSeal(null)}
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel"
                    style={{
                        background: 'white',
                        padding: '2rem',
                        width: '90%',
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    <button 
                        onClick={() => setSelectedSeal(null)}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <LucideX size={24} color="#64748b" />
                    </button>

                    <h2 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        marginBottom: '1rem',
                        color: 'var(--color-primary)'
                    }}>
                        {selectedSeal.name}
                    </h2>

                    <div style={{ position: 'relative', margin: '1rem 0' }}>
                         <img 
                            src={selectedSeal.imageUrl} 
                            alt={selectedSeal.name} 
                            style={{ 
                                width: '200px', 
                                height: '200px', 
                                objectFit: 'contain' 
                            }} 
                        />
                         <span style={{
                            position: 'absolute',
                            bottom: -10,
                            right: -10,
                            background: getRarityColor(selectedSeal.rarity),
                            color: 'white',
                            padding: '0.2rem 1rem',
                            borderRadius: '1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                             {selectedSeal.rarity}
                         </span>
                    </div>

                    <p style={{ 
                        textAlign: 'center', 
                        color: 'var(--color-text)', 
                        marginTop: '1rem',
                        fontSize: '1.2rem',
                        lineHeight: '1.6'
                    }}>
                        {selectedSeal.description}
                    </p>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getRarityColor = (rarity: string) => {
    switch(rarity) {
        case 'UR': return '#a855f7'; // Purple
        case 'SR': return '#f59e0b'; // Amber
        case 'R': return '#3b82f6'; // Blue
        default: return '#64748b'; // Slate
    }
};
