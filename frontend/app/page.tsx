'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TerminalInput } from '@/components/Terminal/TerminalInput'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import { SoundIndicator } from '@/components/Terminal/SoundIndicator'
import { ResultCard } from '@/components/ResultCard'
// 👇 Імпорт нового компоненту
import { SciFiBackground } from '@/components/Terminal/SciFiBackground'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [queryData, setQueryData] = useState<{ 
    date: string; 
    location: string; 
    apiResponse?: any 
  }>({ date: '', location: '' })
  const [glitchTrigger, setGlitchTrigger] = useState(false)
  const [soundActive, setSoundActive] = useState(false)

  const parseInput = (inputStr: string) => {
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

  const handleSubmit = async () => {
    if (input.trim()) {
      const parsed = parseInput(input)
      setQueryData(parsed)
      setIsConnecting(true)
      triggerSound('connection')
      triggerGlitch()
      
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) triggerGlitch()
      }, 500)
      
      try {
        // Call our backend API
        const response = await fetch('http://localhost:8000/api/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: parsed.location,
            date: parsed.date // Expecting format: "1991-08-24"
          })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Store the API response for ResultCard
        setQueryData({
          ...parsed,
          apiResponse: data
        })
        
        clearInterval(glitchInterval)
        setIsConnecting(false)
        setShowResult(true)
        triggerSound('beep')
        
      } catch (error) {
        console.error('API Error:', error)
        clearInterval(glitchInterval)
        
        // Fallback to mock data on error
        setQueryData({
          ...parsed,
          apiResponse: {
            status: "error",
            data: {
              astral_data: {},
              verdict: "Системи Департаменту тимчасово перевантажені космічною бюрократією. Спробуйте пізніше.",
              entropy: "CONNECTION_LOST",
              case_id: "RD-500-ERROR"
            }
          }
        })
        
        setIsConnecting(false)
        setShowResult(true)
        triggerSound('error')
      }
    }
  }

  const handleReset = () => {
    setInput('')
    setShowResult(false)
    setQueryData({ date: '', location: '' })
    triggerSound('typing')
  }

  return (
    <main className="relative min-h-dvh bg-black overflow-hidden crt-effect selection:bg-retro-primary selection:text-black">
      <SoundIndicator type="connection" active={soundActive} />
      
      {/* 👇 ТУТ ТЕПЕР ЖИВЕ НАША НАУКОВА МАГІЯ 👇 */}
      <SciFiBackground />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-dvh p-4">
        <div className="w-full max-w-2xl space-y-8">
          
          <GlitchEffect trigger={glitchTrigger} intensity="medium">
            <div className="text-center space-y-4">
              <div className="font-mono text-green-400 text-[10px] md:text-sm tracking-widest opacity-70">
                {!showWelcome ? (
                  <TypingAnimation 
                    text="RETROGRADE TEMPORAL INTERFACE v2.1.4 // LOADING CORE..."
                    speed={20}
                    onComplete={() => setShowWelcome(true)}
                  />
                ) : (
                  <span className={isConnecting ? 'terminal-flicker' : ''}>
                    RETROGRADE TEMPORAL INTERFACE v2.1.4 // SYSTEM READY
                  </span>
                )}
              </div>
              
              {showWelcome && !showResult && (
                <div className="space-y-2 mix-blend-screen">
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500 tracking-tight">
                    RETROGRADE
                  </h1>
                  <p className="text-zinc-400 font-mono text-xs uppercase tracking-[0.2em]">
                     Department of Celestial Bureaucracy
                  </p>
                </div>
              )}
            </div>
          </GlitchEffect>

          {showWelcome && !isConnecting && !showResult && (
            <div className="space-y-6 backdrop-blur-sm bg-black/20 p-6 rounded border border-zinc-900/50">
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
                  className="w-full md:w-auto px-12 py-4 text-sm font-mono tracking-[0.2em] hover:shadow-[0_0_20px_rgba(255,176,0,0.3)] transition-all duration-300 border-retro-primary/30"
                >
                  [ INITIATE PROTOCOL ]
                </Button>
              </div>
              
              <div className="flex justify-between text-[10px] font-mono text-zinc-600 uppercase">
                <span>Format: DD.MM.YYYY, CITY</span>
                <span>SECURE: SSL/TLS</span>
              </div>
            </div>
          )}

          {isConnecting && (
            <GlitchEffect trigger={glitchTrigger} intensity="low">
              <div className="text-center space-y-6">
                <div className="font-mono text-green-500 terminal-flicker text-xs">
                  <TypingAnimation text=">>> CONNECTING TO NOOSPHERE..." speed={50} />
                </div>
                
                {/* Loader Style Update */}
                <div className="w-full h-1 bg-zinc-900 overflow-hidden">
                    <div className="h-full bg-retro-primary w-1/2 animate-[scanline_2s_linear_infinite]"/>
                </div>

                <div className="font-mono text-amber-500/80 text-[10px] space-y-1 text-left pl-20 border-l border-amber-900/30">
                  <div className="opacity-50">Parsing star charts... OK</div>
                  <div className="opacity-70">Calculating karmic debt... OVERFLOW</div>
                  <div className="opacity-100 animate-pulse">Generating verdict...</div>
                </div>
              </div>
            </GlitchEffect>
          )}

          {showResult && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-500">
              <ResultCard 
                date={queryData.date}
                location={queryData.location}
                apiResponse={queryData.apiResponse}
              />
              
              <div className="text-center">
                <Button 
                  onClick={handleReset}
                  variant="secondary"
                  className="text-xs tracking-[0.2em] border-zinc-700 hover:border-retro-text hover:bg-white/5"
                >
                  &lt; NEW_QUERY /&gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}