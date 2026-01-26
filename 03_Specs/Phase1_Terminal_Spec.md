# Phase 1: The Terminal - Detailed Specification

## 🎯 Мета фази
Створити візуально вражаючий інтерфейс входу, який виглядає як термінал з кінофільмів про хакерів.

## 📋 Task List

### 1. Project Setup ✅
- [x] Ініціалізувати Next.js проєкт
- [x] Налаштувати Tailwind CSS
- [ ] Додати шрифти (JetBrains Mono, Inter)
- [x] Налаштувати TypeScript
- [x] Створити базову структуру папок

### 2. Visual DNA Implementation ✅
- [x] Створити CSS змінні для кольорів
- [x] Налаштувати Tailwind config з готовими кольорами (retro palette)
- [x] Налаштувати шрифти з підтримкою кирилиці
- [x] Створити базові компоненти з clsx/tailwind-merge (Button, Input, Card)
- [x] Імплементувати terminal typing анімацію
- [x] Додати cursor blink ефект

### 3. Login Screen Layout ✅
- [x] Створити головну сторінку `/`
- [x] Верстка terminal container з `h-dvh` (Dynamic Viewport Height)
- [x] Реалізувати Input Mask для дати (DD.MM.YYYY) - текстове введення
- [x] Поле вводу з placeholder "root@retrograde:~$ "
- [x] Кнопка "ІНІЦІЮВАТИ ПРОТОКОЛ"
- [x] Анімація "Connecting to Noosphere..."
- [x] Responsive дизайн для мобільних

### 4. Static Result Card
- [ ] Створити компонент ResultCard
- [ ] Макет з фейковими даними
- [ ] Анімація появи результату
- [ ] Стилізація під terminal вивід

### 5. Polish & Effects
- [ ] Додати scan lines ефект
- [ ] Glitch анімація при завантаженні  
- [ ] Glow ефекти для кнопок
- [ ] Sound effects (опціонально)
- [ ] Тестування на різних пристроях

## 🛠 Technical Requirements

### Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "@next/font": "^14.0.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

### Tailwind Config (Ready to use)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: "#050505",       // Void Black
          surface: "#111111",  // Dark Graphite
          border: "#333333",   // Dim Border
          text: "#E0E0E0",     // Off-white text
          primary: "#FFB000",  // Terminal Amber
          accent: "#00FF41",   // Acid Green
          error: "#FF3333",    // Critical Red
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        serif: ['var(--font-cinzel)', 'serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
```

### Font Setup (Cyrillic Support)
```javascript
// app/layout.tsx
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-jetbrains-mono',
})
```

### File Structure
```
frontend/
├── app/
│   ├── page.tsx              # Main login page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── Terminal/
│   │   ├── TerminalInput.tsx
│   │   ├── TypingAnimation.tsx
│   │   └── ScanLines.tsx
│   └── ResultCard.tsx
├── lib/
│   └── utils.ts
└── tailwind.config.js
```

## 🎨 Design Mockups Needed
- [ ] Desktop login screen
- [ ] Mobile login screen  
- [ ] Result card layout
- [ ] Loading states
- [ ] Error states

## ✅ Definition of Done
- Сторінка завантажується без помилок
- Всі анімації працюють плавно
- Responsive на всіх пристроях
- Код проходить TypeScript перевірку
- Компоненти можна перевикористовувати
- Performance: LCP < 2.5s, FID < 100ms

## 🚨 Critical Path Issues (Tech Lead Review)

### 1. Input Strategy - Avoid Native Date Picker
**Problem:** `<input type="datetime-local">` breaks terminal aesthetic on mobile
**Solution:** Text input with mask pattern (DD.MM.YYYY HH:MM)
- Looks authentic (like Linux console)
- No white iOS date picker popup
- Manual typing maintains hacker vibe

### 2. Viewport Height - Telegram WebApp Fix
**Problem:** `h-screen` fails in Telegram due to dynamic keyboard/header
**Solution:** Use `h-dvh` (Dynamic Viewport Height)
- Adapts to actual available space
- Works correctly in WebApp environment

### 3. Cyrillic Font Support
**Problem:** JetBrains Mono needs explicit cyrillic subset
**Solution:** Import with `subsets: ['cyrillic', 'latin']`
- Ensures Ukrainian characters render correctly
- Prevents fallback to Arial

## 📋 Status: APPROVED FOR DEVELOPMENT
**PM Approval:** ✅ Specification complete and realistic
**Tech Lead Review:** ✅ Critical issues identified and resolved
**Ready for Task 1:** 🚀 Project Setup