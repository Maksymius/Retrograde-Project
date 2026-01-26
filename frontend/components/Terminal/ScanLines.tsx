'use client'

import { cn } from '@/lib/utils'

interface ScanLinesProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function ScanLines({ className, intensity = 'low' }: ScanLinesProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none z-10",
        "bg-gradient-to-b from-transparent via-transparent to-transparent",
        {
          'opacity-20': intensity === 'low',
          'opacity-40': intensity === 'medium', 
          'opacity-60': intensity === 'high',
        },
        className
      )}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.1) 2px,
            rgba(0, 255, 65, 0.1) 4px
          )
        `,
        animation: 'scanline 8s linear infinite'
      }}
    />
  )
}