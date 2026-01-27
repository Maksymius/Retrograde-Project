'use client'

interface Planet {
  name: string
  deg: number
  color: string
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  // ФІКС 1: Зменшені радіуси, щоб текст не вилітав за межі SVG 200x200
  const ORBIT_RADIUS = 62  // Було 80
  const TEXT_RADIUS = 82   // Було 95

  const getCoords = (deg: number, radius: number) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    }
  }

  return (
    // ФІКС 2: Додано p-4 (padding), щоб кути HUD не прилипали до країв
    <div className="relative w-full aspect-square max-w-[340px] mx-auto my-8 group select-none p-2">
      
      {/* Background with subtle glow */}
      <div className="absolute inset-2 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_40px_rgba(0,255,255,0.1)]" />

      {/* SVG Radar */}
      <svg viewBox="0 0 200 200" className="relative w-full h-full z-10 overflow-visible">
        
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Concentric grid (Adjusted to new scale) */}
        <circle cx="100" cy="100" r="25" fill="none" stroke="#00FFFF" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#00FFFF" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#00FFFF" strokeWidth="1" opacity="0.5" />

        {/* Radial spokes (zodiac divisions) */}
        <g opacity="0.2">
          {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => {
            const inner = getCoords(deg, 20)
            const outer = getCoords(deg, 75)
            return <line key={`spoke-${deg}`} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#00FFFF" strokeWidth="0.5" />
          })}
        </g>

        {/* PLANETS & ASPECTS */}
        <g>
          {/* Aspect lines */}
          {planets.map((p1, i) =>
            planets.slice(i + 1).map((p2) => {
              const c1 = getCoords(p1.deg, ORBIT_RADIUS)
              const c2 = getCoords(p2.deg, ORBIT_RADIUS)
              return (
                <line
                  key={`${p1.name}-${p2.name}`}
                  x1={c1.x} y1={c1.y}
                  x2={c2.x} y2={c2.y}
                  stroke="#FF00FF"
                  strokeWidth="0.5"
                  opacity="0.4"
                  className="animate-pulse"
                />
              )
            })
          )}

          {/* Planets */}
          {planets.map((p) => {
            const { x, y } = getCoords(p.deg, ORBIT_RADIUS)
            const textCoords = getCoords(p.deg, TEXT_RADIUS)

            return (
              <g key={p.name}>
                {/* Connector line */}
                <line x1="100" y1="100" x2={x} y2={y} stroke={p.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 2" />

                {/* Planet Body */}
                <circle cx={x} cy={y} r="8" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="0.5" className="animate-pulse" />
                <circle cx={x} cy={y} r="3" fill={p.color} filter="url(#neon-glow)" />
                <circle cx={x} cy={y} r="1" fill="#FFF" />

                {/* Label (ФІКС 3: Paint Order для читабельності на фоні ліній) */}
                <text
                  x={textCoords.x}
                  y={textCoords.y}
                  fill={p.color}
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="var(--font-jetbrains-mono)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ 
                    textShadow: `0 0 8px ${p.color}`,
                    paintOrder: "stroke",
                    stroke: "rgba(0,0,0,0.9)", // Чорна обводка навколо літер
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

        {/* Center core */}
        <circle cx="100" cy="100" r="4" fill="#000" stroke="#00FFFF" strokeWidth="1" />
        <circle cx="100" cy="100" r="1.5" fill="#00FFFF" />
      </svg>

      {/* SINGLE SCANNER SWEEP (ФІКС 4: Один чистий сканер замість хаосу) */}
      <div className="absolute inset-2 z-20 pointer-events-none rounded-full overflow-hidden opacity-80">
        <div className="w-full h-full bg-[conic-gradient(transparent_270deg,rgba(0,255,255,0.1)_360deg)] animate-[spin_4s_linear_infinite]" />
        
        {/* Leading edge line */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div className="absolute left-1/2 top-0 w-[1px] h-1/2 origin-bottom -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#00FFFF]" />
        </div>
      </div>

      {/* Cyberpunk HUD Corners (ФІКС 5: Акуратні кутики) */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]" />
    </div>
  )
}