'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface SoundIndicatorProps {
  type?: 'typing' | 'beep' | 'connection' | 'error'
  active?: boolean
  className?: string
}

export function SoundIndicator({ 
  type = 'typing', 
  active = false,
  className 
}: SoundIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [active])

  const getIndicatorStyle = () => {
    switch (type) {
      case 'typing':
        return 'bg-retro-accent'
      case 'beep':
        return 'bg-retro-primary'
      case 'connection':
        return 'bg-blue-400'
      case 'error':
        return 'bg-retro-error'
      default:
        return 'bg-retro-accent'
    }
  }

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50",
      "w-3 h-3 rounded-full",
      "animate-pulse",
      getIndicatorStyle(),
      className
    )}>
      <div className={cn(
        "absolute inset-0 rounded-full animate-ping",
        getIndicatorStyle(),
        "opacity-75"
      )} />
    </div>
  )
}