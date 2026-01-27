'use client'

interface Planet {
  name: string
  deg: number
  color: string 
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  
  // НАЛАШТУВАННЯ МАСШТАБУ
  // Зменшуємо радіуси, щоб текст не вилазив за рамки 200x200
  const ORBIT_RADIUS = 65; // Було 80. Радіус, де стоять планети
  const TEXT_RADIUS_BASE = 82;  // Базовий радіус тексту

  // Математика координат (Центр 100,100)
  const getCoords = (deg: number, radius: number) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    }
  }

  // Функція для визначення чи близько планети одна до одної
  const getTextRadius = (currentDeg: number, index: number) => {
    // Перевіряємо чи є сусідні планети в радіусі 30 градусів
    const hasNearbyPlanet = planets.some((p, i) => {
      if (i === index) return false
      const diff = Math.abs(currentDeg - p.deg)
      const minDiff = Math.min(diff, 360 - diff) // враховуємо циклічність
      return minDiff < 30
    })
    
    // Якщо є сусіди - зміщуємо текст далі/ближче залежно від індексу
    if (hasNearbyPlanet) {
      return index % 2 === 0 ? TEXT_RADIUS_BASE + 8 : TEXT_RADIUS_BASE - 8
    }
    return TEXT_RADIUS_BASE
  }

  // Функція для визначення anchor залежно від позиції
  const getTextAnchor = (deg: number): "start" | "middle" | "end" => {
    const normalizedDeg = ((deg % 360) + 360) % 360
    if (normalizedDeg > 45 && normalizedDeg < 135) return "start"
    if (normalizedDeg > 225 && normalizedDeg < 315) return "end"
    return "middle"
  }

  // Функція для вертикального вирівнювання
  const getAlignmentBaseline = (deg: number): "hanging" | "middle" | "baseline" => {
    const normalizedDeg = ((deg % 360) + 360) % 360
    if (normalizedDeg > 315 || normalizedDeg < 45) return "baseline"
    if (normalizedDeg > 135 && normalizedDeg < 225) return "hanging"
    return "middle"
  }

  return (
    // Додаємо p-2 (padding), щоб гарантувати відступ від країв батьківського блоку
    <div className="relative w-full aspect-square max-w-[320px] mx-auto my-8 group p-2">
      
      {/* --- 1. ФОНОВИЙ ШАР (Background) --- */}
      {/* inset-2, щоб фон співпадав з новим розміром сітки */}
      <div className="absolute inset-2 rounded-full border border-retro-border/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-sm" />
      
      {/* --- 2. SVG (Статичні дані) --- */}
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 overflow-visible">
        
        {/* Сітка прицілу (ЗМЕНШЕНІ РАДІУСИ: 25, 50, 75) */}
        <circle cx="100" cy="100" r="25" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#444" strokeWidth="1" />
        
        {/* Хрестовина (трохи коротша, щоб не впиралась в край) */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#222" strokeWidth="1" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#222" strokeWidth="1" />

        {/* ГРУПА ПЛАНЕТ */}
        <g>
          {/* Аспекти */}
          {planets.map((p1, i) => (
            planets.slice(i + 1).map((p2, j) => {
              const c1 = getCoords(p1.deg, ORBIT_RADIUS)
              const c2 = getCoords(p2.deg, ORBIT_RADIUS)
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

          {/* Планети */}
          {planets.map((p, i) => {
            const { x, y } = getCoords(p.deg, ORBIT_RADIUS)
            const textRadius = getTextRadius(p.deg, i)
            const textCoords = getCoords(p.deg, textRadius)
            const textAnchor = getTextAnchor(p.deg)
            const alignmentBaseline = getAlignmentBaseline(p.deg)
            
            return (
              <g key={`planet-${i}`}>
                {/* Пунктир від центру */}
                <line x1="100" y1="100" x2={x} y2={y} stroke={p.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />
                
                {/* Точка планети */}
                <circle cx={x} cy={y} r="4" fill={p.color} fillOpacity="0.2" className="animate-pulse" />
                <circle cx={x} cy={y} r="1.5" fill="#fff" />
                
                {/* Підпис */}
                <text 
                  x={textCoords.x} 
                  y={textCoords.y} 
                  fill={p.color} 
                  fontSize="8" 
                  fontWeight="bold"
                  fontFamily="var(--font-jetbrains-mono)" 
                  textAnchor={textAnchor}
                  alignmentBaseline={alignmentBaseline}
                  style={{ 
                    textShadow: `0 0 10px ${p.color}`,
                    // Додаткова страховка: фон під текстом, щоб читалось на лініях
                    paintOrder: "stroke",
                    stroke: "rgba(0,0,0,0.8)",
                    strokeWidth: "2px",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }}
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
      
      {/* --- 3. СКАНЕР --- */}
      {/* inset-2 також тут, щоб сканер ходив чітко по зовнішньому колу сітки */}
      <div className="absolute inset-2 z-20 pointer-events-none rounded-full overflow-hidden">
         <div className="w-full h-full bg-[conic-gradient(transparent_270deg,rgba(0,255,65,0.15)_360deg)] animate-[spin_4s_linear_infinite]" />
         <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="h-1/2 w-[1px] bg-retro-accent/50 absolute left-1/2 top-0 origin-bottom shadow-[0_0_10px_#00FF41]" />
         </div>
      </div>

      {/* Декоративні кутики (зовнішні) */}
       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-retro-text/30" />
       <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-retro-text/30" />
       <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-retro-text/30" />
       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-retro-text/30" />
    </div>
  )
}