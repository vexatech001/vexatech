"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code2, 
  Layers, 
  TrendingUp, 
  BarChart3, 
  Palette, 
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    tag: "01",
    description: "We build high-performance, SEO-optimized digital ecosystems that turn visitors into loyal customers. Scalable, secure, and lightning fast.",
    icon: Code2,
    accent: "#0f62fe",
  },
  {
    title: "UI / UX Design",
    tag: "02",
    description: "Refined digital experiences that balance aesthetic elegance with intuitive functionality. We design for clarity, trust, and impact.",
    icon: Layers,
    accent: "#7c3aed",
  },
  {
    title: "Digital Marketing",
    tag: "03",
    description: "Data-driven strategies designed to scale your reach and maximize ROI. We focus on growth that actually moves the needle.",
    icon: TrendingUp,
    accent: "#059669",
  },
  {
    title: "Business Analysis",
    tag: "04",
    description: "Deep-dive diagnostics of your business workflows. We identify bottlenecks and architect digital roadmaps for long-term growth.",
    icon: BarChart3,
    accent: "#d97706",
  },
  {
    title: "Graphic Design",
    tag: "05",
    description: "Premium visual identities that command attention. From motion graphics to full brand identity, we craft visual authority.",
    icon: Palette,
    accent: "#db2777",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!container || !cards.length) return;

      // Pin the whole section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${cards.length * 100}%`, // Length of scroll based on number of cards
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate cards: One by one storytelling style
      // We want cards to slide in from the right, stay centered/active, then fade/exit
      cards.forEach((card, index) => {
        if (index === 0) {
          // First card starts active
          tl.to(card, {
            opacity: 0,
            x: -100,
            rotateY: -20,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut"
          }, 0.5); // Starts after a short stay
        } else {
          // Following cards: Enter -> Active -> Exit
          tl.fromTo(card,
            { x: "100%", opacity: 0, rotateY: 30, scale: 0.8 },
            { x: "0%", opacity: 1, rotateY: 0, scale: 1, duration: 1, ease: "power2.out" },
            index - 0.5 // Start overlap
          );

          // If not the last card, add an exit animation
          if (index < cards.length - 1) {
            tl.to(card, {
              opacity: 0,
              x: -100,
              rotateY: -20,
              scale: 0.9,
              duration: 1,
              ease: "power2.inOut"
            }, index + 0.5);
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="bg-white relative overflow-hidden py-24 md:py-32 lg:py-0 lg:min-h-screen lg:flex lg:items-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center lg:h-full">
        
        {/* ── LEFT: Content ── */}
        <div ref={leftContentRef} className="z-20 relative order-1">
          <div className="flex flex-col">
            <span className="text-brand-accent font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 inline-block w-fit">
              Our Services
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tighter mb-10">
              Solutions <span className="text-gradient-primary">designed</span> for growth
            </h2>
            <p className="text-zinc-500 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-md mb-12">
              Multidisciplinary expertise transformed into refined digital execution for modern brands. We build systems that perform as good as they look.
            </p>

            <div className="hidden lg:flex items-center gap-4 mt-12 opacity-30">
              <div className="w-10 h-px bg-neutral-900" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to explore</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Animated Stack ── */}
        <div className="relative z-10 order-2">
          {/* Mobile view: Simple list */}
          <div className="lg:hidden flex flex-col gap-6 w-full">
            {services.map((service, i) => (
              <MobileCard key={i} service={service} index={i} />
            ))}
          </div>

          {/* Desktop view: Layered Animated Cards */}
          <div className="hidden lg:block relative w-full h-[550px]">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={cn(
                  "absolute inset-0 flex items-center justify-center lg:justify-start transform-gpu perspective-[1000px]",
                  i === 0 ? "opacity-100" : "opacity-0"
                )}
              >
                <DesktopCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function DesktopCard({ service, index }: { service: typeof services[0], index: number }) {
  const Icon = service.icon;
  return (
    <div className="w-full max-w-[440px] h-[550px] bg-white border border-zinc-100 rounded-[3rem] p-12 shadow-[0_30px_70px_rgba(0,0,0,0.08)] flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_40px_90px_rgba(0,0,0,0.12)]">
      
      {/* Icon Area */}
      <div className="flex justify-between items-start">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: `${service.accent}12`, border: `1px solid ${service.accent}20` }}
        >
          <Icon size={28} style={{ color: service.accent }} strokeWidth={1.5} />
        </div>
        <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-20" style={{ color: service.accent }}>
          Service / 0{index + 1}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <h3 className="text-3xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
          {service.title}
        </h3>
        <p className="text-zinc-500 text-base font-light leading-relaxed mb-8">
          {service.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {["Scalable", "Modern", "Brand-Centric"].map((tag, t) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-zinc-50 text-zinc-400 border border-zinc-100">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-8 border-t border-zinc-50">
        <Link 
          href="#contact" 
          className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-4"
          style={{ color: service.accent }}
        >
          View Solution
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

function MobileCard({ service, index }: { service: typeof services[0], index: number }) {
  const Icon = service.icon;
  return (
    <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${service.accent}10` }}
        >
          <Icon size={22} style={{ color: service.accent }} />
        </div>
        <span className="text-[10px] font-bold text-zinc-300">0{index + 1}</span>
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
        {service.description}
      </p>
      <Link 
        href="#contact" 
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
        style={{ color: service.accent }}
      >
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  );
}
