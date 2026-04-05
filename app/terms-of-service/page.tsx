"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Printer, 
  HelpCircle, 
  Copy, 
  Check, 
  FileText, 
  ChevronRight,
  Briefcase,
  CreditCard,
  Lock,
  AlertCircle,
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
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
    </div>
    <div className="pl-0 md:pl-16">
      {children}
    </div>
  </motion.section>
);

export default function TermsOfService() {
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
            <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs mb-6">
              Legal Framework
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
              Please read these terms carefully before using our services. They define the rules and regulations for the use of VEXA TECH's Website.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-600 transition-all duration-300 shadow-sm font-bold text-sm"
              >
                <Printer size={18} />
                Print Terms
              </button>
              <button 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200 font-bold text-sm"
              >
                <AlertCircle size={18} />
                Contact Legal
              </button>
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
          
          <Section title="1. Agreement to Terms" icon={FileText}>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
              By accessing or using the website and services of VEXA TECH (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </Section>

          <Section title="2. Scope of Services" icon={Briefcase}>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-medium">
              VEXA TECH provides digital services including but not limited to:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Web Development", desc: "Creating responsive websites, web applications, and frontend solutions." },
                { title: "UI/UX Design", desc: "Designing user interfaces, wireframes, and prototypes." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-400 italic font-medium">
              Specific deliverables will be outlined in your individual project contract or proposal.
            </p>
          </Section>

          <Section title="3. Payments & Refunds" icon={CreditCard}>
            <div className="space-y-6">
              {[
                { label: "Deposit", text: "A 50% non-refundable deposit is required to commence any project." },
                { label: "Final Payment", text: "The remaining 50% is due upon project completion and before final file delivery." },
                { label: "Refunds", text: "Since our services are digital and custom-made, refunds are not provided once work has commenced, unless the project is cancelled by VEXA TECH." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">
                    <span className="text-gray-900 font-bold block mb-1">{item.label}</span>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="4. Intellectual Property (IP)" icon={Lock}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Client Ownership:</h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  Upon full payment, the client will own the final visual designs and compiled code of the specific project.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Agency Rights:</h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                   VEXA TECH retains the right to use the completed work in our portfolio, website, and marketing materials for demonstration purposes.
                </p>
              </div>
            </div>
          </Section>

          <Section title="5. Limitation of Liability" icon={AlertCircle}>
            <p className="text-gray-600 text-lg leading-relaxed font-medium mb-6">
              In no event shall VEXA TECH, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="space-y-4">
              {[
                "Your access to or use of or inability to access or use the Service;",
                "Any unauthorized access to or use of our servers and/or any personal information stored therein;",
                "Any bugs, viruses, or the like that may be transmitted to or through our service by any third party."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-center group text-gray-500 font-medium">
                  <ChevronRight size={14} className="text-indigo-500" />
                  {text}
                </li>
              ))}
            </ul>
          </Section>

          {/* Final CTA Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-12 lg:p-16 rounded-[40px] bg-gray-900 text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
            
            <p className="relative z-10 text-indigo-400 font-bold uppercase tracking-widest text-xs mb-6">
              Fair & Transparent
            </p>
            <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-8">
              Questions about our Terms?
            </h2>
            <p className="relative z-10 text-gray-400 text-lg mb-10 font-medium max-w-xl mx-auto">
              We believe in fair and transparent business practices and are here to discuss any specific concerns regarding these terms.
            </p>
            
            <div className="relative z-10 inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 px-6 py-4">
                <Mail className="text-indigo-500" size={20} />
                <span className="font-bold text-lg">{email}</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-bold flex items-center justify-center gap-2"
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
