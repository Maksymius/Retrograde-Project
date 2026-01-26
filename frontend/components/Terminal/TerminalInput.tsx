'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface TerminalInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  className?: string
}

export function TerminalInput({ 
  placeholder = "root@retrograde:~$ ", 
  value, 
  onChange, 
  onSubmit,
  className 
}: TerminalInputProps) {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center bg-gray-900/50 border border-green-400 rounded-lg p-4 terminal-glow">
        <span className="text-green-400 font-mono text-sm mr-2 whitespace-nowrap">
          {placeholder}
        </span>
        <Input
          variant="terminal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-none bg-transparent p-0 focus:ring-0 flex-1"
          autoFocus
        />
        <span className={cn(
          "text-green-400 font-mono text-sm ml-1",
          showCursor ? "opacity-100" : "opacity-0"
        )}>
          |
        </span>
      </div>
    </div>
  )
}