'use client'

interface Planet {
  name: string
  deg: number
  color: string 
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  // Ніяких useState та useEffect. Все робить CSS. Це економить ресурси процесора.

  // Математика координат (Центр 100,100, Радіус 80)
  const getCoords = (deg: number, radius: number = 80) => {
    // -90 градусів, щоб 0 був зверху (як на годиннику 12:00)
    const rad = (deg - 90) * (Math.PI / 180)
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    }
  }

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto my-8 group">
      
      {/* --- 1. ФОНОВИЙ ШАР (Background) --- */}
      <div className="absolute inset-0 rounded-full border border-retro-border/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-sm" />
      
      {/* --- 2. SVG (Статичні дані) --- */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
        
        {/* Сітка прицілу */}
        <circle cx="100" cy="100" r="30" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#444" strokeWidth="1" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="#222" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="#222" strokeWidth="1" />

        {/* ГРУПА ПЛАНЕТ (Вони НЕ крутяться, вони зафіксовані в часі) */}
        <g>
          {/* Аспекти (Лінії зв'язку) */}
          {planets.map((p1, i) => (
            planets.slice(i + 1).map((p2, j) => {
              const c1 = getCoords(p1.deg)
              const c2 = getCoords(p2.deg)
              return (
                <line 
                  key={`link-${i}-${j}`}
                  x1={c1.x} y1={c1.y}
                  x2={c2.x} y2={c2.y}
                  stroke="currentColor" 
                  className="text-retro-accent/20" 
                  strokeWidth="0.5"
                />
              )
            })
          ))}

          {/* Самі Планети */}
          {planets.map((p, i) => {
            const { x, y } = getCoords(p.deg)
            // Текст трохи далі від точки (радіус 105)
            const textCoords = getCoords(p.deg, 105) 
            
            return (
              <g key={`planet-${i}`}>
                {/* Пунктир від центру */}
                <line x1="100" y1="100" x2={x} y2={y} stroke={p.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
                
                {/* Точка планети */}
                <circle cx={x} cy={y} r="4" fill={p.color} fillOpacity="0.2" className="animate-pulse" />
                <circle cx={x} cy={y} r="1.5" fill="#fff" />
                
                {/* Підпис (Завжди читабельний, бо група не крутиться) */}
                <text 
                  x={textCoords.x} 
                  y={textCoords.y} 
                  fill={p.color} 
                  fontSize="8" 
                  fontWeight="bold"
                  fontFamily="var(--font-jetbrains-mono)" 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  style={{ textShadow: `0 0 10px ${p.color}` }}
                >
                  {p.name}
                </text>
              </g>
            )
          })}
        </g>
        
        {/* Центр */}
        <circle cx="100" cy="100" r="2" fill="#fff" />
      </svg>
      
      {/* --- 3. СКАНЕР (Обертається тільки він!) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-full overflow-hidden">
         {/* Градієнтний хвіст радара */}
         <div className="w-full h-full bg-[conic-gradient(transparent_270deg,rgba(0,255,65,0.15)_360deg)] animate-[spin_4s_linear_infinite]" />
         
         {/* Тонка лінія сканера (Лідер променя) */}
         <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="h-1/2 w-[1px] bg-retro-accent/50 absolute left-1/2 top-0 origin-bottom shadow-[0_0_10px_#00FF41]" />
         </div>
      </div>

      {/* Декоративні кутики рамки */}
       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-retro-text/30" />
       <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-retro-text/30" />
       <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-retro-text/30" />
       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-retro-text/30" />
    </div>
  )
}