'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import Link from 'next/link'

// --- БАЗА ДАНИХ "ТОКСИЧНИХ СЦЕНАРІЇВ" (Frontend Mock) ---
const DOOM_SCENARIOS = [
  { title: "ВЗАЄМНЕ ПАРАЗИТУВАННЯ", desc: "Ви будете їсти мозок один одного чайною ложкою. Ідеальний симбіоз для мазохістів.", danger: 88 },
  { title: "ЛЬОДОВИКОВИЙ ПЕРІОД", desc: "Ваші емоційні центри несумісні. Секс можливий тільки в термобілизні.", danger: 45 },
  { title: "ЯДЕРНА ЗИМА", desc: "Конфлікт Марсів. Перша сварка закінчиться викликом поліції або екзорциста.", danger: 99 },
  { title: "НУДЬГА СМЕРТЕЛЬНА", desc: "Ви настільки однакові, що помрете від зевоти на третьому побаченні.", danger: 12 },
  { title: "ФІНАНСОВИЙ КРАХ", desc: "Ваше поєднання Юпітерів гарантує спільні кредити, які будуть віддавати ваші онуки.", danger: 76 },
  { title: "САНТА-БАРБАРА", desc: "Драми, інтриги, зради. Вам сподобається, але психіка вийде з чату.", danger: 69 },
  { title: "ЕНЕРГЕТИЧНИЙ ВАМПІРИЗМ", desc: "Один з вас буде висмоктувати життєві сили іншого. Спойлер: це не ви.", danger: 82 },
  { title: "КОМУНІКАТИВНИЙ КОЛАПС", desc: "Ваші Меркурії говорять різними мовами. Навіть Google Translate здасться.", danger: 54 },
  { title: "РЕВНОЩІ КОСМІЧНОГО МАСШТАБУ", desc: "Ваші Венери конфліктують. Ревнощі до бариста в кав'ярні гарантовані.", danger: 91 },
  { title: "ХРОНІЧНА НЕСИНХРОННІСТЬ", desc: "Ви завжди будете в різних фазах життя. Як два поїзди на паралельних коліях.", danger: 37 },
  { title: "МЕТАФІЗИЧНИЙ ГЛЮК", desc: "Ваші реальності не збігаються. Ви будете жити в паралельних всесвітах під одним дахом.", danger: 63 },
  { title: "КАРМІЧНИЙ БОРГ", desc: "У минулому житті ви були кредитором і боржником. Тепер час розплачуватися.", danger: 85 },
  { title: "ЦИФРОВИЙ ДЕТОКС", desc: "Ваші аури несумісні з Wi-Fi. Доведеться спілкуватися голосом. Жах.", danger: 28 },
  { title: "ЕКЗИСТЕНЦІЙНИЙ ПЕТЧ", desc: "Разом ви будете постійно шукати сенс життя і не знаходити. Романтично.", danger: 74 }
]
function SynastryContent() {
  const searchParams = useSearchParams()
  
  // State
  const [mode, setMode] = useState<'CREATE' | 'VERSUS'>('CREATE')
  const [myDate, setMyDate] = useState('')
  const [partnerDate, setPartnerDate] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  // --- 1. ПЕРЕВІРКА ПАСТКИ (Чи прийшли ми за лінком?) ---
  useEffect(() => {
    // Шукаємо параметр ?trap=... (для вебу)
    const trapData = searchParams.get('trap')
    
    if (trapData) {
      try {
        const decoded = atob(trapData) // Декодуємо Base64
        setPartnerDate(decoded)
        setMode('VERSUS')
      } catch (e) {
        console.error("Link corrupted")
      }
    }
  }, [searchParams])

  // --- 2. ГЕНЕРАЦІЯ ЛІНКА (Для Хижака) ---
  const createTrap = () => {
    if (!myDate) return
    const encoded = btoa(myDate)
    // Генеруємо лінк (використовуємо поточний домен)
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const link = `${currentUrl}/synastry?trap=${encoded}`
    setInviteLink(link)
  }

  // --- 3. СИМУЛЯЦІЯ БИТВИ (Алгоритм Долі) ---
  const fight = () => {
    setAnalyzing(true)
    
    // Імітація бурхливої діяльності
    setTimeout(() => {
      // Хеш-магія: сума цифр дат визначає сценарій (щоб результат був стабільним)
      const num1 = parseInt(myDate.replace(/-/g, '')) || 0
      const num2 = parseInt(partnerDate.replace(/-/g, '')) || 0
      const seed = (num1 + num2) % DOOM_SCENARIOS.length
      
      setResult(DOOM_SCENARIOS[seed])
      setAnalyzing(false)
    }, 3000)
  }
  return (
    <main className="min-h-dvh bg-black text-zinc-300 font-mono p-4 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Фонові ефекти */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] filter contrast-150 brightness-100" />

      <div className="relative z-10 w-full max-w-lg space-y-8">
        
        {/* ХЕДЕР */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-red-500 tracking-tighter uppercase">
            <GlitchEffect trigger={analyzing} intensity="high">
              {mode === 'CREATE' ? 'ПРОТОКОЛ: ПАСТКА' : 'ПРОТОКОЛ: VERSUS'}
            </GlitchEffect>
          </h1>
          <p className="text-xs text-zinc-600 uppercase tracking-[0.3em]">
            SYNASTRY OF DOOM // V.6.6.6
          </p>
        </div>

        {/* --- РЕЖИМ 1: СТВОРЕННЯ ПАСТКИ --- */}
        {mode === 'CREATE' && (
          <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md space-y-6 rounded-lg">
            <div className="space-y-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">ВАША ДАТА ПОЯВИ</label>
              <input 
                type="date" 
                value={myDate}
                onChange={(e) => setMyDate(e.target.value)}
                className="w-full bg-black border border-zinc-700 p-3 text-xl focus:border-red-500 outline-none text-white font-mono rounded"
              />
            </div>

           {/* Гонзо-інструкція */}
            <div className="p-4 bg-zinc-900/50 border-l-2 border-red-500 text-left backdrop-blur-sm">
              <p className="text-[11px] text-zinc-300 leading-relaxed font-mono tracking-wide">
                <span className="text-red-500 font-bold uppercase">ПРОТОКОЛ ХИЖАК:</span> 
                Згенеруйте посилання-приманку. Надішліть об'єкту вашої гормональної залежності. 
                Система змоделює зіткнення ваших его і розрахує час до повного взаємного знищення.
                Ви дізнаєтесь, хто ви одне для одного: кармічні партнери чи співкамерники.
              </p>
              <div className="mt-3 pt-3 border-t border-dashed border-zinc-700">
                <p className="text-[10px] text-zinc-500 italic">
                  "Стосунки — це спільна оренда пекла з правом викупу, якого не існує."
                  <br/>— Архіваріус, Відділ Розбитих Ілюзій
                </p>
              </div>
            </div>

            {!inviteLink ? (
              <Button 
                onClick={createTrap} 
                disabled={!myDate} 
                className="w-full border-red-500 text-red-500 hover:bg-red-900/20 tracking-widest py-4 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              >
                ЗГЕНЕРУВАТИ ПАСТКУ
              </Button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">ВАШЕ ПОСИЛАННЯ:</div>
                <div 
                  className="p-3 bg-red-900/10 border border-red-500/30 text-red-400 text-[10px] break-all font-mono cursor-pointer hover:bg-red-900/20 transition-colors rounded"
                  onClick={() => navigator.clipboard.writeText(inviteLink)}
                  title="Клікніть щоб скопіювати"
                >
                  {inviteLink}
                </div>
                <Button 
                  onClick={() => navigator.clipboard.writeText(inviteLink)} 
                  className="w-full bg-red-600 text-black hover:bg-red-500 font-bold py-3"
                >
                  СКОПІЮВАТИ ОТРУТУ
                </Button>
                <p className="text-[10px] text-zinc-500 text-center leading-relaxed font-mono mt-3 bg-black/50 p-2 border border-zinc-800">
                  STATUS: LINK_GENERATED. WAITING_FOR_TARGET.
                  <br/>
                  Надішліть посилання. При переході дані партнера будуть синхронізовані з вашим профілем.
                  <br/>
                  <span className="text-red-600 font-bold block mt-1">
                    [!] Результат не підлягає оскарженню.
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
        {/* --- РЕЖИМ 2: БИТВА (VERSUS) --- */}
        {mode === 'VERSUS' && !result && (
          <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md space-y-8 relative rounded-lg">
            
            {/* Візуалізація VS */}
            <div className="flex justify-between items-end">
               <div className="text-right">
                 <div className="text-[10px] text-zinc-600 uppercase tracking-wider">ОБ'ЄКТ А (ХИЖАК)</div>
                 <div className="text-xl text-zinc-500 font-mono blur-[2px] hover:blur-none transition-all cursor-help" title="Дані приховано протоколом">
                   {partnerDate || "????-??-??"}
                 </div>
               </div>
               
               <div className="text-2xl font-black text-red-500 italic px-4 animate-pulse">VS</div>
               
               <div className="text-left">
                 <div className="text-[10px] text-zinc-600 uppercase tracking-wider">ОБ'ЄКТ Б (ВИ)</div>
                 <input 
                    type="date" 
                    value={myDate}
                    onChange={(e) => setMyDate(e.target.value)}
                    className="w-32 bg-transparent border-b border-red-500 text-xl text-white font-mono focus:outline-none"
                  />
               </div>
            </div>

            {/* Кнопка запуску симуляції */}
            {!analyzing ? (
              <div className="space-y-3">
                <Button 
                  onClick={fight}
                  disabled={!myDate}
                  className="w-full py-6 text-lg font-black tracking-[0.2em] bg-red-600 hover:bg-red-500 text-black shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] transition-all"
                >
                  РОЗПОЧАТИ КОНФЛІКТ
                </Button>
                <p className="text-[9px] text-zinc-600 text-center font-mono">
                  Система проаналізує ваші кармічні борги і видасть остаточний вердикт
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                 <div className="text-red-500 text-xs tracking-widest animate-pulse">
                   <TypingAnimation text="СИМУЛЯЦІЯ СІМЕЙНИХ СВАРОК..." speed={50} />
                 </div>
                 {/* Лоадер */}
                 <div className="h-2 w-full bg-zinc-800 overflow-hidden rounded-full">
                    <div className="h-full bg-red-600 w-1/2 animate-[scanline_0.5s_linear_infinite]" />
                 </div>
                 <div className="text-[10px] text-zinc-600">
                   Calculating emotional damage...
                 </div>
              </div>
            )}
          </div>
        )}

        {/* --- РЕЗУЛЬТАТ (VERDICT) --- */}
        {result && (
          <div className="animate-in zoom-in duration-300 border-2 border-red-600 bg-black p-6 space-y-6 shadow-[0_0_100px_rgba(220,38,38,0.2)] relative rounded-lg">
            
            {/* Декор "Небезпека" */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-red-500 font-bold tracking-widest text-xs border border-red-600 uppercase rounded">
              WARNING: TOXIC
            </div>

            <div className="text-center space-y-2">
               <h2 className="text-2xl font-black text-white uppercase">{result.title}</h2>
               <div className="h-px w-20 mx-auto bg-red-600/50" />
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed text-center font-mono">
              "{result.desc}"
            </p>

            {/* Шкала небезпеки */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase text-red-500 font-bold">
                <span>Рівень загрози</span>
                <span>{result.danger}%</span>
              </div>
              <div className="h-4 w-full bg-zinc-900 border border-zinc-800 relative overflow-hidden rounded">
                 <div 
                   className="h-full bg-gradient-to-r from-yellow-600 to-red-600 transition-all duration-1000 ease-out"
                   style={{ width: `${result.danger}%` }}
                 />
                 {/* Смужки */}
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.5)_5px,rgba(0,0,0,0.5)_10px)]" />
              </div>
            </div>

            {/* Додаткова інформація */}
            <div className="text-center space-y-2 pt-4 border-t border-zinc-800/50 mt-4">
              <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                ALGORITHM: CHAOS_THEORY_V2 // ACCURACY: PAINFUL
              </p>
              <p className="text-[9px] text-zinc-700">
                <span className="text-red-900 font-bold">DISCLAIMER:</span> Департамент не несе відповідальності за розбиті серця, меблі та втрачені роки життя.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
               <Link href="/">
                 <Button variant="secondary" className="w-full text-[10px]">ВТЕКТИ</Button>
               </Link>
               <Button onClick={() => {setResult(null); setMode('CREATE'); setMyDate(''); setPartnerDate(''); setInviteLink('')}} className="w-full text-[10px] border-red-500 text-red-500 hover:bg-red-900/20">
                 НОВА ЖЕРТВА
               </Button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

// Loading component
function SynastryLoading() {
  return (
    <main className="min-h-dvh bg-black text-zinc-300 font-mono p-4 flex flex-col items-center justify-center">
      <div className="text-red-500 text-xs tracking-widest animate-pulse">
        LOADING SYNASTRY PROTOCOLS...
      </div>
    </main>
  )
}

export default function SynastryPage() {
  return (
    <Suspense fallback={<SynastryLoading />}>
      <SynastryContent />
    </Suspense>
  )
}