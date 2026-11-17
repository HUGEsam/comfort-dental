'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { servicesData } from '@/data/servicesData';
import { Language } from '@/types';
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
  Users,
  Star,
  UserCheck,
  KeyRound,
  Stethoscope,
  Check,
  Share2,
} from 'lucide-react';

const SUPPORTED_LANGUAGES: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'bn', name: 'Bangla', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
  { code: 'fa', name: 'Irani (Persian)', nativeName: 'فارسی', flag: '🇮🇷' },
  { code: 'si', name: 'Sri Lankan', nativeName: 'සිංහල / தமிழ்', flag: '🇱🇰' },
];

export default function Navbar() {
  const {
    language,
    setLanguage,
    scrollToBooking,
    selectedCountry,
    setIsCountryModalOpen,
    setActiveServiceModal,
    setIsDrawerOpen,
    user,
    setIsAuthModalOpen,
    currentView,
    setCurrentView,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = translations[language] || translations.en;
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [treatmentsExpanded, setTreatmentsExpanded] = useState(false);

  // Map treatment IDs from servicesData for instant interactive modal launch
  const treatmentLinks = servicesData.map((s) => ({
    id: s.id,
    title: s.title,
    detail: s,
  }));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for Escape when Settings menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [sidebarOpen]);

  const handleOpenProfile = () => {
    setSidebarOpen(false);
    if (user?.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (user?.role === 'moderator') {
      setCurrentView('moderator-dashboard');
    } else {
      setCurrentView('customer-portal');
    }
  };

  const handleNavClick = (href: string) => {
    setSidebarOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof window !== 'undefined') {
        window.location.href = '/' + href;
      }
    }, 220);
  };

  const handleOpenTreatmentFromMenu = (serviceId: string) => {
    const found = servicesData.find((s) => s.id === serviceId);
    setSidebarOpen(false);
    if (found) {
      setTimeout(() => setActiveServiceModal(found), 180);
    }
  };

  return (
    <>
      {/* =========================================================================
          UNIFIED APPLE LIQUID GLASS HEADER STACK
          Top Contact Banner + Floating Glass Navbar stacked cleanly so NOTHING
          ever goes under floating buttons or collides.
      ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
        {/* ROW 1: Organized Frosted Top Chamber Strip (Always cleanly above Navbar) */}
        <div
          className={`hidden md:block w-full pointer-events-auto transition-all duration-300 border-b ${
            scrolled
              ? 'bg-white/65 backdrop-blur-2xl border-[rgba(10,132,255,0.10)] py-1.5'
              : 'bg-white/80 backdrop-blur-xl border-[rgba(10,132,255,0.12)] py-2'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between text-[11px] font-medium text-[#1C1C1E]">
            <div className="flex items-center gap-5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="flex items-center gap-1.5 hover:text-[#007AFF] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
                <span>BDDL Basabo Height, 1 Central Basabo (2nd Floor), Dhaka-1214</span>
              </a>
              <span className="h-3 w-px bg-slate-300/70" />
              <span className="flex items-center gap-1.5 text-[rgba(10,10,12,0.72)]">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'সকাল ৯টা–১টা · বিকাল ৪টা–১২টা'
                    : 'Morning 9am–1pm · Evening 4pm–12am'}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:01778320966"
                className="btn-liquid-chip !py-1 !px-3 !text-[11px] text-[#059669] hover:text-[#047857]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Phone className="w-3 h-3" />
                <span>01778-320966</span>
              </a>
            </div>
          </div>
        </div>

        {/* ROW 2: Floating Liquid Glass Pill Navbar */}
        <nav
          className={`pointer-events-auto w-[94%] max-w-[1240px] rounded-[24px] glass-nav transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'mt-2 py-2.5 px-4 sm:px-7 shadow-[0_14px_38px_-10px_rgba(10,25,50,0.14)]'
              : 'mt-2.5 sm:mt-3 py-3 px-4 sm:px-8'
          }`}
        >
          {/* LEFT: Top-left waterdrop back button (when in portal) + Official Circular Logo + Brand Lockup */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
            {currentView !== 'home' && (
              <button
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label="Back to Homepage"
                title={language === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Home'}
                className="btn-liquid-icon w-8 h-8 sm:w-10 sm:h-10 text-[#007AFF] shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <a
              href="#"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2.5 sm:gap-4 group min-w-0"
            >
              <div className="relative h-10 w-10 sm:h-14 sm:w-14 rounded-full overflow-hidden shrink-0 ring-1 ring-sky-500/25 group-hover:ring-[#007AFF] transition-all bg-white shadow-sm flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="Comfort Dental Surgery Official Circular Badge"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-[14px] sm:text-2xl font-extrabold tracking-tight text-[#0A0A0C] group-hover:text-[#007AFF] transition-colors truncate">
                  Comfort Dental
                </span>
                <span className="text-[7.5px] sm:text-xs font-semibold tracking-wider sm:tracking-widest text-[#007AFF] uppercase mt-0.5 truncate">
                  SURGERY & IMPLANT CENTER
                </span>
              </div>
            </a>
          </div>

          {/* RIGHT: Transparent Water-Drop Glass Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Socials & Hub Link */}
            <a
              href="#socials"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#socials');
              }}
              className="hidden md:inline-flex items-center gap-1.5 btn-liquid-chip !py-2 !px-3.5 !text-xs font-semibold text-[#007AFF] hover:text-[#005bb5]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t.nav.socials || 'Socials'}</span>
            </a>

            {/* Primary Translucent Water-Drop CTA: Book Appointment (Desktop only, so mobile never squishes the brand name!) */}
            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToBooking()}
              className="hidden lg:inline-flex items-center gap-2 btn-water-primary !py-2.5 !px-5 !text-xs sm:!text-sm"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>{t.nav.bookAppointment}</span>
            </motion.button>

            {/* Language Selector: Single option on left side of 3-line menu, showing active flag */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                title="Select Language"
                aria-label="Select Language"
                className="btn-liquid-icon w-9 h-9 sm:w-10 sm:h-10 text-xl flex items-center justify-center relative select-none"
              >
                <span className="leading-none text-xl sm:text-2xl">{currentLang.flag}</span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-12 z-50 w-52 rounded-2xl bg-white/94 backdrop-blur-2xl border border-white/85 shadow-[0_20px_45px_-10px_rgba(10,37,64,0.22)] p-1.5 divide-y divide-slate-100"
                  >
                    {SUPPORTED_LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                          language === item.code
                            ? 'bg-[#007AFF]/10 text-[#007AFF] font-bold'
                            : 'text-[#0A0A0C] hover:bg-black/5 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{item.flag}</span>
                          <div>
                            <div className="text-xs">{item.nativeName}</div>
                            <div className="text-[10px] text-slate-400">{item.name}</div>
                          </div>
                        </div>
                        {language === item.code && <Check className="w-4 h-4 text-[#007AFF]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3-Line Menu Trigger -> Opens iPhone Settings UI */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open iOS Settings Navigation Menu"
              className="btn-liquid-icon w-9 h-9 sm:w-10 sm:h-10 text-[#0A0A0C] hover:text-[#007AFF]"
            >
              <Menu className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </nav>
      </header>

      {/* =========================================================================
          3-LINE HAMBURGER DRAWER: IPHONE SETTINGS PAGE UI AESTHETIC
      ========================================================================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Frosted Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/35 backdrop-blur-md"
            />

            {/* iOS Settings Sheet Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              aria-label="Navigation and Settings Menu"
              className="fixed top-0 right-0 h-full w-[min(340px,88vw)] sm:w-[360px] z-[70] bg-[#F2F2F7]/94 backdrop-blur-3xl saturate-180 border-l border-white/80 shadow-[-20px_0_60px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden"
            >
              {/* iOS Sticky Translucent Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 bg-white/75 backdrop-blur-xl border-b border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-sky-500/20 bg-white shadow-xs flex items-center justify-center">
                    <Image
                      src="/assets/logo.png"
                      alt="Comfort Dental Badge"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0A0A0C] tracking-tight leading-none">
                      {language === 'bn' ? 'মেনু ও সেটিংস' : 'Menu & Settings'}
                    </h2>
                    <span className="text-[10px] font-medium text-[#8E8E93] block mt-0.5">
                      Comfort Dental Center
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                  className="btn-liquid-icon w-8 h-8 text-[#3C3C43]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable iPhone Settings Grouped List Body */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-6">
                {/* GROUP 1: APPLE ID STYLE PATIENT ACCOUNT CARD */}
                <div>
                  <button
                    onClick={handleOpenProfile}
                    className="ios-settings-group w-full p-3.5 flex items-center gap-3.5 text-left hover:bg-white transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#0A84FF] to-[#007AFF] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0 ring-2 ring-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-bold text-[#0A0A0C] truncate">
                        {user?.name || (language === 'bn' ? 'রোগী পোর্টাল প্রোফাইল' : 'Patient Profile & Portal')}
                      </div>
                      <div className="text-[11px] text-[#8E8E93] truncate mt-0.5">
                        {user
                          ? user.email || user.phone || 'Verified Device Session'
                          : language === 'bn'
                          ? 'লগইন বা নতুন প্রোফাইল খুলুন'
                          : 'Sign in, records, reviews & referrals'}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                </div>

                {/* GROUP 2: CLINICAL DIRECTORY (iOS Settings Inset Rows) */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] px-3 mb-1.5">
                    {language === 'bn' ? 'ক্লিনিক্যাল বিভাগসমূহ' : 'Clinical Directory'}
                  </p>
                  <div className="ios-settings-group divide-y divide-slate-200/70">
                    {/* Main Consultants */}
                    <button
                      onClick={() => handleNavClick('#consultants')}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#0A84FF] to-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <UserCheck className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {t.nav.consultants}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Treatments Expandable Row */}
                    <div>
                      <button
                        onClick={() => setTreatmentsExpanded(!treatmentsExpanded)}
                        className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                      >
                        <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#32ADE6] to-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Stethoscope className="w-4 h-4" />
                        </span>
                        <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                          {t.nav.services}
                        </span>
                        <span className="text-[11px] font-medium text-[#8E8E93] mr-1">
                          {treatmentLinks.length}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C7C7CC] transition-transform duration-200 ${
                            treatmentsExpanded ? 'rotate-180 text-[#007AFF]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {treatmentsExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden bg-[#F9F9FB]"
                          >
                            <div className="divide-y divide-slate-200/60 border-t border-slate-200/70">
                              {treatmentLinks.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleOpenTreatmentFromMenu(item.id)}
                                  className="w-full flex items-center justify-between pl-13 pr-3.5 py-2.5 text-[12.5px] font-medium text-[#3C3C43] hover:text-[#007AFF] hover:bg-white/80 transition-colors text-left cursor-pointer"
                                >
                                  <span className="truncate pr-2">{item.title}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-[#C7C7CC] shrink-0" />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dental Team */}
                    <button
                      onClick={() => handleNavClick('#team')}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#34C759] to-[#248A3D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Users className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {t.nav.associates}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Smile Gallery */}
                    <button
                      onClick={() => handleNavClick('#gallery')}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#FF9F0A] to-[#FF8800] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Star className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {t.nav.transformations}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Sterilization */}
                    <button
                      onClick={() => handleNavClick('#sterilization')}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#00C7BE] to-[#008982] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {t.nav.sterilization}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Location & Hours */}
                    <button
                      onClick={() => handleNavClick('#contact')}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#FF453A] to-[#D70015] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {t.nav.contact}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Socials & Digital Hub */}
                    <button
                      onClick={() => handleNavClick('#socials')}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#007AFF] to-[#5856D6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Share2 className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {t.nav.socials || 'Socials & Digital Hub'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>
                  </div>
                </div>

                {/* GROUP 3: PREFERENCES & MEMBER HUB (iOS Controls) */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] px-3 mb-1.5">
                    {language === 'bn' ? 'পছন্দসমূহ ও পোর্টাল' : 'Preferences & Hub'}
                  </p>
                  <div className="ios-settings-group divide-y divide-slate-200/70">
                    {/* Member Control Hub / Offers Drawer */}
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        setTimeout(() => setIsDrawerOpen(true), 160);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#FFCC00] to-[#FF9500] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Award className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        Offers, Wallet & Billing
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Language Row in iPhone Settings Drawer with all 6 Supported Flags */}
                    <div className="px-3.5 py-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#5856D6] to-[#3634A3] text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Globe className="w-4 h-4" />
                          </span>
                          <span className="text-[14px] font-medium text-[#0A0A0C]">
                            {language === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#007AFF]">{currentLang.flag} {currentLang.nativeName}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {SUPPORTED_LANGUAGES.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => setLanguage(l.code)}
                            className={`px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                              language === l.code
                                ? 'bg-[#007AFF] text-white shadow-xs'
                                : 'bg-[#E5E5EA]/70 text-[#0A0A0C] hover:bg-[#E5E5EA]'
                            }`}
                          >
                            <span>{l.flag}</span>
                            <span className="text-[11px] truncate">{l.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Region & Country Selector */}
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        setTimeout(() => setIsCountryModalOpen(true), 160);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#30B0C7] to-[#0071E3] text-white flex items-center justify-center shrink-0 shadow-2xs text-xs">
                        {selectedCountry.flag}
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        Region & Currency
                      </span>
                      <span className="text-[12px] text-[#8E8E93] font-medium mr-1">
                        {selectedCountry.code}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>

                    {/* Role & Portal Access */}
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        setTimeout(() => setIsAuthModalOpen(true), 160);
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-3 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#8E8E93] to-[#636366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <KeyRound className="w-4 h-4" />
                      </span>
                      <span className="flex-1 text-[14px] font-medium text-[#0A0A0C]">
                        {user ? 'Switch Account / Portal' : 'Sign In / Role Access'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky iOS Liquid Glass Bottom Action Tray */}
              <div className="p-4 bg-white/75 backdrop-blur-2xl border-t border-slate-200/70 space-y-2.5">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    scrollToBooking();
                  }}
                  className="btn-water-primary w-full !py-3 !text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav.bookAppointment}</span>
                </button>
                <a
                  href="tel:01778320966"
                  className="btn-liquid-emerald w-full !py-2.5 !text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>01778-320966</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
