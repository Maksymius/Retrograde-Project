'use client'

interface Planet {
  name: string
  deg: number
  color: string
}

export const AstroRadar = ({ planets }: { planets: Planet[] }) => {
  const ORBIT_RADIUS = 80
  const TEXT_RADIUS = 95

  const getCoords = (deg: number, radius: number) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    }
  }

  return (
    <div className="relative w-full aspect-square max-w-[360px] mx-auto my-8 group transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_80px_rgba(0,255,255,0.5)]">
      
      {/* Cyberpunk background */}
      <div className="absolute inset-0 rounded-full bg-black/70 backdrop-blur-xl border-4 border-cyan-500/40 shadow-[inset_0_0_60px_rgba(0,255,255,0.15),0_0_60px_rgba(0,255,255,0.4)]" />

      {/* SVG Radar */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full z-10 overflow-visible">
        
        <defs>
          <filter id="neon-glow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Concentric grid */}
        <circle cx="100" cy="100" r="30" fill="none" stroke="#00FFFF" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#00FFFF" strokeWidth="1" opacity="0.4" strokeDasharray="6 10" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#00FFFF" strokeWidth="2" opacity="0.6" />

        {/* Radial spokes (zodiac-style) */}
        <g opacity="0.4">
          {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => {
            const { x, y } = getCoords(deg, 95)
            return <line key={`spoke-${deg}`} x1="100" y1="100" x2={x} y2={y} stroke="#00FFFF" strokeWidth="1" />
          })}
        </g>

        {/* Planets & aspects */}
        <g>
          {/* Aspect lines - magenta neon */}
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
                  strokeWidth="1"
                  opacity="0.35"
                  filter="url(#neon-glow)"
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
                {/* Radial guide */}
                <line x1="100" y1="100" x2={x} y2={y} stroke={p.color} strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />

                {/* Glow halo */}
                <circle cx={x} cy={y} r="10" fill="none" stroke={p.color} strokeWidth="3" opacity="0.3" className="animate-pulse" />

                {/* Planet core */}
                <circle cx={x} cy={y} r="5" fill={p.color} opacity="0.9" filter="url(#neon-glow)" />
                <circle cx={x} cy={y} r="2" fill="#FFFFFF" />

                {/* Label */}
                <text
                  x={textCoords.x}
                  y={textCoords.y}
                  fill={p.color}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="var(--font-jetbrains-mono)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  filter="url(#neon-glow)"
                  style={{ textShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}` }}
                >
                  {p.name}
                </text>
              </g>
            )
          })}
        </g>

        {/* Center core */}
        <circle cx="100" cy="100" r="8" fill="none" stroke="#00FFFF" strokeWidth="3" opacity="0.7" className="animate-pulse" filter="url(#neon-glow)" />
        <circle cx="100" cy="100" r="3" fill="#00FFFF" opacity="0.9" />
      </svg>

      {/* Dual scanner sweeps */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-full overflow-hidden">
        <div className="w-full h-full bg-[conic-gradient(transparent_240deg,rgba(0,255,255,0.25)_360deg)] animate-[spin_4s_linear_infinite]" />
        <div className="w-full h-full bg-[conic-gradient(transparent_240deg,rgba(255,0,255,0.15)_360deg)] animate-[spin_7s_linear_infinite_reverse]" />
        
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div className="absolute left-1/2 top-0 w-[3px] h-[70%] origin-bottom -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_30px_#00FFFF]" />
        </div>
      </div>

      {/* Cyberpunk HUD corners */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-cyan-400 shadow-[0_0_20px_#00FFFF]" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-cyan-400 shadow-[0_0_20px_#00FFFF]" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-cyan-400 shadow-[0_0_20px_#00FFFF]" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-cyan-400 shadow-[0_0_20px_#00FFFF]" />
    </div>
  )
}