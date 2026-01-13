import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { LucideTrophy, LucideCoins, LucideSword } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = ({ onStartQuiz, onOpenSettings, onOpenZukan, onOpenCoinTree }: any) => {
  const { user, createUser, settings } = useGame();
  const [nameInput, setNameInput] = useState('');

  if (!user) {
    return (
      <div 
        className="full-screen center-content"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{ 
            padding: '2rem', 
            width: '90%', 
            maxWidth: '400px',
            background: 'white',
            border: '2px solid #3b82f6',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ 
            marginBottom: '1rem', 
            fontSize: '1.8rem', 
            textAlign: 'center',
            color: '#1e40af',
            fontWeight: 'bold'
          }}>
            🎮 学習ガチャへようこそ！
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#64748b' }}>
            名前を入力してはじめよう
          </p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="なまえを入力..."
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #3b82f6',
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              outline: 'none',
              background: '#f8fafc',
              color: '#1e293b',
              textAlign: 'center'
            }}
          />
          <motion.button
            onClick={() => {
              if (nameInput.trim()) createUser(nameInput);
            }}
            disabled={!nameInput.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '1rem',
              background: nameInput.trim() 
                ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' 
                : '#cbd5e1',
              color: 'white',
              borderRadius: '8px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: nameInput.trim() ? 'pointer' : 'default',
              boxShadow: nameInput.trim() ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
            }}
          >
            🚀 スタート！
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="full-screen" 
      style={{ 
        padding: '1.5rem', 
        gap: '1.5rem',
        background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Monster Background Layer */}
      {user.monsters && user.monsters.map((m) => (
        <img
          key={m.id}
          src={m.imageData}
          alt={m.name || 'Monster'}
          style={{
            position: 'absolute',
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: `translate(-50%, -50%) scale(${m.scale})`,
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: 0.9,
            zIndex: 1
          }}
        />
      ))}

      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 'bold',
            color: '#1e40af'
          }}>
            🏠 {user.name} のホーム
          </h1>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>今日も学習がんばろう！</span>
        </div>
        <motion.button 
          onClick={onOpenSettings} 
          whileHover={{ rotate: 90 }}
          style={{ 
            padding: '0.6rem', 
            background: 'white',
            borderRadius: '50%', 
            border: '2px solid #3b82f6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          ⚙️
        </motion.button>
      </header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 10 }}>
        <motion.div 
          onClick={onOpenCoinTree}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ 
            padding: '1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer',
            background: 'white',
            border: '2px solid #f59e0b',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}
        >
          <LucideCoins size={28} color="#f59e0b" />
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>💰 今月のコイン</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#f59e0b' }}>{user.monthlyCoins}</span>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ {settings?.maxMonthlyCoins || 1000}</span>
          </div>
        </motion.div>
        
        <motion.div 
          onClick={onOpenZukan}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ 
            padding: '1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.5rem',
            cursor: 'pointer',
            background: 'white',
            border: '2px solid #8b5cf6',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}
        >
          <LucideTrophy size={28} color="#8b5cf6" />
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>🏆 集めたシール</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8b5cf6' }}>{user.unlockedSeals.length} 枚</span>
        </motion.div>
      </div>

      {/* Main Action Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative', 
        zIndex: 10 
      }}>
        {/* Quest Button */}
        <motion.button
          onClick={onStartQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            border: '4px solid #3b82f6',
            background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
          }}
        >
          <LucideSword size={48} color="#fff" />
          <span style={{ 
            color: 'white', 
            fontSize: '1.2rem', 
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2
          }}>
            クイズ<br/>スタート！
          </span>
        </motion.button>
      </div>

      {/* Footer hint */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '0.5rem',
        color: '#64748b',
        fontSize: '0.85rem'
      }}>
        ⚙️ 設定からモンスターを追加できるよ！
      </div>
    </div>
  );
};
