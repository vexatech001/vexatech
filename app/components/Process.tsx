"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/app/lib/utils";

const steps = [
  { 
    id: "01", 
    title: "Discover", 
    desc: "We dive deep into your brand, target audience, and market positioning to uncover core opportunities.",
    color: "from-blue-400 to-indigo-500"
  },
  { 
    id: "02", 
    title: "Strategize", 
    desc: "Architecting a precise, scalable roadmap aligned with your business objectives and digital growth.",
    color: "from-indigo-500 to-purple-500"
  },
  { 
    id: "03", 
    title: "Design", 
    desc: "Crafting immersive, glass-tier UI/UX that captures attention and elegantly communicates user value.",
    color: "from-purple-500 to-fuchsia-500"
  },
  { 
    id: "04", 
    title: "Develop", 
    desc: "Building the foundation using industry-leading modern frameworks with flawless performance.",
    color: "from-fuchsia-500 to-pink-500"
  },
  { 
    id: "05", 
    title: "Grow", 
    desc: "Launching the product and driving exponential growth through continuous optimization.",
    color: "from-pink-500 to-rose-500"
  },
];

const TimelineCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex flex-col md:flex-row items-center w-full mb-24 md:mb-40 group",
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Content Side */}
      <div className="w-full md:w-1/2 px-4 md:px-12 flex justify-center md:block">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative p-8 md:p-10 rounded-[32px] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:bg-white/90 backdrop-blur-sm",
            "max-w-[480px] w-full"
          )}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Step Badge */}
          <div className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br text-white font-black text-sm mb-8 shadow-lg shadow-blue-200/50",
            step.color
          )}>
            {step.id}
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">
            {step.title}
          </h3>
          <p className="text-gray-500 text-[15px] md:text-lg leading-relaxed font-medium">
            {step.desc}
          </p>

          {/* Subtle Corner Accent */}
          <div className={cn(
            "absolute bottom-6 right-6 w-12 h-12 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500 group-hover:opacity-40 group-hover:scale-150 bg-linear-to-br",
            step.color
          )} />
        </motion.div>
      </div>

      {/* Spacer for secondary side */}
      <div className="hidden md:block w-1/2" />

      {/* Center Marker Column (Node) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="relative"
        >
          {/* Main Node */}
          <div className={cn(
            "w-5 h-5 rounded-full bg-white border-4 shadow-xl z-20 relative",
            index % 2 === 0 ? "border-blue-500" : "border-indigo-600"
          )} />
          
          {/* Radial Pulse */}
          <div className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-20 scale-[2.5]",
            index % 2 === 0 ? "bg-blue-400" : "bg-indigo-500"
          )} />
          
          {/* Persistent Glow */}
          <div className={cn(
            "absolute inset-0 rounded-full blur-md opacity-40 scale-[2]",
            index % 2 === 0 ? "bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.5)]"
          )} />
        </motion.div>
      </div>
    </div>
  );
};

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="process" 
      ref={containerRef} 
      className="py-32 md:py-48 bg-white relative overflow-hidden selection:bg-blue-100"
    >
      {/* Background Decor */}
      <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32 md:mb-48"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100/50 shadow-sm">
            <p className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
              Execution Strategy
            </p>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
            How We <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">Work</span>
          </h2>
          <p className="mt-8 text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            A blueprint for success, refined through intentional strategy and meticulous engineering excellence.
          </p>
        </motion.div>

        {/* Timeline Content */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Animated SVG Path (Desktop only) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 hidden md:block -translate-x-1/2 overflow-visible">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 pointer-events-none overflow-visible"
              style={{ height: 'calc(100% - 100px)' }}
            >
              {/* Static Track */}
              <path
                d="M 50 0 Q 70 100, 50 200 Q 30 300, 50 400 Q 70 500, 50 600 Q 30 700, 50 800 Q 70 900, 50 1000"
                stroke="#F1F5F9"
                strokeWidth="4"
                fill="none"
              />
              {/* Animated Progress Path */}
              <motion.path
                d="M 50 0 Q 70 100, 50 200 Q 30 300, 50 400 Q 70 500, 50 600 Q 30 700, 50 800 Q 70 900, 50 1000"
                stroke="url(#timeline-gradient)"
                strokeWidth="4"
                fill="none"
                style={{ 
                  pathLength,
                  filter: 'drop-shadow(0px 0px 8px rgba(37, 99, 235, 0.3))'
                }}
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Simple Track for Mobile */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 md:hidden" />

          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <TimelineCard key={step.id} step={step} index={index} />
            ))}
          </div>

          {/* Final Pulse Node (Desktop) */}
          <motion.div 
            style={{ opacity: pathLength }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 hidden md:block"
          >
            <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse" />
          </motion.div>
        </div>

        {/* Final CTA in section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 text-center"
        >
          <div className="h-px w-24 bg-gray-100 mx-auto mb-16" />
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-8">
            Ready to start the journey?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gray-900 hover:bg-black text-white font-black uppercase text-[11px] tracking-widest transition-all duration-300 hover:scale-[1.05] shadow-2xl active:scale-95"
          >
            Start your project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
