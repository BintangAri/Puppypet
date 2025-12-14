import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // --- STATE ---
  const [stats, setStats] = useState({ hunger: 50, happiness: 50, cleanliness: 100 });
  const [isSleeping, setIsSleeping] = useState(false);
  const [message, setMessage] = useState("Hai! Aku Pinky, rawat aku ya! 🎀");
  const [animation, setAnimation] = useState("");
  const [hasBow, setHasBow] = useState(true);

  // --- LOGIC MOOD ---
  const getMood = () => {
    if (isSleeping) return "sleeping";
    
    // Ganti 100 menjadi 90 agar lebih mudah memicu efek senang
    if (stats.hunger >= 90 && stats.happiness >= 90) return "super-happy";
    
    if (stats.hunger < 30 || stats.happiness < 30) return "sad";
    if (stats.happiness > 70) return "happy";
    return "neutral";
  };

  // Cek apakah kondisi Super Happy terpenuhi (untuk efek hati)
  const isSuperHappy = !isSleeping && stats.hunger >= 90 && stats.happiness >= 90;
  
  // Logic Ekor Goyang (Wagging)
  const isWagging = !isSleeping && stats.happiness > 50 ? "wagging" : "";

  // --- GAME LOOP ---
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSleeping) {
        setStats((prev) => ({
          hunger: Math.max(0, prev.hunger - 1),
          happiness: Math.max(0, prev.happiness - 2),
          cleanliness: Math.max(0, prev.cleanliness - 1),
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isSleeping]);

  // --- TOMBOL AKSI ---
  const handleAction = (type) => {
    if (isSleeping && type !== 'sleep') {
      setMessage("Ssstt... Pinky sedang bobo 💤");
      return;
    }

    setAnimation("bounce");
    setTimeout(() => setAnimation(""), 500);

    switch (type) {
      case 'feed':
        setStats(p => ({ ...p, hunger: Math.min(100, p.hunger + 30) }));
        setMessage("Nyam nyam! Enak sekali! 🍖");
        break;
      case 'play':
        setStats(p => ({ 
          ...p, 
          hunger: Math.max(0, p.hunger - 10), 
          happiness: Math.min(100, p.happiness + 25) 
        }));
        setMessage("Hore! Seru banget! 🎾");
        break;
      case 'clean':
        setStats(p => ({ ...p, cleanliness: 100 }));
        setMessage("Segar! Aku wangi sekarang! 🛁");
        break;
      case 'sleep':
        setIsSleeping(!isSleeping);
        setMessage(!isSleeping ? "Selamat malam dunia... 🌙" : "Selamat pagi! ☀️");
        break;
      case 'toggleBow':
        setHasBow(!hasBow);
        setMessage(!hasBow ? "Memakai pita cantik! 🎀" : "Pita dilepas.");
        break;
      default: break;
    }
  };

  return (
    <div className={`container ${isSleeping ? 'night-mode' : ''}`}>
      <div className="game-card">
        <h1 className="title"> Pinky The Pup </h1>
        
        {/* --- VISUAL PUPPY --- */}
        <div className={`puppy-wrapper ${animation}`}>
          
          {/* LAYER 1: Telinga & Ekor (Paling Belakang) */}
          <div className="ears left"></div>
          <div className="ears right"></div>
          <div className={`tail ${isWagging}`}></div>

          {/* LAYER 2: Badan & Kaki */}
          <div className="body"></div>
          <div className="legs">
            <div className="leg left"></div>
            <div className="leg right"></div>
          </div>

          {/* LAYER 3: Kepala (Wajah di depan telinga) */}
          <div className={`head mood-${getMood()}`}>
            <div className="face">
              <div className="eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
              <div className="snout">
                <div className="nose"></div>
                <div className="mouth"></div>
              </div>
              <div className="cheeks"></div>
            </div>
          </div>

          {/* LAYER 4: Aksesoris & Efek */}
          {hasBow && <div className="bow"></div>}
          
          {/* Efek Hati saat Super Happy */}
          {isSuperHappy && (
            <div className="hearts-effect">
              <div className="heart-particle h1">❤️</div>
              <div className="heart-particle h2">❤️</div>
              <div className="heart-particle h3">❤️</div>
            </div>
          )}
        
        </div>

        <p className="message-box">{message}</p>

        {/* --- CONTROLS --- */}
        <div className="controls-grid">
          <button onClick={() => handleAction('feed')}>🍖 Makan</button>
          <button onClick={() => handleAction('play')}>🎾 Main</button>
          <button onClick={() => handleAction('clean')}>🛁 Mandi</button>
          <button onClick={() => handleAction('sleep')}>
            {isSleeping ? "☀️ Bangun" : "🌙 Tidur"}
          </button>
          <button className="btn-bow" onClick={() => handleAction('toggleBow')}>
            Aksesoris
          </button>
        </div>
        
        {/* --- STATS --- */}
        <div className="mini-stats">
            <span>🍔 {stats.hunger}%</span>
            <span>❤️ {stats.happiness}%</span>
            <span>✨ {stats.cleanliness}%</span>
        </div>
      </div>
    </div>
  );
};

export default App;