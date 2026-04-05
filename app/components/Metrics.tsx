"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "150+", label: "Projects Delivered" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "2x", label: "Faster Turnaround" },
  { value: "24/7", label: "Support Availability" },
];

export default function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-white relative border-y border-zinc-100 selection:bg-brand-accent/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              ref={el => { cardsRef.current[idx] = el; }}
              className="metric-card p-8 md:p-10 rounded-3xl bg-zinc-50/50 border border-zinc-100 flex flex-col items-center justify-center group hover:bg-white transition-all duration-500 hover:shadow-xl hover:shadow-neutral-200/40 hover:-translate-y-1.5"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-2 group-hover:text-brand-accent transition-colors duration-300 tracking-tighter">
                {metric.value}
              </h3>
              <p className="text-[10px] md:text-xs font-bold text-zinc-400 tracking-[0.2em] uppercase group-hover:text-zinc-600 transition-colors">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
