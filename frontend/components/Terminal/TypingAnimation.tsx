'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypingAnimation({ 
  text, 
  speed = 50, 
  className,
  onComplete 
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-blink text-retro-accent">|</span>
      )}
    </span>
  )
}