'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { ShieldCheck, Zap } from 'lucide-react';

export default function SterilizationProtocol() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section id="sterilization" className="scroll-mt-28 py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] text-xs sm:text-sm font-semibold text-[var(--blue-action)] mb-5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[var(--blue-action)]" />
            <span>{t.sterilization.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0C] tracking-tight">
            {t.sterilization.title}
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0A84FF] to-[#0071E3] mx-auto rounded-full my-5" />
          <p className="text-base sm:text-lg text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl mx-auto">
            {t.sterilization.subtitle}
          </p>
        </div>

        {/* 7-Step Horizontal / Grid Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.sterilization.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`p-6 rounded-[24px] squircle-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                index === 6 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-2xl font-black text-[#0071E3]">
                    {step.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" />
                </div>
                <h3 className="text-base font-bold text-[#0A0A0C] mb-2 leading-tight">
                  {step.name}
                </h3>
                <p className="text-xs text-[rgba(10,10,12,0.68)] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 mt-3 border-t border-[rgba(10,132,255,0.12)] flex items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[11px] font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>100% Pathogen Free</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sterilization Highlight Banner */}
        <div className="mt-14 rounded-[32px] overflow-hidden relative border border-[rgba(10,132,255,0.2)] shadow-2xl bg-gradient-to-br from-[#0A2540] via-[#0D3863] to-[#030712] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span>Biohazard Safety Standard</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold mb-3">
              {language === 'bn'
                ? 'একক ব্যবহারের ডিসপোজেবল কিট ও ইউরোপীয় ভ্যাকুয়াম অটোক্লেভ'
                : 'Single-Use Disposable Kits & European Class-B Vacuum Autoclaves'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'আমাদের ক্লিনিকে প্রতিটি সিরিঞ্জ, গ্লাভস, সাকশন টিপস ও ড্র্যাপস একবার ব্যবহারের পর পরিবেশবান্ধব পদ্ধতিতে ধ্বংস করা হয়। সার্জিক্যাল ইনস্ট্রুমেন্টস ইউরোপীয় ক্লাস-বি অটোক্লেভে সর্বোচ্চ তাপ ও চাপে জীবাণুমুক্ত করা হয়।'
                : 'Every single syringe, surgical glove, suction tip, and patient drape is strictly 100% single-use disposable. Critical surgical handpieces undergo automated internal lumen purge and Class-B vacuum sterilization before every appointment.'}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <div className="px-6 py-4 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-3xl font-black text-emerald-400">0.0%</div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {language === 'bn' ? 'ক্রস-ইনফেকশন রিস্ক' : 'Cross-Infection Risk'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
