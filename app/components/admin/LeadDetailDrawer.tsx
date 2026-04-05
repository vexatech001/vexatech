"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Mail, 
  Phone, 
  Save, 
  Clock,
  User,
  MessageSquare,
  BadgeInfo,
  CalendarCheck2,
  PackageSearch,
  Building2,
  Wallet
} from "lucide-react";
import { Lead, LeadStatus } from "@/app/types/lead";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useState, useEffect } from "react";
import { cn, formatDate, getGmailLink } from "@/app/lib/utils";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
}

const statusOptions: { value: LeadStatus; label: string; color: string; bg: string }[] = [
  { value: "new", label: "New Lead", color: "text-blue-600", bg: "bg-blue-50" },
  { value: "contacted", label: "Contacted", color: "text-amber-600", bg: "bg-amber-50" },
  { value: "in_progress", label: "In Progress", color: "text-purple-600", bg: "bg-purple-50" },
  { value: "closed", label: "Closed / Signed", color: "text-green-600", bg: "bg-green-50" },
];

export function LeadDetailDrawer({ lead, onClose }: LeadDetailDrawerProps) {
  const [saving, setSaving] = useState(false);
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    if (lead) {
      setInternalNotes(lead.adminNotes || "");
    }
  }, [lead]);

  if (!lead) return null;

  const handleUpdateStatus = async (status: LeadStatus) => {
    if (!lead.id) return;
    setSaving(true);
    try {
      const leadRef = doc(db, "leads", lead.id);
      await updateDoc(leadRef, { 
        status, 
        updatedAt: Date.now() 
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!lead.id) return;
    setSaving(true);
    try {
      const leadRef = doc(db, "leads", lead.id);
      await updateDoc(leadRef, { 
        adminNotes: internalNotes, 
        updatedAt: Date.now() 
      });
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-110 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                  {lead.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 leading-none mb-1">{lead.fullName}</h3>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">{lead.id?.slice(-8)}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-10">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={getGmailLink(lead.email, `Response regarding your inquiry for ${lead.serviceRequired}`)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                >
                  <Mail size={16} className="text-blue-600" />
                  Send Email
                </a>
                <a href={`tel:${lead.phone}`} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                  <Phone size={16} className="text-blue-600" />
                  Call Now
                </a>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                  <BadgeInfo size={14} />
                  Lifecycle State
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleUpdateStatus(opt.value)}
                      disabled={saving}
                      className={cn(
                        "text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden",
                        lead.status === opt.value
                          ? cn(opt.color, opt.bg, "border-current shadow-sm ring-1 ring-inset ring-current/20")
                          : "border-gray-100 bg-gray-50/50 text-gray-400 hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="font-bold text-xs uppercase tracking-tight">{opt.label}</div>
                      {lead.status === opt.value && (
                        <motion.div layoutId="status-dot-info" className="w-1.5 h-1.5 rounded-full bg-current absolute top-4 right-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lead Details Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                  <User size={14} />
                  Submission Metadata
                </div>
                <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="p-5 border-r border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                        <Mail size={12} /> Email
                      </p>
                      <p className="text-sm font-semibold text-gray-900 break-all">{lead.email}</p>
                    </div>
                    <div className="p-5 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                        <Phone size={12} /> Phone
                      </p>
                      <p className="text-sm font-semibold text-gray-900">{lead.phone}</p>
                    </div>
                    <div className="p-5 border-r border-gray-100">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                        <Building2 size={12} /> Service
                      </p>
                      <p className="text-sm font-bold text-blue-600">{lead.serviceRequired}</p>
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                        <Wallet size={12} /> Budget
                      </p>
                      <p className="text-sm font-semibold text-gray-900">{lead.projectBudget || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-3xl border border-gray-100 p-6 shadow-inner-sm">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase mb-3 text-blue-600">
                    <MessageSquare size={14} />
                    Original Message
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                    &quot;{lead.message}&quot;
                  </p>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                  <CalendarCheck2 size={14} />
                  Submission Timeline
                </div>
                <div className="space-y-6 pl-4 border-l-2 border-gray-50">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                    <p className="text-xs font-bold text-gray-900 mb-0.5">Inquiry Created</p>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-tight">{formatDate(lead.createdAt, "MMMM dd, yyyy - HH:mm")}</p>
                  </div>
                  {lead.updatedAt > lead.createdAt && (
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                      <p className="text-xs font-bold text-gray-600 mb-0.5">Last Record Modification</p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-tight">{formatDate(lead.updatedAt, "MMMM dd, yyyy - HH:mm")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-4 pb-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                    <PackageSearch size={14} />
                    Internal Operator Notes
                  </div>
                  <button 
                    onClick={handleSaveNotes}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Save size={12} />
                    {saving ? "Saving..." : "Update Notes"}
                  </button>
                </div>
                <textarea
                  className="w-full h-32 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-medium text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all resize-none leading-relaxed"
                  placeholder="Record call summary, next steps, or specific requirements discussed..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                />
              </div>

            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
