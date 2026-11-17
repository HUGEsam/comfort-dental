'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=BDDL+Basabo+Height+1+Central+Basabo+Dhaka';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const contactOptions = [
    {
      title: language === 'bn' ? 'সরাসরি কল (হটলাইন)' : 'Voice Call (Hotline)',
      subtitle: '01778-320966 / 02 47291419',
      href: 'tel:01778320966',
      icon: Phone,
      color: 'from-[#0A84FF] to-[#007AFF]',
      badge: 'Immediate',
    },
    {
      title: language === 'bn' ? 'হোয়াটসঅ্যাপ পরামর্শ' : 'Chamber WhatsApp',
      subtitle: '01778-320966 (Direct Chat)',
      href: 'https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery,%20I%20would%20like%20to%20consult%20about%20dental%20treatment',
      icon: MessageCircle,
      color: 'from-[#34C759] to-[#248A3D]',
      badge: 'Active Now',
    },
    {
      title: 'Send Direct SMS',
      subtitle: '01778-320966',
      href: 'sms:01778320966?body=Inquiry%20for%20Comfort%20Dental%20Surgery%20Implant%20Center',
      icon: MessageSquare,
      color: 'from-[#5856D6] to-[#3634A3]',
      badge: 'SMS',
    },
    {
      title: 'Facebook Messenger',
      subtitle: 'Comfort Dental Surgery Page',
      href: 'https://www.facebook.com/ComfortDentelSurgery',
      icon: ExternalLink,
      color: 'from-[#32ADE6] to-[#007AFF]',
      badge: 'Social',
    },
    {
      title: 'Email Inquiry',
      subtitle: 'dralim.comfort79@gmail.com',
      href: 'mailto:dralim.comfort79@gmail.com?subject=Comfort%20Dental%20Surgery%20Appointment%20Inquiry',
      icon: Mail,
      color: 'from-[#FF9F0A] to-[#FF8800]',
      badge: 'Email',
    },
    {
      title: '1-Tap Google Maps Route',
      subtitle: 'BDDL Basabo Height, Dhaka',
      href: googleMapsUrl,
      icon: Navigation,
      color: 'from-[#00C7BE] to-[#008982]',
      badge: 'Navigate',
    },
  ];

  return (
    <>
      {/* Floating Action Hub (Desktop / Laptop Only - Hidden on Mobile to prevent overlapping form buttons) */}
      <div className="hidden md:flex fixed md:bottom-6 md:right-6 z-40 flex-col items-end">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 18 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              className="mb-3.5 w-[min(340px,calc(100vw-2rem))] sm:w-[360px] rounded-[28px] bg-white/84 backdrop-blur-3xl saturate-180 border border-white/85 p-5 shadow-[0_24px_60px_-12px_rgba(10,37,64,0.22)] text-[#0A0A0C] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#007AFF]" />
                  <span className="text-sm font-bold text-[#0A0A0C] tracking-tight">
                    Instant Contact Hub
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close contact hub"
                  className="btn-liquid-icon w-7 h-7 text-[#3C3C43]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Contact Grid: iOS Inset Group Feel */}
              <div data-lenis-prevent className="py-3 space-y-2 max-h-[min(58dvh,360px)] overflow-y-auto overscroll-contain">
                {contactOptions.map((opt, i) => {
                  const Icon = opt.icon;
                  return (
                    <a
                      key={i}
                      href={opt.href}
                      target={opt.href.startsWith('http') ? '_blank' : undefined}
                      rel={opt.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-[18px] bg-white/75 hover:bg-white border border-white/90 hover:border-[rgba(10,132,255,0.28)] shadow-2xs transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-[10px] bg-gradient-to-b ${opt.color} flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0A0A0C] group-hover:text-[#007AFF] transition-colors truncate">
                            {opt.title}
                          </div>
                          <div className="text-[10px] text-[#8E8E93] truncate">{opt.subtitle}</div>
                        </div>
                      </div>
                      <span className="btn-liquid-chip !py-1 !px-2.5 !text-[9px] text-[#007AFF] shrink-0 ml-2">
                        {opt.badge}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Quick address */}
              <div className="pt-3 border-t border-slate-200/70 flex items-center gap-2 text-[10px] text-[#8E8E93] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#FF3B30] shrink-0" />
                <span>BDDL Basabo Height, 1 Central Basabo, Dhaka-1214</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Row */}
        <div className="flex items-center gap-3">
          {!isMenuOpen && (
            <motion.button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:inline-flex items-center gap-2 btn-liquid-glass !py-2 !px-4 !text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
              <span>Contact & WhatsApp Hotline</span>
            </motion.button>
          )}

          {/* Water-Drop Liquid Glass Floating Sphere */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Toggle Instant Contact Hub"
            className="btn-water-primary !w-14 !h-14 !p-0 rounded-full relative flex items-center justify-center"
          >
            {!isMenuOpen && (
              <span className="absolute -inset-1 rounded-full bg-sky-400 opacity-30 animate-ping pointer-events-none" />
            )}
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Bottom Dock: Transparent Liquid Glass Dock with iOS Home-Bar Safe Area */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-2.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] bg-white/75 backdrop-blur-2xl saturate-180 border-t border-white/80 shadow-[0_-8px_30px_rgba(10,25,50,0.08)] flex items-center gap-2">
        <a
          href="tel:01778320966"
          className="btn-water-secondary flex-1 !py-2.5 !px-3 !text-xs flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#007AFF] animate-pulse" />
          <span>{language === 'bn' ? 'কল' : 'Hotline'}</span>
        </a>

        <a
          href="https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-liquid-emerald flex-1 !py-2.5 !px-3 !text-xs flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5 text-white" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => scrollToBooking()}
          className="btn-water-primary flex-1 !py-2.5 !px-3 !text-xs flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5 text-white" />
          <span>{language === 'bn' ? 'বুকিং' : 'Book'}</span>
        </button>
      </div>
    </>
  );
}
