'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
          className="rounded-3xl bg-[#030712]/95 backdrop-blur-2xl border border-cyan-500/30 text-white shadow-2xl p-6 sm:p-8 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Left Sidebar: Categories */}
          <div className="md:col-span-3 border-r border-slate-800/80 pr-4 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
              Departments & Scope
            </div>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00A8E8]/20 to-transparent border border-cyan-500/40 text-cyan-300'
                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{cat.label}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'rotate-90 text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-800/80 px-3">
              <div className="text-[11px] text-slate-400">
                Operating Theatre: <span className="text-white font-semibold">Class-B Autoclaved</span>
              </div>
            </div>
          </div>

          {/* Center Grid: Detailed Service Items */}
          <div className="md:col-span-6 space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Treatments in {selectedCategory}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => {
                    setActiveServiceModal(service);
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <span>{service.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Dual Doctor Briefing
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {service.fullDescription}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Duration: <strong className="text-white">{service.duration}</strong></span>
                    <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                      Watch Videos & AI Insights <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Highlight Card */}
          <div className="md:col-span-3 bg-gradient-to-br from-[#0A2540] to-[#030712] rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] font-bold text-amber-300 mb-3">
                <Sparkles className="w-3 h-3" />
                <span>Featured Consultation</span>
              </div>
              <h4 className="text-base font-extrabold text-white leading-tight">
                Complimentary 3D CBCT Bone Scan
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Eligible with any advanced implant or maxillofacial consult booked online today.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dr. Md. Abdul Alim (Oral Surgery)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#00A8E8] to-[#0A2540] hover:brightness-110 shadow-md transition-all"
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
