'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { Sparkles, MoveHorizontal, CheckCircle2, Star } from 'lucide-react';

export default function SmileSlider() {
  const { language } = useApp();
  const t = translations[language];

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#7DD3FC] text-xs sm:text-sm font-semibold text-[#0F172A] mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#0284C7]" />
            <span>{t.gallery.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B2545] tracking-tight">
            {t.gallery.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#0284C7] to-[#D4AF37] mx-auto rounded-full my-4" />
          <p className="text-base sm:text-lg text-[#334155]">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Slider Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-800 select-none cursor-ew-resize bg-slate-900"
            >
              {/* After Image (Full background) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/after-smile.jpg"
                  alt="After Smile Transformation"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 right-4 bg-[#0A2540]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
                  {t.gallery.afterLabel}
                </div>
              </div>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/before-smile.jpg"
                    alt="Before Smile Transformation"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/20">
                    {t.gallery.beforeLabel}
                  </div>
                </div>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#0A2540] text-[#00A8E8] shadow-2xl flex items-center justify-center border-2 border-[#00A8E8]">
                  <MoveHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Hint text */}
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
              {language === 'bn'
                ? '⟵ ড্র্যাগ বা টাচ করে চিকিৎসার আগের ও পরের পরিবর্তন তুলনা করুন ⟶'
                : '⟵ Drag slider or swipe horizontally to compare Before & After ⟶'}
            </p>
          </div>

          {/* Case Study Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-[20px] card-medical-shell shadow-lg">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <h3 className="text-xl font-bold text-[#0B2545] leading-snug">
                {t.gallery.caseTitle}
              </h3>

              <p className="text-sm text-[#334155] mt-3 leading-relaxed">
                {t.gallery.caseDesc}
              </p>

              <div className="mt-6 pt-6 border-t border-sky-200/80 space-y-3">
                <div className="flex items-start gap-2.5 text-xs font-semibold text-[#0F172A]">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>CAD/CAM 3D Digital Smile Planning</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs font-semibold text-[#0F172A]">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>Tokyo Soft-Tissue Laser Gum Balancing</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs font-semibold text-[#0F172A]">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>Ultra-thin Swiss E-max Porcelain Veneers</span>
                </div>
              </div>

              <div className="mt-6 p-3.5 rounded-xl bg-white/80 border border-[#BAE6FD] text-xs font-semibold text-[#0F172A]">
                {t.gallery.resultsHighlight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
