'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { servicesData } from '@/data/servicesData';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  HeartHandshake,
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
    <section id="services" className="py-28 lg:py-40 bg-white relative overflow-hidden">
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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#7DD3FC] text-xs sm:text-sm font-semibold text-[#0F172A] mb-5 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#0284C7]" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight">
            {t.services.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#0284C7] to-[#D4AF37] mx-auto rounded-full my-5" />
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {t.services.items.map((service, index) => {
            const isLarge = index === 0 || index === 1;
            const matchedDetail = servicesData.find((s) => s.id === service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative rounded-[20px] overflow-hidden card-medical-shell flex flex-col justify-between ${
                  isLarge ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                {/* Header Media: Smooth top rounded image (border-radius: 20px 20px 0 0) with dark vignette */}
                <div
                  onClick={() => handleOpenServiceModal(service.id)}
                  className="relative h-52 w-full overflow-hidden bg-sky-100 cursor-pointer rounded-t-[20px]"
                >
                  <Image
                    src={serviceImages[service.id] || '/images/hero-clinic.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-[20px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/40 to-transparent" />

                  {/* Service Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white text-[#0F172A] border border-[#7DD3FC] shadow-xs">
                      {service.tag}
                    </span>
                  </div>

                  {/* Dual Doctor badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white text-[#0F172A] border border-[#7DD3FC] shadow-xs">
                      <Video className="w-3 h-3 text-[#0284C7]" />
                      <span>Dual Doctor Video</span>
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white leading-tight drop-shadow-sm group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-sky-200 font-medium">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content description & feature checklist */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Feature Bullet List: Dark slate text (#1E293B) paired with sharp blue checkmark icons (#0284C7) */}
                  <div className="space-y-2 pt-2 border-t border-sky-200/80">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#1E293B]">
                        <Check className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Row: Primary midnight blue with white text, paired with secondary outline button */}
                  <div className="pt-2 space-y-2">
                    {/* Primary Action Button: Midnight Blue (#0B2545) with White Text */}
                    <button
                      onClick={() => scrollToBooking(service.title)}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-white py-3 px-4 rounded-xl bg-[#0B2545] hover:bg-[#0284C7] shadow-sm transition-colors cursor-pointer"
                    >
                      <span>{language === 'bn' ? 'চিকিৎসা গ্রহণ করুন' : 'Book Priority Chamber'}</span>
                      <ArrowUpRight className="w-4 h-4 text-sky-300" />
                    </button>

                    {/* Secondary Outline Button: Watch Videos & AI Streaming */}
                    <button
                      onClick={() => handleOpenServiceModal(service.id)}
                      className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 rounded-xl bg-white border border-[#0284C7] text-[#0B2545] hover:bg-sky-50 transition-colors cursor-pointer shadow-xs"
                    >
                      <PlayCircle className="w-4 h-4 text-[#0284C7]" />
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