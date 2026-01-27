'use client'

interface Planet {
  name: string
  deg: number
  color: string 
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  
  // НАЛАШТУВАННЯ
  // Збільшуємо розмір полотна (300x300), щоб текст помістився зовні
  const VIEW_SIZE = 300
  const CENTER = VIEW_SIZE / 2
  
  const GRID_RADIUS = 80      // Радіус самої сітки радара
  const PLANET_RADIUS = 80    // Планети на краю сітки (або всередині, якщо треба)
  const TEXT_RADIUS = 115     // Текст сильно винесений за межі

  // Математика координат
  const getCoords = (deg: number, radius: number) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return {
      x: CENTER + radius * Math.cos(rad),
      y: CENTER + radius * Math.sin(rad)
    }
  }

  // Розумне вирівнювання тексту, щоб він "тікав" від центру
  const getTextAnchor = (deg: number) => {
    // Нормалізуємо кут 0-360
    const d = ((deg % 360) + 360) % 360
    
    // Якщо зліва (180-360) - текст росте вліво (end)
    // Якщо справа (0-180) - текст росте вправо (start)
    // Маленький буфер для верху і низу (middle)
    if (d > 190 && d < 350) return "end"
    if (d > 10 && d < 170) return "start"
    return "middle"
  }

  // Вертикальне вирівнювання для акуратності
  const getBaseline = (deg: number) => {
    const d = ((deg % 360) + 360) % 360
    if (d > 90 && d < 270) return "hanging" // Для нижньої півсфери текст трохи нижче точки
    return "auto" 
  }

  return (
    <div className="relative w-full aspect-square max-w-[360px] mx-auto my-8 group">
      
      {/* 1. ACID BACKGROUND GLOW */}
      <div className="absolute inset-[10%] rounded-full bg-green-500/5 blur-[50px] animate-pulse" />
      <div className="absolute inset-[20%] rounded-full border border-green-500/20 shadow-[0_0_30px_rgba(0,255,0,0.1)]" />

      {/* 2. SVG SCENE */}
      <svg viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`} className="w-full h-full relative z-10 overflow-visible font-mono">
        
        {/* --- СІТКА РАДАРА (Пунктири) --- */}
        <g className="text-zinc-600">
            {/* Зовнішнє кільце */}
            <circle cx={CENTER} cy={CENTER} r={GRID_RADIUS} fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Внутрішні пунктирні кільця */}
            <circle cx={CENTER} cy={CENTER} r={GRID_RADIUS * 0.66} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx={CENTER} cy={CENTER} r={GRID_RADIUS * 0.33} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            
            {/* Хрестовина */}
            <line x1={CENTER} y1={CENTER - GRID_RADIUS} x2={CENTER} y2={CENTER + GRID_RADIUS} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
            <line x1={CENTER - GRID_RADIUS} y1={CENTER} x2={CENTER + GRID_RADIUS} y2={CENTER} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
        </g>

        {/* --- ПЛАНЕТИ --- */}
        {planets.map((p, i) => {
            const planetPos = getCoords(p.deg, PLANET_RADIUS)
            const textPos = getCoords(p.deg, TEXT_RADIUS)
            const anchor = getTextAnchor(p.deg)
            const baseline = getBaseline(p.deg)

            return (
              <g key={i} className="group/item">
                
                {/* A. ЛІНІЯ ВІД ЦЕНТРУ (Пунктирна, як ти хотів) */}
                <line 
                    x1={CENTER} y1={CENTER} 
                    x2={planetPos.x} y2={planetPos.y} 
                    stroke={p.color} 
                    strokeWidth="1" 
                    strokeDasharray="3 3"
                    className="opacity-40 group-hover/item:opacity-100 transition-opacity" 
                />

                {/* B. "ВУСИК" ДО ТЕКСТУ (Коротка лінія назовні) */}
                <line 
                    x1={planetPos.x} y1={planetPos.y} 
                    x2={textPos.x} y2={textPos.y} 
                    stroke={p.color} 
                    strokeWidth="0.5" 
                    className="opacity-30"
                />

                {/* C. ПЛАНЕТА (Яскрава точка) */}
                {/* Glow effect під точкою */}
                <circle cx={planetPos.x} cy={planetPos.y} r="6" fill={p.color} fillOpacity="0.3" className="animate-pulse" />
                <circle cx={planetPos.x} cy={planetPos.y} r="2.5" fill={p.color} stroke="black" strokeWidth="0.5" />

                {/* D. ТЕКСТ (ЗОВНІ) */}
                <text 
                  x={textPos.x} 
                  y={textPos.y} 
                  fill={p.color} 
                  fontSize="9" 
                  fontWeight="bold"
                  textAnchor={anchor}
                  dominantBaseline={baseline}
                  className="uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
                  style={{
                    textShadow: `0 0 5px ${p.color}`, // Ефект неону
                  }}
                >
                  {p.name}
                </text>
              </g>
            )
        })}

        {/* --- ЦЕНТР (Приціл) --- */}
        <g className="text-green-500 animate-[spin_10s_linear_infinite]">
             <rect x={CENTER - 3} y={CENTER - 3} width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
             <line x1={CENTER} y1={CENTER-6} x2={CENTER} y2={CENTER+6} stroke="currentColor" strokeWidth="1" />
             <line x1={CENTER-6} y1={CENTER} x2={CENTER+6} y2={CENTER} stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
      
      {/* 3. СКАНЕР (Оверлей) */}
      <div className="absolute inset-[15%] rounded-full overflow-hidden pointer-events-none mix-blend-screen opacity-60">
         <div className="w-full h-full bg-[conic-gradient(transparent_270deg,rgba(0,255,0,0.3)_360deg)] animate-[spin_3s_linear_infinite]" />
      </div>

       {/* Декор кутів (Acid style) */}
       <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500 drop-shadow-[0_0_5px_#00ff00]" />
       <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500 drop-shadow-[0_0_5px_#00ff00]" />
       <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500 drop-shadow-[0_0_5px_#00ff00]" />
       <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500 drop-shadow-[0_0_5px_#00ff00]" />
    </div>
  )
}