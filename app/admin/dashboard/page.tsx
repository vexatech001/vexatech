"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, onSnapshot, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  ShieldCheck,
  RefreshCw,
  RotateCcw,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { Lead } from "@/app/types/lead";
import { cn, formatDate } from "@/app/lib/utils";
import StatsCard from "@/app/components/admin/StatsCard";
import RecentLeads from "@/app/components/admin/RecentLeads";
import ActivityPanel from "@/app/components/admin/ActivityPanel";
import PageHeader from "@/app/components/admin/PageHeader";
import { LeadDetailDrawer } from "@/app/components/admin/LeadDetailDrawer";

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
      setLoading(false);
    });
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // onSnapshot will automatically update, but we can manually trigger a small delay for UI feedback
    setTimeout(() => setLoading(false), 500);
  };

  const handleReset = async () => {
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
  };

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
    link.download = `VexaLeads_Dashboard_${formatDate(new Date(), "yyyyMMdd")}.csv`;
    link.click();
  };

  const stats = [
    {
      label: "Total Leads",
      value: leads.length,
      icon: Users,
      trend: { value: 12, isUp: true }
    },
    {
      label: "New Leads",
      value: leads.filter(l => l.status === "new").length,
      icon: UserPlus,
      trend: { value: 8, isUp: true }
    },
    {
      label: "Contacted Leads",
      value: leads.filter(l => l.status === "contacted").length,
      icon: Clock,
      trend: { value: 5, isUp: true }
    },
    {
      label: "Closed Leads",
      value: leads.filter(l => l.status === "closed").length,
      icon: CheckCircle2,
      trend: { value: 24, isUp: true }
    }
  ];

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
        title="Admin Control Center" 
        description="Monitor lead inflow and oversee all active conversions."
        onRefresh={handleRefresh}
        onReset={handleReset}
        primaryAction={{
          label: "Export CSV",
          onClick: exportLeads,
          icon: <Download size={18} />
        }}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <StatsCard 
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            index={i}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <RecentLeads 
            leads={leads} 
            onViewDetails={(lead) => setSelectedLead(lead)} 
          />
        </div>
        
        <div className="lg:col-span-4">
          <ActivityPanel leads={leads} />
        </div>
      </div>

      <LeadDetailDrawer 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </div>
  );
}
