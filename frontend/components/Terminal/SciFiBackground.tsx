'use client'

import { useEffect, useState } from 'react'

export const SciFiBackground = () => {
  // Генеруємо рандомні числа для "живого" інтерфейсу
  const [randomVal, setRandomVal] = useState("00.00")
  const [glitchText, setGlitchText] = useState("NORMAL")

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomVal((Math.random() * 100).toFixed(2))
      // Іноді глітчимо статус
      if (Math.random() > 0.8) {
        setGlitchText(Math.random() > 0.5 ? "ANOMALY" : "ERROR_404")
        setTimeout(() => setGlitchText("NORMAL"), 500)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. Космічна сітка з паралаксом */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(255, 176, 0, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 176, 0, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 120px 120px, 180px 180px'
        }}
      />

      {/* 2. Центральний прицільний хрест */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-20 h-20">
          <div className="absolute top-1/2 left-0 w-full h-px bg-retro-accent/30" />
          <div className="absolute top-0 left-1/2 h-full w-px bg-retro-accent/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-retro-accent/50 rounded-full animate-pulse" />
        </div>
      </div>

      {/* 3. Орбітальні кільця (Планетарна система) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vmax] h-[200vmax] opacity-20">
        <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_120s_linear_infinite]">
          {/* Зовнішня орбіта */}
          <circle cx="500" cy="500" r="480" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 15" className="text-retro-accent" />
          {/* Середня орбіта */}
          <circle cx="500" cy="500" r="380" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-retro-primary" />
          {/* Внутрішня орбіта */}
          <circle cx="500" cy="500" r="280" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" className="text-zinc-500" />
          
          {/* Планети на орбітах */}
          <circle cx="980" cy="500" r="4" fill="currentColor" className="text-retro-accent animate-pulse" />
          <circle cx="880" cy="500" r="3" fill="currentColor" className="text-retro-primary" />
          <circle cx="780" cy="500" r="2" fill="currentColor" className="text-zinc-400" />
          
          {/* Сатурн з кільцями */}
          <g transform="translate(680, 500)">
            <circle cx="0" cy="0" r="6" fill="currentColor" className="text-amber-500" />
            <ellipse cx="0" cy="0" rx="12" ry="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-400" />
            <ellipse cx="0" cy="0" rx="15" ry="4" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-300" />
          </g>
          
          {/* Червона блимаюча крапка (тривожний сигнал) */}
          <circle cx="580" cy="500" r="3" fill="currentColor" className="text-red-500 animate-ping" />
        </svg>
      </div>

      {/* 4. Контр-обертання з геометрією */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vmax] h-[100vmax] opacity-8">
         <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_80s_linear_infinite_reverse]">
          {/* Еліптична орбіта */}
          <ellipse cx="500" cy="500" rx="450" ry="200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-900/50" transform="rotate(30 500 500)" />
          {/* Трикутник навігації */}
          <polygon points="500,100 350,400 650,400" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-retro-accent/30" />
          {/* Супутник */}
          <circle cx="950" cy="500" r="8" fill="none" stroke="currentColor" strokeWidth="1" className="text-retro-primary/50 animate-ping" />
        </svg>
      </div>

      {/* 5. Технічні дані (Абсурдні, але стильні) */}
      <div className="absolute top-8 right-8 font-mono text-[9px] text-zinc-700 text-right space-y-1 leading-tight">
        <div className="text-retro-accent/50">◉ SECTOR: Ω-7G</div>
        <div>ENTROPY: {randomVal}%</div>
        <div className={`transition-colors duration-200 ${glitchText !== "NORMAL" ? "text-red-500 animate-pulse" : ""}`}>
          STATUS: {glitchText}
        </div>
        <div className="text-zinc-800">REALITY_CHECK: FAILED</div>
      </div>

      <div className="absolute bottom-8 left-8 font-mono text-[9px] text-zinc-700 space-y-1 leading-tight">
        <div className="text-purple-900/70">◢ TEMPORAL_DRIFT: ±∞</div>
        <div>SCALE: 1:ABSURD</div>
        <div className="text-zinc-800">LOGIC.EXE: NOT_FOUND</div>
      </div>

      {/* 6. Кутові індикатори (Мінімалістичні) */}
      <div className="absolute top-0 left-0 w-16 h-16">
        <div className="absolute top-4 left-4 w-8 h-px bg-retro-accent/20" />
        <div className="absolute top-4 left-4 w-px h-8 bg-retro-accent/20" />
        <div className="absolute top-4 left-4 w-1 h-1 bg-retro-accent/40 rounded-full animate-pulse" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-16 h-16">
        <div className="absolute bottom-4 right-4 w-8 h-px bg-retro-primary/20" />
        <div className="absolute bottom-4 right-4 w-px h-8 bg-retro-primary/20" />
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-retro-primary/40 rounded-full animate-pulse delay-500" />
      </div>

      {/* 7. Плаваючі формули (Абсурдна математика) */}
      <div className="absolute top-1/3 left-1/5 text-zinc-800/30 text-[10px] font-mono opacity-40 animate-pulse">
        ∫ regret dx = ∞
      </div>
      <div className="absolute bottom-1/4 right-1/5 text-zinc-800/30 text-[10px] font-mono opacity-40 animate-pulse delay-1000">
        lim(hope→0) = ?
      </div>
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 text-zinc-800/20 text-[8px] font-mono opacity-30 animate-pulse delay-2000">
        √(-1) = your_life
      </div>

      {/* 8. Дискретні зірки (Космічний пил) */}
      <div className="absolute top-1/4 left-1/6 w-px h-px bg-retro-accent animate-ping" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/4 w-px h-px bg-retro-primary animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-px h-px bg-zinc-400 animate-ping" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 right-1/3 w-px h-px bg-retro-accent animate-ping" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/5 left-2/3 w-px h-px bg-retro-primary animate-ping" style={{ animationDelay: '4s' }} />

      {/* 9. Scan Lines ефект (як на старих CRT моніторах) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.3) 2px,
              rgba(0, 255, 65, 0.3) 4px
            )
          `,
          animation: 'scanline 8s linear infinite'
        }}
      />
    </div>
  )
}