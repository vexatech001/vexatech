"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (isLoginPage) {
    return (
      <div className="bg-gray-50 min-h-screen selection:bg-blue-100 selection:text-blue-700">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen selection:bg-blue-100 selection:text-blue-700 flex flex-col lg:flex-row">
      
      {/* ── MOBILE HEADER ── */}
      <div className="lg:hidden h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <ShieldCheck className="text-white" size={16} />
          </div>
          <span className="font-bold text-gray-900 tracking-tight text-sm uppercase">VEXA ADMIN</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── SIDEBAR DRAWER ── */}
      <AnimatePresence>
        {(isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <div className="fixed inset-0 z-50 lg:relative lg:z-0 pointer-events-none">
            {/* Backdrop for Mobile */}
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-gray-950/20 backdrop-blur-sm pointer-events-auto lg:hidden"
              />
            )}
            
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-h-screen relative">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
