'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import {
  Calendar,
  MessageCircle,
  Award,
  Sparkles,
  CheckCircle2,
  HeartPulse,
} from 'lucide-react';

export default function Hero() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-20 lg:pb-32 overflow-hidden bg-[#F9FAFC]">
      {/* Ambient soft blue radial background glow per specification */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(232,242,255,0.85)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,132,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,132,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle blue medical cross accent (top-right decorative) */}
      <div className="absolute top-20 right-8 opacity-[0.04] pointer-events-none select-none hidden lg:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="80" y="0" width="60" height="220" rx="20" fill="#0071E3"/>
          <rect x="0" y="80" width="220" height="60" rx="20" fill="#0071E3"/>
        </svg>
      </div>

      <div className="pinpoint-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-left">
            {/* Top pill badge (12px squircle) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[12px] bg-[#F0F6FE] border border-[rgba(10,132,255,0.2)] w-fit shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold text-[#0071E3] tracking-wide">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Headline with pinpoint responsive scaling */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="pinpoint-h1 text-[#0A0A0C]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#0A84FF] to-[#0B2545]">
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
              className="text-base sm:text-lg text-[rgba(10,10,12,0.68)] max-w-2xl font-normal leading-relaxed"
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
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A0A0C]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>BMDC Registered Faculty</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A0A0C]">
                <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                <span>Tokyo Laser Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A0A0C]">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF] shrink-0" />
                <span>Swiss Titanium Implants</span>
              </div>
            </motion.div>

            {/* Dual CTAs — Water Drop Button System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3"
            >
              {/* Primary Water Drop Button */}
              <button
                onClick={() => scrollToBooking()}
                className="btn-water-primary group inline-flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                <span>{t.hero.bookBtn}</span>
              </button>

              {/* Secondary Water Drop Button */}
              <a
                href="https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery,%20I%20would%20like%20to%20consult%20about%20dental%20treatment"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-water-secondary inline-flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-500" />
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
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#0071E3] via-[#0A84FF] to-transparent rounded-[36px] blur-lg opacity-35" />

              {/* Main Image Container in squircle (32px) */}
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-[rgba(10,132,255,0.2)] bg-white aspect-[4/3] sm:aspect-[4/3.2]">
                <Image
                  src="/images/hero-clinic.jpg"
                  alt="Comfort Dental Surgery Modern Treatment Operatory"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 rounded-[32px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-transparent to-transparent" />

                {/* Inside overlay caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200 mb-1">
                    <Sparkles className="w-4 h-4 text-[#0A84FF]" />
                    <span>European Autoclave & Surgical Theatre</span>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-1">
                    BDDL Basabo Height, 1 Central Basabo, 2nd Floor, Dhaka-1214
                  </p>
                </div>
              </div>

              {/* Floating Top Badge: Dr. Alim & Dr. Shanta Leadership (Desktop / Tablet Overlay) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hidden sm:flex absolute -top-5 -left-5 bg-white/84 backdrop-blur-2xl p-3.5 rounded-[20px] shadow-xl border border-white/90 items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#0071E3]/40 relative shrink-0">
                  <Image
                    src="/images/dr-alim.jpg"
                    alt="Dr. Md. Abdul Alim"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0A0C]">
                    Assoc. Prof. Directed
                  </div>
                  <div className="text-[10px] text-[#0071E3] font-semibold">
                    Oral & Maxillofacial Dept. Head
                  </div>
                </div>
              </motion.div>

              {/* Floating Bottom Badge: 97% Patient Trust (Desktop / Tablet Overlay) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hidden sm:flex absolute -bottom-5 -right-5 bg-white/84 backdrop-blur-2xl p-3.5 rounded-[20px] shadow-xl border border-white/90 items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0A84FF] to-[#0071E3] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0A0A0C] flex items-center gap-1">
                    <span>97% Patient Joy</span>
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="text-[10px] text-slate-500">
                    10,000+ Treatments Since 2004
                  </div>
                </div>
              </motion.div>

              {/* Phone-Friendly Docked Badges (Zero Caption Overlap on Small Screens) */}
              <div className="grid grid-cols-2 gap-2.5 mt-3.5 sm:hidden">
                <div className="bg-white/88 backdrop-blur-xl p-2.5 rounded-[18px] shadow-sm border border-white/90 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#0071E3]/40 relative shrink-0">
                    <Image
                      src="/images/dr-alim.jpg"
                      alt="Dr. Md. Abdul Alim"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#0A0A0C] truncate">Assoc. Prof. Directed</div>
                    <div className="text-[9px] text-[#0071E3] font-semibold truncate">Oral Surgery Head</div>
                  </div>
                </div>
                <div className="bg-white/88 backdrop-blur-xl p-2.5 rounded-[18px] shadow-sm border border-white/90 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0A84FF] to-[#0071E3] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#0A0A0C] flex items-center gap-1 truncate">
                      <span>97% Joy</span>
                      <HeartPulse className="w-3 h-3 text-rose-500 shrink-0" />
                    </div>
                    <div className="text-[9px] text-slate-500 truncate">Since 2004</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live Animated Statistics Counters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 sm:mt-24 pt-10 border-t border-[rgba(10,132,255,0.12)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-[20px] squircle-card bg-white shadow-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A0A0C] tracking-tight">
                {t.hero.experienceYears}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.experienceLabel}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-[20px] squircle-card bg-white shadow-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0071E3] tracking-tight">
                {t.hero.patientsTreated}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.patientsLabel}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-[20px] squircle-card bg-white shadow-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A84FF] tracking-tight">
                {t.hero.successRate}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1.5">
                {t.hero.successLabel}
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center sm:items-start p-5 rounded-[20px] squircle-card bg-white shadow-card">
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
