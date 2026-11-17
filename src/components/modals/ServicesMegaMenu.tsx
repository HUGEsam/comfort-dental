'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '@/data/servicesData';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  ChevronRight,
  Shield,
  Activity,
  Heart,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'Implantology & Surgery', label: 'Implantology & Surgery', icon: Shield, count: 2 },
  { id: 'Restorative & Laser', label: 'Restorative & Laser', icon: Sparkles, count: 2 },
  { id: 'Orthodontics & Cosmetics', label: 'Orthodontics & Cosmetics', icon: Activity, count: 2 },
  { id: 'Emergency & General', label: 'Prosthetics & Pediatric', icon: Heart, count: 2 },
];

export default function ServicesMegaMenu({ isOpen, onClose }: ServicesMegaMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Implantology & Surgery');
  const { setActiveServiceModal, scrollToBooking } = useApp();

  if (!isOpen) return null;

  const currentServices = servicesData.filter((s) => s.category === selectedCategory);

  return (
    <AnimatePresence>
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-6xl mt-2 px-4 z-50 pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="rounded-[32px] bg-white/88 backdrop-blur-3xl saturate-180 border border-white/90 text-[#0A0A0C] shadow-[0_30px_70px_-15px_rgba(10,37,64,0.22)] p-6 sm:p-8 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Left Sidebar: Categories */}
          <div className="md:col-span-3 border-r border-slate-200/70 pr-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] mb-3 px-3">
              Departments & Scope
            </div>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-[16px] text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'btn-water-primary !justify-between !rounded-[16px] !py-3 !px-3.5'
                      : 'hover:bg-[#F0F6FE] text-[#1C1C1E] hover:text-[#007AFF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#007AFF]'}`} />
                    <span>{cat.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'rotate-90 text-white' : 'text-[#C7C7CC]'
                    }`}
                  />
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-200/70 px-3">
              <div className="text-[11px] text-[#8E8E93]">
                Operating Theatre: <span className="text-[#0A0A0C] font-semibold">Class-B Autoclaved</span>
              </div>
            </div>
          </div>

          {/* Center Grid: Detailed Service Items */}
          <div className="md:col-span-6 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] mb-1">
              Treatments in {selectedCategory}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentServices.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => {
                    setActiveServiceModal(service);
                    onClose();
                  }}
                  className="w-full text-left p-4 rounded-[22px] bg-white/80 hover:bg-white border border-slate-200/70 hover:border-[rgba(10,132,255,0.35)] cursor-pointer transition-all group shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0A0A0C] group-hover:text-[#007AFF] transition-colors flex flex-wrap items-center gap-2">
                        <span>{service.title}</span>
                        <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] text-[#007AFF]">
                          Dual Doctor Briefing
                        </span>
                      </h4>
                      <p className="text-xs text-[#8E8E93] mt-1 line-clamp-2">
                        {service.fullDescription}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-[#8E8E93]">Duration: <strong className="text-[#0A0A0C]">{service.duration}</strong></span>
                    <span className="text-[#007AFF] font-semibold group-hover:underline flex items-center gap-1">
                      Watch Videos & Insights <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Highlight Card */}
          <div className="md:col-span-3 bg-gradient-to-br from-[#F0F6FE] to-white rounded-[24px] p-5 border border-[rgba(10,132,255,0.18)] flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="btn-liquid-chip !py-1 !px-2.5 !text-[10px] text-amber-700 mb-3">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Featured Consultation</span>
              </div>
              <h4 className="text-base font-extrabold text-[#0A0A0C] leading-tight">
                Complimentary 3D CBCT Bone Scan
              </h4>
              <p className="text-xs text-[#8E8E93] mt-2 leading-relaxed">
                Eligible with any advanced implant or maxillofacial consult booked online today.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-[#1C1C1E]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759] shrink-0" />
                  <span>Dr. Md. Abdul Alim (Oral Surgery)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759] shrink-0" />
                  <span>Dr. Kamrun Nahar (Endodontics)</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  onClose();
                  scrollToBooking();
                }}
                className="btn-water-primary w-full !py-2.5 !text-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Priority Chamber</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
