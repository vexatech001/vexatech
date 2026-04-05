"use client";

import { Lead } from "@/app/types/lead";
import { 
  User, 
  ArrowRight, 
  Mail, 
  Phone,
  MessageCircle,
  Calendar
} from "lucide-react";
import { cn, formatDate } from "@/app/lib/utils";

interface RecentLeadsProps {
  leads: Lead[];
  onViewDetails: (lead: Lead) => void;
}

export default function RecentLeads({ leads, onViewDetails }: RecentLeadsProps) {
  const statusColors: Record<string, string> = {
    new: "bg-blue-50 text-blue-600 border-blue-100",
    contacted: "bg-amber-50 text-amber-600 border-amber-100",
    in_progress: "bg-purple-50 text-purple-600 border-purple-100",
    closed: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Leads</h3>
          <p className="text-sm font-medium text-gray-400">Latest submissions from the website.</p>
        </div>
        <button 
          onClick={() => (window.location.href = "/admin/leads")}
          className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all flex items-center gap-2 group"
        >
          View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center opacity-40">
            <User size={40} className="text-gray-300 mb-4" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No recent leads</p>
          </div>
        ) : (
          leads.slice(0, 5).map((lead) => (
            <div 
              key={lead.id}
              onClick={() => onViewDetails(lead)}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:bg-gray-50/50 hover:border-gray-100 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                <User size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-[14px] font-bold text-gray-900 truncate">{lead.fullName}</h4>
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0",
                    statusColors[lead.status] || "bg-gray-50 text-gray-400 border-gray-100"
                  )}>
                    {lead.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <Calendar size={12} />
                    {formatDate(lead.createdAt, "MMM dd")}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <span className="truncate flex items-center gap-1">
                    <MessageCircle size={12} />
                    {lead.serviceRequired}
                  </span>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                <ArrowRight size={16} className="text-blue-600" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
