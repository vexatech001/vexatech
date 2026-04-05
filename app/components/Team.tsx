"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const team = [
  {
    name: "Srinivas K A",
    role: "CEO & Founder",
    desc: "A visionary leader with a passion for innovation and digital transformation. Srinivas drives VEXA TECH's mission with strategic clarity, ensuring every solution delivers real value, scalability, and long-term impact for clients.",
    linkedin: "https://www.linkedin.com/in/srinivas-k-a-83a027372/",
    instagram: "https://www.instagram.com/srini_xolo_?igsh=bDl5ajBseGh4eWVt",
    initial: "S",
  },
  {
    name: "Hamenath B",
    role: "Chief Technology Officer",
    desc: "A technology-driven problem solver focused on building modern, scalable, and high-performance digital solutions. Hamenath leads development with precision, ensuring every product meets the highest standards of performance and reliability.",
    linkedin: "https://www.linkedin.com/in/hamenathbdesigner/",
    instagram: "https://www.instagram.com/editor_ak._?igsh=MXI0MmlhajI1YWRvNg%3D%3D",
    initial: "H",
  },
  {
    name: "Jeya Jothi D",
    role: "Human Resource",
    desc: "Dedicated to building a strong, collaborative, and growth-oriented work culture. Jeya Jothi ensures seamless team coordination, talent development, and a people-first approach that strengthens the foundation of VEXA TECH.",
    linkedin: "https://www.linkedin.com/in/jeyajothi-d-a99544299/",
    instagram: "https://www.instagram.com/itzz_me_jo18?igsh=MXJjdGU2MDAzbWY3Ng%3D%3D",
    initial: "J",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Team() {
  return (
    <section id="team" className="relative py-24 md:py-40 bg-white overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-50/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50/40 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative">
        {/* Section Header */}
          <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-28 max-w-5xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100/50 shadow-sm">
            <p className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
              Visionary Leadership
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8 md:whitespace-nowrap">
            The <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">minds</span> behind VEXA TECH
          </h2>
          <p className="text-gray-500 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Building the future of digital experiences with a relentless commitment to innovation and engineering excellence.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 lg:gap-10"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-[32px] border border-gray-100 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group transition-all duration-500"
            >
              {/* Top Accent Gradient (Visible on hover) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-full" />

              {/* Monogram Badge */}
              <div className="relative mb-8">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-blue-200/50 group-hover:rotate-6 transition-transform duration-500">
                  {member.initial}
                </div>
                {/* Subtle glow behind monogram */}
                <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-blue-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Name & Role */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  {member.role}
                </p>
              </div>

              {/* Elegant Divider */}
              <div className="w-16 h-[2px] bg-gray-100 mb-8 overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-blue-600/50"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>

              {/* Description */}
              <p className="grow text-gray-600 text-[15px] leading-relaxed mb-10 min-h-[100px] font-medium opacity-80">
                {member.desc}
              </p>

              {/* Social Buttons */}
              <div className="flex items-center gap-4 mt-auto">
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 transform active:scale-95 group/btn"
                >
                  <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">LinkedIn</span>
                </Link>
                <Link
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 hover:text-white hover:bg-linear-to-tr hover:from-orange-500 hover:to-purple-600 hover:border-pink-500 transition-all duration-300 transform active:scale-95 group/btn"
                >
                  <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA (Optional premium look) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Link href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors group">
            Working with the best <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
