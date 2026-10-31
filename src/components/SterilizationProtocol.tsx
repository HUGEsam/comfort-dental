'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { ShieldCheck, Sparkles, Activity, CheckCircle, Zap } from 'lucide-react';

export default function SterilizationProtocol() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section id="sterilization" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#7DD3FC] text-xs sm:text-sm font-semibold text-[#0F172A] mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <span>{t.sterilization.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight">
            {t.sterilization.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#0284C7] to-[#D4AF37] mx-auto rounded-full my-4" />
          <p className="text-base sm:text-lg text-[#334155]">
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
              className={`p-6 rounded-[18px] bg-white border border-[#E0F2FE] shadow-[0_10px_25px_-5px_rgba(14,165,233,0.1)] hover:shadow-[0_15px_30px_-5px_rgba(14,165,233,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                index === 6 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-[#0284C7]">
                    {step.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                </div>
                <h3 className="text-base font-bold text-[#0B2545] mb-2 leading-tight">
                  {step.name}
                </h3>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Status Indicator: Authentic medical badge with crisp green/cyan shield icon (#059669) on light mint backing (#ECFDF5) */}
              <div className="pt-4 mt-3 border-t border-[#E0F2FE] flex items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] text-[11px] font-bold shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>100% Pathogen Free</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sterilization Highlight Banner */}
        <div className="mt-12 rounded-3xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-xl bg-[#0A2540] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
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
            <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
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
