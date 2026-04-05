"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download,
  Mail,
  Phone,
  PackageSearch,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { Lead, LeadStatus } from "@/app/types/lead";
import { cn, formatDate } from "@/app/lib/utils";
import { useState, useMemo } from "react";

interface LeadsTableProps {
  leads: Lead[];
  onViewDetails: (lead: Lead) => void;
}

const statusColors = {
  new: "text-blue-600 bg-blue-50 border-blue-100",
  contacted: "text-amber-600 bg-amber-50 border-amber-100",
  in_progress: "text-purple-600 bg-purple-50 border-purple-100",
  closed: "text-green-600 bg-green-50 border-green-100",
};

export default function LeadsTable({ leads, onViewDetails }: LeadsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchSearch = 
        l.fullName.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, search, statusFilter]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      
      {/* Filtering Actions */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-[28px] border border-gray-100 shadow-sm shadow-gray-200/40">
        <div className="flex-1 w-full bg-gray-50 border border-transparent rounded-2xl px-5 py-3.5 flex items-center gap-3 focus-within:bg-white focus-within:border-blue-600/30 transition-all group shadow-inner">
          <Search size={18} className="text-gray-300 group-focus-within:text-blue-600 transition-colors" />
          <input 
            placeholder="Search identifies..."
            className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder-gray-300 font-semibold italic tracking-tight"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="bg-white border border-gray-100 rounded-2xl px-6 py-3.5 text-xs font-bold outline-none cursor-pointer hover:bg-gray-50 transition-all text-gray-500 hover:text-gray-900 shadow-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Pipeline Stages</option>
            <option value="new">Fresh Inquiries</option>
            <option value="contacted">Phase: Contacted</option>
            <option value="in_progress">Phase: In Progress</option>
            <option value="closed">Phase: Closed</option>
          </select>
          <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-300 hover:text-blue-600 transition-all shadow-sm">
            <ArrowUpDown size={18} />
          </button>
        </div>
      </div>

      {/* Main Table Structure */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto relative group">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Prospect Details</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Deployment Contact</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Security Stage</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Ingest Protocol</th>
              <th className="px-10 py-6 text-right text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {currentLeads.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-gray-50/50 transition-all cursor-default"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 font-bold flex items-center justify-center text-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                        {lead.fullName.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[15px] font-bold text-gray-900 leading-none block">{lead.fullName}</span>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block">Reference: {lead.id?.substring(0, 8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-700 flex items-center gap-2">
                        <Mail size={12} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                        {lead.email}
                      </p>
                      <p className="text-[11px] font-semibold text-gray-400 flex items-center gap-2">
                        <Phone size={12} />
                        {lead.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                     <span className={cn(
                        "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        statusColors[lead.status]
                      )}>
                        {lead.status}
                      </span>
                  </td>
                  <td className="px-8 py-8">
                      <p className="text-xs font-bold text-gray-900 mb-1">{lead.serviceRequired}</p>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-40 italic">{formatDate(lead.createdAt, "yyyy.MM.dd")}</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onViewDetails(lead)}
                        className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm active:scale-95"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm active:scale-95">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Empty Visual State */}
        {currentLeads.length === 0 && (
          <div className="p-24 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-[32px] bg-gray-50 flex items-center justify-center border border-gray-100 mb-6 text-gray-200">
               <PackageSearch size={48} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No matches found in pipeline</h3>
            <p className="text-xs font-semibold text-gray-400 max-w-xs uppercase tracking-widest">Modify your diagnostic filters or clear search to refresh entries.</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 px-2">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
          Inventorying {currentLeads.length} of {filteredLeads.length} Global Inquiries
        </p>
        <div className="flex items-center gap-3">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="w-11 h-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="px-6 h-11 flex items-center rounded-2xl bg-white border border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest shadow-inner">
            Index {currentPage} / {totalPages || 1}
          </div>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="w-11 h-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}
