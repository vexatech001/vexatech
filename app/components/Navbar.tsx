"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Team",     href: "/#team" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  // ── Optimized Apple-Style Smoothing ───────────────────────────────
  // First, apply a spring to the scroll value itself for "liquid" feel
  const smoothScroll = useSpring(scrollY, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  // ── Scroll Range [0 to 220px] ──────────────────────────────────────
  const range = [0, 220];

  // Continuous Transforms
  const width         = useTransform(smoothScroll, range, ["95%", "76%"]);
  const paddingY      = useTransform(smoothScroll, range, [18, 10]);
  const paddingX      = useTransform(smoothScroll, range, [32, 18]);
  const radius        = useTransform(smoothScroll, range, [32, 999]);
  const top           = useTransform(smoothScroll, range, [24, 12]);
  const logoScale     = useTransform(smoothScroll, range, [1, 0.92]);
  const background    = useTransform(smoothScroll, range, ["rgba(255,255,255,1)", "rgba(255,255,255,1)"]);
  const shadow        = useTransform(smoothScroll, range, ["0 4px 12px rgba(0,0,0,0.04)", "0 10px 30px rgba(0,0,0,0.12)"]);
  const backdrop      = useTransform(smoothScroll, range, ["blur(0px)", "blur(18px)"]);

  // ── Section Observer – active section spy ──────────────────────────
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActiveSection(visible[0].target.id);
      },
      { threshold: [0.1, 0.4], rootMargin: "-100px 0px -20% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        style={{
          width,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          borderRadius: radius,
          top,
          background,
          boxShadow: shadow,
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 border border-white/20 flex items-center justify-between"
      >
        {/* ── LOGO (Smoothed Scale) ── */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <motion.div 
            style={{ scale: logoScale }}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-[500ms] ease-out group-hover:rotate-6"
          >
            <Image 
              src="/vexatechlogo.svg" 
              alt="VEXA TECH" 
              width={40} 
              height={40} 
              className="w-full h-full object-contain"
            />
          </motion.div>
          <span className="font-black tracking-[0.2em] uppercase text-neutral-900 text-sm md:text-base lg:text-lg">
            VEXA TECH
          </span>
        </Link>

        {/* ── DESKTOP MENU ── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 rounded-full group",
                  isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full z-0 bg-neutral-100 border border-neutral-200/40 shadow-sm"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── CTA & TOGGLE ── */}
        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-black text-[9px] uppercase tracking-widest bg-brand-accent text-white hover:bg-brand-accent-hover transition-all duration-300"
          >
            Contact <ArrowRight size={12} />
          </Link>

          <button
            className="md:hidden p-2 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xl md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 right-0 top-0 h-[65vh] bg-white z-[70] rounded-b-[3rem] p-12 flex flex-col md:hidden border-b border-zinc-100 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-20">
                <span className="text-neutral-950 font-black tracking-widest text-lg uppercase">VEXA TECH</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-900 bg-zinc-100 p-3 rounded-full">
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-5xl font-black tracking-tighter transition-colors block",
                        activeSection === link.href.slice(1) ? "text-neutral-900" : "text-zinc-300 hover:text-neutral-900"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-6 rounded-full bg-brand-accent text-white font-black uppercase text-xs tracking-[0.2em]"
                >
                  Contact <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
