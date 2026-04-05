"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  index: number;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

export default function StatsCard({ label, value, icon: Icon, index, trend }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white p-7 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-blue-50">
          <Icon className="text-gray-500 group-hover:text-blue-600 transition-colors" size={24} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold leading-none",
            trend.isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}%
          </div>
        )}
      </div>

      <div className="space-y-1 relative">
        <p className="text-sm font-bold text-gray-400 tracking-tight flex items-center gap-2 group-hover:text-gray-500 transition-colors">
          {label}
        </p>
        <h3 className="text-3xl font-bold text-gray-950 tracking-tight leading-none tabular-nums">
          {value}
        </h3>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/10 rounded-full -mr-16 -mt-16 group-hover:bg-blue-200/20 transition-all duration-500" />
    </motion.div>
  );
}
