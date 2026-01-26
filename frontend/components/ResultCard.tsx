'use client'

import { useState, useEffect } from 'react'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'

interface ResultCardProps {
  date: string
  location: string
}

export function ResultCard({ date, location }: ResultCardProps) {
  // Стани: 0=Start, 1=Grid, 2=Typing, 3=Stamped
  const [stage, setStage] = useState(0)

  const mockData = {
    id: `CASE-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
    entropyLevel: "CRITICAL (98%)",
    karmicDebt: "UNPAYABLE",
    verdict: "Суб'єкт виявляє ознаки хронічної наївності. Планетарна конфігурація вказує на те, що ви народилися не в той час, не в тому місці, і ймовірно, не на тій планеті. Рекомендовано примусове заземлення."
  }

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 500)
    const t2 = setTimeout(() => setStage(2), 1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto relative group my-10 font-mono">
      
      {/* --- БРУТАЛЬНА ОБГОРТКА (Без декору) --- */}
      <div className="relative bg-[#0a0a0a] border border-zinc-800 shadow-2xl transition-all duration-500 overflow-hidden">
        
        {/* Верхня полоса прогресу (як завантаження) */}
        <div className={`h-1 bg-gradient-to-r from-purple-600 to-red-600 transition-all duration-1000 ${stage > 0 ? 'w-full' : 'w-0'}`} />

        {/* --- HEADER --- */}
        <div className="bg-black/50 p-4 border-b border-zinc-800 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">Department of Retrograde</span>
            <div className="flex items-center gap-2 text-red-500">
               <span className={`w-2 h-2 bg-red-500 rounded-sm ${stage < 3 ? 'animate-pulse' : ''}`} />
               <span className="font-bold tracking-widest text-sm">CASE // {mockData.id}</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-zinc-600">SECURE TERMINAL</div>
             <div className="text-xs text-zinc-400 font-bold">{location.toUpperCase()}</div>
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="p-6 space-y-8 relative">
          
          {/* 1. Технічна сітка (Data Grid) */}
          <div className={`grid grid-cols-2 gap-x-8 gap-y-4 transition-all duration-500 ${stage >= 1 ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}>
            <div className="flex flex-col border-l border-zinc-800 pl-3">
              <span className="text-[10px] text-zinc-500 uppercase">Temporal Point</span>
              <span className="text-purple-400">{date}</span>
            </div>
            <div className="flex flex-col border-l border-zinc-800 pl-3">
               <span className="text-[10px] text-zinc-500 uppercase">System Status</span>
               <span className="text-zinc-300">ONLINE</span>
            </div>
            <div className="flex flex-col border-l border-red-900/50 pl-3">
              <span className="text-[10px] text-zinc-500 uppercase">Entropy Level</span>
              <span className="text-red-500 font-bold tracking-wider">{mockData.entropyLevel}</span>
            </div>
            <div className="flex flex-col border-l border-zinc-800 pl-3">
              <span className="text-[10px] text-zinc-500 uppercase">Karmic Debt</span>
              <span className="text-yellow-600 font-bold">{mockData.karmicDebt}</span>
            </div>
          </div>

          {/* 2. Вердикт (Консольний вигляд) */}
          <div className="min-h-[140px] relative mt-6 pt-6 border-t border-dashed border-zinc-800">
            {stage >= 2 && (
              <>
                <div className="text-[10px] text-purple-500/70 mb-2 font-bold flex items-center gap-2">
                   <span>&gt; EXECUTE_VERDICT_PROTOCOL</span>
                </div>
                <div className="text-zinc-300 text-sm leading-7 tracking-wide">
                  <TypingAnimation 
                    text={mockData.verdict} 
                    speed={20} 
                    onComplete={() => setStage(3)} 
                  />
                  {stage === 2 && <span className="inline-block w-2 h-4 ml-1 bg-purple-500 animate-pulse align-middle"/>}
                </div>
              </>
            )}
            
            {/* 3. ШТАМП (Виправлений) */}
            {stage >= 3 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-hidden">
                <div className="
                  relative
                  border-[8px] border-red-600 
                  text-red-600 font-black text-6xl 
                  px-8 py-4
                  tracking-widest uppercase
                  opacity-0 
                  animate-stamp 
                  bg-red-950/20 backdrop-blur-[2px]
                  shadow-[0_0_50px_rgba(220,38,38,0.4)]
                  rotate-[-12deg]
                ">
                  <span className="relative z-10">REJECTED</span>
                  {/* Ефект подвійного штампу (ghosting) */}
                  <span className="absolute top-0 left-0 text-red-500 opacity-30 animate-pulse z-0 blur-[2px]">REJECTED</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-black p-2 text-center text-[9px] text-zinc-700 uppercase tracking-widest border-t border-zinc-900">
           Do not resist • Submission is mandatory
        </div>
      </div>
    </div>
  )
}