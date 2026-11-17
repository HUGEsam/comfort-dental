'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
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
    <section id="gallery" className="scroll-mt-28 py-24 bg-[#F9FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] text-xs sm:text-sm font-semibold text-[var(--blue-action)] mb-5 shadow-xs">
            <Sparkles className="w-4 h-4 text-[var(--blue-action)]" />
            <span>{t.gallery.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0C] tracking-tight">
            {t.gallery.title}
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0A84FF] to-[#0071E3] mx-auto rounded-full my-5" />
          <p className="text-base sm:text-lg text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Slider Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleMove(e.touches[0].clientX);
              }}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsDragging(false)}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl border border-[rgba(10,132,255,0.2)] select-none touch-none cursor-ew-resize bg-slate-900"
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
                <div className="absolute bottom-4 right-4 bg-[#0A0A0C]/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/20">
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
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/20">
                    {t.gallery.beforeLabel}
                  </div>
                </div>
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#0071E3] shadow-2xl flex items-center justify-center border-2 border-[#0071E3]">
                  <MoveHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Hint text */}
            <p className="text-center text-xs text-[rgba(10,10,12,0.5)] mt-3.5 font-medium">
              {language === 'bn'
                ? '⟵ ড্র্যাগ বা টাচ করে চিকিৎসার আগের ও পরের পরিবর্তন তুলনা করুন ⟶'
                : '⟵ Drag slider or swipe horizontally to compare Before & After ⟶'}
            </p>
          </div>

          {/* Case Study Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-7 rounded-[32px] squircle-card shadow-lg">
              <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <h3 className="text-xl font-bold text-[#0A0A0C] leading-snug">
                {t.gallery.caseTitle}
              </h3>

              <p className="text-sm text-[rgba(10,10,12,0.68)] mt-3 leading-relaxed">
                {t.gallery.caseDesc}
              </p>

              <div className="mt-6 pt-6 border-t border-[rgba(10,132,255,0.12)] space-y-3">
                <div className="flex items-start gap-2.5 text-xs font-semibold text-[#0A0A0C]">
                  <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>CAD/CAM 3D Digital Smile Planning</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs font-semibold text-[#0A0A0C]">
                  <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>Tokyo Soft-Tissue Laser Gum Balancing</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs font-semibold text-[#0A0A0C]">
                  <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>Ultra-thin Swiss E-max Porcelain Veneers</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0A0A0C]">
                {t.gallery.resultsHighlight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
