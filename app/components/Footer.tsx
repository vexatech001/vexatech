"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  ArrowUpRight,
  Mail,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { cn, getGmailLink } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Process", href: "#process" },
    { name: "The Advantage", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Web Development", href: "#services" },
    { name: "UI / UX Design", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "Business Analysis", href: "#services" },
  ],
  support: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Support Center", href: "/support" },
  ],
};

const socialLinks = [
  { 
    name: "YouTube", 
    href: "https://www.youtube.com/@vexatech-p2f", 
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: "hover:bg-red-600" 
  },
  { 
    name: "X (Twitter)", 
    href: "https://x.com/TechVexa98498", 
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
      </svg>
    ),
    color: "hover:bg-black" 
  },
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/vexa_tech001", 
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600" 
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/vexa-tech-8a82bb3a6/", 
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    color: "hover:bg-[#0077b5]" 
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ctaRef.current || !contentRef.current) return;

      // CTA Reveal
      gsap.from(ctaRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 95%",
        }
      });

      // Links Reveal
      gsap.from(contentRef.current.querySelectorAll(".footer-column"), {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 92%",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-white pt-24 pb-12 overflow-hidden font-sans border-t border-zinc-100">
      {/* ── TOP GRADIENT THIN LINE ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-accent/30 to-transparent" />
      
      {/* ── BACKGROUND DECORATION ── */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-zinc-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] bg-fuchsia-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* ── TOP CTA SECTION ── */}
        <div ref={ctaRef} className="mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center border-b border-zinc-100 pb-20">
            <div>
              <p className="text-brand-accent font-bold uppercase tracking-[0.25em] text-[10px] mb-6">
                Ready to transform?
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight mb-8">
                Let’s build <span className="text-gradient-primary">what’s next.</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Your vision, our architecture. Together, we create digital ecosystems that define industries.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 lg:justify-end">
              <Link 
                href="#contact" 
                className="group relative inline-flex items-center justify-center gap-3 bg-neutral-900 text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-95 shadow-xl shadow-neutral-200"
              >
                <span className="relative z-10 font-bold uppercase tracking-widest text-[11px]">Get Started</span>
                <ArrowUpRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link 
                href={getGmailLink("contact@vexatech.com", "Project Inquiry")} 
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-neutral-900 hover:opacity-70 transition-all duration-300"
              >
                <Mail size={16} />
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Brand Block */}
          <div className="footer-column md:col-span-12 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 group mb-8">
              <div className="w-12 h-12 flex items-center justify-center bg-white border border-zinc-100 rounded-2xl shadow-sm transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:border-brand-accent/20">
                <Image 
                  src="/vexatechlogo.svg" 
                  alt="VEXA TECH" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-black text-neutral-900 tracking-tight transition-colors group-hover:text-brand-accent">
                VEXA TECH
              </span>
            </Link>
            <p className="text-zinc-500 text-base leading-relaxed font-light mb-10 max-w-xs">
              VEXA TECH builds refined digital experiences through modern design, scalable development, and growth-focused execution.
            </p>
            
            {/* Social Media Section */}
            <div className="flex flex-col gap-5">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
                Social Echo
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link 
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={cn(
                        "w-12 h-12 rounded-2xl bg-white border border-zinc-100 text-zinc-400 flex items-center justify-center transition-all duration-500 shadow-sm hover:border-transparent hover:text-white hover:shadow-xl hover:-translate-y-1.5",
                        social.color
                      )}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="footer-column md:col-span-6 lg:col-span-3 lg:col-start-6">
            <h4 className="text-neutral-900 font-bold mb-8 uppercase text-[11px] tracking-[0.25em]">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/#about" },
                { name: "Our Process", href: "/#process" },
                { name: "The Advantage", href: "/#why-us" },
                { name: "Meet the Team", href: "/#team" },
                { name: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-zinc-500 hover:text-brand-accent transition-colors duration-300 text-sm font-light"
                  >
                    <ChevronRight className="w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-2 text-brand-accent" size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column md:col-span-6 lg:col-span-3">
            <h4 className="text-neutral-900 font-bold mb-8 uppercase text-[11px] tracking-[0.25em]">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "Web Development", href: "/#services" },
                { name: "UI / UX Design", href: "/#services" },
                { name: "Digital Marketing", href: "/#services" },
                { name: "Business Analysis", href: "/#services" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-zinc-500 hover:text-brand-accent transition-colors duration-300 text-sm font-light"
                  >
                    <ChevronRight className="w-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:mr-2 text-brand-accent" size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="pt-10 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <p className="text-zinc-400 text-xs font-light">
              &copy; {new Date().getFullYear()} VEXA TECH. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              {footerLinks.support.map((link) => (
                <a key={link.name} href={link.href} className="text-zinc-400 hover:text-neutral-900 transition-colors text-[11px] font-light">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* <p className="text-[10px] md:text-xs font-medium text-brand-accent/50 italic tracking-widest">
            Designed by <span className="font-bold">Hamenath B</span>
          </p> */}
        </div>

      </div>
    </footer>
  );
}
