"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupWrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Advanced Cinematic scroll-to-zoom with 3D rotation
    gsap.set(mockupWrapperRef.current, { perspective: 1500 });
    gsap.set(frameRef.current, { rotationX: 15, rotationY: -10, scale: 0.7, z: -500 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Extends the scroll duration for butter smooth effect
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to(frameRef.current, {
      rotationX: 0,
      rotationY: 0,
      z: 0,
      scale: 1,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      borderWidth: 0,
      ease: "power2.inOut",
    })
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-white overflow-hidden hidden md:flex items-center justify-center">
      
      {/* Background ambient glow setup */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-linear-to-tr from-blue-100 via-brand-accent/5 to-transparent rounded-full blur-[140px]" />
      </div>

      {/* 3D Mockup Wrapper */}
      <div ref={mockupWrapperRef} className="relative z-10 w-full h-full flex items-center justify-center transform-style-3d">
        <div 
          ref={frameRef}
          className="relative w-[75vw] h-[65vh] max-w-7xl rounded-[2.5rem] overflow-hidden bg-white border border-gray-200 shadow-2xl flex flex-col transform-origin-center will-change-transform"
        >
          {/* Mockup Top Navigation Bar */}
          <div className="h-10 md:h-12 border-b border-gray-100 bg-gray-50/80 backdrop-blur-md flex items-center px-6 gap-2 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
            <div className="mx-auto w-1/3 max-w-[300px] h-5 md:h-6 rounded-md bg-white border border-gray-200 shadow-xs" />
          </div>
          
          {/* Mockup Screen Content */}
          <div className="flex-1 relative bg-gray-50 overflow-hidden flex items-center justify-center">
            
            {/* Cinematic Grid Base */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-size-[32px_32px]"></div>
            
            <div 
              ref={contentRef}
              className="relative z-10 text-center opacity-0 translate-y-16 blur-[20px]"
            >
              <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-bold mb-6 tracking-tighter text-gray-900 drop-shadow-sm uppercase">
                Crafting <br />
                <span className="text-gradient-primary">Excellence</span>
              </h3>
              <p className="text-gray-600 text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide italic">
                A definitive look at high-performance engineering. Experience what’s next as you explore our ecosystem below.
              </p>
            </div>

            {/* Glowing Core Inside Mockup */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
      
    </section>
  );
}
