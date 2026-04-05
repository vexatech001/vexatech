"use client";

import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  LogOut, 
  ShieldCheck,
  Database
} from "lucide-react";
import PageHeader from "@/app/components/admin/PageHeader";
import { useRouter } from "next/navigation";

interface SettingsItem {
  label: string;
  value?: string | number | boolean;
  type: "text" | "toggle" | "button" | "status";
  description?: string;
  action?: string;
}

interface SettingsSection {
  title: string;
  icon: any;
  description: string;
  items: SettingsItem[];
}

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin/login");
    router.refresh();
  };

  const sections: SettingsSection[] = [
    {
      title: "Admin Profile",
      icon: User,
      description: "Manage your personal information and login credentials.",
      items: [
        { label: "Full Name", value: "System Administrator", type: "text" },
        { label: "Email Address", value: "admin@vexatech.com", type: "text" },
        { label: "Change Password", action: "Update", type: "button" }
      ]
    },
    {
      title: "Notification Settings",
      icon: Bell,
      description: "Configure how you receive alerts about new leads.",
      items: [
        { label: "Email Alerts", value: true, type: "toggle", description: "Receive copies of messages via Gmail" },
        { label: "WhatsApp Alerts", value: false, type: "toggle", description: "Direct PUSH to mobile device" },
        { label: "Browser Notifications", value: true, type: "toggle", description: "Desktop popup for new inquiries" }
      ]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      description: "Advanced safety controls and access logs.",
      items: [
        { label: "Two-Factor Auth", value: "Disabled", type: "status" },
        { label: "Active Sessions", value: "1 Active", type: "status" },
        { label: "API Key Management", action: "View Keys", type: "button" }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <PageHeader 
        title="Admin Settings" 
        description="Configure your dashboard experience and notification preferences."
      />

      <div className="max-w-4xl space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <section.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                <p className="text-sm font-medium text-gray-400">{section.description}</p>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    {item.description && <p className="text-[11px] font-medium text-gray-400 italic">{item.description}</p>}
                    {item.type === "text" && <p className="text-xs font-medium text-gray-500 mt-1">{String(item.value)}</p>}
                  </div>
                  
                  {item.type === "toggle" && (
                    <button className={`w-12 h-6 rounded-full transition-all relative ${item.value ? 'bg-blue-600' : 'bg-gray-200'}`}>
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.value ? 'left-7' : 'left-1'}`} />
                    </button>
                  )}
                  
                  {item.type === "button" && (
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-all active:scale-95">
                      {item.action}
                    </button>
                  )}

                  {item.type === "status" && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {String(item.value)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* System Settings Mini Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
           <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                 <Palette className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                 <h4 className="text-[15px] font-bold text-gray-900">Theme Preference</h4>
              </div>
              <p className="text-xs font-medium text-gray-400 leading-relaxed mb-6">
                Current mode: <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] ml-1">Light UI Standard</span>. 
                Adaptive dark mode is currently locked for enterprise-only builds.
              </p>
              <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full border-2 border-blue-600 bg-white" />
                 <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-900 opacity-20" />
              </div>
           </div>

           <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                 <Database className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                 <h4 className="text-[15px] font-bold text-gray-900">Diagnostic Reset</h4>
              </div>
              <p className="text-xs font-bold text-gray-400 leading-relaxed mb-6 uppercase tracking-widest opacity-30">
                Wipe Local Storage & Refresh Cache
              </p>
              <button className="text-xs font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2">
                Perform Full System Flush <LogOut size={14} className="rotate-180" />
              </button>
           </div>
        </div>

        {/* Main Logout */}
        <div className="pt-12 text-center">
            <button 
              onClick={handleLogout}
              className="px-10 py-5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-2xl text-sm font-black text-red-600 uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              Terminate Session
            </button>
            <p className="mt-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Build v2.4.08-STABLE</p>
        </div>
      </div>
    </div>
  );
}
