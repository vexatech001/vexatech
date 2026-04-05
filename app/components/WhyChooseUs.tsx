"use client";

import { Target, Sparkles, TrendingUp, BarChart2, Users, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Strategic Approach",
    desc: "We align every project with your brand goals, audience needs, and growth vision.",
    accent: "#0f62fe",
  },
  {
    icon: Sparkles,
    title: "Premium Design",
    desc: "We craft clean, modern, and intuitive experiences that build trust and engagement.",
    accent: "#7c3aed",
  },
  {
    icon: TrendingUp,
    title: "Scalable Development",
    desc: "Our digital solutions are built for performance, flexibility, and long-term growth.",
    accent: "#059669",
  },
  {
    icon: BarChart2,
    title: "Business Impact",
    desc: "Every design and development decision is made to support real business results.",
    accent: "#d97706",
  },
  {
    icon: Users,
    title: "Strong Collaboration",
    desc: "We work with clarity, consistency, and partnership throughout the full project journey.",
    accent: "#db2777",
  },
  {
    icon: CheckCircle,
    title: "Quality-Driven Execution",
    desc: "We focus on polished details, modern standards, and high-value digital experiences.",
    accent: "#0891b2",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">
            Why Vexa Tech
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
            The VEXA TECH <span className="text-gradient-primary">Advantage</span>
          </h2>
        </div>

        {/* Cards Grid — all 6 always visible */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-zinc-50 hover:bg-white rounded-2xl border border-zinc-100 hover:border-zinc-200 p-7 flex flex-col gap-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.accent}14` }}
                >
                  <Icon size={20} strokeWidth={1.8} style={{ color: feature.accent }} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>

                {/* Accent grow line */}
                <div
                  className="w-6 h-[2px] group-hover:w-12 transition-all duration-500"
                  style={{ backgroundColor: feature.accent }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
