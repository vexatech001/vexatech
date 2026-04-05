"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { db } from "@/app/lib/firebase";
import { collection, onSnapshot, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  UserPlus, 
  PhoneCall, 
  CheckCircle2, 
  PieChart as PieIcon,
  Activity,
  Zap
} from "lucide-react";
import { Lead } from "@/app/types/lead";
import AnalyticsCharts from "@/app/components/admin/AnalyticsCharts";
import PageHeader from "@/app/components/admin/PageHeader";
import StatsCard from "@/app/components/admin/StatsCard";

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
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
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("Failed to reset data. Check console for details.");
    } finally {
      setLoading(false);
    }
  }, []);

  const conversionRate = useMemo(() => {
    if (leads.length === 0) return 0;
    const closed = leads.filter(l => l.status === "closed").length;
    return Math.round((closed / leads.length) * 100);
  }, [leads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const analyticsStats = [
    { label: "Lead Velocity", value: `${Math.round(leads.length / 30 * 10) / 10} / day`, icon: Activity, index: 0, trend: { value: 12, isUp: true } },
    { label: "Conversion Rate", value: `${conversionRate}%`, icon: Zap, index: 1, trend: { value: 4, isUp: true } },
    { label: "Active Pipeline", value: leads.filter(l => l.status !== "closed").length, icon: TrendingUp, index: 2, trend: { value: 8, isUp: true } },
    { label: "Retention Score", value: "94.2%", icon: ShieldCheck, index: 3, trend: { value: 2, isUp: true } },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PageHeader 
        title="Performance Analytics" 
        description="Visual overview of lead generation and conversion performance."
        onRefresh={handleRefresh}
        onReset={handleReset}
      />

      {/* Analytics Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {analyticsStats.map((stat) => (
          <StatsCard 
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon as any}
            index={stat.index}
            trend={stat.trend}
          />
        ))}
      </div>

      <div key={refreshKey}>
        <AnalyticsCharts leads={leads} />
      </div>
    </div>
  );
}

// Reuse ShieldCheck from Sidebar if needed, or import it
import { ShieldCheck } from "lucide-react";
