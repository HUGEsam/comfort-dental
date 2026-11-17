'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { servicesData } from '@/data/servicesData';
import {
  Sparkles,
  Check,
  ArrowUpRight,
  PlayCircle,
  Video,
} from 'lucide-react';

export default function ServicesBento() {
  const { language, scrollToBooking, setActiveServiceModal } = useApp();
  const t = translations[language];

  // Map service image paths
  const serviceImages: Record<string, string> = {
    implants: '/images/implants.jpg',
    maxillofacial: '/images/surgery.jpg',
    laser: '/images/laser.jpg',
    endodontics: '/images/root-canal.jpg',
    orthodontics: '/images/orthodontics.jpg',
    aesthetic: '/images/smile-design.jpg',
    prosthodontics: '/images/dental-chair.jpg',
    pediatric: '/images/orthodontics.jpg',
  };

  const handleOpenServiceModal = (serviceId: string) => {
    const detail = servicesData.find((s) => s.id === serviceId);
    if (detail) {
      setActiveServiceModal(detail);
    }
  };

  return (
    <section id="services" className="scroll-mt-28 py-28 lg:py-40 bg-white relative overflow-hidden">
      {/* Subtle blue medical line-art accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.025] select-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -right-20">
          <circle cx="300" cy="300" r="280" stroke="#00A8E8" strokeWidth="1.5"/>
          <circle cx="300" cy="300" r="200" stroke="#00A8E8" strokeWidth="1"/>
          <circle cx="300" cy="300" r="120" stroke="#0A2540" strokeWidth="0.8"/>
          <line x1="300" y1="0" x2="300" y2="600" stroke="#00A8E8" strokeWidth="0.8"/>
          <line x1="0" y1="300" x2="600" y2="300" stroke="#00A8E8" strokeWidth="0.8"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] text-xs sm:text-sm font-semibold text-[var(--blue-action)] mb-5 shadow-xs">
            <Sparkles className="w-4 h-4 text-[var(--blue-action)]" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0C] tracking-tight">
            {t.services.title}
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0A84FF] to-[#0071E3] mx-auto rounded-full my-5" />
          <p className="text-base sm:text-lg text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {t.services.items.map((service, index) => {
            const isLarge = index === 0 || index === 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-[32px] overflow-hidden squircle-card flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 ${
                  isLarge ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                {/* Header Media: Continuous squircle top (border-radius: 32px 32px 0 0) with vignette */}
                <div
                  onClick={() => handleOpenServiceModal(service.id)}
                  className="relative h-56 w-full overflow-hidden bg-sky-100 cursor-pointer rounded-t-[32px]"
                >
                  <Image
                    src={serviceImages[service.id] || '/images/hero-clinic.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 rounded-t-[32px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/35 to-transparent" />

                  {/* Service Category Tag */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3.5 py-1.5 rounded-[12px] text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#0A0A0C] border border-[rgba(10,132,255,0.18)] shadow-xs">
                      {service.tag}
                    </span>
                  </div>

                  {/* Dual Doctor badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-[10px] font-semibold bg-white/90 backdrop-blur-md text-[#0071E3] border border-[rgba(10,132,255,0.18)] shadow-xs">
                      <Video className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span>Dual Doctor Video</span>
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-sm group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-sky-200 font-medium mt-0.5">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content description & feature checklist */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-[rgba(10,10,12,0.7)] leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Feature Bullet List: Dark slate text paired with vibrant blue checkmarks */}
                  <div className="space-y-2.5 pt-3 border-t border-[rgba(10,132,255,0.12)]">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-[#1E293B]">
                        <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Row: Water drop tactile buttons */}
                  <div className="pt-3 space-y-2.5">
                    {/* Primary Action Button: Water drop primary */}
                    <button
                      onClick={() => scrollToBooking(service.title)}
                      className="btn-water-primary w-full !py-3.5 !text-xs !font-bold flex items-center justify-between text-white"
                    >
                      <span>{language === 'bn' ? 'চিকিৎসা গ্রহণ করুন' : 'Book Priority Chamber'}</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </button>

                    {/* Secondary Water Drop Button: Watch Videos & AI Streaming */}
                    <button
                      onClick={() => handleOpenServiceModal(service.id)}
                      className="btn-water-secondary w-full !py-3 !text-xs !font-bold flex items-center justify-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4 text-[#0071E3]" />
                      <span>{language === 'bn' ? 'ভিডিও ও এআই ব্যাখ্যা দেখুন' : 'Watch Videos & AI Streaming'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}