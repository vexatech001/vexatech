"use client";

import { RotateCcw, RefreshCw, Plus } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  onRefresh?: () => void;
  onReset?: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: any;
  };
}

export default function PageHeader({ 
  title, 
  description, 
  onRefresh, 
  onReset,
  primaryAction 
}: PageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12 transition-all">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
        {description && (
          <p className="text-gray-400 mt-1.5 font-semibold text-sm md:text-base leading-relaxed">{description}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 hover:bg-red-100 transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        )}
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 rounded-xl text-xs font-bold text-white hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            {primaryAction.icon || <Plus size={16} />}
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
