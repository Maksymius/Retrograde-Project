'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, OrbitControls, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Кольори для стихій (вогонь, земля, повітря, вода)
const ELEMENT_COLORS = {
  fire: "#FF3333",   // Овен, Лев, Стрілець
  earth: "#00FF41",  // Телець, Діва, Козеріг
  air: "#FFB000",    // Близнюки, Терези, Водолій
  water: "#3399FF"   // Рак, Скорпіон, Риби
}

// Простий маппінг (можна ускладнити)
const getElementColor = (month: number) => {
  if ([3, 7, 11].includes(month)) return ELEMENT_COLORS.fire
  if ([4, 8, 12].includes(month)) return ELEMENT_COLORS.earth
  if ([1, 5, 9].includes(month)) return ELEMENT_COLORS.air
  return ELEMENT_COLORS.water // water + others
}

const Blob = ({ color, speed }: { color: string, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Обертання
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      
      // Пульсація масштабу при наведенні
      const scale = hovered ? 2.2 : 2
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.8}
        clearcoat={1}            // Ефект лаку
        clearcoatRoughness={0}   // Ідеальний блиск
        metalness={0.9}          // Металевий вигляд
        roughness={0.2}
        distort={hovered ? 0.6 : 0.4} // Сила викривлення (рідкість)
        speed={speed}            // Швидкість руху хвиль
      />
    </Sphere>
  )
}
export const KarmicBlobScene = ({ dateStr }: { dateStr: string }) => {
  // Парсимо місяць для кольору
  const month = parseInt(dateStr.split('-')[1]) || 1
  const color = getElementColor(month)
  const speed = 2 + (Math.random() * 3) // Рандомна "нервовість" блоба

  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Освітлення */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} />
        <pointLight position={[-10, -10, -10]} intensity={50} color={color} />

        {/* Сама сутність */}
        <Blob color={color} speed={speed} />

        {/* Оточення */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        
        {/* Ефект студії для відблисків */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}