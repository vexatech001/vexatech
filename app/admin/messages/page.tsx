"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { db } from "@/app/lib/firebase";
import { collection, onSnapshot, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Search,
  Filter,
  ArrowRight,
  User,
  Inbox,
  Mail,
  Clock,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { Lead } from "@/app/types/lead";
import { LeadDetailDrawer } from "@/app/components/admin/LeadDetailDrawer";
import PageHeader from "@/app/components/admin/PageHeader";
import { cn, formatDate } from "@/app/lib/utils";

export default function MessagesCenter() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleReset = useCallback(async () => {
    const confirmReset = window.confirm("Are you sure you want to delete ALL lead data? This action cannot be undone.");
    if (!confirmReset) return;

    setLoading(true);
    try {
      const q = query(collection(db, "leads"));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(document => deleteDoc(doc(db, "leads", document.id)));
      await Promise.all(deletePromises);
      setSearch("");
      setSelectedLead(null);
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("Failed to reset data. Check console for details.");
    } finally {
      setLoading(false);
    }
  }, []);

  const exportLeads = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Service", "Status", "Date"].join(","),
      ...leads.map(l => [
        `"${l.fullName}"`,
        `"${l.email}"`,
        `"${l.phone}"`,
        `"${l.serviceRequired}"`,
        `"${l.status}"`,
        formatDate(l.createdAt, "yyyy-MM-dd")
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `VexaInquiries_${formatDate(new Date(), "yyyyMMdd")}.csv`;
    link.click();
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      l.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [leads, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader 
        title="Inquiry Inbox" 
        description="Direct messages and service requests from your website visitors."
        onRefresh={handleRefresh}
        onReset={handleReset}
        primaryAction={{
          label: "Export CSV",
          onClick: exportLeads,
          icon: <Download size={18} />
        }}
      />

      {/* Search and Filters Bar */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder="Search sender, email or content..."
            className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50 px-4 py-2 rounded-full border border-gray-100">
          <Filter size={14} />
          Showing {filteredLeads.length} Messages
        </div>
      </div>

      {/* Grid of Message Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" key={refreshKey}>
        <AnimatePresence mode="popLayout">
          {filteredLeads.map((lead, i) => (
            <motion.div
              layout
              key={lead.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedLead(lead)}
              className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 cursor-pointer flex flex-col group relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {lead.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 leading-tight mb-0.5">{lead.fullName}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <Clock size={12} className="text-gray-300" />
                      {formatDate(lead.createdAt, "MMM dd, hh:mm a")}
                    </div>
                  </div>
                </div>
                <div className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                  lead.status === "new" ? "text-blue-600 bg-blue-50 border-blue-100" : "text-gray-400 bg-gray-50 border-gray-100"
                )}>
                  {lead.status}
                </div>
              </div>

              {/* Message Preview */}
              <div className="flex-1 mb-8">
                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-2 truncate">
                  <Mail size={12} />
                  {lead.email}
                </div>
                <p className="text-[13px] font-medium text-gray-600 leading-relaxed line-clamp-3 italic">
                  &quot;{lead.message}&quot;
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400">
                  {lead.serviceRequired}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  Read Full Inquiry <ArrowRight size={14} />
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/20 rounded-full -mr-12 -mt-12 group-hover:bg-blue-50/40 transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredLeads.length === 0 && (
          <div className="col-span-full py-40 flex flex-col items-center justify-center text-center opacity-30">
             <Inbox size={64} className="text-gray-300 mb-6" />
             <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase">Inbox is Clear</h3>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest max-w-sm mt-1">No messages match your current search parameters.</p>
          </div>
        )}
      </div>

      <LeadDetailDrawer 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}
