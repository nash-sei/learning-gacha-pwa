import { useState, useMemo } from "react";
import { useGame } from "../../contexts/GameContext";
import { LucideArrowLeft, LucideCoins, LucideSparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CoinTreeProps {
  onBack: () => void;
}

const playSound = (type: 'harvest' | 'button') => {
  console.log(`Playing sound: ${type}`);
};

export const CoinTree = ({ onBack }: CoinTreeProps) => {
  const { user, updateUser } = useGame();
  const [harvestingIds, setHarvestingIds] = useState<number[]>([]);

  const fruitCount = Math.floor((user?.treeCoins || 0) / 10);
  
  // Canopy centers for fruit distribution (Grand Tree)
  const canopyCenters = [
    { x: 0, y: -40, r: 90 },     // Top Center
    { x: -90, y: 10, r: 80 },    // Left
    { x: 90, y: 10, r: 80 },     // Right
    { x: -50, y: -90, r: 70 },   // Top Left
    { x: 50, y: -90, r: 70 },    // Top Right
  ];

  const fruits = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      // Pick a random canopy cluster
      const cluster = canopyCenters[i % canopyCenters.length];
      // Random position within that cluster
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (cluster.r * 0.7); // Keep mostly inside
      return {
        id: i,
        x: cluster.x + Math.cos(angle) * distance,
        y: cluster.y + Math.sin(angle) * distance,
      };
    });
  }, []);

  const visibleFruits = fruits.slice(0, fruitCount).filter(f => !harvestingIds.includes(f.id));

  const handleHarvestFruit = (fruitId: number) => {
    if (harvestingIds.includes(fruitId)) return;
    playSound('harvest');
    setHarvestingIds(prev => [...prev, fruitId]);
    setTimeout(() => {
      if (user) {
        const newTreeCoins = Math.max(0, (user.treeCoins || 0) - 10);
        updateUser({ ...user, treeCoins: newTreeCoins });
        setHarvestingIds(prev => prev.filter(id => id !== fruitId));
      }
    }, 800);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
        userSelect: 'none',
        background: '#e0f2fe'
      }}
    >
      {/* Sky Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 40%, #bae6fd 80%, #e0f2fe 100%)',
          zIndex: 0,
        }}
      />

      {/* Sun */}
      <div 
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(253, 224, 71, 0) 70%)',
          borderRadius: '50%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '8%',
          right: '8%',
          width: '80px',
          height: '80px',
          background: '#facc15',
          borderRadius: '50%',
          boxShadow: '0 0 60px 20px rgba(250, 204, 21, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Clouds */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`cloud-${i}`}
            style={{ position: 'absolute', top: `${5 + i * 15}%` }}
            initial={{ x: -300, opacity: 0.8 }}
            animate={{ x: 1600 }}
            transition={{
              duration: 40 + i * 12,
              repeat: Infinity,
              delay: i * 8,
              ease: "linear",
            }}
          >
            <svg width="200" height="80" viewBox="0 0 200 80">
              <path 
                d="M50,60 Q30,60 25,40 Q20,10 50,15 Q60,5 80,10 Q100,0 120,15 Q150,10 160,40 Q170,70 140,70 L50,70 Z" 
                fill="white" 
                fillOpacity="0.8" 
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Ground - Hills layer */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%', // Increased slightly for better rooting
          zIndex: 5,
        }}
      >
        <div 
          style={{
            position: 'absolute',
            bottom: '0',
            left: '-10%',
            width: '120%',
            height: '80%',
            background: '#15803d',
            borderRadius: '50% 50% 0 0',
            transform: 'scaleY(0.5)',
            transformOrigin: 'bottom',
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-20%',
            width: '140%',
            height: '100%',
            background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
            borderRadius: '50% 50% 0 0',
            transform: 'scaleY(0.4)',
            transformOrigin: 'bottom',
            boxShadow: '0 -10px 20px rgba(0,0,0,0.1) inset'
          }}
        />
      </div>

      {/* Header UI */}
      <header 
        style={{
          position: 'relative',
          zIndex: 50,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button 
          onClick={() => { playSound('button'); onBack(); }}
          style={{
            width: '44px',
            height: '44px',
            background: 'white',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
          }}
        >
          <LucideArrowLeft size={24} />
        </button>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '6px 16px',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '2px solid #eab308',
            color: '#854d0e',
            fontWeight: '800',
          }}
        >
          <div style={{ background: '#facc15', borderRadius: '50%', padding: '4px', display: 'flex' }}>
            <LucideCoins size={16} color="#854d0e" />
          </div>
          <span style={{ fontSize: '1.2rem' }}>{user?.treeCoins || 0}</span>
        </div>
      </header>

      {/* Main Content - Tree Area */}
      <main 
        style={{
          position: 'absolute',
          bottom: '12%', // Adjusted for new ground height
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Expanded ViewBox for Grand Tree */}
        <div style={{ width: '100%', maxWidth: '500px', height: '600px', position: 'relative', pointerEvents: 'auto' }}>
          <svg viewBox="0 0 500 600" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <radialGradient id="goldLeafGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#a16207" />
              </radialGradient>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3f1d0b" />
                <stop offset="30%" stopColor="#5d2e14" />
                <stop offset="50%" stopColor="#7c3a1b" />
                <stop offset="80%" stopColor="#5d2e14" />
                <stop offset="100%" stopColor="#3f1d0b" />
              </linearGradient>
            </defs>

            {/* Tree Group centered at 250, 400 (base) */}
            <g transform="translate(250, 600)"> {/* Base at bottom center of viewBox */}
              
              {/* Grand Trunk Path */}
              <path 
                d="M-60,0 Q-70,-20 -90,-40 Q-40,-50 -40,-100 Q-50,-200 -30,-300 Q-60,-380 -90,-420 L-70,-440 Q-30,-400 0,-350 Q30,-400 70,-440 L90,-420 Q60,-380 30,-300 Q50,-200 40,-100 Q40,-50 90,-40 Q70,-20 60,0 Z" 
                fill="url(#trunkGradient)"
              />
              
              {/* Root Details (Darker patches) */}
              <path d="M-40,0 Q-35,-30 -20,-40" stroke="#351405" strokeWidth="4" fill="none" opacity="0.6" />
              <path d="M40,0 Q35,-30 20,-40" stroke="#351405" strokeWidth="4" fill="none" opacity="0.6" />
              <path d="M0,0 L0,-60" stroke="#351405" strokeWidth="4" fill="none" opacity="0.4" />

              {/* Bark Texture Lines */}
              <path d="M-10,-100 Q-15,-200 -5,-300" stroke="#4a220e" strokeWidth="3" fill="none" />
              <path d="M10,-120 Q15,-220 5,-320" stroke="#4a220e" strokeWidth="3" fill="none" />
            </g>

            {/* Swaying Canopy Group */}
            <g transform="translate(250, 180)"> {/* Adjusted Y to sit on top of trunk (approx -420 from bottom) */}
              <motion.g
                animate={{ rotate: [-1, 1, -1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "0px 0px" }} // Rotate around center of this group
              >
                  {/* Canopy Clusters (Cloud style - FLUFFY VERSION) */}
                <g transform="translate(0, 0)">
                   {/* Deep Back Layers (Darkest/Small) */}
                   <circle cx="80" cy="-50" r="60" fill="url(#goldLeafGradient)" opacity="0.9" />
                   <circle cx="-80" cy="-50" r="60" fill="url(#goldLeafGradient)" opacity="0.9" />
                   <circle cx="0" cy="-80" r="60" fill="url(#goldLeafGradient)" opacity="0.9" />
                   <circle cx="40" cy="10" r="50" fill="url(#goldLeafGradient)" opacity="0.9" />
                   <circle cx="-40" cy="10" r="50" fill="url(#goldLeafGradient)" opacity="0.9" />

                   {/* Mid Layers (Main Volume) */}
                   <circle cx="0" cy="-40" r="90" fill="url(#goldLeafGradient)" /> {/* Top Center */}
                   <circle cx="-90" cy="10" r="80" fill="url(#goldLeafGradient)" /> {/* Left */}
                   <circle cx="90" cy="10" r="80" fill="url(#goldLeafGradient)" />  {/* Right */}
                   <circle cx="-50" cy="-90" r="75" fill="url(#goldLeafGradient)" /> {/* Top Left */}
                   <circle cx="50" cy="-90" r="75" fill="url(#goldLeafGradient)" />  {/* Top Right */}
                   
                   {/* Fluffy Edges (Smaller, projecting out) */}
                   <circle cx="-100" cy="-40" r="40" fill="url(#goldLeafGradient)" />
                   <circle cx="100" cy="-40" r="40" fill="url(#goldLeafGradient)" />
                   <circle cx="0" cy="-110" r="50" fill="url(#goldLeafGradient)" />
                   <circle cx="-60" cy="40" r="45" fill="url(#goldLeafGradient)" />
                   <circle cx="60" cy="40" r="45" fill="url(#goldLeafGradient)" />

                   {/* Front Detail Layers (To hide gaps and add texture) */}
                   <circle cx="0" cy="0" r="60" fill="url(#goldLeafGradient)" />
                   <circle cx="-30" cy="-30" r="50" fill="url(#goldLeafGradient)" />
                   <circle cx="30" cy="-30" r="50" fill="url(#goldLeafGradient)" />
                   <circle cx="-40" cy="20" r="50" fill="url(#goldLeafGradient)" />
                   <circle cx="40" cy="20" r="50" fill="url(#goldLeafGradient)" />
                   
                   {/* Trunk Junction Hiders */}
                   <circle cx="0" cy="40" r="40" fill="url(#goldLeafGradient)" />
                </g>

                {/* Glitter / Sparkles - Distributed Wider */}
                {[...Array(20)].map((_, i) => (
                  <motion.circle
                    key={`sparkle-${i}`}
                    cx={(Math.random() - 0.5) * 250}
                    cy={(Math.random() - 0.5) * 150 - 30}
                    r={Math.random() * 2 + 1}
                    fill="white"
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                  />
                ))}

                {/* Coin Fruits */}
                <AnimatePresence>
                  {visibleFruits.map((fruit) => (
                    <motion.g
                      key={`fruit-${fruit.id}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, x: fruit.x, y: fruit.y }}
                      exit={{ y: 500, opacity: 0, rotate: 180, transition: { duration: 0.8, ease: "easeIn" } }}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHarvestFruit(fruit.id);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <circle r="8" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
                      <text x="0" y="3" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309" style={{ pointerEvents: 'none' }}>¥</text>
                      <circle r="6" fill="transparent" stroke="#fde047" strokeWidth="1" strokeDasharray="2 1" />
                    </motion.g>
                  ))}
                </AnimatePresence>
              </motion.g>
            </g>
          </svg>
        </div>
      </main>

      {/* Footer / Instructions */}
      <footer 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          zIndex: 50,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div 
          style={{ 
            display: 'inline-block',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(4px)',
            padding: '12px 24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            pointerEvents: 'auto',
          }}
        >
          {fruitCount > 0 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LucideSparkles style={{ color: '#eab308' }} size={24} />
              <div style={{ textAlign: 'left' }}>
                 <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', fontWeight: 'bold' }}>収穫チャンス！</p>
                 <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b', fontWeight: 'bold' }}>
                   あと <span style={{ color: '#ca8a04', fontSize: '1.4rem' }}>{fruitCount}</span> 個の実があるよ
                 </p>
              </div>
            </motion.div>
          ) : (
            <p style={{ color: '#475569', fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>
              クイズに答えて<br/>黄金の木を育てよう！
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};
