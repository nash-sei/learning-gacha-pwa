import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { LucideTrophy, LucideCoins, LucidePlay } from 'lucide-react';

export const Home = ({ onStartQuiz, onOpenSettings, onOpenZukan, onOpenCoinTree }: any) => {
  const { user, createUser, settings } = useGame();
  const [nameInput, setNameInput] = useState('');

  if (!user) {
    return (
      <div className="full-screen center-content">
        <div className="glass-panel" style={{ padding: '2rem', width: '90%', maxWidth: '400px' }}>
          <h2 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
            はじめまして！
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-text-sub)' }}>
            なまえをおしえてね
          </p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="お名前"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-primary-light)',
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => {
              if (nameInput.trim()) createUser(nameInput);
            }}
            disabled={!nameInput.trim()}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--color-primary)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              opacity: nameInput.trim() ? 1 : 0.5
            }}
          >
            スタート！
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="full-screen" style={{ padding: '2rem', gap: '2rem' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.name} さんの学習</h1>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)' }}>今日もがんばろう！</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>

            <button onClick={onOpenSettings} style={{ padding: '0.5rem', background: 'var(--color-surface)', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                 ⚙️
            </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div 
             onClick={onOpenCoinTree}
             className="glass-panel" 
             style={{ 
                 padding: '1rem', 
                 display: 'flex', 
                 flexDirection: 'column', 
                 alignItems: 'center', 
                 gap: '0.5rem',
                 cursor: 'pointer',
                 transition: 'transform 0.1s',
             }}
             onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
             onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <LucideCoins size={32} color="var(--color-accent)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)' }}>今月のコイン</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
             <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.monthlyCoins}</span>
             <span style={{ fontSize: '1rem', color: '#94a3b8' }}>/ {settings?.maxMonthlyCoins || 1000}</span>
          </div>
        </div>
        <div 
            onClick={onOpenZukan}
            className="glass-panel" 
            style={{ 
                padding: '1rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'transform 0.1s',
                border: '2px solid transparent'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
           <LucideTrophy size={32} color="var(--color-secondary)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)' }}>集めたシール</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.unlockedSeals.length} 枚</span>
        </div>
      </div>

       {/* Main Action */}
       <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={onStartQuiz}
            className="glass-panel"
            style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                border: '4px solid var(--color-primary)',
                background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-primary))',
                boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
                transform: 'scale(1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
            }}
          >
             <LucidePlay size={64} color="white" fill="white" />
             <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>クイズを<br/>はじめる</span>
          </button>
       </div>

       {/* Footer / Gacha Link - Removed per request */}
       {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onOpenGacha} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", background: "var(--color-surface)", borderRadius: "var(--radius-full)", boxShadow: "var(--shadow-md)" }}>
             <LucideGamepad2 size={24} color="var(--color-secondary)" />
             <span style={{ fontWeight: "bold", color: "var(--color-secondary)" }}>ガチャを引く ({3 - user.dailyGachaCount}/3回)</span>
          </button>
       </div> */}
    </div>
  );
};
