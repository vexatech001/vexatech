"use client"

import type React from "react"
import { RadialBackground } from "./light-theme-tailwind-css-background-snippet"
import Link from "next/link"
import { AnimatedShinyText } from "./animated-shiny-text"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <RadialBackground />
      {children}
    </div>
  )
}

export function HeroContent() {
  return (
    <main className="relative flex flex-col items-center justify-start pt-32 md:pt-[25vh] z-20 w-full px-6">
      <div className="text-center max-w-4xl flex flex-col items-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-md mb-6 relative border border-zinc-200/50 shadow-sm group">
          <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300">
            <span className="text-zinc-700 font-medium text-xs md:text-sm relative z-10 flex items-center gap-2">
              ✨ Innovate, Create &amp; Grow
            </span>
          </AnimatedShinyText>
        </div>

        {/* Main Heading */}
        <h1 className="leading-none mb-10">
          <span
            className="text-gradient-primary text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-bruno)' }}
          >
            VEXA TECH
          </span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-xl font-medium text-zinc-500 mb-12 leading-relaxed max-w-2xl mx-auto">
          We craft modern websites, refined user experiences, and growth-driven digital systems for ambitious brands worldwide.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link href="#contact" className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-brand-accent text-white font-bold text-sm md:text-base transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-[0_12px_40px_rgba(15,98,254,0.3)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center">
            Start Project
          </Link>
          <Link href="#services" className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-white border border-zinc-200 text-zinc-700 font-bold text-sm md:text-base transition-all duration-300 hover:bg-zinc-100/50 hover:border-zinc-300 cursor-pointer flex items-center justify-center shadow-sm">
            Explore Services
          </Link>
        </div>
      </div>
    </main>
  )
}
