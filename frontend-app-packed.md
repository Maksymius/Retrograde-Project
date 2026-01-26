# Frontend App Directory Pack

Generated: 2025-01-26

## Directory Structure
```
frontend/app/
├── favicon.ico (binary file)
├── globals.css
├── layout.tsx
└── page.tsx
```

---

## File: layout.tsx
```typescript
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Retrograde Terminal",
  description: "Retro-futuristic terminal interface for time travel queries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-retro-bg text-retro-text font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
```

---

## File: page.tsx
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TerminalInput } from '@/components/Terminal/TerminalInput'
import { TypingAnimation } from '@/components/Terminal/TypingAnimation'
import { ScanLines } from '@/components/Terminal/ScanLines'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'
import { SoundIndicator } from '@/components/Terminal/SoundIndicator'
import { ResultCard } from '@/components/ResultCard'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [queryData, setQueryData] = useState({ date: '', location: '' })
  const [glitchTrigger, setGlitchTrigger] = useState(false)
  const [soundActive, setSoundActive] = useState(false)

  const parseInput = (inputStr: string) => {
    // Simple parsing for "DD.MM.YYYY, City" format
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

  const handleSubmit = () => {
    if (input.trim()) {
      const parsed = parseInput(input)
      setQueryData(parsed)
      setIsConnecting(true)
      triggerSound('connection')
      triggerGlitch()
      
      // Simulate connection process with random glitches
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) triggerGlitch()
      }, 500)
      
      setTimeout(() => {
        clearInterval(glitchInterval)
        setIsConnecting(false)
        setShowResult(true)
        triggerSound('beep')
      }, 3000)
    }
  }

  const handleReset = () => {
    setInput('')
    setShowResult(false)
    setQueryData({ date: '', location: '' })
    triggerSound('typing')
  }

  return (
    <main className="relative min-h-dvh bg-black overflow-hidden crt-effect">
      {/* Sound indicator */}
      <SoundIndicator 
        type="connection" 
        active={soundActive}
      />
      
      {/* Scan lines effect */}
      <ScanLines intensity="low" />
      
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-dvh p-4">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Terminal Header */}
          <GlitchEffect trigger={glitchTrigger} intensity="medium">
            <div className="text-center space-y-4">
              <div className="font-mono text-green-400 text-sm">
                {!showWelcome ? (
                  <TypingAnimation 
                    text="RETROGRADE TEMPORAL INTERFACE v2.1.4"
                    speed={30}
                    onComplete={() => setShowWelcome(true)}
                  />
                ) : (
                  <span className={isConnecting ? 'terminal-flicker' : ''}>
                    RETROGRADE TEMPORAL INTERFACE v2.1.4
                  </span>
                )}
              </div>
              
              {showWelcome && !showResult && (
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-mono font-bold text-amber-500">
                    RETROGRADE
                  </h1>
                  <p className="text-gray-300 font-mono text-sm">
                    Введіть дату та місце для аналізу темпоральних аномалій
                  </p>
                </div>
              )}
            </div>
          </GlitchEffect>

          {/* Terminal Input Section */}
          {showWelcome && !isConnecting && !showResult && (
            <div className="space-y-6">
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
                  className="px-8 py-3 text-lg font-mono hover:shadow-retro-primary/50 transition-all duration-300"
                >
                  ІНІЦІЮВАТИ ПРОТОКОЛ
                </Button>
              </div>
              
              <div className="text-center text-gray-400 font-mono text-xs">
                Формат: DD.MM.YYYY, Місто (наприклад: 24.08.1991, Київ)
              </div>
            </div>
          )}

          {/* Connection Animation */}
          {isConnecting && (
            <GlitchEffect trigger={glitchTrigger} intensity="low">
              <div className="text-center space-y-4">
                <div className="font-mono text-green-400 terminal-flicker">
                  <TypingAnimation 
                    text="Connecting to Noosphere..."
                    speed={80}
                  />
                </div>
                <div className="font-mono text-amber-500 text-sm">
                  <TypingAnimation 
                    text="Scanning temporal matrices... 47%"
                    speed={60}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden terminal-glow">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-amber-500 animate-pulse"
                      style={{ width: '47%' }}
                    />
                  </div>
                </div>
              </div>
            </GlitchEffect>
          )}

          {/* Result Display */}
          {showResult && (
            <div className="space-y-6">
              <ResultCard 
                date={queryData.date}
                location={queryData.location}
              />
              
              <div className="text-center">
                <Button 
                  onClick={handleReset}
                  variant="secondary"
                  className="px-6 py-2 font-mono hover:shadow-retro-accent/30 transition-all duration-300"
                >
                  НОВИЙ ЗАПИТ
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
```

---

## File: globals.css
```css
@import "tailwindcss";

@theme {
  --color-retro-bg: #050505;
  --color-retro-surface: #111111;
  --color-retro-border: #333333;
  --color-retro-text: #E0E0E0;
  --color-retro-primary: #FFB000;
  --color-retro-accent: #00FF41;
  --color-retro-error: #FF3333;
  
  --font-family-mono: var(--font-jetbrains-mono), monospace;
  --font-family-sans: var(--font-inter), system-ui, sans-serif;
}

body {
  background-color: var(--color-retro-bg);
  color: var(--color-retro-text);
  font-family: var(--font-family-sans);
  font-feature-settings: "rlig" 1, "calt" 1;
}

/* Terminal cursor */
.cursor::after {
  content: '|';
  animation: blink 1s step-end infinite;
  color: var(--color-retro-accent);
}

/* Scan lines effect */
.scanlines::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    transparent 50%,
    rgba(0, 255, 65, 0.03) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 1;
}

/* Terminal glow effect */
.terminal-glow {
  box-shadow: 
    0 0 20px rgba(0, 255, 65, 0.3),
    inset 0 0 20px rgba(0, 255, 65, 0.1);
}

/* Glitch animations */
@keyframes glitch-slide {
  0% { transform: translateX(-2px); }
  25% { transform: translateX(2px); }
  50% { transform: translateX(-1px); }
  75% { transform: translateX(1px); }
  100% { transform: translateX(0); }
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Enhanced terminal effects */
.terminal-flicker {
  animation: flicker 0.15s infinite linear;
}

.crt-effect {
  position: relative;
}

.crt-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%),
    linear-gradient(0deg, transparent 50%, rgba(0, 255, 65, 0.02) 50%);
  background-size: 100% 100%, 100% 2px;
  pointer-events: none;
  z-index: 1000;
}
```

---

## Binary Files
- `favicon.ico` - Next.js default favicon (binary file, not included in text pack)

---

## Summary
This pack contains all files from the `frontend/app` directory of the Retrograde Terminal project:

- **layout.tsx**: Root layout with font configuration and metadata
- **page.tsx**: Main terminal interface with full user interaction flow
- **globals.css**: Tailwind CSS with custom terminal styling and animations
- **favicon.ico**: Default Next.js favicon (binary)

The app implements a retro-futuristic terminal interface with:
- Typing animations and glitch effects
- Terminal-style input with cursor blinking
- Connection simulation with progress bars
- Result display with temporal analysis data
- Full responsive design optimized for Telegram WebApp