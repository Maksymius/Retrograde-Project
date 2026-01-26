'use client'

import { useEffect, useState } from 'react'

export const SciFiBackground = () => {
  // Генеруємо рандомні числа для "живого" інтерфейсу
  const [randomVal, setRandomVal] = useState("00.00")

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomVal((Math.random() * 100).toFixed(2))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. Глобальна сітка (Static Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Центральні вісі (Crosshairs) */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800/50" />
      <div className="absolute top-0 left-1/2 h-full w-px bg-zinc-800/50" />

      {/* 3. Обертові кільця (SVG Geometry) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] opacity-10">
        <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_60s_linear_infinite]">
          {/* Зовнішнє пунктирне кільце */}
          <circle cx="500" cy="500" r="450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" className="text-zinc-600" />
          {/* Середнє кільце з засічками */}
          <circle cx="500" cy="500" r="350" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-500" />
          {/* Трикутник (Ілюмінати?) */}
          <polygon points="500,150 200,800 800,800" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-900/50 animate-[pulse_4s_ease-in-out_infinite]" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmax] h-[80vmax] opacity-10">
         <svg viewBox="0 0 1000 1000" className="w-full h-full animate-[spin_40s_linear_infinite_reverse]">
          {/* Еліпс орбіти */}
          <ellipse cx="500" cy="500" rx="400" ry="200" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-500" transform="rotate(45 500 500)" />
          {/* Планета на орбіті */}
          <circle cx="900" cy="500" r="10" fill="currentColor" className="text-zinc-400" />
        </svg>
      </div>

      {/* 4. Технічні написи (Gonzo Data) */}
      <div className="absolute top-10 right-10 font-mono text-[10px] text-zinc-800 text-right space-y-1">
        <div>SECTOR: 7G</div>
        <div>VECTOR: {randomVal}</div>
        <div>CHAOS_COEFF: HIGH</div>
      </div>

      <div className="absolute bottom-10 left-10 font-mono text-[10px] text-zinc-800 space-y-1">
        <div>FIG A.1: HUMAN FOLLY</div>
        <div>SCALE: 1:∞</div>
      </div>

      {/* 5. Декоративні кутові рамки */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-zinc-900 rounded-tl-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-zinc-900 rounded-br-3xl opacity-20" />

      {/* 6. Плаваючі формули (Декор) */}
      <div className="absolute top-1/4 left-1/4 text-zinc-800 text-xs font-serif italic opacity-20 animate-pulse">
        f(x) = ∑ (regret)²
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-zinc-800 text-xs font-serif italic opacity-20 animate-pulse delay-700">
        Δt → 0
      </div>
    </div>
  )
}