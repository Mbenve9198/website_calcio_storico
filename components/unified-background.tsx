"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface UnifiedBackgroundProps {
  children: ReactNode
  className?: string
}

export function UnifiedBackground({ children, className = "" }: UnifiedBackgroundProps) {
  return (
    <div className={`relative min-h-screen bg-[#f8f9fa] ${className}`}>
      {/* Pattern squadrettato animato */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-black/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)",
        backgroundSize: "16px 16px"
      }} />
      
      {/* Gradient overlay per profondità */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
      
      {/* Container principale con max-width elegante per desktop */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {children}
      </div>
    </div>
  )
} 