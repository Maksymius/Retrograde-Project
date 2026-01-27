'use client'

import { useEffect, useState } from 'react'

export const SciFiBackground = () => {
  // Стейт для живої анімації чисел та глітчів тексту
  const [randomVal, setRandomVal] = useState("00.00")
  const [glitchText, setGlitchText] = useState("STABLE")

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomVal((Math.random() * 100).toFixed(2))
      
      // Рандомний глітч статусу
      if (Math.random() > 0.85) {
        setGlitchText(Math.random() > 0.5 ? "ANOMALY" : "404_FATE")
        setTimeout(() => setGlitchText("STABLE"), 300)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[1.15] brightness-120">
      
      {/* 1. ГЛИБИНА: Комбінована сітка (більш видима на мобільних) */}
      <div 
        className="absolute inset-0 opacity-[0.08] sm:opacity-[0.06] md:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 176, 0, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 60px 60px'
        }}
      />

      {/* 2. ЦЕНТРАЛЬНИЙ МЕХАНІЗМ (більш видимий) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmax] h-[140vmax] opacity-20 sm:opacity-15">
        <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_120s_linear_infinite]">
          
          {/* Зовнішнє кільце */}
          <circle cx="500" cy="500" r="450" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="10 20" className="text-zinc-600" />
          
          {/* Середнє кільце (Орбіта Сатурна) */}
          <circle cx="500" cy="500" r="350" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-500" />
          
          {/* Сатурн (літає по колу) */}
          <g transform="translate(850, 500)">
            <circle cx="0" cy="0" r="8" fill="currentColor" className="text-amber-600/80" />
            <ellipse cx="0" cy="0" rx="14" ry="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-500/80" />
          </g>

          {/* Внутрішній Трикутник ("Всевидяче око") - пульсує */}
          <polygon points="500,200 240,750 760,750" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-purple-900 animate-[pulse_6s_ease-in-out_infinite]" />
        </svg>
      </div>

      {/* 3. КОНТР-ОРБІТА (більш видима) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmax] h-[90vmax] opacity-15 sm:opacity-10">
         <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_80s_linear_infinite_reverse]">
          <ellipse cx="500" cy="500" rx="400" ry="150" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-zinc-500" transform="rotate(45 500 500)" />
          {/* Маленький супутник */}
          <circle cx="900" cy="500" r="4" fill="currentColor" className="text-green-500/50 animate-ping" />
        </svg>
      </div>

      {/* 4. ДАНІ: Верхній правий кут (адаптивний) */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 font-mono text-[8px] sm:text-[9px] text-zinc-500 sm:text-zinc-600 text-right space-y-1">
        <div>SECTOR: 7G-Ω</div>
        <div>VECTOR: {randomVal}</div>
        <div className={`${glitchText !== "STABLE" ? "text-red-500 animate-pulse font-bold" : "text-green-800 sm:text-green-900"}`}>
          SYS_STATUS: {glitchText}
        </div>
      </div>

      {/* 5. ДАНІ: Нижній лівий кут (адаптивний) */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 font-mono text-[8px] sm:text-[9px] text-zinc-500 sm:text-zinc-600 space-y-1">
        <div className="tracking-widest">FIG A.1: HUMAN FOLLY</div>
        <div>SCALE: 1:∞</div>
        <div className="opacity-50 hidden sm:block">ERROR_LOG_ENABLED</div>
      </div>

      {/* 6. РАМКИ: Округлені кути (більш видимі) */}
      <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-l border-t border-zinc-700 sm:border-zinc-800 rounded-tl-3xl opacity-40 sm:opacity-30" />
      <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-r border-b border-zinc-700 sm:border-zinc-800 rounded-br-3xl opacity-40 sm:opacity-30" />

      {/* 7. ГОНЗО-ФОРМУЛИ (більш видимі на мобільних) */}
      <div className="absolute top-[20%] left-[15%] text-zinc-700 sm:text-zinc-800 text-[9px] sm:text-[10px] font-serif italic opacity-40 sm:opacity-30 animate-pulse duration-[4s]">
        f(x) = ∑ (regret)²
      </div>
      <div className="absolute bottom-[30%] right-[15%] text-zinc-700 sm:text-zinc-800 text-[9px] sm:text-[10px] font-serif italic opacity-40 sm:opacity-30 animate-pulse duration-[5s] delay-700">
        Δt → 0
      </div>
      <div className="absolute top-[60%] left-[10%] text-zinc-700 sm:text-zinc-800 text-[8px] sm:text-[9px] font-mono opacity-30 sm:opacity-20 animate-pulse duration-[7s] delay-1000">
        √(-1) = reality
      </div>

      {/* 8. ЗІРКИ (більш видимі) */}
      <div className="absolute top-1/4 left-1/3 w-px h-px bg-white/30 sm:bg-white/20 animate-ping duration-[3s]" />
      <div className="absolute bottom-1/3 right-1/4 w-px h-px bg-amber-500/40 sm:bg-amber-500/30 animate-ping duration-[4s] delay-500" />

      {/* 9. СКАН-ЛІНІЇ (більш видимі на мобільних) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] sm:opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)`,
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  )
}