'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { TerminalInput } from '@/components/Terminal/TerminalInput'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import { SoundIndicator } from '@/components/Terminal/SoundIndicator'
import { ResultCard } from '@/components/ResultCard'
import { SciFiBackground } from '@/components/Terminal/SciFiBackground'
import { DatePicker } from '@/components/Entity/DatePicker'
import Link from 'next/link'

export default function HomePage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [queryData, setQueryData] = useState<{ 
    date: string; 
    location: string; 
    apiResponse?: any 
  }>({ date: '1991-08-24', location: '' })
  const [glitchTrigger, setGlitchTrigger] = useState(false)
  const [soundActive, setSoundActive] = useState(false)
  
  // Autocomplete state
  const [cityInput, setCityInput] = useState('')
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  
  // State для відстеження висоти екрану (фікс для мобільних браузерів з баром навігації)
  const [minHeight, setMinHeight] = useState('100vh')
  
  // State для динамічних значень футера (уникаємо hydration mismatch)
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [gravFlux, setGravFlux] = useState('0.000')

  useEffect(() => {
    // Встановлюємо реальну висоту вьюпорта (dvh fallback)
    setMinHeight(window.innerHeight + 'px')
    
    const handleResize = () => setMinHeight(window.innerHeight + 'px')
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Ініціалізуємо динамічні значення на клієнті
    const updateFooter = () => {
      setCurrentDate(new Date().toLocaleDateString('uk-UA'))
      setCurrentTime(new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }))
      setGravFlux((Math.sin(Date.now() / 10000) * 0.5 + 0.5).toFixed(3))
    }
    
    updateFooter()
    const interval = setInterval(updateFooter, 1000)
    return () => clearInterval(interval)
  }, [])

  const triggerGlitch = () => {
    setGlitchTrigger(true)
    setTimeout(() => setGlitchTrigger(false), 100)
  }

  const triggerSound = (type: 'typing' | 'beep' | 'connection' | 'error') => {
    setSoundActive(true)
    setTimeout(() => setSoundActive(false), 200)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.city-autocomplete')) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Autocomplete для міст з debounce
  useEffect(() => {
    const searchCities = async () => {
      if (cityInput.length < 2) {
        setCitySuggestions([])
        return
      }

      setIsLoadingCities(true)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityInput)}&format=json&limit=5&accept-language=en`
        )
        const data = await response.json()
        const cities = data
          .filter((item: any) => item.type === 'city' || item.type === 'town' || item.type === 'administrative')
          .map((item: any) => item.display_name.split(',')[0])
          .filter((city: string, index: number, self: string[]) => self.indexOf(city) === index)
        setCitySuggestions(cities.slice(0, 5))
      } catch (error) {
        console.error('City search error:', error)
        setCitySuggestions([])
      } finally {
        setIsLoadingCities(false)
      }
    }

    const timer = setTimeout(() => {
      if (cityInput.length >= 2) {
        searchCities()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [cityInput])

  const handleCityInput = (value: string) => {
    setCityInput(value)
    setQueryData({ ...queryData, location: value })
    setShowSuggestions(true)
    if (value.length < 2) {
      setCitySuggestions([])
    }
  }

  const selectCity = (city: string) => {
    setCityInput(city)
    setQueryData({ ...queryData, location: city })
    setShowSuggestions(false)
    setCitySuggestions([])
  }

  const handleSubmit = async () => {
    if (queryData.location && queryData.date) {
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
            city: queryData.location,
            date: queryData.date
          })
        })
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()
        setQueryData({ ...queryData, apiResponse: data })
        
        clearInterval(glitchInterval)
        setIsConnecting(false)
        setShowResult(true)
        triggerSound('beep')
        
      } catch (error) {
        clearInterval(glitchInterval)
        setQueryData({
          ...queryData,
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
    setShowResult(false)
    setQueryData({ date: '1991-08-24', location: '' })
    setCityInput('')
    setCitySuggestions([])
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
            <div className="text-center space-y-2 md:space-y-4 mt-16 sm:mt-20 md:mt-24">
              {/* Header Info - System Status */}
              <div className="font-mono text-green-400 text-[10px] sm:text-xs tracking-widest opacity-70 px-2 h-6 flex items-center justify-center">
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

              {/* Cyberpunk Divider */}
              {showWelcome && (
                <div className="w-full max-w-md mx-auto my-8">
                  <div className="h-px w-full bg-zinc-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-900/50 to-transparent w-1/2 animate-[shimmer_2s_infinite] translate-x-[-100%]" />
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              {showWelcome && (
                <div className="flex gap-2 flex-wrap justify-center animate-in fade-in duration-500 delay-500 mt-6">
                  <Link 
                    href="/archivist"
                    className="
                      group relative inline-flex items-center gap-1
                      text-purple-500 hover:text-purple-300
                      border border-purple-500/30 hover:border-purple-400
                      px-2 py-0.5 rounded-sm
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]
                      hover:bg-purple-950/20
                      animate-pulse hover:animate-none
                    "
                    onClick={() => triggerGlitch()}
                  >
                    <span className="text-[8px] sm:text-[9px] tracking-wider font-bold">
                      [ORACLE]
                    </span>
                    <svg 
                      className="w-2 h-2 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {/* Glitch effect on hover */}
                    <span 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.1), transparent)',
                        animation: 'glitch-slide 0.3s infinite'
                      }}
                    />
                  </Link>

                  <Link 
                    href="/entity"
                    className="
                      group relative inline-flex items-center gap-1
                      text-cyan-500 hover:text-cyan-300
                      border border-cyan-500/30 hover:border-cyan-400
                      px-2 py-0.5 rounded-sm
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]
                      hover:bg-cyan-950/20
                      animate-pulse hover:animate-none
                    "
                    onClick={() => triggerGlitch()}
                  >
                    <span className="text-[8px] sm:text-[9px] tracking-wider font-bold">
                      [SOUL_ID]
                    </span>
                    <svg 
                      className="w-2 h-2 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {/* Glitch effect on hover */}
                    <span 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)',
                        animation: 'glitch-slide 0.3s infinite'
                      }}
                    />
                  </Link>

                  <Link 
                    href="/determinism"
                    className="
                      group relative inline-flex items-center gap-1
                      text-green-500 hover:text-green-300
                      border border-green-500/30 hover:border-green-400
                      px-2 py-0.5 rounded-sm
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]
                      hover:bg-green-950/20
                      animate-pulse hover:animate-none
                    "
                    onClick={() => triggerGlitch()}
                  >
                    <span className="text-[8px] sm:text-[9px] tracking-wider font-bold">
                      [SAMSARA]
                    </span>
                    <svg 
                      className="w-2 h-2 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {/* Glitch effect on hover */}
                    <span 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.1), transparent)',
                        animation: 'glitch-slide 0.3s infinite'
                      }}
                    />
                  </Link>

                  <Link 
                    href="/synastry"
                    className="
                      group relative inline-flex items-center gap-1
                      text-red-500 hover:text-red-300
                      border border-red-500/30 hover:border-red-400
                      px-2 py-0.5 rounded-sm
                      transition-all duration-300
                      hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]
                      hover:bg-red-950/20
                      animate-pulse hover:animate-none
                    "
                    onClick={() => triggerGlitch()}
                  >
                    <span className="text-[8px] sm:text-[9px] tracking-wider font-bold">
                      [TOXIC]
                    </span>
                    <svg 
                      className="w-2 h-2 group-hover:translate-x-0.5 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {/* Glitch effect on hover */}
                    <span 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.1), transparent)',
                        animation: 'glitch-slide 0.3s infinite'
                      }}
                    />
                  </Link>
                </div>
              )}
              
              {showWelcome && !showResult && (
                <div className="space-y-1 mix-blend-screen animate-in fade-in duration-1000">
                  {/* Fluid typography for main title with retro effects */}
                  <div className="relative inline-block w-full">
                    {/* Glitch layers */}
                    <h1 
                      className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-red-500/20 tracking-tighter leading-none blur-[1px]"
                      style={{ transform: 'translate(-2px, -2px)' }}
                      aria-hidden="true"
                    >
                      RETROGRADE
                    </h1>
                    <h1 
                      className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-cyan-500/20 tracking-tighter leading-none blur-[1px]"
                      style={{ transform: 'translate(2px, 2px)' }}
                      aria-hidden="true"
                    >
                      RETROGRADE
                    </h1>
                    
                    {/* Main title with effects */}
                    <h1 className="
                      relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                      font-serif font-bold text-amber-500 
                      tracking-tighter leading-none
                      drop-shadow-[0_0_20px_rgba(255,176,0,0.5)]
                      [text-shadow:_0_0_30px_rgb(255_176_0_/_40%),_0_0_60px_rgb(255_176_0_/_20%)]
                      animate-pulse
                      bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600
                      bg-clip-text text-transparent
                      hover:scale-105 transition-transform duration-300
                    ">
                      RETROGRADE
                    </h1>
                    
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                      <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.1)_50%)] bg-[length:100%_4px]"></div>
                    </div>
                  </div>
                  
                  <p className="text-zinc-500 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] px-2">
                     Dept. of Celestial Bureaucracy
                  </p>
                </div>
              )}
            </div>
          </GlitchEffect>

          {showWelcome && !isConnecting && !showResult && (
            <div className="space-y-5 backdrop-blur-md bg-black/40 p-4 sm:p-8 rounded-lg border border-zinc-800/60 shadow-2xl animate-in slide-in-from-bottom-4 duration-700 min-h-[600px]">
              
              {/* Гонзострологічна інструкція */}
              <div className="p-4 bg-amber-900/10 border-l-2 border-amber-500/30 text-left space-y-3">
                <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                  НЕБЕСНА КАНЦЕЛЯРІЯ [Відділ Сарказму]
                </div>
                <p className="text-[10px] text-amber-400 leading-relaxed font-mono">
                  Заповніть формуляр, аби дізнатися, чому світила зійшлися саме так — ніби хтось у вищих сферах мав дивне почуття гумору.
                </p>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-mono">
                  Це справжня <span className="text-amber-400 font-bold">Гонзострологія</span> — суміш астрофізики та сільської магії. 
                  Ми не пророкуємо «успіх і кохання в третьому кварталі».
                </p>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-mono italic">
                  Ми пояснюємо, чому ваша велич відкладена на наступну інкарнацію з кращим бюджетом.
                </p>
              </div>

              {/* INPUT AREA - Date */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-mono leading-relaxed">
                  <span className="text-amber-400 font-bold">Дата народження</span>
                </label>
                <DatePicker
                  value={queryData.date || '1991-08-24'}
                  onChange={(date) => setQueryData({ ...queryData, date })}
                />
              </div>

              {/* INPUT AREA - City with Autocomplete */}
              <div className="w-full relative group city-autocomplete">
                <label className="text-xs text-zinc-400 font-mono leading-relaxed block mb-2">
                  <span className="text-amber-400 font-bold">Місто народження</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => handleCityInput(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Почніть вводити місто..."
                    className="w-full bg-black border border-zinc-700 p-3 text-lg focus:border-amber-500 outline-none text-white font-mono rounded hover:border-amber-400 transition-colors"
                  />
                  
                  {/* Loading indicator */}
                  {isLoadingCities && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Suggestions dropdown */}
                  {showSuggestions && citySuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-black border border-amber-500/30 rounded-lg overflow-hidden z-50 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                      {citySuggestions.map((city, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectCity(city)}
                          className="w-full text-left px-4 py-2 text-sm font-mono text-zinc-300 hover:bg-amber-900/20 hover:text-amber-400 transition-colors border-b border-zinc-800 last:border-b-0"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* MAIN BUTTON */}
              <div className="pt-2 sm:pt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={!queryData.location || !queryData.date}
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
                <span>Гонзострологія v2.1.4</span>
                <span className="opacity-50">Encrypted via StarLink-12</span>
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

      {/* Астрологічний футер */}
      {currentDate && (
        <div className="fixed bottom-0 right-0 p-4 text-[9px] font-mono text-zinc-700 text-right space-y-0.5 pointer-events-none select-none">
          <div className="opacity-70">
            Updated: {currentDate}
          </div>
          <div className="opacity-60">
            Astro Time: {currentTime} UTC
          </div>
          <div className="opacity-50">
            Gravitational Flux: {gravFlux}G
          </div>
          <div className="opacity-40 text-[8px] mt-1">
            © TAob
          </div>
        </div>
      )}
    </main>
  )
}