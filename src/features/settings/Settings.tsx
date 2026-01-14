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

          {/* Monster Management */}
          <section className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                  🎨 モンスター設定
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                  ホーム画面に表示するモンスター画像を追加・配置できます。
              </p>
              
              {/* Add New Monster */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #86efac' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>画像を追加</label>
                  <input 
                    type="file" 
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const imageData = event.target?.result as string;
                            const newMonster = {
                                id: `monster_${Date.now()}`,
                                imageData,
                                x: 50,
                                y: 50,
                                scale: 1,
                                name: file.name.replace(/\.[^/.]+$/, '')
                            };
                            if (user) {
                                updateUser({ ...user, monsters: [...(user.monsters || []), newMonster] });
                            }
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                    }}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#666' }}>PNG, JPG, GIF, WEBP対応</p>
              </div>

              {/* Monster List */}
              {user?.monsters && user.monsters.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {user.monsters.map((m: any, index: number) => (
                          <div key={m.id} style={{ 
                              padding: '1rem', 
                              background: '#f8fafc', 
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                          }}>
                              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                  <img 
                                      src={m.imageData} 
                                      alt={m.name || 'Monster'} 
                                      style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '4px', background: 'white' }}
                                  />
                                  <div style={{ flex: 1 }}>
                                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{m.name || `モンスター ${index + 1}`}</div>
                                      
                                      {/* X Position */}
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                          <span style={{ width: '40px', fontSize: '0.8rem' }}>横:</span>
                                          <input 
                                              type="range" 
                                              min="0" 
                                              max="100" 
                                              value={m.x}
                                              onChange={(e) => {
                                                  const newMonsters = [...user.monsters];
                                                  newMonsters[index] = { ...m, x: parseInt(e.target.value) };
                                                  updateUser({ ...user, monsters: newMonsters });
                                              }}
                                              style={{ flex: 1 }}
                                          />
                                          <span style={{ width: '40px', fontSize: '0.8rem' }}>{m.x}%</span>
                                      </div>
                                      
                                      {/* Y Position */}
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                          <span style={{ width: '40px', fontSize: '0.8rem' }}>縦:</span>
                                          <input 
                                              type="range" 
                                              min="0" 
                                              max="100" 
                                              value={m.y}
                                              onChange={(e) => {
                                                  const newMonsters = [...user.monsters];
                                                  newMonsters[index] = { ...m, y: parseInt(e.target.value) };
                                                  updateUser({ ...user, monsters: newMonsters });
                                              }}
                                              style={{ flex: 1 }}
                                          />
                                          <span style={{ width: '40px', fontSize: '0.8rem' }}>{m.y}%</span>
                                      </div>
                                      
                                      {/* Scale */}
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                          <span style={{ width: '30px', fontSize: '0.8rem' }}>大:</span>
                                          <input 
                                              type="range" 
                                              min="10" 
                                              max="200" 
                                              value={m.scale * 100}
                                              onChange={(e) => {
                                                  const newMonsters = [...user.monsters];
                                                  newMonsters[index] = { ...m, scale: parseInt(e.target.value) / 100 };
                                                  updateUser({ ...user, monsters: newMonsters });
                                              }}
                                              style={{ flex: 1 }}
                                          />
                                          <span style={{ width: '30px', fontSize: '0.8rem' }}>{Math.round(m.scale * 100)}%</span>
                                      </div>
                                  </div>
                                  
                                  {/* Delete Button */}
                                  <button 
                                      onClick={() => {
                                          if (confirm('このモンスターを削除しますか？')) {
                                              const newMonsters = user.monsters.filter((_: any, i: number) => i !== index);
                                              updateUser({ ...user, monsters: newMonsters });
                                          }
                                      }}
                                      style={{ 
                                          padding: '0.3rem 0.6rem', 
                                          background: '#fee2e2', 
                                          color: '#dc2626', 
                                          border: 'none', 
                                          borderRadius: '4px',
                                          fontSize: '0.8rem',
                                          cursor: 'pointer'
                                      }}
                                  >
                                      削除
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
              
              {(!user?.monsters || user.monsters.length === 0) && (
                  <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>
                      モンスターがまだ追加されていません
                  </p>
              )}
          </section>

          {/* Custom Seals (Gacha Rewards) */}
          <section className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
                  🎰 ガチャシール設定
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                  ガチャで出現するシールを追加・管理できます。カスタムシールを登録すると、デフォルトのシールの代わりに使用されます。
              </p>
              
              {/* Rarity Statistics */}
              {localSettings.customSeals && localSettings.customSeals.length > 0 && (
                  <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0369a1' }}>登録数</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                          {['UR', 'SR', 'R', 'N'].map(r => {
                              const count = localSettings.customSeals?.filter((s: any) => s.rarity === r).length || 0;
                              const recommended = r === 'UR' ? 1 : r === 'SR' ? 2 : r === 'R' ? 2 : 3;
                              const isGood = count >= recommended;
                              return (
                                  <div key={r} style={{ 
                                      padding: '0.5rem', 
                                      background: isGood ? '#dcfce7' : '#fef3c7',
                                      borderRadius: '6px',
                                      textAlign: 'center',
                                      border: `2px solid ${isGood ? '#86efac' : '#fcd34d'}`
                                  }}>
                                      <div style={{ fontSize: '0.75rem', color: '#666' }}>{r}</div>
                                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isGood ? '#166534' : '#92400e' }}>
                                          {count}枚
                                      </div>
                                      <div style={{ fontSize: '0.65rem', color: '#666' }}>推奨{recommended}+</div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              )}
              
              {/* Add New Seal */}
              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>シールを追加</label>
                  <input 
                    type="file" 
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const imageData = event.target?.result as string;
                            const name = prompt('シールの名前を入力してください:') || file.name.replace(/\.[^/.]+$/, '');
                            const rarityInput = prompt('レア度を選んでください (N, R, SR, UR):')?.toUpperCase() || 'N';
                            const rarity = (['N', 'R', 'SR', 'UR'].includes(rarityInput) ? rarityInput : 'N') as 'N' | 'R' | 'SR' | 'UR';
                            
                            const newSeal = {
                                id: `seal_${Date.now()}`,
                                name,
                                imageUrl: imageData,
                                rarity,
                                description: ''
                            };
                            const currentSeals = localSettings.customSeals || [];
                            const updatedSettings = { ...localSettings, customSeals: [...currentSeals, newSeal] };
                            setLocalSettings(updatedSettings);
                            // Auto-save immediately
                            updateSettings(updatedSettings);
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                    }}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <p style={{ fontSize: '0.75rem', color: '#666' }}>PNG, JPG, GIF, WEBP対応（追加後、自動保存されます）</p>
              </div>

              {/* Seals List - Grouped by Rarity */}
              {localSettings.customSeals && localSettings.customSeals.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {['UR', 'SR', 'R', 'N'].map(rarityGroup => {
                          const sealsInGroup = localSettings.customSeals?.filter((s: any) => s.rarity === rarityGroup) || [];
                          if (sealsInGroup.length === 0) return null;
                          
                          return (
                              <div key={rarityGroup}>
                                  <div style={{ 
                                      fontSize: '0.85rem', 
                                      fontWeight: 'bold', 
                                      marginBottom: '0.5rem',
                                      color: rarityGroup === 'UR' ? '#b8860b' : rarityGroup === 'SR' ? '#a855f7' : rarityGroup === 'R' ? '#3b82f6' : '#6b7280'
                                  }}>
                                      {rarityGroup} ({sealsInGroup.length}枚)
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                      {sealsInGroup.map((seal: any) => {
                                          const index = localSettings.customSeals?.indexOf(seal) || 0;
                                          return (
                                              <div key={seal.id} style={{ 
                                                  padding: '0.75rem', 
                                                  background: '#f8fafc', 
                                                  borderRadius: '8px',
                                                  border: '1px solid #e2e8f0',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '0.75rem'
                                              }}>
                                                  <img 
                                                      src={seal.imageUrl} 
                                                      alt={seal.name} 
                                                      style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px', background: 'white' }}
                                                  />
                                                  <div style={{ flex: 1 }}>
                                                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{seal.name}</div>
                                                      <span style={{ 
                                                          fontSize: '0.75rem', 
                                                          padding: '2px 6px', 
                                                          borderRadius: '4px',
                                                          background: seal.rarity === 'UR' ? '#fbbf24' : seal.rarity === 'SR' ? '#a855f7' : seal.rarity === 'R' ? '#3b82f6' : '#9ca3af',
                                                          color: 'white'
                                                      }}>
                                                          {seal.rarity}
                                                      </span>
                                                  </div>
                                                  <button 
                                                      onClick={() => {
                                                          const newSeals = localSettings.customSeals?.filter((_: any, i: number) => i !== index) || [];
                                                          const updatedSettings = { ...localSettings, customSeals: newSeals };
                                                          setLocalSettings(updatedSettings);
                                                          // Auto-save immediately
                                                          updateSettings(updatedSettings);
                                                      }}
                                                      style={{ 
                                                          padding: '0.4rem 0.8rem', 
                                                          background: '#fee2e2', 
                                                          color: '#dc2626', 
                                                          border: 'none', 
                                                          borderRadius: '4px',
                                                          fontSize: '0.85rem',
                                                          cursor: 'pointer',
                                                          fontWeight: 'bold'
                                                      }}
                                                  >
                                                      削除
                                                  </button>
                                              </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              )}
              
              {(!localSettings.customSeals || localSettings.customSeals.length === 0) && (
                  <p style={{ color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>
                      カスタムシールが登録されていません。<br/>
                      <span style={{ fontSize: '0.8rem' }}>（デフォルトのシールが使用されます）</span>
                  </p>
              )}
          </section>

          {/* Danger Zone */}
          <section className="glass-panel" style={{ padding: '1.5rem', background: '#fff1f2', border: '1px solid #fecdd3' }}>
              <h3 style={{ borderBottom: '2px solid #fecdd3', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#be123c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LucideTrash2 size={20} /> データ管理
              </h3>
              
              {/* Reset Seal Collection */}
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #fecdd3' }}>
                  <p style={{ fontSize: '0.9rem', color: '#881337', marginBottom: '1rem' }}>
                      獲得したシール図鑑をリセットします。（コインや進捗は保持されます）
                  </p>
                  <button 
                    onClick={() => {
                        if (window.confirm('シール図鑑をリセットしますか？獲得したシールがすべて削除されます。')) {
                            if (user) {
                                updateUser({ ...user, unlockedSeals: [] });
                                alert('シール図鑑をリセットしました');
                            }
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: '#f97316',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                  >
                      シール図鑑をリセット
                  </button>
              </div>
              
              {/* Reset All Data */}
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
              App Version: 0.1.1
          </div>
      </div>
    </div>
  );
};
