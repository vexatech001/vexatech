"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  index: number;
}

export function StatCard({ label, value, icon: Icon, trend, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} strokeWidth={1} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-brand-accent">
          <Icon size={20} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
            trend.isUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          )}>
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-bold font-passion tracking-tight text-white">{value}</h3>
      </div>
    </motion.div>
  );
}
