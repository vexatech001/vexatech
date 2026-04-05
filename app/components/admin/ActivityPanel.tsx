"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  UserPlus, 
  MessageSquare, 
  CheckCircle2, 
  Clock,
  History,
  ArrowRight
} from "lucide-react";
import { Lead } from "@/app/types/lead";
import { cn, formatDate } from "@/app/lib/utils";

interface ActivityPanelProps {
  leads: Lead[];
}

export default function ActivityPanel({ leads }: ActivityPanelProps) {
  // Logic to derive activity from leads
  // For a real app, you might have an 'activities' collection, 
  // but here we can derive "New Inquiry" and "Last Updated" events.
  
  const activities = leads.slice(0, 5).map(lead => {
    const isNew = Date.now() - lead.createdAt < 86400000; // Last 24h
    return {
      type: "lead",
      message: isNew ? `New inquiry from ${lead.fullName}` : `Lead updated: ${lead.fullName}`,
      time: formatDate(lead.updatedAt || lead.createdAt, "hh:mm a"),
      icon: isNew ? UserPlus : Clock,
      color: isNew ? "text-blue-600 bg-blue-50" : "text-amber-600 bg-amber-50"
    };
  });

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 flex flex-col h-full overflow-hidden relative group">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">System Events</h3>
          <p className="text-sm font-medium text-gray-400">Track all administrative workflows.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-500">
          <History size={18} />
        </div>
      </div>

      <div className="space-y-1 relative">
        <div className="absolute left-6 top-2 bottom-6 w-px bg-gray-100 hidden sm:block" />

        <div className="space-y-8">
          {activities.length === 0 ? (
            <div className="py-12 text-center opacity-40 italic text-xs font-bold uppercase tracking-widest">
              No recent events.
            </div>
          ) : (
            activities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 relative group"
              >
                <div className={cn(
                  "relative z-10 shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white group-hover:scale-110 transition-transform duration-500",
                  item.color
                )}>
                  <item.icon size={20} />
                </div>
                <div className="flex-1 space-y-0.5 mt-1 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-gray-900">{item.message}</h4>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{item.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-400">Inquiry Pipeline</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="mt-auto pt-10 text-center">
        <button className="text-xs font-black text-gray-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group mx-auto">
          View Complete Log <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50/20 rounded-full -mr-16 -mb-16 pointer-events-none group-hover:bg-blue-50/40 transition-all duration-700" />
    </div>
  );
}
