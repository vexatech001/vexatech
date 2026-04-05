"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  Rocket, 
  CreditCard, 
  Cpu, 
  ChevronDown, 
  Mail, 
  Calendar,
  ExternalLink,
  MessageCircle,
  HelpCircle
} from "lucide-react";
import { cn } from "@/app/lib/utils";

const SupportCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    className="p-10 rounded-[32px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-start group cursor-pointer"
  >
    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-8 transition-transform group-hover:rotate-6">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-500 font-medium text-base mb-8 grow leading-relaxed">
      {desc}
    </p>
    <div className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
      Learn More <ExternalLink size={14} />
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-8 rounded-3xl text-left transition-all duration-300 border flex justify-between items-center",
          isOpen ? "bg-white border-blue-100 shadow-lg" : "bg-zinc-50 border-transparent hover:bg-white hover:border-gray-100"
        )}
      >
        <span className="text-xl font-bold text-gray-900 pr-8">{question}</span>
        <ChevronDown 
          size={20} 
          className={cn("text-blue-600 transition-transform duration-500", isOpen && "rotate-180")} 
        />
      </button>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-500",
          isOpen ? "max-h-[500px] opacity-100 mt-4 px-8 pb-8" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-lg text-gray-500 font-medium leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function SupportCenter() {
  return (
    <main className="min-h-screen bg-white">
      {/* Search Header */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-gray-50">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-gray-50/50 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100/50 shadow-sm">
              <p className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs flex items-center gap-2">
                <HelpCircle size={14} /> VEXA TECH Care
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
              How can we <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">help</span> you?
            </h1>
            
            {/* Search Input */}
            <div className="max-w-2xl mx-auto mt-12 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Search for answers (e.g., 'pricing', 'support')..."
                className="w-full pl-16 pr-8 py-6 rounded-full bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus:shadow-[0_15px_40px_rgba(0,0,0,0.06)] outline-none transition-all text-lg font-medium focus:border-blue-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Support Sections */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <SupportCard 
              icon={Rocket}
              title="Getting Started"
              desc="New to VEXA TECH? Learn about our collaborative design process, development phases, and onboarding journey."
            />
            <SupportCard 
              icon={CreditCard}
              title="Billing & Pricing"
              desc="Detailed breakdown of our project pricing tables, deposit schedules, custom invoice queries, and accepted payment methods."
            />
            <SupportCard 
              icon={Cpu}
              title="Technical Support"
              desc="Direct assistance for website deployment, AWS/Cloud hosting setup, custom domain mapping, or ongoing maintenance."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-zinc-50/50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 font-medium">Quick answers to the most common inquiries from our prospective and current clients.</p>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="What services does VEXA TECH offer?"
              answer={
                <div className="space-y-4">
                  <p>We specialize in end-to-end digital solutions:</p>
                  <ul className="space-y-2">
                    <li><strong className="text-gray-900">Web Development:</strong> Custom landing pages, full-stack web apps, and CMS websites.</li>
                    <li><strong className="text-gray-900">UI/UX Design:</strong> Modern, user-friendly digital architectures and prototypes.</li>
                    <li><strong className="text-gray-900">Digital Marketing:</strong> Strategic SEO, social brand growth, and paid campaigns.</li>
                    <li><strong className="text-gray-900">Business Analysis:</strong> Leveraging data to drive measurable business growth.</li>
                  </ul>
                </div>
              }
            />
            <FAQItem 
              question="How much does a website cost?"
              answer="Pricing depends on the complexity of the project. A simple business landing page starts lower than a complex full-stack e-commerce platform. We offer a Free Consultation to assess your specific needs and provide a fixed custom quote."
            />
            <FAQItem 
              question="How long does it take to complete a project?"
              answer="Typically, a standard business website takes 2-4 weeks from initial design to final launch. More complex custom applications may take 6-8 weeks. We provide a detailed project timeline and phase breakdown before starting any engagement."
            />
            <FAQItem 
              question="Do you offer support after the project is finished?"
              answer="Yes! We offer various maintenance packages to keep your website secure, updated, and running smoothly. Every project also includes 30 days of free bug-fixing support after launch to ensure total stability."
            />
          </div>
        </div>
      </section>

      {/* Help CTA Area */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 lg:p-20 rounded-[40px] bg-blue-600 text-white text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-white/10 blur-[100px] rounded-full" />
            
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-blue-100 text-xl mb-12 font-medium max-w-xl mx-auto opacity-90">
              Our dedicated support team is here to help you navigate any challenge, from project quotes to technical questions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="mailto:vexatech.connect@gmail.com"
                className="w-full sm:w-auto px-10 py-5 rounded-fill bg-white text-blue-600 rounded-full font-black flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-xl shadow-blue-500 group"
              >
                <Mail size={18} />
                Email Support
              </Link>
              <Link 
                href="#contact"
                className="w-full sm:w-auto px-10 py-5 rounded-fill bg-blue-500 rounded-full font-black flex items-center justify-center gap-3 border border-white/20 hover:bg-blue-400 transition-all group"
              >
                <Calendar size={18} />
                Book a Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
