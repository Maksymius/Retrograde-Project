'use client'

import { useEffect, useState } from 'react'

export const SciFiBackground = () => {
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* --- ШАР ЗОРЯНОГО ПИЛУ (Без змін) --- */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 4px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 3px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 4px)
          `,
          backgroundSize: '550px 550px, 350px 350px, 250px 250px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px'
        }}
      />

      {/* 1. ГЛИБИНА: Сітка (Без змін) */}
      <div 
        className="absolute inset-0 opacity-[0.12] sm:opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 60px 60px'
        }}
      />

      {/* 2. ЦЕНТРАЛЬНИЙ МЕХАНІЗМ (ОНОВЛЕНО) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmax] h-[140vmax] opacity-35 sm:opacity-30">
        <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_120s_linear_infinite]">
          
          {/* --- ІСНУЮЧІ ЕЛЕМЕНТИ --- */}
          {/* Зовнішнє кільце */}
          <circle cx="500" cy="500" r="450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" className="text-purple-500/40" />
          {/* Середнє кільце (Орбіта Сатурна) */}
          <circle cx="500" cy="500" r="350" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 5" className="text-zinc-400" />
          {/* Сатурн */}
          <g transform="translate(850, 500)">
            <circle cx="0" cy="0" r="8" fill="currentColor" className="text-amber-600/80" />
            <ellipse cx="0" cy="0" rx="14" ry="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-500/80" />
          </g>
          {/* Внутрішній Трикутник */}
          <polygon points="500,200 240,750 760,750" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="text-purple-800/60 animate-[pulse_6s_ease-in-out_infinite]" />


          {/* --- НОВІ ЕЛЕМЕНТИ --- */}

          {/* A. НОВА ВНУТРІШНЯ ЕЛІПТИЧНА ОРБІТА (Зеленувате свічення) */}
          {/* Використовуємо text-teal-400 і трохи товстішу лінію для ефекту свічення */}
          <ellipse cx="500" cy="500" rx="280" ry="180" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400/40" transform="rotate(-30 500 500)" />

          {/* B. ТОНКИЙ ФІОЛЕТОВИЙ ЕЛЕМЕНТ (Перетинає все вертикально) */}
          <ellipse cx="500" cy="500" rx="480" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20 40" className="text-fuchsia-500/30" transform="rotate(95 500 500)" />

          {/* C. ГРУПА: ЗЕЛЕНА ПЛАНЕТА + ЧЕРВОНИЙ МІСЯЦЬ */}
          {/* Розміщуємо їх на новій зеленій орбіті (координати підібрані вручну, щоб попасти на еліпс) */}
          <g transform="translate(280, 400)">
             
             {/* Зелена планета зі "свіченням" (пульсуюче кільце навколо) */}
             <circle cx="0" cy="0" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-teal-300/50 animate-pulse" />
             <circle cx="0" cy="0" r="10" fill="currentColor" className="text-teal-500" />

             {/* Червоний місяць (яскрава крапка) */}
             {/* Ця група обертається локально навколо зеленої планети */}
             <g className="animate-[spin_6s_linear_infinite]">
                {/* Зсуваємо місяць по осі X на 24 одиниці від центру планети */}
                <circle cx="24" cy="0" r="3.5" fill="currentColor" className="text-red-500 drop-shadow-[0_0_3px_rgba(239,68,68,0.9)]" />
             </g>
          </g>

        </svg>
      </div>

      {/* 3. КОНТР-ОРБІТА (Існуюча, трохи змістив кольори) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmax] h-[90vmax] opacity-25 sm:opacity-20">
         <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_80s_linear_infinite_reverse]">
          <ellipse cx="500" cy="500" rx="400" ry="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 16" className="text-cyan-600/30" transform="rotate(45 500 500)" />
          <circle cx="900" cy="500" r="4" fill="currentColor" className="text-cyan-400/60 animate-ping" />
        </svg>
      </div>

      {/* ДАНІ ТА РАМКИ (Без змін) */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 font-mono text-[8px] sm:text-[9px] text-zinc-400 sm:text-zinc-500 text-right space-y-1">
        <div>SECTOR: 7G-Ω</div>
        <div>VECTOR: {randomVal}</div>
        <div className={`${glitchText !== "STABLE" ? "text-red-400 animate-pulse font-bold" : "text-green-400/80 sm:text-green-500/80"}`}>
          SYS_STATUS: {glitchText}
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 font-mono text-[8px] sm:text-[9px] text-zinc-400 sm:text-zinc-500 space-y-1">
        <div className="tracking-widest border-b border-zinc-700/50 pb-1 mb-1 inline-block">FIG A.1: HUMAN FOLLY</div>
        <div>SCALE: 1:∞</div>
        <div className="opacity-60 hidden sm:block text-purple-400/70">ERROR_LOG_ENABLED</div>
      </div>

      <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-l border-t border-zinc-600/40 sm:border-zinc-700/40 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-r border-b border-zinc-600/40 sm:border-zinc-700/40 rounded-br-3xl" />

      {/* ФОРМУЛИ (Без змін) */}
      <div className="absolute top-[20%] left-[15%] text-purple-300/50 sm:text-purple-200/40 text-[9px] sm:text-[10px] font-serif italic animate-pulse duration-[4000ms]">
        f(x) = ∑ (regret)²
      </div>
      <div className="absolute bottom-[30%] right-[15%] text-cyan-300/50 sm:text-cyan-200/40 text-[9px] sm:text-[10px] font-serif italic animate-pulse duration-[5000ms] delay-700">
        Δt → 0
      </div>
      <div className="absolute top-[60%] left-[10%] text-zinc-300/40 sm:text-zinc-200/30 text-[8px] sm:text-[9px] font-mono animate-pulse duration-[7000ms] delay-1000">
        √(-1) = reality
      </div>

      {/* СКАН-ЛІНІЇ (Без змін) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)`,
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  )
}