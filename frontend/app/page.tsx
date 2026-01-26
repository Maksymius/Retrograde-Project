'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TerminalInput } from '@/components/Terminal/TerminalInput'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { ScanLines } from '@/components/Terminal/ScanLines'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  const handleSubmit = () => {
    if (input.trim()) {
      setIsConnecting(true)
      // Simulate connection process
      setTimeout(() => {
        setIsConnecting(false)
        // Here we'll show results later
      }, 3000)
    }
  }

  return (
    <main className="relative min-h-dvh bg-retro-bg overflow-hidden">
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
          <div className="text-center space-y-4">
            <div className="font-mono text-retro-accent text-sm">
              {!showWelcome ? (
                <TypingAnimation 
                  text="RETROGRADE TEMPORAL INTERFACE v2.1.4"
                  speed={30}
                  onComplete={() => setShowWelcome(true)}
                />
              ) : (
                "RETROGRADE TEMPORAL INTERFACE v2.1.4"
              )}
            </div>
            
            {showWelcome && (
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

          {/* Terminal Input Section */}
          {showWelcome && !isConnecting && (
            <div className="space-y-6">
              <TerminalInput
                placeholder="root@retrograde:~$ "
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                className="w-full"
              />
              
              <div className="text-center">
                <Button 
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="px-8 py-3 text-lg font-mono"
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
            <div className="text-center space-y-4">
              <div className="font-mono text-retro-accent">
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
                <div className="w-64 h-2 bg-retro-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-retro-accent to-retro-primary animate-pulse"
                    style={{ width: '47%' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}