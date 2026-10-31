'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import {
  ShieldCheck,
  Calendar,
  MessageCircle,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Activity,
  HeartPulse,
} from 'lucide-react';

export default function Hero() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];

  return (
    <section className="relative pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden bg-white">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#00A8E8]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 right-1/10 w-[30rem] h-[30rem] bg-slate-100 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle blue medical cross accent (top-right decorative) */}
      <div className="absolute top-20 right-8 opacity-[0.035] pointer-events-none select-none hidden lg:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="80" y="0" width="60" height="220" rx="18" fill="#00A8E8"/>
          <rect x="0" y="80" width="220" height="60" rx="18" fill="#00A8E8"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-[#00A8E8]/30 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#00A8E8] animate-ping" />
              <span className="text-xs sm:text-sm font-bold text-[#111827] tracking-wide">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088CC] via-[#0A2540] to-[#00A8E8]">
                {t.hero.titleHighlight}
              </span>{' '}
              <br className="hidden sm:inline" />
              <span>{t.hero.titleRest}</span>
            </motion.h1>

            {/* Subtitle description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[#374151] max-w-2xl font-normal leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* Key Clinical Trust Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#111827]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>BMDC Registered Faculty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#111827]">
                <CheckCircle2 className="w-4 h-4 text-[#00A8E8] shrink-0" />
                <span>Tokyo Laser Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#111827]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Swiss Titanium Implants</span>
              </div>
            </motion.div>

            {/* Dual CTAs — Visual variety in button shapes & distinct gradients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3"
            >
              {/* Primary Book Appointment CTA: Pill-shaped, vibrant blue gradient */}
              <button
                onClick={() => scrollToBooking()}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#0088CC] via-[#00A8E8] to-[#0A2540] hover:brightness-110 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-cyan-400/40 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>{t.hero.bookBtn}</span>
              </button>

              {/* General UI Button: Rounded-rectangle, dark contrast gradient */}
              <a
                href="https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery,%20I%20would%20like%20to%20consult%20about%20dental%20treatment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-[#0A2540] via-[#0D1E36] to-[#111827] hover:brightness-110 border border-slate-700 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>{t.hero.whatsappBtn}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 4K Clinical Suite Showcase with Layered Floating Glass Cards */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#00A8E8] via-[#D4AF37] to-[#0A2540] rounded-3xl blur-md opacity-40 dark:opacity-60 animate-pulse-glow" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 aspect-[4/3] sm:aspect-[4/3.2]">
                <Image
                  src="/images/hero-clinic.jpg"
                  alt="Comfort Dental Surgery Modern Treatment Operatory"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent" />

                {/* Inside overlay caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>European Autoclave & Surgical Theatre</span>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-1">
                    BDDL Basabo Height, 1 Central Basabo, 2nd Floor, Dhaka-1214
                  </p>
                </div>
              </div>

              {/* Floating Top Badge: Dr. Alim & Dr. Shanta Leadership */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-6 -left-4 sm:-left-6 bg-white/95 dark:bg-[#0D1B2A]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/80 dark:border-cyan-500/30 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400 relative shrink-0">
                  <Image
                    src="/dr-alim.jpg"
                    alt="Dr. Md. Abdul Alim"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A2540] dark:text-white">
                    Assoc. Prof. Directed
                  </div>
                  <div className="text-[10px] text-[#00A8E8] dark:text-[#38BDF8] font-semibold">
                    Oral & Maxillofacial Dept. Head
                  </div>
                </div>
              </motion.div>

              {/* Floating Bottom Badge: 97% Patient Trust */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 dark:bg-[#0D1B2A]/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/80 dark:border-[#D4AF37]/40 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-[#D4AF37] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A2540] dark:text-white flex items-center gap-1">
                    <span>97% Patient Joy</span>
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    10,000+ Treatments Since 2004
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Live Animated Statistics Counters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 sm:mt-24 pt-10 border-t border-slate-200/80"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-2xl bg-white backdrop-blur-sm border border-slate-200/60 shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2540] tracking-tight">
                {t.hero.experienceYears}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.experienceLabel}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-2xl bg-white backdrop-blur-sm border border-slate-200/60 shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#00A8E8] tracking-tight">
                {t.hero.patientsTreated}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.patientsLabel}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-2xl bg-white backdrop-blur-sm border border-slate-200/60 shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D4AF37] tracking-tight">
                {t.hero.successRate}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.successLabel}
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-2xl bg-white backdrop-blur-sm border border-slate-200/60 shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-600 tracking-tight">
                {t.hero.sterilityRate}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.sterilityLabel}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
