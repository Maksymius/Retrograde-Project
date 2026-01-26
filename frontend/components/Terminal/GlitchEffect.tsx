'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlitchEffectProps {
  children: React.ReactNode
  intensity?: 'low' | 'medium' | 'high'
  trigger?: boolean
  className?: string
}

export function GlitchEffect({ 
  children, 
  intensity = 'medium', 
  trigger = false,
  className 
}: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsGlitching(true)
      const timer = setTimeout(() => setIsGlitching(false), 200)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  const glitchStyles = {
    low: 'animate-pulse',
    medium: 'animate-bounce',
    high: 'animate-ping'
  }

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "transition-all duration-200",
        isGlitching && [
          "filter",
          "contrast-150",
          "brightness-110",
          glitchStyles[intensity]
        ]
      )}>
        {children}
      </div>
      
      {isGlitching && (
        <>
          {/* Glitch overlay layers */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{
              background: `
                linear-gradient(90deg, 
                  transparent 0%, 
                  #ff0000 2%, 
                  transparent 4%,
                  transparent 96%,
                  #00ff00 98%,
                  transparent 100%
                )
              `,
              animation: 'glitch-slide 0.1s infinite'
            }}
          />
          <div 
            className="absolute inset-0 opacity-20 mix-blend-screen"
            style={{
              background: `
                linear-gradient(180deg, 
                  transparent 0%, 
                  #0000ff 50%, 
                  transparent 100%
                )
              `,
              animation: 'glitch-slide 0.15s infinite reverse'
            }}
          />
        </>
      )}
    </div>
  )
}