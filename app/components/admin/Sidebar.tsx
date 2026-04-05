"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  X,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/app/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Leads", href: "/admin/leads" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <motion.aside 
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col z-100 pointer-events-auto shadow-2xl lg:shadow-none",
        "lg:translate-x-0 lg:static"
      )}
    >
      {/* Brand Section */}
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 tracking-tight leading-none text-lg">VEXA TECH</h1>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">Admin Portal</p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-xl">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3.5">
                <item.icon size={20} className={cn(
                  "transition-colors",
                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                )} />
                <span className="text-[14px] font-semibold">{item.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="w-1 h-5 bg-blue-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 mt-auto">
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
          <p className="text-xs font-bold text-gray-900 truncate">admin@vexatech.com</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-[14px] font-semibold">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
