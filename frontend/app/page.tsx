'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { TerminalInput } from '@/components/Terminal/TerminalInput'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import { SoundIndicator } from '@/components/Terminal/SoundIndicator'
import { ResultCard } from '@/components/ResultCard'
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
  
  // State для відстеження висоти екрану (фікс для мобільних браузерів з баром навігації)
  const [minHeight, setMinHeight] = useState('100vh')

  useEffect(() => {
    // Встановлюємо реальну висоту вьюпорта (dvh fallback)
    setMinHeight(window.innerHeight + 'px')
    
    const handleResize = () => setMinHeight(window.innerHeight + 'px')
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getRandomDate = () => {
    const year = 1970 + Math.floor(Math.random() * 40)
    const month = 1 + Math.floor(Math.random() * 12)
    const day = 1 + Math.floor(Math.random() * 28)
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`
  }

  const examples = [
    { text: `${getRandomDate()}, Kyiv`, label: "KYIV" },
    { text: `${getRandomDate()}, Lviv`, label: "LVIV" },
    { text: `${getRandomDate()}, Odesa`, label: "ODESA" },
  ]

  const parseInput = (inputStr: string) => {
    const parts = inputStr.split(',').map(p => p.trim())
    let date = ''
    let location = ''
    
    for (const part of parts) {
      if (/\d{1,2}[.\-/]\d{1,2}[.\-/]\d{4}/.test(part)) {
        const dateMatch = part.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/)
        if (dateMatch) {
          const [, day, month, year] = dateMatch
          date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
      } else if (part && !date) {
        location = part
      } else if (part && !location) {
        location = part
      }
    }
    
    if (!date && !location && parts.length >= 2) {
      location = parts[0]
      const dateStr = parts[1]
      const dateMatch = dateStr.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/)
      if (dateMatch) {
        const [, day, month, year] = dateMatch
        date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
    
    return {
      date: date || '1991-08-24',
      location: location || 'Unknown Location'
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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        
        const response = await fetch(`${API_URL}/api/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            city: parsed.location,
            date: parsed.date
          })
        })
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()
        setQueryData({ ...parsed, apiResponse: data })
        
        clearInterval(glitchInterval)
        setIsConnecting(false)
        setShowResult(true)
        triggerSound('beep')
        
      } catch (error) {
        clearInterval(glitchInterval)
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
    <main 
      className="relative w-full bg-black overflow-x-hidden crt-effect selection:bg-retro-primary selection:text-black"
      style={{ minHeight: minHeight }} // Динамічна висота для мобільних
    >
      <SoundIndicator type="connection" active={soundActive} />
      
      {/* Background - fixed to avoid scroll issues */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SciFiBackground />
      </div>

      {/* Main Container: justify-center for desktop, py-safe for mobile scroll */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-full w-full p-4 md:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl space-y-4 sm:space-y-8 my-auto">
          
          <GlitchEffect trigger={glitchTrigger} intensity="medium">
            <div className="text-center space-y-2 md:space-y-4 mt-8 md:mt-0">
              {/* Header Info */}
              <div className="font-mono text-green-400 text-[10px] sm:text-xs tracking-widest opacity-70 px-2 h-6">
                {!showWelcome ? (
                  <TypingAnimation 
                    text="RETROGRADE INTERFACE v2.1.4 // LOADING..."
                    speed={20}
                    onComplete={() => setShowWelcome(true)}
                  />
                ) : (
                  <span className={isConnecting ? 'terminal-flicker' : ''}>
                    RETROGRADE INTERFACE v2.1.4 // READY
                  </span>
                )}
              </div>
              
              {showWelcome && !showResult && (
                <div className="space-y-1 mix-blend-screen animate-in fade-in duration-1000">
                  {/* Fluid typography for main title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-amber-500 tracking-tighter leading-none">
                    RETROGRADE
                  </h1>
                  <p className="text-zinc-500 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] px-2">
                     Dept. of Celestial Bureaucracy
                  </p>
                </div>
              )}
            </div>
          </GlitchEffect>

          {showWelcome && !isConnecting && !showResult && (
            <div className="space-y-5 backdrop-blur-md bg-black/40 p-4 sm:p-8 rounded-lg border border-zinc-800/60 shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
              
              {/* INPUT AREA */}
              <div className="w-full relative group">
                {/* Glow effect on focus (handled by component, but wrapper helps) */}
                <TerminalInput
                  placeholder="root@retrograde:~$ "
                  value={input}
                  onChange={(value) => {
                    setInput(value)
                    if (Math.random() > 0.9) triggerSound('typing')
                  }}
                  onSubmit={handleSubmit}
                  className="w-full text-base sm:text-lg" // text-base prevents iOS zoom
                />
              </div>
              
              {/* QUICK ACTIONS (Mobile Optimized) */}
              <div className="space-y-2">
                 <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider text-center sm:text-left">Quick Access Protocols:</p>
                 <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {examples.map((example, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(example.text)}
                      className="
                        text-[10px] sm:text-xs font-mono 
                        text-zinc-400 hover:text-retro-primary 
                        border border-zinc-800 hover:border-retro-primary/50 bg-black/50
                        px-3 py-2 sm:py-1.5 rounded transition-all duration-200
                        active:scale-95 active:bg-retro-primary/10
                      "
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* MAIN BUTTON */}
              <div className="pt-2 sm:pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="
                    w-full py-4 sm:py-5 
                    text-xs sm:text-sm font-mono tracking-[0.25em] 
                    hover:shadow-[0_0_30px_rgba(255,176,0,0.2)] 
                    border-retro-primary/30 active:translate-y-0.5
                  "
                >
                  [ INITIATE_PROTOCOL ]
                </Button>
              </div>
              
              {/* FOOTER INFO */}
              <div className="flex flex-col sm:flex-row justify-between gap-1 text-[9px] font-mono text-zinc-700 uppercase text-center sm:text-left pt-2">
                <span>Format: DD.MM.YYYY, CITY</span>
                <span className="opacity-50">Encypted via StarLink-12</span>
              </div>
            </div>
          )}

          {isConnecting && (
            <GlitchEffect trigger={glitchTrigger} intensity="low">
              <div className="flex flex-col items-center justify-center space-y-6 min-h-[200px]">
                <div className="font-mono text-green-500 terminal-flicker text-xs sm:text-sm">
                  <TypingAnimation text=">>> CONNECTING TO NOOSPHERE..." speed={50} />
                </div>
                
                {/* Mobile-friendly Loader */}
                <div className="w-64 h-1 bg-zinc-900 overflow-hidden rounded-full">
                    <div className="h-full bg-retro-primary w-2/3 animate-[scanline_1.5s_linear_infinite] shadow-[0_0_10px_#FFB000]"/>
                </div>

                <div className="font-mono text-amber-500/70 text-[9px] sm:text-[10px] space-y-1.5 text-left border-l-2 border-amber-900/30 pl-4 py-1">
                  <div className="opacity-50 animate-pulse">Parsing star charts...</div>
                  <div className="opacity-70 animate-pulse delay-75">Aligning planets...</div>
                  <div className="opacity-90 animate-pulse delay-150">Calculating entropy...</div>
                </div>
              </div>
            </GlitchEffect>
          )}

          {showResult && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in zoom-in duration-500 pb-10">
              <ResultCard 
                date={queryData.date}
                location={queryData.location}
                apiResponse={queryData.apiResponse}
              />
              
              <div className="text-center px-4">
                <Button 
                  onClick={handleReset}
                  variant="secondary"
                  className="
                    w-full sm:w-auto
                    text-[10px] sm:text-xs tracking-[0.2em] 
                    border-zinc-800 bg-black hover:border-retro-text hover:bg-zinc-900
                    py-3
                  "
                >
                  &lt; START_NEW_SESSION /&gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}