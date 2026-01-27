'use client'

import { useEffect, useState, useRef } from 'react'

interface Planet {
  name: string
  deg: number
  color: string // передавай сюди hex або класи tailwind
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  const [rotation, setRotation] = useState(0)
  const reqRef = useRef<number>()

  // 1. Оптимізована анімація (60 FPS замість setInterval)
  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.15) % 360) // 0.15 - швидкість обертання
      reqRef.current = requestAnimationFrame(animate)
    }
    reqRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(reqRef.current!)
  }, [])

  // Математика координат
  const getCoords = (deg: number, radius: number = 80) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    }
  }

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto my-8 group">
      
      {/* --- UI RADAR LAYER (Статичний декор) --- */}
      <div className="absolute inset-0 rounded-full border border-retro-border/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-sm" />
      
      {/* SVG Canvas */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        
        {/* Defs для градієнтів */}
        <defs>
          <radialGradient id="radar-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#00FF41" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 2. Сітка координат (Target Grid) */}
        <circle cx="100" cy="100" r="30" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#444" strokeWidth="1" />
        
        {/* Хрестовина */}
        <line x1="100" y1="10" x2="100" y2="190" stroke="#222" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="#222" strokeWidth="1" />

        {/* ОБЕРТОВА ГРУПА (Система планет) */}
        <g transform={`rotate(${rotation} 100 100)`}>
          
          {/* 3. Лінії аспектів (Геометрія) */}
          {planets.map((p1, i) => (
            planets.slice(i + 1).map((p2, j) => {
              const c1 = getCoords(p1.deg)
              const c2 = getCoords(p2.deg)
              return (
                <line 
                  key={`${i}-${j}`}
                  x1={c1.x} y1={c1.y}
                  x2={c2.x} y2={c2.y}
                  stroke="currentColor" 
                  className="text-retro-accent/20" // Дуже тонкі зелені лінії
                  strokeWidth="0.5"
                />
              )
            })
          ))}

          {/* 4. Планети */}
          {planets.map((p) => {
            const { x, y } = getCoords(p.deg)
            const textCoords = getCoords(p.deg, 105) // Текст трохи далі
            
            return (
              <g key={p.name}>
                {/* Пунктир до центру */}
                <line x1="100" y1="100" x2={x} y2={y} stroke={p.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
                
                {/* Тіло планети (Glow effect) */}
                <circle cx={x} cy={y} r="4" fill={p.color} fillOpacity="0.2" />
                <circle cx={x} cy={y} r="1.5" fill="#fff" />
                
                {/* Підпис (Анти-ротація для читабельності) */}
                <text 
                  x={textCoords.x} 
                  y={textCoords.y} 
                  fill={p.color} 
                  fontSize="7" 
                  fontWeight="bold"
                  fontFamily="var(--font-jetbrains-mono)" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  transform={`rotate(${-rotation} ${textCoords.x} ${textCoords.y})`}
                  style={{ textShadow: `0 0 5px ${p.color}` }}
                >
                  {p.name}
                </text>
              </g>
            )
          })}
        </g>
        
        {/* Центр */}
        <circle cx="100" cy="100" r="3" fill="#050505" stroke="#FFB000" strokeWidth="1" />
      </svg>
      
      {/* 5. Скануючий промінь (Radar Sweep) */}
      {/* Це градієнт, що крутиться поверх всього */}
      <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite] pointer-events-none">
         <div className="w-full h-full bg-[conic-gradient(transparent_270deg,rgba(0,255,65,0.1)_360deg)] rounded-full" />
      </div>

      {/* Рамка з кутиками */}
       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-retro-text/30" />
       <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-retro-text/30" />
       <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-retro-text/30" />
       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-retro-text/30" />
    </div>
  )
}