"use client";

import { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Check, 
  X
} from "lucide-react";
import { cn, getGmailLink } from "../lib/utils";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const inputBase =
  "w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3.5 text-base md:text-sm text-neutral-900 placeholder-zinc-400 transition-all duration-200 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 focus:bg-white touch-manipulation";

const labelBase = "block text-[11px] font-bold text-neutral-500 mb-1.5 tracking-widest uppercase";

const socials = [
  {
    label: "Email",
    value: "vexatech.connect@gmail.com",
    href: getGmailLink("vexatech.connect@gmail.com", "Project Inquiry"),
    color: "text-brand-accent",
    bg: "bg-brand-accent/8",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "vexa-tech",
    href: "https://www.linkedin.com/in/vexa-tech-8a82bb3a6/",
    color: "text-[#0077b5]",
    bg: "bg-blue-50",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@vexa_tech001",
    href: "https://www.instagram.com/vexa_tech001",
    color: "text-pink-500",
    bg: "bg-pink-50",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    value: "@TechVexa98498",
    href: "https://x.com/TechVexa98498",
    color: "text-neutral-900",
    bg: "bg-zinc-100",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/>
      </svg>
    ),
  },
];

const countryCodes = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
];

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  const [form, setForm] = useState({ 
    fullName: "", 
    email: "", 
    countryCode: "+91",
    phone: "", 
    serviceRequired: "", 
    projectBudget: "", 
    message: "" 
  });

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setToast({ show: false, message: "", type: "success" });

    try {
      // 1. Save to Firestore directly (Client-side)
      // This ensures the lead is captured even if the notification server has issues
      await addDoc(collection(db, "leads"), {
        ...form,
        fullPhone: `${form.countryCode} ${form.phone}`,
        status: "new",
        source: "website_contact_form",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // 2. Trigger Notifications (via API)
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: `${form.countryCode} ${form.phone}`
        }),
      }).catch(err => console.error("Notification trigger failed:", err));

      setStatus("success");
      setToast({ show: true, message: "Inquiry received! We'll contact you shortly.", type: "success" });
      
      // Auto hide toast after 5s
      setTimeout(() => setToast(p => ({ ...p, show: false })), 5000);
    } catch (error: any) {
      console.error("Detailed submission error:", error);
      setStatus("error");
      setToast({ 
        show: true, 
        message: error.message || "Something went wrong. Please try again.", 
        type: "error" 
      });
    }
  };

  useEffect(() => {
    if (status === "success") {
      const colors = ["#A8E6CF", "#FFFFFF", "#C0C0C0", "#F4F4F5"];
      
      // 1. Center Blast
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
      });

      // 2. Side Bursts (delayed)
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 400);

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 90,
          spread: 100,
          origin: { y: 0.8 },
          colors: colors
        });
      }, 700);
    }
  }, [status]);

  const resetForm = () => {
    setForm({ fullName: "", email: "", countryCode: "+91", phone: "", serviceRequired: "", projectBudget: "", message: "" });
    setStatus("idle");
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-100 relative overflow-hidden">
      {/* Toast Notification */}
      {toast.show && (
        <div className={cn(
          "fixed bottom-8 right-8 z-100 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border transition-all duration-500 animate-in fade-in slide-in-from-bottom-5",
          toast.type === "success" 
            ? "bg-white border-green-100 text-green-700" 
            : "bg-white border-red-100 text-red-700"
        )}>
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold tracking-tight">{toast.message}</span>
          <button onClick={() => setToast(p => ({ ...p, show: false }))} className="ml-2 hover:opacity-50 transition-opacity">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">

        {/* ── Section label ── */}
        <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-3 text-center">Get In Touch</p>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 text-center tracking-tight mb-10">
          Let&apos;s build something <span className="text-gradient-primary">meaningful</span>
        </h2>

        {/* ── Unified outer card ── */}
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-[0_8px_48_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* ── LEFT ── */}
            <div className="p-8 md:p-10 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-zinc-100">

              <div>
                <p className="text-neutral-900 font-bold text-base mb-1.5">VEXA TECH</p>
                <p className="text-sm text-zinc-500 font-light leading-relaxed">
                  Share your goals and ideas with us. Our team will respond with clarity, direction, and a plan — within 24 hours.
                </p>
              </div>

              {/* Social / Contact rows */}
              <div className="flex flex-col gap-2.5">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target={s.href.startsWith("https") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all duration-200 group bg-zinc-50 hover:bg-white"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110",
                      s.bg, s.color
                    )}>
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-zinc-400 font-semibold tracking-wide uppercase leading-none mb-0.5">{s.label}</p>
                      <p className="text-sm font-semibold text-neutral-800 truncate">{s.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-zinc-100 flex-1 min-h-[160px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125326.37244817898!2d78.02308!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63071!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", minHeight: "160px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VEXA TECH — Madurai, Tamil Nadu"
                />
              </div>
            </div>

            {/* ── RIGHT: Form / Success Screen ── */}
            <div className="p-8 md:p-10 flex flex-col justify-center min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ 
                      type: "spring", 
                      damping: 20, 
                      stiffness: 100,
                      duration: 0.6 
                    }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="text-green-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Inquiry Received!</h3>
                    <p className="text-zinc-500 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                      We&apos;ve sent a confirmation email to you. Our specialists are reviewing your request and will reach out to you within 24 hours.
                    </p>
                    <button 
                      onClick={resetForm}
                      className="px-8 py-3 rounded-xl border border-zinc-200 text-zinc-600 font-bold tracking-widest text-xs uppercase hover:bg-zinc-50 transition-colors"
                    >
                      Send Another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-base font-bold text-neutral-900 tracking-tight mb-8">Start Your Project</p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6" onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="md:col-span-1">
                        <label htmlFor="fullName" className={labelBase}>Full Name <span className="text-brand-accent">*</span></label>
                        <input id="fullName" required placeholder="Full Name" className={inputBase} value={form.fullName} onChange={set("fullName")} />
                      </div>

                      {/* Email */}
                      <div className="md:col-span-1">
                        <label htmlFor="email" className={labelBase}>Email ID <span className="text-brand-accent">*</span></label>
                        <input id="email" type="email" required placeholder="you@example.com" className={inputBase} value={form.email} onChange={set("email")} />
                      </div>

                      {/* Service */}
                      <div className="md:col-span-1">
                        <label htmlFor="serviceRequired" className={labelBase}>Services Needed <span className="text-brand-accent">*</span></label>
                        <div className="relative">
                          <select id="serviceRequired" required value={form.serviceRequired} className={`${inputBase} appearance-none cursor-pointer pr-9`} onChange={set("serviceRequired")}>
                            <option value="" disabled>Select Service...</option>
                            <option value="Web Development">Web Development</option>
                            <option value="UI / UX Design">UI / UX Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Business Analysis">Business Analysis</option>
                            <option value="Graphic Design">Graphic Design</option>
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"/>
                          </svg>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="md:col-span-1">
                        <label htmlFor="phone" className={labelBase}>Phone Number <span className="text-brand-accent">*</span></label>
                        <div className="flex gap-2">
                          <div className="relative shrink-0">
                            <select 
                              className={`${inputBase} w-30 appearance-none pl-3 pr-8 cursor-pointer bg-zinc-100 font-bold`}
                              value={form.countryCode}
                              onChange={set("countryCode")}
                            >
                              {countryCodes.map(c => (
                                <option key={c.name + c.code} value={c.code}>{c.flag} {c.code}</option>
                              ))}
                            </select>
                            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </div>
                          <input 
                            id="phone" 
                            type="tel" 
                            required 
                            placeholder="Phone Number" 
                            className={inputBase} 
                            value={form.phone} 
                            onChange={set("phone")} 
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="md:col-span-2">
                        <label htmlFor="projectBudget" className={labelBase}>Expected Budget <span className="text-brand-accent">*</span></label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₹</span>
                          <input 
                            id="projectBudget" 
                            type="text" 
                            inputMode="numeric"
                            required 
                            placeholder="e.g. 50,000" 
                            className={`${inputBase} pl-8`} 
                            value={form.projectBudget} 
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "");
                              setForm(p => ({ ...p, projectBudget: val }));
                            }} 
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="md:col-span-2">
                        <label htmlFor="message" className={labelBase}>Tell us about your goals <span className="text-brand-accent">*</span></label>
                        <textarea id="message" required rows={4} placeholder="Describe what you want to build..." className={`${inputBase} resize-none min-h-[120px]`} value={form.message} onChange={set("message")} />
                      </div>

                      {/* Submit */}
                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className={cn(
                            "w-full py-4 rounded-xl bg-neutral-900 text-white font-bold text-[11px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 group px-4",
                            status === "loading" ? "opacity-70 cursor-not-allowed" : "hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-1"
                          )}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              Processing...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </button>

                        {status === "error" && (
                          <div className="flex items-center gap-2 text-red-500 text-xs font-bold justify-center mt-2">
                            <AlertCircle size={14} />
                            There was an error. Please try again.
                          </div>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
