'use client'

import { useState, useEffect } from 'react'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ArchivistPage() {
  const [mounted, setMounted] = useState(false)
  const [glitch, setGlitch] = useState(false)

  // Фейковий лічильник "зламаних его"
  const [egosCrushed, setEgosCrushed] = useState(14890)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setEgosCrushed(prev => prev + Math.floor(Math.random() * 3))
      if (Math.random() > 0.8) {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 150)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-dvh bg-black overflow-hidden font-mono text-retro-text selection:bg-retro-error">
      
      {/* --- 1. ВАУ-БЕКГРАУНД (Орбіти навколо центру) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        {/* Кільце 1 (Швидке) */}
        <div className="absolute w-[500px] h-[500px] border border-dashed border-retro-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
        {/* Кільце 2 (Повільне, в інший бік) */}
        <div className="absolute w-[700px] h-[700px] border border-retro-accent/20 rounded-full animate-[spin_20s_linear_infinite_reverse]">
            <div className="absolute -top-2 left-1/2 w-4 h-4 bg-retro-accent rounded-full animate-pulse blur-sm" />
        </div>
        {/* Кільце 3 (Велике) */}
        <div className="absolute w-[900px] h-[900px] border border-zinc-800 rounded-full animate-[spin_40s_linear_infinite]">
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-retro-error rounded-full animate-pulse blur-md" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-dvh flex flex-col md:flex-row items-center justify-center gap-12 pt-12 md:pt-0">
        
        {/* --- 2. ФОТОГРАФІЯ (Голограма) --- */}
        <div className="relative group perspective-1000">
          <GlitchEffect trigger={glitch} intensity="high">
            <div className="w-[280px] md:w-[350px] aspect-[3/4] border-2 border-retro-border relative overflow-hidden bg-zinc-900 shadow-[0_0_40px_rgba(255,176,0,0.1)] transition-all duration-500 group-hover:border-retro-primary">
              
              {/* Фото Архіваріуса */}
              <img 
                src="/archivist.jpg" 
                alt="Астральний Архіваріус" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" 
              />

              {/* HUD Оверлей на фотці */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
              <div className="absolute top-4 left-4 text-xs text-retro-primary animate-pulse tracking-widest">REC [🔴]</div>
              <div className="absolute bottom-4 left-4 font-bold text-retro-accent text-sm">ID: ARCH-01-OMEGA</div>
              
              {/* Сітка сканування */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />
            </div>
          </GlitchEffect>
        </div>

        {/* --- 3. ІНФО-ПАНЕЛЬ (Текст) --- */}
        <div className="max-w-md space-y-6 bg-black/50 p-6 backdrop-blur-md border border-zinc-900 rounded-sm relative">
          
          {/* Декоративний кут */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-retro-primary" />

          <div>
            <h1 className="text-3xl font-bold text-retro-primary tracking-tight mb-1">
              <TypingAnimation text="АСТРАЛЬНИЙ АРХІВАРІУС" speed={40} />
            </h1>
            <p className="text-xs text-zinc-500 tracking-[0.3em]">CLASS: OMNISCIENT // SECTOR: KYIV</p>
          </div>

          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed border-l-2 border-retro-border pl-4">
            <p>
              "Ви думаєте, ретроградний Меркурій — це ваша головна проблема? 
              <span className="text-retro-accent"> Наївні.</span> Ваша головна проблема — це генетична схильність до ілюзій."
            </p>
            <p>
              Я — оператор Ноосфери. Моє завдання: зчитувати положення небесних тіл і перекладати їх на мову ваших екзистенційних страждань.
            </p>
          </div>

          {/* Жива статистика */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
            <div>
              <div className="text-xs text-zinc-600 uppercase">Egos Crushed</div>
              <div className="text-2xl font-bold text-retro-error animate-pulse">{egosCrushed.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-600 uppercase">Accuracy</div>
              <div className="text-2xl font-bold text-retro-accent">99.9%</div>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/">
              <Button className="w-full tracking-widest text-xs border-zinc-700 hover:border-retro-accent">
                [ ПОВЕРНУТИСЬ ДО ТЕРМІНАЛУ ]
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
