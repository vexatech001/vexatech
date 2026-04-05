"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Printer, 
  HelpCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  ChevronRight,
  Database,
  Eye,
  Settings,
  Mail
} from "lucide-react";
import { cn } from "@/app/lib/utils";

const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 last:mb-0"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
    </div>
    <div className="pl-0 md:pl-16">
      {children}
    </div>
  </motion.section>
);

export default function PrivacyPolicy() {
  const [copied, setCopied] = useState(false);
  const email = "vexatech.connect@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-20 border-b border-gray-100 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-6">
              Transparency & Trust
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
              Transparency is key. We believe you should know exactly how we handle your data.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm font-bold text-sm"
              >
                <Printer size={18} />
                Print Policy
              </button>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 font-bold text-sm"
              >
                <HelpCircle size={18} />
                Have Questions?
              </Link>
            </div>
            
            <p className="mt-12 text-sm text-gray-400 font-medium">
              Effective Date: <span className="text-gray-900">January 15, 2026</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          
          <Section title="1. Introduction" icon={ShieldCheck}>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
              Welcome to VEXA TECH. We respect your privacy and are committed to protecting your personal data. This policy outlines our practices regarding data collection, use, and protection when you visit our website.
            </p>
          </Section>

          <Section title="2. Information We Collect" icon={Database}>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
              We collect specific data to provide our services effectively:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Identity Data", items: ["First name", "Last name", "Organization name"] },
                { title: "Contact Data", items: ["Email address", "Phone numbers", "Billing address"] },
                { title: "Technical Data", items: ["IP address", "Browser type", "Device information"] }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((sub, j) => (
                      <li key={j} className="text-gray-500 text-sm flex items-center gap-2 font-medium">
                        <ChevronRight size={14} className="text-blue-500" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. How We Use Your Data" icon={Eye}>
            <ul className="space-y-6">
              {[
                "To reply to your enquiries sent through our forms.",
                "To schedule and manage consultations via Calendly.",
                "To improve our website performance and user experience."
              ].map((text, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-1 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="4. Third-Party Services" icon={Settings}>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
              We rely on trusted third-party providers. Click to visit their privacy policies:
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="https://web3forms.com/privacy" 
                target="_blank"
                className="group flex flex-col p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 min-w-[280px]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Web3Forms</h3>
                <p className="text-gray-500 text-sm font-medium mb-6">Powers our contact forms securely. Does not sell your data.</p>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  View Policy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="https://calendly.com/privacy" 
                target="_blank"
                className="group flex flex-col p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 min-w-[280px]"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calendly</h3>
                <p className="text-gray-500 text-sm font-medium mb-6">Manages appointment bookings and scheduling.</p>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  View Policy <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </Section>

          <Section title="5. Cookies & Tracking" icon={ShieldCheck}>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Our website uses minimal cookies to enhance user experience. We do not use intrusive tracking cookies for advertising purposes without your consent. You may choose to set your web browser to refuse cookies.
            </p>
          </Section>

          {/* Final CTA Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 lg:p-16 rounded-[40px] bg-gray-900 text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
            
            <p className="relative z-10 text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">
              Contact Privacy Team
            </p>
            <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-8">
              Still have questions?
            </h2>
            <p className="relative z-10 text-gray-400 text-lg mb-10 font-medium max-w-xl mx-auto">
              We are happy to clarify any doubts regarding your data privacy and how we protect your information.
            </p>
            
            <div className="relative z-10 inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 px-6 py-4">
                <Mail className="text-blue-500" size={20} />
                <span className="font-bold text-lg">{email}</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-bold flex items-center justify-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Re-using ArrowRight for inner links since lucide-react is imported
function ArrowRight({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      className={className} 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
