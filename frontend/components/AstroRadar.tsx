'use client'

import { useEffect, useState } from 'react'

interface Planet {
  name: string
  deg: number
  color: string
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  const [rotation, setRotation] = useState(0)

  // Повільне обертання всієї системи
  useEffect(() => {
    const interval = setInterval(() => setRotation(r => r + 0.2), 50)
    return () => clearInterval(interval)
  }, [])

  // Математика: переводимо градуси (0-360) в координати (x, y)
  // Центр SVG = 100, 100. Радіус = 80.
  const getCoords = (deg: number, radius: number = 80) => {
    const rad = (deg - 90) * (Math.PI / 180) // -90 щоб 0 був зверху
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    }
  }

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto my-6">
      
      {/* Фоновий декор (статичний приціл) */}
      <div className="absolute inset-0 border border-zinc-800 rounded-full opacity-30" />
      <div className="absolute inset-[15%] border border-zinc-800/50 rounded-full opacity-30 border-dashed" />
      
      {/* SVG Canvas */}
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,255,65,0.2)]">
        
        {/* Обертова група */}
        <g transform={`rotate(${rotation} 100 100)`}>
          
          {/* 1. Лінії аспектів (Геометрія) */}
          {/* Малюємо лінії від кожної планети до кожної іншої (павутина) */}
          {planets.map((p1, i) => (
            planets.slice(i + 1).map((p2, j) => {
              const c1 = getCoords(p1.deg)
              const c2 = getCoords(p2.deg)
              return (
                <line 
                  key={`${i}-${j}`}
                  x1={c1.x} y1={c1.y}
                  x2={c2.x} y2={c2.y}
                  stroke="rgba(0, 255, 65, 0.15)" // Тонкі зелені лінії
                  strokeWidth="0.5"
                />
              )
            })
          ))}

          {/* 2. Планети (Точки і підписи) */}
          {planets.map((p, i) => {
            const { x, y } = getCoords(p.deg)
            // Координати для тексту (трохи далі від центру)
            const textCoords = getCoords(p.deg, 95) 
            
            return (
              <g key={p.name} className="group">
                {/* Лінія до центру */}
                <line x1="100" y1="100" x2={x} y2={y} stroke={p.color} strokeWidth="1" opacity="0.2" />
                
                {/* Точка планети */}
                <circle cx={x} cy={y} r="3" fill="#000" stroke={p.color} strokeWidth="1.5" className="animate-pulse" />
                
                {/* Підпис (Обертаємо текст назад, щоб він не крутився догори дригом) */}
                <text 
                  x={textCoords.x} 
                  y={textCoords.y} 
                  fill={p.color} 
                  fontSize="8" 
                  fontFamily="monospace" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  transform={`rotate(${-rotation} ${textCoords.x} ${textCoords.y})`}
                >
                  {p.name}
                </text>
              </g>
            )
          })}
        </g>
        
        {/* Центр (Чорна діра) */}
        <circle cx="100" cy="100" r="2" fill="#fff" />
      </svg>
      
      {/* Декоративний скануючий промінь */}
      <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite] border-t border-retro-primary/30 opacity-50 pointer-events-none" />
    </div>
  )
}
