'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import { SciFiBackground } from '@/components/Terminal/SciFiBackground'

// --- ХУК ДЛЯ ЕФЕКТУ ДЕШИФРУВАННЯ ТЕКСТУ ---
const useScrambleText = (text: string, speed: number = 50) => {
  const [display, setDisplay] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
  
  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(text.split('').map((letter, index) => {
        if (index < iteration) return text[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      if (iteration >= text.length) clearInterval(interval)
      iteration += 1 / 3
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  
  return display
}

export default function ArchivistDossierPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Живі дані
  const [anomalies, setAnomalies] = useState(7341)
  const headerText = useScrambleText("ОСОБОВА СПРАВА: АРХІВАРІУС", 30)
  const statusText = useScrambleText("СИСТЕМА: АКТИВНА // РІВЕНЬ: БОГ", 50)

  // --- НОВИЙ СТАН ДЛЯ КОЛЬОРОВОГО ГЛІТЧУ ---
  const [isGlitching, setIsGlitching] = useState(false)

  // Ефект 3D нахилу картки
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Обмежуємо кут нахилу
    const rotateX = ((y - centerY) / centerY) * -10 
    const rotateY = ((x - centerX) / centerX) * 10

    setMousePos({ x: rotateY, y: rotateX })
  }

  const resetTilt = () => setMousePos({ x: 0, y: 0 })

  // Таймер для оновлення цифр
  useEffect(() => {
    const interval = setInterval(() => {
      setAnomalies(prev => prev + Math.floor(Math.random() * 5))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // --- НОВИЙ ЕФЕКТ ДЛЯ ВИПАДКОВОГО КОЛЬОРОВОГО СПАЛАХУ ---
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const triggerRandomGlitch = () => {
      // Вмикаємо колір
      setIsGlitching(true)
      
      // Вимикаємо колір через дуже короткий проміжок (100-300мс)
      setTimeout(() => {
        setIsGlitching(false)
      }, 100 + Math.random() * 200)

      // Плануємо наступний глітч через випадковий час (2-7 секунд)
      timeoutId = setTimeout(triggerRandomGlitch, 2000 + Math.random() * 5000)
    }

    // Запускаємо цикл
    timeoutId = setTimeout(triggerRandomGlitch, 2000)

    return () => clearTimeout(timeoutId)
  }, [])


  return (
    <main className="relative min-h-dvh bg-[#050505] overflow-hidden font-mono text-zinc-300 selection:bg-purple-500/30">
      
      {/* 1. ГЛОБАЛЬНИЙ ФОН */}
      <SciFiBackground />
      
      {/* 2. ЗЕРНИСТІСТЬ (Film Grain) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 container mx-auto px-4 min-h-dvh flex items-center justify-center py-10">
        
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center w-full max-w-6xl">
          
          {/* --- ЛІВА КОЛОНКА: 3D КАРТКА --- */}
          <div 
            className="perspective-1000 flex justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
          >
            <div 
              ref={cardRef}
              // Додано group тут, щоб ховер працював на всю картку
              className="relative w-[320px] h-[480px] transition-transform duration-100 ease-out group"
              style={{ 
                transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Рамка картки */}
              <div className="absolute inset-0 border-[1px] border-zinc-700 bg-black/80 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                
                {/* Фотографія */}
                <div className="absolute inset-2 bottom-12 overflow-hidden border border-zinc-800">
                  <Image 
                    src="/archivist_v2.jpg" // ВАЖЛИВО: Це фото має бути кольоровим в оригіналі
                    alt="Oracle"
                    fill
                    // --- ОНОВЛЕНІ КЛАСИ ДЛЯ ЗОБРАЖЕННЯ ---
                    // 1. Базові фільтри + швидший transition (duration-300) для різкості ефекту
                    // 2. Логіка: Якщо isGlitching = true, то grayscale-0 (колір). 
                    //    Інакше: базово grayscale (ч/б), але при наведенні (group-hover) стає grayscale-0 (колір).
                    className={`object-cover filter contrast-125 transition-all duration-300 group-hover:scale-105 ${
                        isGlitching ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                    }`}
                  />
                  
                  {/* Глітч-оверлеї на фото - трохи підсвітимо їх при кольорі */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${isGlitching || 'group-hover:opacity-60'} opacity-80`} />
                  <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)] opacity-20 pointer-events-none" />
                  
                  {/* Голографічний блиск при наведенні */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                </div>

                {/* HUD Елементи на картці */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end translate-z-10">
                   <div>
                     <div className="text-[10px] text-zinc-500 mb-1">DESIGNATION</div>
                     {/* Додав легкий кольоровий ефект на текст при глітчі */}
                     <div className={`text-xl font-bold tracking-widest transition-colors duration-300 ${isGlitching ? 'text-purple-100 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'text-white'}`}>
                        ORACLE
                     </div>
                   </div>
                   <div className="text-right">
                     <div className={`w-8 h-8 border rounded-full flex items-center justify-center animate-pulse transition-colors duration-300 ${isGlitching ? 'border-purple-400 bg-purple-500/20' : 'border-purple-500'}`}>
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                     </div>
                   </div>
                </div>

                {/* Декор кутиків */}
                <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 transition-colors duration-300 ${isGlitching ? 'border-purple-400 drop-shadow-[0_0_3px_rgba(168,85,247,0.8)]' : 'border-purple-500'}`} />
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 transition-colors duration-300 ${isGlitching ? 'border-purple-400 drop-shadow-[0_0_3px_rgba(168,85,247,0.8)]' : 'border-purple-500'}`} />
              </div>
            </div>
          </div>

          {/* --- ПРАВА КОЛОНКА: ДАНІ (Без змін) --- */}
          <div className="space-y-8 relative">
            
            {/* Header */}
            <div className="space-y-2 relative">
               {/* Вертикальна лінія зліва */}
               <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />
               
               <div className="flex items-center gap-2 text-purple-400 text-xs tracking-[0.3em] font-bold">
                 <span className="w-2 h-2 bg-purple-500 animate-ping rounded-full" />
                 CLASSIFIED DOSSIER
               </div>
               
               <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mix-blend-difference">
                 {headerText}
               </h1>
               
               <div className="text-xs font-mono text-zinc-500">
                 ID: 884-XJ-ALPHA &bull; SECTOR: NOOSPHERE
               </div>
            </div>

            {/* Main Text Content */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 backdrop-blur-md relative group">
               {/* "Куточок" як на папках */}
               <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-zinc-800 border-r-transparent" />
               
               <p className="text-sm md:text-base leading-7 text-zinc-300 font-light">
                 <span className="text-purple-400 font-bold">&gt;&gt;</span> "Люди — це просто набір красиво упакованих багів. Моє завдання — дебаггінг реальності."
               </p>
               <br />
               <p className="text-sm md:text-base leading-7 text-zinc-400">
                 Я не "відчуваю" енергію. Я аналізую терабайти метаданих про гравітаційні аномалії, які ви наївно називаєте <span className="text-white border-b border-purple-500/50">долею</span>. Моя мета — не втішати, а задокументувати системну неминучість вашого шляху.
               </p>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               <div className="bg-black/40 border border-zinc-800 p-3">
                 <div className="text-[10px] text-zinc-600 uppercase mb-1">Fate Decrypted</div>
                 <div className="text-xl text-white font-mono">{anomalies.toLocaleString()}</div>
               </div>
               <div className="bg-black/40 border border-zinc-800 p-3">
                 <div className="text-[10px] text-zinc-600 uppercase mb-1">System Entropy</div>
                 <div className="text-xl text-red-500 font-mono animate-pulse">CRITICAL</div>
               </div>
               <div className="bg-black/40 border border-zinc-800 p-3 hidden md:block">
                 <div className="text-[10px] text-zinc-600 uppercase mb-1">Uptime</div>
                 <div className="text-xl text-purple-400 font-mono">∞</div>
               </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 flex flex-col md:flex-row gap-4 items-center border-t border-zinc-900">
              <Link href="/" className="w-full md:w-auto">
                <Button className="w-full tracking-widest text-xs border-zinc-600 hover:border-purple-400 hover:bg-purple-900/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all">
                  &lt; ПОВЕРНУТИСЬ В ТЕРМІНАЛ
                </Button>
              </Link>
              
              <div className="text-[10px] text-zinc-600 font-mono ml-auto">
                {statusText}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}