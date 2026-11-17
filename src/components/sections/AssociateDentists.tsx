'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { Users, ShieldCheck, Calendar } from 'lucide-react';

export default function AssociateDentists() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];

  return (
    <section id="team" className="scroll-mt-28 py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Subtle cross accent */}
      <div className="absolute bottom-10 left-8 opacity-[0.04] pointer-events-none select-none hidden lg:block">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="0" width="40" height="160" rx="12" fill="#00A8E8"/>
          <rect x="0" y="60" width="160" height="40" rx="12" fill="#00A8E8"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] text-xs sm:text-sm font-semibold text-[var(--blue-action)] mb-5 shadow-xs">
            <Users className="w-4 h-4 text-[var(--blue-action)]" />
            <span>{t.associates.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0C] tracking-tight">
            {t.associates.title}
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0A84FF] to-[#0071E3] mx-auto rounded-full my-5" />
          <p className="text-base sm:text-lg text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl mx-auto">
            {t.associates.subtitle}
          </p>
        </div>

        {/* Dentists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.associates.doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-7 rounded-[32px] squircle-card flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Doctor Avatar Badge & BMDC Seal */}
                <div className="flex items-center justify-between mb-5">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0071E3] to-[#0A84FF] flex items-center justify-center text-white font-bold text-lg shadow-sm ring-2 ring-[rgba(10,132,255,0.25)]">
                    {doctor.name.charAt(4) || 'D'}
                  </div>
                  {/* BMDC Badge: 12px squircle */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-[12px] bg-[#E0F2FE] text-[#0071E3] border border-[rgba(10,132,255,0.22)] shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>{doctor.bmdc}</span>
                  </span>
                </div>

                {/* Doctor Name & Role */}
                <h3 className="text-lg font-bold text-[#0A0A0C] group-hover:text-[#0071E3] transition-colors">
                  {doctor.name}
                </h3>
                <div className="text-xs font-semibold text-[#0071E3] mt-0.5">
                  {doctor.degrees}
                </div>
                <div className="text-xs font-medium text-[rgba(10,10,12,0.65)] mt-2">
                  {doctor.role}
                </div>

                {/* Focus Area Sub-Box: 20px squircle sub-box */}
                <div className="mt-5 p-4 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B]">
                  <span className="font-semibold text-[#0A0A0C] block mb-1">
                    {language === 'bn' ? 'চিকিৎসা পরিধি:' : 'Focus Area:'}
                  </span>
                  {doctor.focus}
                </div>
              </div>

              {/* "Book with Doctor" Action: Water drop button */}
              <div className="pt-6">
                <button
                  onClick={() => scrollToBooking(doctor.name)}
                  className="btn-water-primary w-full !py-3.5 !text-xs !font-bold flex items-center justify-center gap-2 text-white"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>{language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুকিং' : 'Book with Doctor'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
