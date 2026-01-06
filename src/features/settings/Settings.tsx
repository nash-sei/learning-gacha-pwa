import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { LucideArrowLeft, LucideLock, LucideSave, LucideTrash2 } from 'lucide-react';
import type { Difficulty } from '../../types';

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const { settings, updateSettings } = useGame();
  
  // Local state for form
  const [localSettings, setLocalSettings] = useState(settings);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateQuestion, setGateQuestion] = useState({ a: 0, b: 0 });

  // Generate math question on mount
  useEffect(() => {
    setGateQuestion({
        a: Math.floor(Math.random() * 8) + 2, // 2-9
        b: Math.floor(Math.random() * 8) + 2  // 2-9
    });
  }, []);

  const handleGateSubmit = () => {
      const ans = parseInt(gateAnswer);
      if (ans === gateQuestion.a * gateQuestion.b) {
          setIsUnlocked(true);
      } else {
          alert('不正解です');
          setGateAnswer('');
      }
  };

  const handleSave = () => {
      updateSettings(localSettings);
      alert('設定を保存しました');
      onBack();
  };

  const handleResetData = () => {
      if (window.confirm('本当にすべてのデータを消去しますか？（復元できません）')) {
          localStorage.clear();
          window.location.reload();
      }
  };

  if (!isUnlocked) {
      return (
          <div className="full-screen center-content" style={{ background: '#f8fafc' }}>
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                  <LucideLock size={48} color="var(--color-text-sub)" style={{ marginBottom: '1rem' }}/>
                  <h2 style={{ marginBottom: '1rem' }}>保護者確認</h2>
                  <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-sub)' }}>
                      設定画面に進むには、以下の計算の答えを入力してください。
                  </p>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                      {gateQuestion.a} × {gateQuestion.b} = ?
                  </div>
                  <input 
                    type="number" 
                    value={gateAnswer}
                    onChange={(e) => setGateAnswer(e.target.value)}
                    className="input-base"
                    style={{ textAlign: 'center', fontSize: '1.2rem', padding: '0.5rem', width: '100px', marginBottom: '1rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                  />
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <button onClick={onBack} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                          もどる
                      </button>
                      <button onClick={handleGateSubmit} style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                          OK
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="full-screen" style={{ padding: '1rem', background: '#f8fafc', overflowY: 'auto' }}>
      <header style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '2rem',
          padding: '0.5rem 0'
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
            保護者設定
        </h1>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Difficulty Rewards */}
          <section className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                  コイン報酬設定 (1問正解あたり)
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                  {Object.keys(localSettings.coinRewards).map((key) => {
                      const diff = key as Difficulty;
                      return (
                          <div key={diff} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ textTransform: 'capitalize', fontWeight: 'bold', width: '80px' }}>
                                  {diff === 'easy' ? 'やさしい' : diff === 'normal' ? 'ふつう' : 'むずかしい'}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="100" 
                                    value={localSettings.coinRewards[diff]}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        setLocalSettings({
                                            ...localSettings,
                                            coinRewards: { ...localSettings.coinRewards, [diff]: val }
                                        });
                                    }}
                                  />
                                  <span style={{ width: '40px', textAlign: 'right' }}>{localSettings.coinRewards[diff]}</span>
                              </div>
                          </div>
                      );
                  })}
              </div>
          </section>

          {/* Game Rules */}
          <section className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                  ゲームルール
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span>1日のガチャ上限回数</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       <button 
                            onClick={() => setLocalSettings({...localSettings, maxDailyGacha: Math.max(1, localSettings.maxDailyGacha - 1)})}
                            style={{ padding: '0.2rem 0.8rem', background: '#e2e8f0', border: 'none', borderRadius: '4px' }}
                        >-</button>
                       <span style={{ fontWeight: 'bold' }}>{localSettings.maxDailyGacha} 回</span>
                       <button 
                            onClick={() => setLocalSettings({...localSettings, maxDailyGacha: Math.min(10, localSettings.maxDailyGacha + 1)})}
                            style={{ padding: '0.2rem 0.8rem', background: '#e2e8f0', border: 'none', borderRadius: '4px' }}
                        >+</button>
                  </div>
              </div>
          </section>

          {/* Danger Zone */}
          <section className="glass-panel" style={{ padding: '1.5rem', background: '#fff1f2', border: '1px solid #fecdd3' }}>
              <h3 style={{ borderBottom: '2px solid #fecdd3', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#be123c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LucideTrash2 size={20} /> データ管理
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#881337', marginBottom: '1rem' }}>
                  ユーザーデータ、進捗、獲得シールなどすべてのデータを初期化します。
              </p>
              <button 
                onClick={handleResetData}
                style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#e11d48',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
              >
                  データを完全にリセット
              </button>
          </section>

            {/* Save Button */}
          <button 
            onClick={handleSave}
            style={{
                position: 'sticky',
                bottom: '1rem',
                width: '100%',
                padding: '1rem',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
            }}
          >
              <LucideSave size={24} /> 設定を保存する
          </button>
      </div>
    </div>
  );
};
