'use client'

import { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { GlitchEffect } from '@/components/Terminal/GlitchEffect'

// --- 1. ФІЛОСОФСЬКИЙ ЛОГЕР ---
const SIMULATION_LOGS = [
  "Trying to bypass Karma... Access Denied.",
  "Simulation #402: Subject married a billionaire -> Boredom Death.",
  "Simulation #891: Removed procrastination -> Subject exploded from stress.",
  "Checking multiverse where you bought Bitcoin in 2010... File Corrupted.",
  "Injecting discipline into Mars sector... Rejection.",
  "Optimizing Chakra alignment... Error 404: Soul not found.",
  "Calculating trajectory without 'Monday mornings'... Impossible.",
  "Scenario: 'I will start gym tomorrow'... Loop detected.",
  "Testing reality where you never met your ex... Paradox Error.",
  "Simulation #1337: Subject became enlightened -> Got bored, started TikTok.",
  "Attempting to remove anxiety... System crash: Nothing left to process.",
  "Checking timeline where you said 'No' to pizza... Universe.exe stopped working."
]
// --- 2. 3D ВИХОР ЧАСТИНОК (Samsara Vortex) ---
const ParticleVortex = ({ speed, gathering }: { speed: number, gathering: boolean }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const count = 3000
  
  // Генеруємо початкові позиції
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!mesh.current) return

    particles.forEach((particle, i) => {
      let { t, factor, speed: pSpeed, xFactor, yFactor, zFactor } = particle
      
      // Магія руху: частинки крутяться по спіралі
      t = particle.t += pSpeed / 2 * speed
      
      // Рівняння Лоренца-лайк (хаос)
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t) * 0.5 + 0.5 // Нормалізуємо для масштабу
      
      // Позиціонування
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      
      // Якщо йде збірка, тягнемо все в центр (0,0,0)
      if (gathering) {
         dummy.position.lerp(new THREE.Vector3(0, 0, 0), 0.05)
      }

      dummy.scale.set(s * 0.5 + 0.5, s * 0.5 + 0.5, s * 0.5 + 0.5)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  // Колір залежить від стану
  const currentColor = gathering ? "#FF3333" : "#00FF41"

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.05, 0]} />
        <meshPhongMaterial color={currentColor} wireframe={true} />
      </instancedMesh>
    </>
  )
}
export default function DeterminismPage() {
  const [calculating, setCalculating] = useState(false)
  const [finished, setFinished] = useState(false)
  const [log, setLog] = useState("WAITING FOR INPUT...")
  const [simulationCount, setSimulationCount] = useState(0)
  
  const startSimulation = () => {
    setCalculating(true)
    setFinished(false)
    setSimulationCount(0)
    let step = 0
    
    // Лічильник симуляцій
    const countInterval = setInterval(() => {
      if (!calculating) {
        clearInterval(countInterval)
      } else {
        setSimulationCount(prev => prev + Math.floor(Math.random() * 1000) + 500)
      }
    }, 100)
    
    // Цикл логів
    const interval = setInterval(() => {
      if (step >= SIMULATION_LOGS.length) {
        clearInterval(interval)
        clearInterval(countInterval)
        setCalculating(false)
        setFinished(true)
        setLog("CALCULATION COMPLETE.")
        setSimulationCount(14000605) // Референс до Dr. Strange
      } else {
        setLog(SIMULATION_LOGS[step])
        step++
      }
    }, 800) // Швидкість зміни логів
  }

  return (
    <main className="relative min-h-dvh bg-black overflow-hidden font-mono text-zinc-300">
      
      {/* --- 3D ФОН --- */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 20, 60]} />
          <ambientLight intensity={5} />
          {/* Воронка */}
          <ParticleVortex speed={calculating ? 5 : 1} gathering={finished} />
          <OrbitControls autoRotate autoRotateSpeed={calculating ? 10 : 0.5} enableZoom={false} />
        </Canvas>
      </div>

      {/* --- UI --- */}
      <div className="relative z-10 container mx-auto px-4 min-h-dvh flex flex-col items-center justify-center pointer-events-none">
        
        <div className="bg-black/80 border border-green-500/30 p-8 max-w-2xl w-full backdrop-blur-md pointer-events-auto text-center space-y-6 shadow-[0_0_100px_rgba(0,255,65,0.1)]">
          
          <h1 className="text-2xl md:text-3xl font-bold text-green-500 tracking-tighter">
             СИМУЛЯТОР ДЕТЕРМІНІЗМУ
          </h1>
          
          <div className="h-24 flex items-center justify-center border-y border-dashed border-green-900/50 flex-col gap-2">
             <GlitchEffect trigger={calculating} intensity="medium">
                <p className="text-xs md:text-sm text-green-400 font-mono uppercase tracking-widest">
                  &gt; {log}
                </p>
             </GlitchEffect>
             {calculating && (
               <div className="text-[10px] text-zinc-600 font-mono">
                 Simulations processed: {simulationCount.toLocaleString()}
               </div>
             )}
          </div>

          {!calculating && !finished && (
            <div className="space-y-4">
               <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                 Ми проаналізуємо квантові зрізи вашої долі і спробуємо знайти реальність, де ви не провтикали свої можливості. 
                 Увага: результат може викликати екзистенційну кризу.
               </p>
               <div className="text-[10px] text-purple-400 italic max-w-sm mx-auto border-l-2 border-purple-500/30 pl-3 py-2 bg-purple-950/10 rounded-r-sm">
                 "Світ — це не в'язниця, а санаторій для виправлення, з якого неможливо втекти, бо втікати нікуди" — В. Пєлєвін
               </div>
               <Button 
                 onClick={startSimulation}
                 className="w-full md:w-auto px-12 border-green-500 text-green-500 hover:bg-green-900/20 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all duration-300"
               >
                 [ ЗНАЙТИ КРАЩУ ВЕРСІЮ СЕБЕ ]
               </Button>
            </div>
          )}

          {finished && (
            <div className="space-y-6 animate-in zoom-in duration-500">
              <div className="p-4 border border-red-500/50 bg-red-900/10 rounded-lg">
                <div className="text-red-500 font-bold text-xl mb-2">РЕЗУЛЬТАТ: 100% СПІВПАДІННЯ</div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "Виявлено нульове відхилення. У всіх 14,000,605 перевірених реальностях ви все одно читаєте цей текст. 
                  Ваш Юпітер не винен. Ключі ви загубили б у будь-якому разі. Це не випадковість, це геометрія вашої уваги."
                </p>
              </div>
              
              <div className="text-[12px] text-purple-400 uppercase tracking-widest">
                СПОНСОР ПОКАЗУ: АРТУР ШОПЕНГАУЕР
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                 <Button onClick={startSimulation} variant="secondary" className="text-xs">
                   СПРОБУВАТИ ЩЕ РАЗ (МАРНО)
                 </Button>
                 <Link href="/">
                   <Button variant="secondary" className="text-xs">
                     ЗМИРИТИСЬ І ВИЙТИ
                   </Button>
                 </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}