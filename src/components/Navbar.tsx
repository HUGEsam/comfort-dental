'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Globe,
  ChevronRight,
  ChevronDown,
  User as UserIcon,
  ShieldCheck,
  Award,
  ArrowLeft,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const {
    language,
    toggleLanguage,
    scrollToBooking,
    selectedCountry,
    setIsCountryModalOpen,
    setIsDrawerOpen,
    user,
    setIsAuthModalOpen,
    currentView,
    setCurrentView,
  } = useApp();

  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [treatmentsExpanded, setTreatmentsExpanded] = useState(false);

  // Sub-treatments list
  const subTreatments = language === 'bn' ? [
    'অ্যাডভান্সড ডেন্টাল ইমপ্ল্যান্ট',
    'ওরাল ও ম্যাক্সিলোফেসিয়াল সার্জারি',
    'জাপানিজ লেজার ডেন্টিস্ট্রি',
    'ব্যথাহীন রুট ক্যানেল চিকিৎসা',
    'চীনামাটির ভিনিয়ার্স ও স্মাইল ডিজাইন',
    'ক্লিয়ার অ্যালাইনার ও অর্থোডন্টিকস',
    'ডেন্টাল ক্রাউন ও ব্রিজ',
    'শিশু ডেন্টিস্ট্রি',
  ] : [
    'Advanced Dental Implants',
    'Oral & Maxillofacial Surgery',
    'Japanese Laser Dentistry',
    'Pain-Free Root Canal',
    'Porcelain Veneers & Smile Design',
    'Clear Aligners & Orthodontics',
    'Dental Crowns & Bridges',
    'Pediatric Dentistry',
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleOpenDashboard = () => {
    if (!user) { setIsAuthModalOpen(true); return; }
    if (user.role === 'admin') setCurrentView('admin-dashboard');
    else if (user.role === 'moderator') setCurrentView('moderator-dashboard');
    else setCurrentView('customer-portal');
    setSidebarOpen(false);
  };

  const handleNavClick = (href: string) => {
    setSidebarOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* ============================
          TOPBAR: Contact strip
      ============================= */}
      <div className="hidden lg:block bg-[#0A2540] text-white text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-[#00A8E8]" />
              BDDL Basabo Height, 1 Central Basabo (2nd Floor), Dhaka-1214
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3 h-3 text-amber-400" />
              {language === 'bn' ? 'সকাল ৯টা-১টা | বিকাল ৪টা-১২টা' : 'Morning 9am–1pm · Evening 4pm–12am'}
            </span>
          </div>
          <a
            href="tel:01778320966"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
          >
            <Phone className="w-3 h-3 animate-pulse" />
            01778-320966
          </a>
        </div>
      </div>

      {/* ============================
          MAIN NAVBAR
      ============================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100'
            : 'bg-white border-b border-slate-100'
        }`}
        style={{ top: 0 }}
      >
        <nav className="max-w-7xl mx-auto py-4 px-6 md:px-12 flex items-center justify-between">

          {/* LEFT: Logo + Branding */}
          <a
            href="#"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                setCurrentView('home');
              }
            }}
            className="flex items-center gap-4 group shrink-0"
          >
            <div className="relative h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden shrink-0 ring-1 ring-sky-500/20 group-hover:ring-sky-500 transition-all bg-white shadow-md flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="Comfort Dental Surgery Official Circular Badge"
                width={64}
                height={64}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Comfort Dental
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-widest text-sky-500 uppercase mt-0.5">
                SURGERY & IMPLANT CENTER
              </span>
            </div>
          </a>

          {/* CENTER: Back pill when in dashboard (desktop) */}
          {currentView !== 'home' && (
            <button
              onClick={() => setCurrentView('home')}
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#00A8E8]/8 text-[#0A2540] hover:bg-[#00A8E8] hover:text-white border border-[#00A8E8]/25 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Home
            </button>
          )}

          {/* RIGHT: Globe lang + Book CTA + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Language globe icon button */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to বাংলা' : 'Switch to English'}
              className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:border-[#00A8E8] hover:bg-[#00A8E8]/5 transition-all group relative"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 text-slate-500 group-hover:text-[#00A8E8] transition-colors" />
              {/* Small lang badge */}
              <span className="absolute -bottom-0.5 -right-0.5 text-[7px] font-black bg-[#00A8E8] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                {language === 'en' ? 'EN' : 'বা'}
              </span>
            </button>

            {/* Book Appointment CTA — visible on md+ */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToBooking()}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#0A2540] via-[#0D3863] to-[#00A8E8] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-md hover:shadow-[#00A8E8]/30 hover:shadow-lg transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.nav.bookAppointment}</span>
              <span className="md:hidden">Book</span>
            </motion.button>

            {/* Hamburger menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              className="w-9 h-9 rounded-full bg-[#0A2540] text-white flex items-center justify-center hover:bg-[#00A8E8] transition-colors shadow-sm"
            >
              <Menu className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </nav>
      </header>

      {/* ============================
          SIDEBAR / SLIDE-OUT PANEL
      ============================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />

            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[300px] sm:w-[320px] z-[70] bg-white shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-sky-500/20 bg-white shadow flex items-center justify-center">
                    <Image src="/assets/logo.png" alt="Comfort Dental Surgery Official Circular Badge" width={36} height={36} className="object-contain" />
                  </div>
                  <span className="text-sm font-extrabold text-[#0A2540]">Comfort Dental</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Panel Body — scrollable */}
              <div className="flex-1 overflow-y-auto py-4">

                {/* Nav items */}
                <nav className="px-3 space-y-1">
                  {/* Profile Menu Item (replaces previous user name & points preview) */}
                  <button
                    onClick={handleOpenDashboard}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-[#111827] hover:bg-[#00A8E8]/10 hover:text-[#00A8E8] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0A2540] group-hover:bg-[#00A8E8]/20 transition-colors">
                      <UserIcon className="w-4 h-4 text-[#0A2540]" />
                    </span>
                    <span className="flex-1 text-left">{language === 'bn' ? 'প্রোফাইল' : 'Profile'}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  {/* Main Consultants */}
                  <a
                    href="#consultants"
                    onClick={() => handleNavClick('#consultants')}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#00A8E8]/5 hover:text-[#00A8E8] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-base group-hover:bg-[#00A8E8]/10 transition-colors">👨‍⚕️</span>
                    {t.nav.consultants}
                  </a>

                  {/* Treatments — collapsible accordion */}
                  <div>
                    <button
                      onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#00A8E8]/5 hover:text-[#00A8E8] transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-base group-hover:bg-[#00A8E8]/10 transition-colors">🦷</span>
                      <span className="flex-1 text-left">{t.nav.services}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          treatmentsExpanded ? 'rotate-180 text-[#00A8E8]' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {treatmentsExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-11 mr-3 mb-1 space-y-0.5 border-l-2 border-[#00A8E8]/20 pl-3">
                            {subTreatments.map((treatment) => (
                              <a
                                key={treatment}
                                href="#services"
                                onClick={() => handleNavClick('#services')}
                                className="flex items-center gap-2 py-2 px-2 rounded-lg text-xs font-medium text-slate-600 hover:text-[#00A8E8] hover:bg-[#00A8E8]/5 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8]/40 shrink-0" />
                                {treatment}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dental Team */}
                  <a
                    href="#team"
                    onClick={() => handleNavClick('#team')}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#00A8E8]/5 hover:text-[#00A8E8] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-base group-hover:bg-[#00A8E8]/10 transition-colors">🩺</span>
                    {t.nav.associates}
                  </a>

                  {/* Smile Gallery */}
                  <a
                    href="#gallery"
                    onClick={() => handleNavClick('#gallery')}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#00A8E8]/5 hover:text-[#00A8E8] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-base group-hover:bg-[#00A8E8]/10 transition-colors">✨</span>
                    {t.nav.transformations}
                  </a>

                  {/* Sterilization */}
                  <a
                    href="#sterilization"
                    onClick={() => handleNavClick('#sterilization')}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#00A8E8]/5 hover:text-[#00A8E8] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-base group-hover:bg-[#00A8E8]/10 transition-colors">🛡️</span>
                    {t.nav.sterilization}
                  </a>

                  {/* Location & Hours */}
                  <a
                    href="#contact"
                    onClick={() => handleNavClick('#contact')}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-[#1E293B] hover:bg-[#00A8E8]/5 hover:text-[#00A8E8] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-base group-hover:bg-[#00A8E8]/10 transition-colors">📍</span>
                    {t.nav.contact}
                  </a>
                </nav>

                {/* Divider */}
                <div className="mx-4 my-4 border-t border-slate-100" />

                {/* Language Option */}
                <div className="px-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">Language</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { /* set to english */ if (language !== 'en') toggleLanguage(); }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        language === 'en'
                          ? 'bg-[#0A2540] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { if (language !== 'bn') toggleLanguage(); }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all font-bangla ${
                        language === 'bn'
                          ? 'bg-[#00A8E8] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      বাংলা
                    </button>
                  </div>
                </div>

                {/* Patient Drawer shortcut */}
                <div className="px-4 mt-3">
                  <button
                    onClick={() => { setSidebarOpen(false); setIsDrawerOpen(true); }}
                    className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-50 to-cyan-50 border border-amber-200/60 text-[#0A2540] text-xs font-bold hover:shadow-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Points, Offers & Payment Drawer</span>
                  </button>
                </div>

                {/* Sign in if no user */}
                {!user && (
                  <div className="px-4 mt-3">
                    <button
                      onClick={() => { setSidebarOpen(false); setIsAuthModalOpen(true); }}
                      className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 text-[#0A2540] text-xs font-bold hover:bg-slate-200 transition-all"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      <span>Sign in to Patient Portal</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Panel Footer — Book CTA */}
              <div className="px-4 py-4 border-t border-slate-100 space-y-2 bg-white">
                <button
                  onClick={() => { setSidebarOpen(false); scrollToBooking(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#0A2540] via-[#0D3863] to-[#00A8E8] text-white font-bold text-sm shadow-lg hover:shadow-[#00A8E8]/30 hover:brightness-105 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  {t.nav.bookAppointment}
                </button>
                <a
                  href="tel:01778320966"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors border border-emerald-200"
                >
                  <Phone className="w-4 h-4" />
                  01778-320966
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
