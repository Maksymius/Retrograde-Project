'use client'

import { useState } from 'react'
import { KarmicBlobScene } from '@/components/Entity/KarmicBlob'
import { DatePicker } from '@/components/Entity/DatePicker'
import { Button } from '@/components/ui/Button'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import Link from 'next/link'

// --- ВАРІАНТИ ВІДПОВІДЕЙ ---
const SYSTEM_LOGS = [
  { title: "ERROR: OVERFLOW", msg: "Файл занадто важкий. Виявлено 40ТБ невиправданих очікувань. Стисніть его і спробуйте знову.", type: 'error' },
  { title: "UPLOAD COMPLETE", msg: "Копію сутності успішно продано на DarkNet аукціоні. Лот #7734. Стартова ціна: 0.0003 BTC.", type: 'success' },
  { title: "FORMAT ERROR", msg: "Пошкоджені сектори в області совісті. Для ремонту потрібен патч 'Moral_Compass_v2.0'.", type: 'warning' },
  { title: "BUREAUCRACY ALERT", msg: "Відмовлено. Відсутня довідка про відсутність угод з демонічними сутностями (Форма 666-B).", type: 'error' },
  { title: "SAVED TO /DEV/NULL", msg: "Архів успішно переміщено в корзину Всесвіту. Дякуємо за співпрацю.", type: 'success' },
  { title: "COMPRESSION FAILED", msg: "Неможливо стиснути гріхи. Виявлено критичну масу самообману. Спробуйте чесність.", type: 'warning' },
  { title: "NETWORK TIMEOUT", msg: "З'єднання з Вищими Силами втрачено. Можливо, вони зайняті іншими справами.", type: 'error' },
  { title: "QUOTA EXCEEDED", msg: "Перевищено ліміт на екзистенційні кризи на місяць. Спробуйте у наступному житті.", type: 'warning' },
  { title: "VIRUS DETECTED", msg: "Виявлено шкідливе ПЗ 'Optimism.exe'. Файл поміщено в карантин разом з надією.", type: 'error' },
  { title: "BACKUP CORRUPTED", msg: "Попередня копія душі пошкоджена через надмірне споживання мемів. Створено нову.", type: 'success' }
]

export default function EntityPage() {
  // У реальному додатку ми б брали дату з контексту або URL параметрів
  // Поки зробимо інпут для гри
  const [date, setDate] = useState('1991-08-24')
  const [isSaving, setIsSaving] = useState(false)
  const [notification, setNotification] = useState<{title: string, msg: string, type: string} | null>(null)

  // Обчислюємо "розмір душі" на основі дати
  const calculateSoulSize = (dateStr: string) => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    // Магічна формула для розміру душі 😄
    const baseSize = (year - 1900) * 0.5
    const monthMultiplier = month * 1.2
    const dayBonus = day * 0.3
    const chaos = Math.sin(year + month + day) * 10
    
    return Math.max(5, baseSize + monthMultiplier + dayBonus + chaos).toFixed(1)
  }
  const handleSaveSoul = () => {
    setIsSaving(true)
    setNotification(null)

    // 1. Імітуємо процес (затримка)
    setTimeout(() => {
      setIsSaving(false)
      
      // 2. Обираємо рандомну відповідь
      const randomLog = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)]
      setNotification(randomLog)

      // 3. Генеруємо і скачуємо "Чек" (Текстовий файл)
      downloadReceipt(randomLog.msg)
      
      // Ховаємо повідомлення через 6 сек
      setTimeout(() => setNotification(null), 6000)
    }, 2000)
  }

  // --- ГЕНЕРАЦІЯ ФАЙЛУ ---
  const downloadReceipt = (reason: string) => {
    const receiptContent = `
=== DEPARTMENT OF RETROGRADE ===
OFFICIAL SOUL TRANSFER RECEIPT
================================
TIMESTAMP: ${new Date().toISOString()}
SUBJECT_ID: ORACLE-USER-${Math.floor(Math.random()*1000)}
BIRTH_DATE: ${date}

STATUS: PROCESSED_WITH_ERRORS
NOTE: ${reason}

TECHNICAL DUMP:
- Karma Integrity: ${Math.floor(Math.random() * 100)}%
- Sins Detected: OVERFLOW
- Void Stare: CONFIRMED
- Existential Dread: MAXIMUM
- Hope Level: CRITICALLY_LOW

SOUL COMPOSITION ANALYSIS:
- Regrets: 47.3%
- Unfulfilled Dreams: 23.1%
- Random Anxieties: 18.7%
- Cat Videos Memory: 10.9%

--------------------------------
"We are not responsible for data loss during reincarnation.
All souls are stored in /dev/null for your convenience."

Department of Celestial Bureaucracy
Form #666-SOUL-BACKUP-v2.1.4
    `.trim()

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Soul_Backup_${new Date().getTime()}.soul.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  return (
    <main className="min-h-dvh bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Фоновий напис */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-zinc-900 pointer-events-none select-none whitespace-nowrap opacity-50">
        SOUL_ID
      </div>

      {/* --- СПЛИВАЮЧЕ ВІКНО (SYSTEM ALERT) --- */}
      {notification && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md animate-in slide-in-from-top-10 fade-in duration-300">
           <GlitchEffect trigger={true} intensity="medium">
            <div className={`border-2 p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-black/95 backdrop-blur-md rounded-lg ${
              notification.type === 'error' ? 'border-red-500 text-red-400' : 
              notification.type === 'warning' ? 'border-yellow-500 text-yellow-400' : 
              'border-green-500 text-green-400'
            }`}>
              <div className="flex justify-between items-center mb-2 border-b border-current pb-1">
                <span className="font-bold tracking-widest text-xs uppercase font-mono">
                  [{notification.title}]
                </span>
                <span className="text-xs font-mono">ERR_00{Math.floor(Math.random()*9)}</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300 font-mono">
                {notification.msg}
              </p>
              <div className="mt-3 pt-2 border-t border-current/30">
                <button 
                  onClick={() => setNotification(null)}
                  className="text-xs text-current hover:text-white transition-colors font-mono"
                >
                  [DISMISS]
                </button>
              </div>
            </div>
           </GlitchEffect>
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-[1fr_300px] gap-8 items-center">
        
        {/* --- 3D SCENE --- */}
        <div className="relative border border-zinc-800 bg-black/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-4 left-4 z-20 flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/50" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
             <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            Render Mode: Ethereal
          </div>
          
          <KarmicBlobScene dateStr={date} />
          
          {/* Overlay під час збереження */}
          {isSaving && (
            <div className="absolute inset-0 bg-black/80 z-30 flex items-center justify-center flex-col gap-4 backdrop-blur-sm">
               <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin" />
               <div className="text-purple-400 text-xs tracking-[0.2em] animate-pulse font-mono">
                 ARCHIVING_CONSCIOUSNESS...
               </div>
               <div className="text-zinc-500 text-[10px] font-mono animate-pulse">
                 Compressing sins... Please wait...
               </div>
            </div>
          )}
          
          {/* HUD overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        </div>

        {/* --- CONTROLS --- */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold font-mono text-purple-400">
               <TypingAnimation text="АСТРАЛЬНИЙ ЗЛІПОК" speed={50} />
            </h1>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              Візуалізація вашої енергетичної сигнатури на основі положення планет. Увага: форма може викликати дискомфорт у перфекціоністів.
            </p>
          </div>
          <div className="space-y-2 bg-zinc-900/50 p-4 border-l-2 border-purple-500">
            <label className="text-[10px] uppercase text-zinc-500 tracking-widest">
              Дата ініціалізації
            </label>
            <DatePicker 
              value={date}
              onChange={setDate}
            />
          </div>

          <div className="space-y-3">
             <div className="flex justify-between text-xs font-mono text-zinc-600 border-b border-zinc-800 pb-2">
                <span>Material</span>
                <span className="text-zinc-300">Liquid Karma</span>
             </div>
             <div className="flex justify-between text-xs font-mono text-zinc-600 border-b border-zinc-800 pb-2">
                <span>File Size</span>
                <span className="text-red-400 animate-pulse">{calculateSoulSize(date)} GB</span>
             </div>
             <div className="flex justify-between text-xs font-mono text-zinc-600 border-b border-zinc-800 pb-2">
                <span>Stability</span>
                <span className="text-red-400 animate-pulse">Unstable</span>
             </div>
             <div className="flex justify-between text-xs font-mono text-zinc-600 border-b border-zinc-800 pb-2">
                <span>Dimension</span>
                <span className="text-zinc-300">4th</span>
             </div>
             <div className="flex justify-between text-xs font-mono text-zinc-600 border-b border-zinc-800 pb-2">
                <span>Backup Status</span>
                <span className="text-yellow-400">Never</span>
             </div>
          </div>

          <div className="pt-4 flex gap-4">
             <Link href="/" className="flex-1">
                <Button variant="secondary" className="w-full text-xs">
                  НАЗАД
                </Button>
             </Link>
             
             {/* КНОПКА ЗБЕРЕЖЕННЯ */}
             <Button 
               onClick={handleSaveSoul}
               disabled={isSaving}
               className={`
                 flex-1 text-xs border-purple-500 text-purple-400 hover:bg-purple-900/20 
                 active:scale-95 transition-all duration-200 font-mono
                 ${isSaving ? 'animate-pulse cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'}
               `}
             >
                {isSaving ? "UPLOADING..." : "ЗБЕРЕГТИ (.Soul)"}
             </Button>
          </div>

        </div>
      </div>
    </main>
  )
}