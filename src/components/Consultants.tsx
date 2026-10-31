'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import {
  Award,
  Globe2,
  Sparkles,
  Zap,
  GraduationCap,
  Hospital,
  BookOpen,
  Calendar,
  ChevronRight,
  Shield,
  Star,
} from 'lucide-react';

export default function Consultants() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];

  // 3D Card Tilt State for Dr. Alim
  const [alimTilt, setAlimTilt] = useState({ x: 0, y: 0 });
  const [shantaTilt, setShantaTilt] = useState({ x: 0, y: 0 });

  const handleMouseMoveAlim = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const x = ((e.clientY - centerY) / (card.height / 2)) * -6;
    const y = ((e.clientX - centerX) / (card.width / 2)) * 6;
    setAlimTilt({ x, y });
  };

  const handleMouseMoveShanta = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;
    const x = ((e.clientY - centerY) / (card.height / 2)) * -6;
    const y = ((e.clientX - centerX) / (card.width / 2)) * 6;
    setShantaTilt({ x, y });
  };

  const resetTilt = () => {
    setAlimTilt({ x: 0, y: 0 });
    setShantaTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="consultants"
      className="relative py-28 lg:py-40 overflow-hidden bg-white"
    >
      {/* Animated SVG Luxury Medical Background Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A8E8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0A2540" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00A8E8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Slow-moving luxury sine waves */}
          <path
            d="M0,160 C320,300 420,40 640,120 C880,200 1120,40 1440,140 L1440,900 L0,900 Z"
            fill="url(#waveGrad1)"
          />
          <path
            d="M0,450 C400,320 600,600 900,420 C1200,240 1350,550 1440,480 L1440,900 L0,900 Z"
            fill="url(#waveGrad2)"
          />
        </svg>

        {/* Floating cross and tooth geometric symbols */}
        <div className="absolute top-1/6 left-1/12 text-[#D4AF37]/30 text-6xl select-none animate-float-slow">
          ✦
        </div>
        <div className="absolute bottom-1/4 right-1/12 text-[#00A8E8]/30 text-5xl select-none animate-float-slow" style={{ animationDelay: '2s' }}>
          ✚
        </div>
        <div className="absolute top-2/3 left-1/5 text-[#D4AF37]/20 text-4xl select-none animate-float-slow" style={{ animationDelay: '4s' }}>
          ✦
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#7DD3FC] text-xs sm:text-sm font-semibold text-[#0F172A] mb-4 tracking-wide shadow-xs"
          >
            <Award className="w-4 h-4 text-[#0284C7]" />
            <span>{t.consultants.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B2545]"
          >
            {t.consultants.title}
          </motion.h2>

          {/* Liquid Gold Expanding Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-[#0284C7] via-[#D4AF37] to-[#0284C7] mx-auto rounded-full my-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-[#334155] font-normal leading-relaxed"
          >
            {t.consultants.subtitle}
          </motion.p>
        </div>

        {/* 2-Column Split Layout: Interactive 3D Glassmorphic Profile Portals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ========================================================= */}
          {/* PORTAL 1: Assoc. Prof. Dr. Md. Abdul Alim */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onMouseMove={handleMouseMoveAlim}
            onMouseLeave={resetTilt}
            style={{
              transform: `perspective(1000px) rotateX(${alimTilt.x}deg) rotateY(${alimTilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative rounded-[20px] p-8 sm:p-10 card-medical-shell flex flex-col justify-between group"
          >
            {/* Glowing Accent Corner Ribbon */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0284C7]/10 via-transparent to-transparent rounded-tr-[20px] pointer-events-none" />

            <div>
              {/* Doctor Header: Image Frame & Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#BAE6FD]">
                {/* Portrait with Curved Frame (border-radius: 16px) & Soft Glow */}
                <div className="relative shrink-0">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-[16px] overflow-hidden border-2 border-white shadow-lg ring-4 ring-[#BAE6FD]/60 bg-sky-50">
                    <Image
                      src="/dr-alim.jpg"
                      alt="Assoc. Prof. Dr. Md. Abdul Alim"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[16px]"
                    />
                  </div>
                </div>

                {/* Name, Position & Floating Badges */}
                <div className="flex flex-col text-center sm:text-left">
                  {/* Department Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0F172A] border border-[#7DD3FC] text-xs font-semibold w-fit mx-auto sm:mx-0 mb-2 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>{t.consultants.doctor1.badge}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
                    {t.consultants.doctor1.name}
                  </h3>
                  <div className="text-sm font-semibold text-[#0284C7] mt-0.5 font-bangla">
                    {t.consultants.doctor1.nameNative}
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] font-medium mt-2 leading-relaxed">
                    {t.consultants.doctor1.position}
                  </p>
                </div>
              </div>

              {/* Exact Credentials Timeline */}
              <div className="pt-6 space-y-4">
                {/* Academic Degrees Pills */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#0284C7]" />
                    <span>{language === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Degrees & Post-Graduation'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.consultants.doctor1.degrees.map((deg, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-white text-[#0F172A] text-xs font-semibold border border-[#7DD3FC] shadow-xs"
                      >
                        {deg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* International Training Badges */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-[#0284C7]" />
                    <span>{language === 'bn' ? 'আন্তর্জাতিক উচ্চতর প্রশিক্ষণ' : 'International Advanced Training'}</span>
                  </div>
                  <div className="space-y-2">
                    {/* Implants */}
                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-xs font-bold text-[#0B2545]">
                        {t.consultants.doctor1.internationalTraining[0].title}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {t.consultants.doctor1.internationalTraining[0].places.map((place, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[11px] font-semibold text-[#0F172A] border border-[#7DD3FC] shadow-xs"
                          >
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Laser */}
                    <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="text-xs font-bold text-[#0B2545] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{t.consultants.doctor1.internationalTraining[1].title}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {t.consultants.doctor1.internationalTraining[1].places.map((place, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[11px] font-semibold text-[#0F172A] border border-[#7DD3FC] shadow-xs"
                          >
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Surgical Focus Areas */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2">
                    {language === 'bn' ? 'বিশেষ দক্ষতা ক্ষেত্র' : 'Key Surgical Scope'}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#334155]">
                    {t.consultants.doctor1.specialties.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button: Book Dr. Md. Abdul Alim */}
            <div className="pt-8">
              <button
                onClick={() => scrollToBooking(t.consultants.doctor1.name)}
                className="w-full group/btn relative flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-sm btn-contrast-dark cursor-pointer transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-sky-200" />
                <span>{t.consultants.doctor1.bookCta}</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* PORTAL 2: Assoc. Prof. Dr. Kamrun Nahar (Shanta) */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onMouseMove={handleMouseMoveShanta}
            onMouseLeave={resetTilt}
            style={{
              transform: `perspective(1000px) rotateX(${shantaTilt.x}deg) rotateY(${shantaTilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative rounded-[20px] p-8 sm:p-10 card-medical-shell flex flex-col justify-between group"
          >
            {/* Glowing Accent Corner Ribbon */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0284C7]/10 via-transparent to-transparent rounded-tr-[20px] pointer-events-none" />

            <div>
              {/* Doctor Header: Image Frame & Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#BAE6FD]">
                {/* Portrait with Curved Frame (border-radius: 16px) & Soft Glow */}
                <div className="relative shrink-0">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-[16px] overflow-hidden border-2 border-white shadow-lg ring-4 ring-[#BAE6FD]/60 bg-sky-50">
                    <Image
                      src="/dr-shanta.jpg"
                      alt="Assoc. Prof. Dr. Kamrun Nahar (Shanta)"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-[16px]"
                    />
                  </div>
                </div>

                {/* Name, Position & Floating Badges */}
                <div className="flex flex-col text-center sm:text-left">
                  {/* Department Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0F172A] border border-[#7DD3FC] text-xs font-semibold w-fit mx-auto sm:mx-0 mb-2 shadow-xs">
                    <Shield className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>{t.consultants.doctor2.badge}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
                    {t.consultants.doctor2.name}
                  </h3>
                  <div className="text-sm font-semibold text-[#0284C7] mt-0.5 font-bangla">
                    {t.consultants.doctor2.nameNative}
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] font-medium mt-2 leading-relaxed">
                    {t.consultants.doctor2.position}
                  </p>
                </div>
              </div>

              {/* Exact Credentials Timeline */}
              <div className="pt-6 space-y-4">
                {/* Academic Degrees & Fellowships */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#0284C7]" />
                    <span>{language === 'bn' ? 'শিক্ষাগত যোগ্যতা ও এফসিপিএস' : 'Degrees & Fellowships'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.consultants.doctor2.degrees.map((deg, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-white text-[#0F172A] text-xs font-semibold border border-[#7DD3FC] shadow-xs"
                      >
                        {deg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Academic Legacy & Teaching */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#0284C7]" />
                    <span>{language === 'bn' ? 'পূর্বতন অধ্যাপনা ও একাডেমি' : 'Academic Appointment'}</span>
                  </div>
                  <div className="p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] font-medium">
                    {t.consultants.doctor2.pastRole}
                  </div>
                </div>

                {/* Society Memberships */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#0284C7]" />
                    <span>{language === 'bn' ? 'সোসাইটি ও ফোরাম সদস্যপদ' : 'Professional Society Affiliations'}</span>
                  </div>
                  <div className="space-y-1.5">
                    {t.consultants.doctor2.memberships.map((mem, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-[12px] bg-[#F8FAFC] text-xs text-[#334155] font-medium border border-[#E2E8F0]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                        <span>{mem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Clinical Focus Areas */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2">
                    {language === 'bn' ? 'চিকিৎসা ক্ষেত্র' : 'Key Clinical Scope'}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#334155]">
                    {t.consultants.doctor2.specialties.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button: Book Dr. Kamrun Nahar (Shanta) */}
            <div className="pt-8">
              <button
                onClick={() => scrollToBooking(t.consultants.doctor2.name)}
                className="w-full group/btn relative flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-sm btn-contrast-dark cursor-pointer transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-sky-200" />
                <span>{t.consultants.doctor2.bookCta}</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
