import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { LucideArrowLeft, LucideLock, LucideSave, LucideTrash2 } from 'lucide-react';
import type { Difficulty } from '../../types';
import Papa from 'papaparse';

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const { user, settings, updateSettings, updateUser, addCustomQuestions, clearCustomQuestions, customQuestions } = useGame() as any;
  
  // Local state for form
  const [localSettings, setLocalSettings] = useState(settings);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // New: Current monthly coin editor
  const [currentMonthlyCoins, setCurrentMonthlyCoins] = useState(user?.monthlyCoins || 0);

  // Sync state when user/settings change (if needed, mainly init)
  useEffect(() => {
      setLocalSettings(settings);
      if (user) setCurrentMonthlyCoins(user.monthlyCoins);
  }, [settings, user]);



  const handleGateSubmit = () => {
      // Check password (default '0000' or saved)
      const correct = settings.parentPasscode || '0000';
      if (passwordInput === correct) {
          setIsUnlocked(true);
      } else {
          alert('パスワードがちがいます');
          setPasswordInput('');
      }
  };

  const handleSave = () => {
      updateSettings(localSettings);
      
      // Update coins if changed
      if (user && user.monthlyCoins !== currentMonthlyCoins) {
          const diff = currentMonthlyCoins - user.monthlyCoins;
          // Only increase tree coins if we are adding coins (optional, or just sync?)
          // Let's just add the difference to treeCoins if positive
          const newTreeCoins = diff > 0 ? (user.treeCoins || 0) + diff : user.treeCoins;
          
          updateUser({ ...user, monthlyCoins: currentMonthlyCoins, treeCoins: newTreeCoins });
      }

      alert('設定を保存しました');
      onBack();
  };

  const handleResetData = () => {
      if (window.confirm('本当にすべてのデータを消去しますか？（復元できません）')) {
          localStorage.clear();
          window.location.reload();
      }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: false,
      complete: (results: any) => {
        const newQuestions: any[] = [];
        results.data.forEach((row: any[], index: number) => {
            if (row.length >= 5) {
                const q = {
                    id: `custom_${Date.now()}_${index}`,
                    type: row[0] || 'choice',
                    difficulty: row[1] || 'normal',
                    category: row[2] || 'other',
                    text: row[3],
                    answer: row[4],
                    choices: row.slice(5).filter((c: any) => c && c.trim() !== '')
                };
                newQuestions.push(q);
            }
        });
        
        if (newQuestions.length > 0) {
            addCustomQuestions(newQuestions);
            alert(`${newQuestions.length}問 追加しました！`);
        } else {
            alert('有効な問題が見つかりませんでした。フォーマットを確認してください。');
        }
      },
      error: (error: any) => {
          console.error(error);
          alert('ファイルの読み込みに失敗しました');
      }
    });
  };

  if (!isUnlocked) {
      return (
          <div className="full-screen center-content" style={{ background: '#f8fafc' }}>
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
                  <LucideLock size={48} color="var(--color-text-sub)" style={{ marginBottom: '1rem' }}/>
                  <h2 style={{ marginBottom: '1rem' }}>保護者確認</h2>
                  <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-sub)' }}>
                      パスワードを入力してください (初期: 0000)
                  </p>
                  
                  <input 
                    type="password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="input-base"
                    placeholder="Password"
                    style={{ textAlign: 'center', fontSize: '1.2rem', padding: '0.5rem', width: '200px', marginBottom: '1rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
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


           <section className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                  管理機能
              </h3>

               {/* Password Change */}
              <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>保護者パスワード変更</label>
                  <input 
                    type="text" 
                    value={localSettings.parentPasscode || ''}
                    onChange={(e) => setLocalSettings({ ...localSettings, parentPasscode: e.target.value })}
                    placeholder="新しいパスワード"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
              </div>
              
               {/* Monthly Coin Goal */}
               <div style={{ marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>今月の目標コイン枚数</label>
                    <span style={{ fontWeight: 'bold' }}>{localSettings.maxMonthlyCoins || 1000}枚</span>
                   </div>
                   <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                       {[1000, 2000, 3000, 5000].map(val => (
                           <button
                             key={val}
                             onClick={() => setLocalSettings({ ...localSettings, maxMonthlyCoins: val })}
                             style={{
                                 padding: '0.5rem 1rem',
                                 background: localSettings.maxMonthlyCoins === val ? 'var(--color-primary)' : '#e2e8f0',
                                 color: localSettings.maxMonthlyCoins === val ? 'white' : 'black',
                                 border: 'none', 
                                 borderRadius: '4px'
                             }}
                           >
                               {val}
                           </button>
                       ))}
                   </div>
               </div>

               {/* Monthly Coin Editor */}
               <div style={{ marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontWeight: 'bold' }}>現在の獲得コイン数 (手動補正)</label>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>※現在値: {user?.monthlyCoins}</span>
                   </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                         onClick={() => setCurrentMonthlyCoins(Math.max(0, currentMonthlyCoins - 10))}
                         style={{ padding: '0.5rem', background: '#e2e8f0', border: 'none', borderRadius: '4px' }}
                     >-10</button>
                    <input 
                        type="number" 
                        value={currentMonthlyCoins}
                        onChange={(e) => setCurrentMonthlyCoins(parseInt(e.target.value) || 0)}
                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }}
                    />
                     <button 
                         onClick={() => setCurrentMonthlyCoins(currentMonthlyCoins + 10)}
                         style={{ padding: '0.5rem', background: '#e2e8f0', border: 'none', borderRadius: '4px' }}
                     >+10</button>
                  </div>
              </div>
              
              {/* Question Import */}
              <div style={{ marginBottom: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>問題の追加 (CSV)</label>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                      形式: type, difficulty, category, text, answer, choices...<br/>
                      例: choice, normal, math, 1+1=?, 2, 1, 2, 3
                  </p>
                  <input 
                    type="file" 
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    style={{ marginBottom: '1rem' }}
                  />
                  {customQuestions?.length > 0 && (
                      <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '4px' }}>
                          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                              追加された問題: <strong>{customQuestions.length}</strong> 問
                          </p>
                          <button 
                            onClick={() => {
                                if(confirm('追加した問題をすべて削除しますか？')) clearCustomQuestions();
                            }}
                            style={{ padding: '0.5rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', fontSize: '0.9rem' }}
                          >
                              追加問題を削除
                          </button>
                      </div>
                  )}
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
          
          <div style={{ textAlign: 'center', marginTop: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
              App Version: 0.1.0
          </div>
      </div>
    </div>
  );
};
