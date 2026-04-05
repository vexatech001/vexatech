"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { User, Mail, MessageSquareText, ChevronRight } from "lucide-react";
import { Lead } from "@/app/types/lead";
import { cn } from "@/app/lib/utils";

const statusColors = {
  new: "text-blue-600 bg-blue-50 border-blue-100",
  contacted: "text-amber-600 bg-amber-50 border-amber-100",
  in_progress: "text-purple-600 bg-purple-50 border-purple-100",
  closed: "text-green-600 bg-green-50 border-green-100",
};

export default function RecentMessages({ leads }: { leads: Lead[] }) {
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Feedback</h3>
          <p className="text-sm font-medium text-gray-400">Manage your latest customer inquiries.</p>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group">
          View all <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {recentLeads.map((lead, i) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-4 p-5 rounded-[20px] bg-gray-50/50 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-gray-700 shadow-sm group-hover:scale-105 transition-transform">
              {lead.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-[15px] font-bold text-gray-900 truncate">{lead.fullName}</h4>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                  statusColors[lead.status]
                )}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mail size={12} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-400 truncate">{lead.email}</span>
              </div>
              <p className="text-xs font-medium text-gray-500 line-clamp-1 italic tracking-tight">
                "{lead.message.length > 80 ? lead.message.substring(0, 80) + '...' : lead.message}"
              </p>
            </div>
          </motion.div>
        ))}

        {recentLeads.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] text-zinc-400 italic font-medium">
            No inquiries logged yet...
          </div>
        )}
      </div>
    </div>
  );
}
