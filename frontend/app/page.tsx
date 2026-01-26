'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TerminalInput } from '@/components/Terminal/TerminalInput'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { ScanLines } from '@/components/Terminal/ScanLines'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import { SoundIndicator } from '@/components/Terminal/SoundIndicator'
import { ResultCard } from '@/components/ResultCard'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [queryData, setQueryData] = useState({ date: '', location: '' })
  const [glitchTrigger, setGlitchTrigger] = useState(false)
  const [soundActive, setSoundActive] = useState(false)

  const parseInput = (inputStr: string) => {
    // Simple parsing for "DD.MM.YYYY, City" format
    const parts = inputStr.split(',').map(p => p.trim())
    return {
      date: parts[0] || '',
      location: parts[1] || 'Unknown Location'
    }
  }

  const triggerGlitch = () => {
    setGlitchTrigger(true)
    setTimeout(() => setGlitchTrigger(false), 100)
  }

  const triggerSound = (type: 'typing' | 'beep' | 'connection' | 'error') => {
    setSoundActive(true)
    setTimeout(() => setSoundActive(false), 200)
  }

  const handleSubmit = () => {
    if (input.trim()) {
      const parsed = parseInput(input)
      setQueryData(parsed)
      setIsConnecting(true)
      triggerSound('connection')
      triggerGlitch()
      
      // Simulate connection process with random glitches
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) triggerGlitch()
      }, 500)
      
      setTimeout(() => {
        clearInterval(glitchInterval)
        setIsConnecting(false)
        setShowResult(true)
        triggerSound('beep')
      }, 3000)
    }
  }

  const handleReset = () => {
    setInput('')
    setShowResult(false)
    setQueryData({ date: '', location: '' })
    triggerSound('typing')
  }

  return (
    <main className="relative min-h-dvh bg-retro-bg overflow-hidden crt-effect">
      {/* Sound indicator */}
      <SoundIndicator 
        type="connection" 
        active={soundActive}
      />
      
      {/* Scan lines effect */}
      <ScanLines intensity="low" />
      
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-dvh p-4">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Terminal Header */}
          <GlitchEffect trigger={glitchTrigger} intensity="medium">
            <div className="text-center space-y-4">
              <div className="font-mono text-retro-accent text-sm">
                {!showWelcome ? (
                  <TypingAnimation 
                    text="RETROGRADE TEMPORAL INTERFACE v2.1.4"
                    speed={30}
                    onComplete={() => setShowWelcome(true)}
                  />
                ) : (
                  <span className={isConnecting ? 'terminal-flicker' : ''}>
                    RETROGRADE TEMPORAL INTERFACE v2.1.4
                  </span>
                )}
              </div>
              
              {showWelcome && !showResult && (
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-mono font-bold text-retro-primary">
                    RETROGRADE
                  </h1>
                  <p className="text-retro-text/80 font-mono text-sm">
                    Введіть дату та місце для аналізу темпоральних аномалій
                  </p>
                </div>
              )}
            </div>
          </GlitchEffect>

          {/* Terminal Input Section */}
          {showWelcome && !isConnecting && !showResult && (
            <div className="space-y-6">
              <TerminalInput
                placeholder="root@retrograde:~$ "
                value={input}
                onChange={(value) => {
                  setInput(value)
                  if (Math.random() > 0.9) triggerSound('typing')
                }}
                onSubmit={handleSubmit}
                className="w-full"
              />
              
              <div className="text-center">
                <Button 
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="px-8 py-3 text-lg font-mono hover:shadow-retro-primary/50 transition-all duration-300"
                >
                  ІНІЦІЮВАТИ ПРОТОКОЛ
                </Button>
              </div>
              
              <div className="text-center text-retro-text/60 font-mono text-xs">
                Формат: DD.MM.YYYY, Місто (наприклад: 24.08.1991, Київ)
              </div>
            </div>
          )}

          {/* Connection Animation */}
          {isConnecting && (
            <GlitchEffect trigger={glitchTrigger} intensity="low">
              <div className="text-center space-y-4">
                <div className="font-mono text-retro-accent terminal-flicker">
                  <TypingAnimation 
                    text="Connecting to Noosphere..."
                    speed={80}
                  />
                </div>
                <div className="font-mono text-retro-primary text-sm">
                  <TypingAnimation 
                    text="Scanning temporal matrices... 47%"
                    speed={60}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-2 bg-retro-surface rounded-full overflow-hidden terminal-glow">
                    <div 
                      className="h-full bg-gradient-to-r from-retro-accent to-retro-primary animate-pulse"
                      style={{ width: '47%' }}
                    />
                  </div>
                </div>
              </div>
            </GlitchEffect>
          )}

          {/* Result Display */}
          {showResult && (
            <div className="space-y-6">
              <ResultCard 
                date={queryData.date}
                location={queryData.location}
              />
              
              <div className="text-center">
                <Button 
                  onClick={handleReset}
                  variant="secondary"
                  className="px-6 py-2 font-mono hover:shadow-retro-accent/30 transition-all duration-300"
                >
                  НОВИЙ ЗАПИТ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}