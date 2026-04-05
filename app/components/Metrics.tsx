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
    <section ref={containerRef} className="py-20 md:py-24 lg:py-28 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              ref={el => { cardsRef.current[idx] = el; }}
              className="metric-card p-8 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center group hover:bg-white transition-all duration-500 hover:shadow-md"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:text-brand-accent transition-colors duration-300">
                {metric.value}
              </h3>
              <p className="text-gray-500 text-sm md:text-base font-medium tracking-wide uppercase">
                {metric.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
