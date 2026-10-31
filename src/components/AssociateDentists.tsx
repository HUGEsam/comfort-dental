'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { Users, Award, ShieldCheck, Calendar, ArrowRight, UserCheck } from 'lucide-react';

export default function AssociateDentists() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];

  return (
    <section id="team" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Subtle cross accent */}
      <div className="absolute bottom-10 left-8 opacity-[0.04] pointer-events-none select-none hidden lg:block">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="0" width="40" height="160" rx="12" fill="#00A8E8"/>
          <rect x="0" y="60" width="160" height="40" rx="12" fill="#00A8E8"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#7DD3FC] text-xs sm:text-sm font-semibold text-[#0F172A] mb-5 shadow-xs">
            <Users className="w-4 h-4 text-[#0284C7]" />
            <span>{t.associates.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight">
            {t.associates.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#0284C7] to-[#D4AF37] mx-auto rounded-full my-5" />
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mx-auto">
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
              className="p-7 rounded-[20px] card-medical-shell flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Avatar Badge & BMDC Seal */}
                <div className="flex items-center justify-between mb-4">
                  {/* Initials Avatar: Deep sapphire circular badge (#0369A1, pure white bold letter) */}
                  <div className="w-12 h-12 rounded-full bg-[#0369A1] flex items-center justify-center text-white font-bold text-lg shadow-sm ring-2 ring-[#BAE6FD]">
                    {doctor.name.charAt(4) || 'D'}
                  </div>
                  {/* BMDC Badge: Pill shape (background: #E0F2FE, text: #0369A1, border: 1px solid #7DD3FC) */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#7DD3FC] shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{doctor.bmdc}</span>
                  </span>
                </div>

                {/* Doctor Name & Role */}
                <h3 className="text-lg font-bold text-[#0B2545] group-hover:text-[#0284C7] transition-colors">
                  {doctor.name}
                </h3>
                <div className="text-xs font-semibold text-[#0284C7] mt-0.5">
                  {doctor.degrees}
                </div>
                <div className="text-xs font-medium text-[#334155] mt-2">
                  {doctor.role}
                </div>

                {/* Focus Area Sub-Box: Clean enclosed card (background: #F8FAFC, border: 1px solid #E2E8F0, dark text #1E293B) */}
                <div className="mt-4 p-3 rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B]">
                  <span className="font-semibold text-[#0B2545] block mb-0.5">
                    {language === 'bn' ? 'চিকিৎসা পরিধি:' : 'Focus Area:'}
                  </span>
                  {doctor.focus}
                </div>
              </div>

              {/* "Book with Doctor" Action: High-contrast dark blue button spanning full width (#0F172A, text #FFFFFF, hover #0284C7) */}
              <div className="pt-6">
                <button
                  onClick={() => scrollToBooking(doctor.name)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-[#0284C7] shadow-sm transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-300" />
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
