"use client";

import { useEffect, useState, useCallback } from "react";
import { db } from "@/app/lib/firebase";
import { collection, onSnapshot, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
  Users, 
  Download,
} from "lucide-react";
import { Lead } from "@/app/types/lead";
import { format } from "date-fns";
import { cn, formatDate } from "@/app/lib/utils";
import LeadsTable from "@/app/components/admin/LeadsTable";
import { LeadDetailDrawer } from "@/app/components/admin/LeadDetailDrawer";
import PageHeader from "@/app/components/admin/PageHeader";

export default function LeadsPipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
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
    link.download = `VexaLeads_${formatDate(new Date(), "yyyyMMdd")}.csv`;
    link.click();
  };

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
        title="Leads Pipeline" 
        description="Detailed view of all enquiries coming from your digital presence."
        onRefresh={handleRefresh}
        onReset={handleReset}
        primaryAction={{
          label: "Export CSV",
          onClick: exportLeads,
          icon: <Download size={18} />
        }}
      />

      <div key={refreshKey}>
        <LeadsTable 
          leads={leads} 
          onViewDetails={(lead) => setSelectedLead(lead)} 
        />
      </div>

      <LeadDetailDrawer 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}
