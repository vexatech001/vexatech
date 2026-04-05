"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  MessageSquare,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Save,
  Loader2
} from "lucide-react";
import { Lead, LeadStatus } from "@/app/types/lead";
import { format } from "date-fns";
import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { cn, formatDate, getGmailLink } from "@/app/lib/utils";

interface MessageDrawerProps {
  lead: Lead | null;
  onClose: () => void;
}

const statusOptions: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New Inquiry", color: "text-blue-600 bg-blue-50 border-blue-100" },
  { value: "contacted", label: "Contacted", color: "text-amber-600 bg-amber-50 border-amber-100" },
  { value: "in_progress", label: "In Progress", color: "text-purple-600 bg-purple-50 border-purple-100" },
  { value: "closed", label: "Closed Lead", color: "text-green-600 bg-green-50 border-green-100" },
];

export default function MessageDrawer({ lead, onClose }: MessageDrawerProps) {
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState(lead?.adminNotes || "");

  const handleUpdateStatus = async (status: LeadStatus) => {
    if (!lead?.id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "leads", lead.id), { status });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!lead?.id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "leads", lead.id), { adminNotes: note });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {lead && (
        <>
          {/* Static backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/40 backdrop-blur-md z-100"
          />

          {/* Drawer Content */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white border-l border-gray-100 z-110 overflow-y-auto shadow-2xl shadow-gray-300"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-100 p-8 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-200">
                  {lead.fullName.charAt(0)}
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-950 tracking-tight">{lead.fullName}</h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-0.5">Reference ID: {lead.id?.substring(0, 8)}</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-100 text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 pb-12 pt-8 space-y-12">
              
              {/* Core Information Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-[28px] bg-gray-50/50 border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Electronic Mail</p>
                    <a 
                      href={getGmailLink(lead.email, `Response regarding your inquiry for ${lead.serviceRequired}`)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors truncate block"
                    >
                      {lead.email}
                    </a>
                 </div>
                 <div className="p-6 rounded-[28px] bg-gray-50/50 border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>
                    <p className="text-sm font-bold text-gray-900">{lead.phone}</p>
                 </div>
              </div>

              {/* Status Section */}
              <section className="space-y-4">
                 <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Pipeline Positioning</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdateStatus(opt.value)}
                      disabled={saving}
                      className={cn(
                        "text-left p-5 rounded-[20px] border transition-all duration-300 group relative overflow-hidden",
                        lead.status === opt.value
                          ? cn(opt.color, "shadow-md scale-[1.02]")
                          : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:border-gray-200"
                      )}
                    >
                      <div className="font-black text-[10px] uppercase tracking-widest mb-1">{opt.label}</div>
                      {lead.status === opt.value && (
                        <motion.div layoutId="active-indicator" className="absolute right-4 top-1/2 -translate-y-1/2">
                          <CheckCircle2 size={16} className="text-current opacity-50" />
                        </motion.div>
                      )}
                    </button>
                   ))}
                 </div>
              </section>

              {/* Message Content */}
              <section className="space-y-4">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Inquiry Payload</h3>
                  <div className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100 relative group">
                     <p className="text-[15px] font-semibold text-gray-800 leading-relaxed italic">
                        "{lead.message}"
                     </p>
                     <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                              <Briefcase size={14} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Requested</p>
                              <p className="text-xs font-bold text-gray-900">{lead.serviceRequired}</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">{formatDate(lead.createdAt, "MMM dd, yyyy")}</span>
                     </div>
                  </div>
              </section>

              {/* Internal Notes */}
              <section className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                     <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Internal Annotation</h3>
                     <button 
                        onClick={handleSaveNotes}
                        disabled={saving}
                        className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95"
                      >
                        {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        Sync Note
                      </button>
                  </div>
                  <textarea 
                    className="w-full h-40 bg-gray-50/50 border border-gray-100 rounded-[28px] p-8 text-sm font-semibold italic text-gray-700 placeholder-gray-300 outline-none focus:bg-white focus:border-blue-600/30 transition-all resize-none shadow-inner"
                    placeholder="Record your observations here for future audit..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
              </section>

            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
