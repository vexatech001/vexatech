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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
        {description && (
          <p className="text-gray-500 mt-1 font-medium">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95 shadow-sm"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm font-bold text-red-600 hover:bg-red-100 transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw size={16} />
            Reset Data
          </button>
        )}
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            {primaryAction.icon || <Plus size={18} />}
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
