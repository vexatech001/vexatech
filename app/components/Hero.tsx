"use client"

import { HeroContent, ShaderBackground } from "@/components/ui/shaders-hero-section"

export default function Hero() {
  return (
    <section id="home" className="relative group">
      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>
    </section>
  )
}
