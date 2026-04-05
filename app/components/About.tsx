"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(visualRef.current, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-24 bg-zinc-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
          <div ref={textRef} className="flex flex-col justify-center lg:pr-8">
            <h3 className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">About Vexa Tech</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-neutral-900 leading-[1.1] tracking-tight border-l-4 border-brand-accent pl-5 -ml-6">
              We architect <span className="text-gradient-primary">digital</span> ecosystems
            </h2>
            <div className="space-y-6 text-zinc-500 text-lg leading-relaxed font-light">
              <p>
                We exist to elevate brands. VEXA TECH is an elite digital engineering firm specialized in high-performance web architecture, strategic UI/UX design, and scalable business systems.
              </p>
              <p>
                We do not just build websites—we craft premium digital experiences that command authority, optimize workflows, and drive definitive market growth.
              </p>
            </div>
            
            {/* Value Points */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mt-10">
              {[
                "Strategic Design Thinking",
                "Advanced Web Architecture",
                "Brand-Focused Execution",
                "Scalable Digital Systems"
              ].map((point, index) => (
                <div 
                  key={index} 
                  className="relative flex items-center gap-4 px-4 py-3 rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 -ml-4"
                >
                  {/* Sliding Blue Background */}
                  <div className="absolute inset-0 bg-brand-accent translate-x-[-102%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                  
                  {/* Content (Z-indexed above background) */}
                  <div className="w-1.5 h-6 bg-zinc-200 transition-all duration-300 rounded-full relative z-10 group-hover:bg-white" />
                  <span className="text-neutral-800 font-semibold text-sm tracking-wide relative z-10 group-hover:text-white transition-colors duration-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Element */}
          <div ref={visualRef} className="relative w-full max-w-[500px] aspect-square rounded-4xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] ring-1 ring-zinc-200/60 group bg-white mx-auto lg:ml-auto">
            
            {/* Branded Logo Illustration */}
            <div className="absolute inset-0 flex items-center justify-center p-20 bg-zinc-50 transition-all duration-300 group-hover:bg-zinc-100">
              <div 
                className="relative w-full h-full transform transition-all duration-1000 group-hover:scale-110"
              >
                <Image 
                  src="/vexatechlogo.svg"
                  alt="VEXA TECH Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
