'use client'

import { useState, useEffect } from 'react'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { AstroRadar } from '@/components/AstroRadar' // Переконайся, що шлях правильний

interface ResultCardProps {
  date: string
  location: string
  apiResponse?: any
}

export function ResultCard({ date, location, apiResponse }: ResultCardProps) {
  // Стани: 0=Start, 1=Grid, 2=Radar, 3=Typing, 4=Stamped
  const [stage, setStage] = useState(0)

  // --- 1. ПІДГОТОВКА ДАНИХ (Fallback Logic) ---
  // Якщо API впало або ще не відповіло, показуємо заглушку
  const data = apiResponse?.data || {
    astral_data: { Sun: "Unknown", Moon: "Unknown", Asc: "Unknown" },
    verdict: "Системи Департаменту тимчасово недоступні через магнітну бурю. Спробуйте пізніше.",
    entropy: "SYSTEM_ERROR",
    case_id: "ERR-500"
  }

  // Дані для Радара (якщо бекенд не надіслав координати, малюємо фейкові для краси)
  // В реальності твій бек має слати масив: [{name: 'SUN', deg: 120, color: '#FFB000'}, ...]
  const chartData = data.astral_data?.chart_data || [
    { name: "SUN", deg: 45, color: "#FFB000" },   // Сонце (Жовте)
    { name: "MOON", deg: 160, color: "#E0E0E0" },  // Місяць (Білий)
    { name: "MARS", deg: 210, color: "#FF3333" },  // Марс (Червоний)
    { name: "MERC", deg: 30, color: "#00FF41" },   // Меркурій (Зелений)
    { name: "VEN", deg: 330, color: "#FF3399" },   // Венера (Рожева)
    { name: "SAT", deg: 270, color: "#555555" },   // Сатурн (Сірий)
  ]

  const displayData = {
    id: data.case_id || `CASE-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
    entropyLevel: data.entropy || "CALCULATING...",
    karmicDebt: data.entropy === "CRITICAL" ? "UNPAYABLE" :
                data.entropy === "HIGH" ? "SEVERE" :
                data.entropy === "MEDIUM" ? "MODERATE" : "MINIMAL",
    verdict: data.verdict,
    astral: data.astral_data
  }

  // --- 2. АНІМАЦІЙНИЙ ЛАНЦЮЖОК ---
  useEffect(() => {
    // Таймінги появи елементів
    const t1 = setTimeout(() => setStage(1), 300)   // Сітка даних
    const t2 = setTimeout(() => setStage(2), 1000)  // Радар
    const t3 = setTimeout(() => setStage(3), 2000)  // Початок друку тексту
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    // font-mono для всього блоку, відступи адаптивні (my-4 -> my-10)
    <div className="w-full max-w-2xl mx-auto relative group my-4 sm:my-8 font-mono select-none">
      
      {/* --- БРУТАЛЬНИЙ КОНТЕЙНЕР --- */}
      <div className="relative bg-[#080808] border border-zinc-800 shadow-2xl overflow-hidden rounded-sm transition-colors duration-500 hover:border-zinc-700">
        
        {/* Верхня лінія завантаження (Progress Bar effect) */}
        <div className={`h-1 bg-gradient-to-r from-retro-primary via-retro-error to-purple-600 transition-all duration-[2000ms] ease-out ${stage > 0 ? 'w-full' : 'w-0'}`} />

        {/* --- HEADER --- */}
        {/* Flex-col на мобільному (економимо ширину), Flex-row на десктопі */}
        <div className="bg-black/60 p-3 sm:p-4 border-b border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 backdrop-blur-md">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.15em]">Dept. of Retrograde // Official Record</span>
            <div className="flex items-center gap-2 text-retro-error">
               <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-retro-error rounded-sm ${stage < 4 ? 'animate-pulse' : ''}`} />
               <span className="font-bold tracking-wider text-xs sm:text-sm">{displayData.id}</span>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-zinc-900 pt-2 sm:pt-0 mt-1 sm:mt-0">
             <div className="text-[9px] sm:text-[10px] text-zinc-600">SECURE TERMINAL // V.2.4</div>
             <div className="text-xs text-zinc-300 font-bold truncate max-w-[200px]">{location.toUpperCase()}</div>
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="p-4 sm:p-6 space-y-6 relative">
          
          {/* 1. DATA GRID (Таблиця) */}
          <div className={`grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-4 transition-all duration-700 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Ліва колонка */}
            <div className="space-y-4">
              <div className="flex flex-col border-l-2 border-zinc-800 pl-3">
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Temporal Point</span>
                <span className="text-retro-text text-xs sm:text-sm">{date}</span>
              </div>
              <div className="flex flex-col border-l-2 border-retro-primary/40 pl-3">
                 <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Sun Sign</span>
                 <span className="text-retro-primary text-xs sm:text-sm font-bold">{displayData.astral.Sun || "N/A"}</span>
              </div>
              <div className="flex flex-col border-l-2 border-purple-500/40 pl-3">
                 <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Moon Sign</span>
                 <span className="text-purple-400 text-xs sm:text-sm font-bold">{displayData.astral.Moon || "N/A"}</span>
              </div>
            </div>

            {/* Права колонка */}
            <div className="space-y-4">
              <div className="flex flex-col border-l-2 border-zinc-800 pl-3">
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">System Status</span>
                <span className="text-green-500 text-xs sm:text-sm">ONLINE</span>
              </div>
              <div className="flex flex-col border-l-2 border-retro-error/40 pl-3">
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Entropy Level</span>
                <span className="text-retro-error font-bold tracking-wider text-xs sm:text-sm">{displayData.entropyLevel}</span>
              </div>
              <div className="flex flex-col border-l-2 border-yellow-600/40 pl-3">
                <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase">Karmic Debt</span>
                <span className="text-yellow-500 font-bold text-xs sm:text-sm">{displayData.karmicDebt}</span>
              </div>
            </div>
          </div>

          {/* 2. RADAR VISUALIZATION */}
          {/* Це додає візуального "жиру" картці. Ховаємо, поки не завантажиться */}
          <div className={`transition-all duration-1000 ease-out flex justify-center py-2 ${stage >= 2 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}`}>
             <AstroRadar planets={chartData} />
          </div>

          {/* 3. VERDICT SECTION */}
          <div className="min-h-[140px] sm:min-h-[160px] relative mt-4 pt-4 border-t border-dashed border-zinc-800/50">
            {stage >= 3 && (
              <>
                <div className="text-[9px] sm:text-[10px] text-retro-primary/60 mb-3 font-bold flex items-center gap-2">
                   <span>&gt; EXECUTE_VERDICT_PROTOCOL.EXE</span>
                </div>
                <div className="text-zinc-300 text-xs sm:text-sm leading-6 sm:leading-7 tracking-wide text-justify sm:text-left">
                  <TypingAnimation 
                    text={displayData.verdict} 
                    speed={25} // Швидкість друку
                    onComplete={() => {
                      // Ставимо штамп через 0.8с після завершення тексту
                      setTimeout(() => setStage(4), 800)
                    }} 
                  />
                  {/* Курсор під час друку */}
                  {stage === 3 && <span className="inline-block w-1.5 h-3.5 sm:w-2 sm:h-4 ml-1 bg-retro-primary animate-pulse align-middle"/>}
                </div>
              </>
            )}
            
            {/* 4. ШТАМП (Фінальний акорд) */}
            {stage >= 4 && (
              <div className="absolute bottom-0 right-0 sm:bottom-4 sm:right-4 z-50 pointer-events-none origin-bottom-right">
                <div className="
                  relative
                  border-[3px] sm:border-[5px] border-retro-error 
                  text-retro-error font-black 
                  text-xl sm:text-3xl 
                  px-3 py-1 sm:px-4 sm:py-2
                  tracking-widest uppercase
                  animate-stamp 
                  bg-red-950/10 backdrop-blur-[1px]
                  shadow-[0_0_15px_rgba(255,51,51,0.3)]
                  rotate-[-12deg]
                  mix-blend-hard-light
                ">
                  REJECTED
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* FOOTER */}
        <div className="bg-[#050505] p-2 text-center text-[8px] sm:text-[9px] text-zinc-700 uppercase tracking-widest border-t border-zinc-900 flex justify-between px-4">
           <span>Id: {displayData.id.split('-')[1]}</span>
           <span>Submission is mandatory</span>
        </div>
      </div>
    </div>
  )
}