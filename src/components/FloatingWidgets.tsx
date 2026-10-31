'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Calendar,
  MessageCircle,
  Mail,
  Navigation,
  MessageSquare,
  X,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function FloatingWidgets() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=BDDL+Basabo+Height+1+Central+Basabo+Dhaka';

  const contactOptions = [
    {
      title: 'Voice Call (Hotline)',
      subtitle: '01778-320966 / 02 47291419',
      href: 'tel:01778320966',
      icon: Phone,
      color: 'from-blue-600 to-cyan-600',
      badge: 'Immediate',
    },
    {
      title: 'Personal & Chamber WhatsApp',
      subtitle: '01778-320966 (Direct Chat)',
      href: 'https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery,%20I%20would%20like%20to%20consult%20about%20dental%20treatment',
      icon: MessageCircle,
      color: 'from-emerald-600 to-green-500',
      badge: 'Active Now',
    },
    {
      title: 'Send Direct SMS',
      subtitle: '01778-320966',
      href: 'sms:01778320966?body=Inquiry%20for%20Comfort%20Dental%20Surgery%20Implant%20Center',
      icon: MessageSquare,
      color: 'from-violet-600 to-indigo-600',
      badge: 'SMS',
    },
    {
      title: 'Facebook Messenger',
      subtitle: 'Comfort Dental Surgery Page',
      href: 'https://www.facebook.com/ComfortDentelSurgery',
      icon: ExternalLink,
      color: 'from-sky-600 to-blue-700',
      badge: 'Social',
    },
    {
      title: 'Email Inquiry',
      subtitle: 'dralim.comfort79@gmail.com',
      href: 'mailto:dralim.comfort79@gmail.com?subject=Comfort%20Dental%20Surgery%20Appointment%20Inquiry',
      icon: Mail,
      color: 'from-amber-600 to-orange-500',
      badge: 'Email',
    },
    {
      title: '1-Tap Google Maps Route',
      subtitle: 'BDDL Basabo Height, Dhaka',
      href: googleMapsUrl,
      icon: Navigation,
      color: 'from-teal-600 to-emerald-700',
      badge: 'GPS Navigate',
    },
  ];

  return (
    <>
      {/* Floating Action Radial / Multi-Hub Button on Desktop & Tablet */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Expanded Contact Modal/Popup Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="mb-4 w-80 sm:w-96 rounded-3xl bg-[#030712]/95 backdrop-blur-2xl border border-cyan-500/40 p-5 shadow-2xl text-white overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-white">Instant Contact Hub</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Grid */}
              <div className="py-3 space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {contactOptions.map((opt, i) => {
                  const Icon = opt.icon;
                  return (
                    <a
                      key={i}
                      href={opt.href}
                      target={opt.href.startsWith('http') ? '_blank' : undefined}
                      rel={opt.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-cyan-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${opt.color} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {opt.title}
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{opt.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/20 shrink-0">
                        {opt.badge}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Quick chamber address reminder */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-[10px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>BDDL Basabo Height, 1 Central Basabo (2nd Floor), Dhaka</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <div className="flex items-center gap-3">
          {/* Tooltip hint when closed */}
          {!isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A2540] text-cyan-300 text-xs font-bold shadow-xl border border-cyan-400/30"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Contact & WhatsApp Hotline</span>
            </motion.div>
          )}

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle Instant Contact Hub"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-[#00A8E8] to-[#0A2540] text-white shadow-2xl flex items-center justify-center border-2 border-white dark:border-slate-800 cursor-pointer"
          >
            {/* Ping animation when closed */}
            {!isMenuOpen && (
              <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-50 animate-ping pointer-events-none" />
            )}

            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-7 h-7 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Floating Bottom Quick Dock for Mobile (Call + Book + WhatsApp) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-[#030712]/95 backdrop-blur-md border-t border-slate-800 flex items-center gap-2">
        <a
          href="tel:01778320966"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Call Hotline</span>
        </a>

        <a
          href="https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => scrollToBooking()}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-[#00A8E8] to-[#0A2540] text-white font-bold text-xs shadow-md border border-cyan-400/40"
        >
          <Calendar className="w-3.5 h-3.5 text-cyan-200" />
          <span>Appointment</span>
        </button>
      </div>
    </>
  );
}