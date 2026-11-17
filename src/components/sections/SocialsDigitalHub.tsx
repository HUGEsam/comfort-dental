'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  chamberSocials,
  doctorsSocialDirectory,
  professorsProfiles,
  ProfessorProfile,
} from '@/data/socialsData';
import {
  Share2,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  MapPin,
  Star,
  Clock,
  Navigation,
  MessageCircle,
  GraduationCap,
  Award,
  Sparkles,
  ShieldCheck,
  Globe,
  Phone,
  Bookmark,
  Send,
  Heart,
  MessageSquare,
  Users,
} from 'lucide-react';
import {
  FacebookIcon,
  InstagramIcon,
  GoogleMapsIcon,
  WhatsAppIcon,
} from '@/components/ui/BrandIcons';

interface SocialsDigitalHubProps {
  isStandalonePage?: boolean;
}

export default function SocialsDigitalHub({ isStandalonePage = false }: SocialsDigitalHubProps) {
  const { language } = useApp();
  const [activeChannel, setActiveChannel] = useState<string>('facebook');
  const [activeProfTab, setActiveProfTab] = useState<'prof-father' | 'prof-mother'>('prof-father');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = (text: string, key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleMouseEnter = (channelId: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveChannel(channelId);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleToggleChannel = (channelId: string) => {
    setActiveChannel((prev) => (prev === channelId ? '' : channelId));
  };

  // Channels configuration for the stacked pill bars
  const channels = [
    {
      id: 'facebook',
      name: 'Facebook',
      nameBn: 'ফেসবুক',
      subtitle: chamberSocials.facebook.handle,
      badge: language === 'bn' ? 'অফিসিয়াল চেম্বার পেজ' : chamberSocials.facebook.statusBadge,
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs">
          <FacebookIcon className="w-4 h-4 fill-white" />
        </div>
      ),
      glowColor: 'hover:border-[#1877F2]/40',
      activeBorder: 'border-[#1877F2]',
      tagline: language === 'bn' ? '১৫.৪K+ ফলোয়ার · লাইভ আপডেট' : '15.4K+ Followers · Verified Community',
    },
    {
      id: 'maps',
      name: 'Google Maps',
      nameBn: 'গুগল ম্যাপস',
      subtitle: chamberSocials.googleMaps.handle,
      badge: language === 'bn' ? 'চেম্বার লোকেশন ও নেভিগেশন' : chamberSocials.googleMaps.statusBadge,
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#34A853] via-[#4285F4] to-[#EA4335] text-white flex items-center justify-center shadow-xs">
          <MapPin className="w-4 h-4 text-white" />
        </div>
      ),
      glowColor: 'hover:border-[#34A853]/40',
      activeBorder: 'border-[#34A853]',
      tagline: language === 'bn' ? '৪.৯ ★ রেটিং · ১৮৬+ রিভিউ · বাসাবো' : '4.9 ★ Rating · 186 Verified Reviews',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      nameBn: 'ইনস্টাগ্রাম',
      subtitle: `${chamberSocials.instagram.handle} · Doctors Directory`,
      badge: language === 'bn' ? 'স্মাইল গ্যালারি ও ডাক্তার প্রোফাইল' : chamberSocials.instagram.statusBadge,
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-xs">
          <InstagramIcon className="w-4 h-4" fill="white" />
        </div>
      ),
      glowColor: 'hover:border-[#DD2A7B]/40',
      activeBorder: 'border-[#DD2A7B]',
      tagline: language === 'bn' ? '৩৪০+ কেস স্টাডিজ ও ডাক্তারদের হ্যান্ডেল' : '340+ Case Studies & Doctors Directory',
    },
    {
      id: 'professors',
      name: 'Our Professors',
      nameBn: 'আমাদের প্রফেসরবৃন্দ (পিতা ও মাতা)',
      subtitle: 'Prof. Dr. Alim & Prof. Dr. Shanta · Academic Faculty',
      badge: language === 'bn' ? 'প্রফেসর প্রোফাইল ও জার্নাল লিংক' : 'Academic Faculty & Research',
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0F172A] to-[#0071E3] text-white flex items-center justify-center shadow-xs">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
      ),
      glowColor: 'hover:border-[#0071E3]/40',
      activeBorder: 'border-[#0071E3]',
      tagline: language === 'bn' ? 'বিএমডিসি, বিশ্ববিদ্যালয় ও রিসার্চগেট প্রকাশনা' : 'BMDC Reg, University & ResearchGate Mentions',
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      nameBn: 'হোয়াটসঅ্যাপ',
      subtitle: chamberSocials.whatsapp.handle,
      badge: language === 'bn' ? 'দ্রুত রেসপন্স ডেস্কে' : chamberSocials.whatsapp.statusBadge,
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
          <WhatsAppIcon className="w-4 h-4 fill-white" />
        </div>
      ),
      glowColor: 'hover:border-[#25D366]/40',
      activeBorder: 'border-[#25D366]',
      tagline: language === 'bn' ? 'কয়েক মিনিটের মধ্যে রিপ্লাই · তাত্ক্ষণিক সিরিয়াল' : 'Replies within minutes · Instant Serial',
    },
  ];

  return (
    <section
      id="socials"
      className={`scroll-mt-24 relative overflow-hidden bg-white text-[#0A0A0C] transition-colors duration-300 ${
        isStandalonePage ? 'py-16 sm:py-24' : 'py-20 lg:py-32 border-t border-slate-100'
      }`}
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#E8F2FF]/60 via-[#F0F6FE]/40 to-transparent blur-3xl -z-10 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] text-xs sm:text-sm font-semibold text-[var(--blue-action)] mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-[var(--blue-action)]" />
            <span>
              {language === 'bn'
                ? 'সোশ্যাল মিডিয়া ও একাডেমিক পোর্টাল'
                : 'Digital Channels & Academic Portals'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0C] tracking-tight">
            {language === 'bn' ? (
              <>
                আমাদের <span className="text-[#0071E3]">সোশ্যাল ও ডিজিটাল হাব</span>
              </>
            ) : (
              <>
                Socials &amp; <span className="text-[#0071E3]">Digital Hub</span>
              </>
            )}
          </h2>

          <div className="h-1.5 w-24 bg-gradient-to-r from-[#0A84FF] to-[#0071E3] mx-auto rounded-full my-4" />

          <p className="text-sm sm:text-base text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl mx-auto font-normal">
            {language === 'bn'
              ? 'চেম্বারের অফিসিয়াল পেজ, গুগল ম্যাপস জিপিএস নেভিগেশন, ইনস্টাগ্রামে ডাক্তারদের হ্যান্ডেল এবং আমাদের প্রফেসরবৃন্দের একাডেমিক পোর্টাল ও গবেষণাপত্র ব্রাউজ করুন।'
              : 'Direct links to our verified clinic channels, Google Maps GPS route, doctors Instagram directory, and university portals & research publications of our Associate Professors.'}
          </p>
        </div>

        {/* Stacked Interactive Expandable Pill Bars */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {channels.map((channel) => {
            const isExpanded = activeChannel === channel.id;

            return (
              <div
                key={channel.id}
                onMouseEnter={() => handleMouseEnter(channel.id)}
                onMouseLeave={handleMouseLeave}
                className="transition-all duration-300"
              >
                {/* 1. COLLAPSED PILL BAR (Always Visible Header) */}
                <button
                  type="button"
                  onClick={() => handleToggleChannel(channel.id)}
                  aria-expanded={isExpanded}
                  className={`w-full text-left rounded-[24px] p-3.5 sm:p-4.5 bg-white/95 backdrop-blur-xl border transition-all duration-300 flex items-center justify-between gap-3 shadow-xs hover:shadow-md cursor-pointer ${
                    isExpanded
                      ? `border-[#0071E3] ring-2 ring-[#0071E3]/15 bg-gradient-to-r from-white to-[#F0F6FE]/60`
                      : `border-slate-200/80 hover:border-[#0071E3]/50`
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Platform Icon */}
                    <div className="shrink-0">{channel.icon}</div>

                    {/* Title & Tagline */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-[#0A0A0C] tracking-tight">
                          {language === 'bn' ? channel.nameBn : channel.name}
                        </span>
                        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-[12px] bg-[#E8F2FF] text-[#0071E3] text-[11px] font-semibold border border-[#BAE6FD]">
                          {channel.badge}
                        </span>
                      </div>
                      <div className="text-xs text-[rgba(10,10,12,0.6)] truncate mt-0.5">
                        {channel.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Chevron & Tap Indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden md:inline-block text-[11px] font-medium text-[rgba(10,10,12,0.45)]">
                      {isExpanded ? (language === 'bn' ? 'সংকোচন করুন' : 'Collapse') : (language === 'bn' ? 'দেখতে স্পর্শ করুন' : 'Tap to expand')}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isExpanded ? 'bg-[#0071E3] text-white rotate-180' : 'bg-slate-100 text-[#0A0A0C]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* 2. EXPANDED PREVIEW DRAWER (Apple Spring Transition) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${channel.id}`}
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: 'auto', opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-2">
                        <div className="rounded-[32px] squircle-card p-5 sm:p-8 bg-gradient-to-b from-white via-white to-[#F0F6FE]/70 border border-[#BAE6FD] shadow-xl">
                          {/* ========================================================= */}
                          {/* DRAWER 1: FACEBOOK PREVIEW CARD */}
                          {/* ========================================================= */}
                          {channel.id === 'facebook' && (
                            <div className="space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                                <div>
                                  <h3 className="text-lg font-bold text-[#0A0A0C]">
                                    {language === 'bn'
                                      ? 'অফিসিয়াল ফেসবুক পেজ প্রিভিউ'
                                      : 'Official Facebook Page Live Preview'}
                                  </h3>
                                  <p className="text-xs text-[rgba(10,10,12,0.65)] mt-0.5">
                                    {language === 'bn'
                                      ? 'সরাসরি পেজে যেতে নিচের প্রিভিউ কার্ডটিতে ক্লিক বা টাচ করুন।'
                                      : 'Tap or click anywhere on the preview card below to open the official chamber Facebook page.'}
                                  </p>
                                </div>

                                {/* Quick Copy Button */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopy(chamberSocials.facebook.url, 'fb', e)}
                                    className="btn-water-secondary !py-2 !px-4 !text-xs flex items-center gap-1.5"
                                  >
                                    {copiedKey === 'fb' ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="text-emerald-700 font-bold">{language === 'bn' ? 'কপি হয়েছে!' : 'Link Copied!'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>{language === 'bn' ? 'লিংক কপি' : 'Copy Link'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* INTERACTIVE PREVIEW IMAGE AS LINK (Requirement: Image is the link!) */}
                              <a
                                href={chamberSocials.facebook.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block rounded-[24px] overflow-hidden border border-slate-300/80 bg-white shadow-md hover:shadow-2xl hover:border-[#1877F2] transition-all duration-300 transform hover:scale-[1.015]"
                              >
                                {/* Simulated Facebook Header Bar */}
                                <div className="bg-[#1877F2] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-2">
                                    <FacebookIcon className="w-4 h-4 fill-white" />
                                    <span>facebook.com/ComfortDentelSurgery</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] text-white font-medium">
                                    Verified Page
                                  </span>
                                </div>

                                {/* Cover Banner Photo with Clinic Hero Image */}
                                <div className="relative h-44 sm:h-56 w-full bg-slate-900 overflow-hidden">
                                  <Image
                                    src={chamberSocials.facebook.coverPhoto}
                                    alt="Comfort Dental Surgery Facebook Cover"
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                  {/* Floating Action Pill on the Preview Image */}
                                  <div className="absolute bottom-3 right-3 z-10">
                                    <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1877F2] text-xs font-bold shadow-lg border border-white/60 flex items-center gap-1.5 group-hover:bg-[#1877F2] group-hover:text-white transition-all">
                                      <span>{language === 'bn' ? 'ফেসবুকে পেজটি খুলুন' : 'Tap to Open Facebook Page'}</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </div>
                                  </div>
                                </div>

                                {/* Profile Bar & Bio Area */}
                                <div className="p-4 sm:p-6 bg-white relative">
                                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
                                    <div className="flex items-end gap-3.5">
                                      {/* Official Logo Avatar */}
                                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white shrink-0">
                                        <Image
                                          src={chamberSocials.facebook.avatar}
                                          alt="Comfort Dental Logo"
                                          fill
                                          className="object-contain p-1"
                                        />
                                      </div>
                                      <div className="pb-1">
                                        <div className="flex items-center gap-1.5">
                                          <h4 className="text-lg sm:text-xl font-black text-[#0A0A0C]">
                                            Comfort Dental Surgery &amp; Implant Center
                                          </h4>
                                          <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px]">
                                            ✓
                                          </span>
                                        </div>
                                        <div className="text-xs text-[#0071E3] font-semibold">
                                          {chamberSocials.facebook.handle} · Dental Practice
                                        </div>
                                      </div>
                                    </div>

                                    {/* Follower Count Pill */}
                                    <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-[12px] w-fit">
                                      {chamberSocials.facebook.followers}
                                    </div>
                                  </div>

                                  {/* Recent Post Snippet Box */}
                                  <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-[#334155] leading-relaxed flex items-start gap-2.5">
                                    <div className="w-2 h-2 rounded-full bg-[#1877F2] shrink-0 mt-2" />
                                    <div>
                                      <span className="font-semibold text-[#0A0A0C]">
                                        {language === 'bn' ? 'সাম্প্রতিক পোস্ট:' : 'Latest Chamber Post:'}
                                      </span>{' '}
                                      {chamberSocials.facebook.recentPostSnippet}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* DRAWER 2: GOOGLE MAPS PREVIEW CARD */}
                          {/* ========================================================= */}
                          {channel.id === 'maps' && (
                            <div className="space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                                <div>
                                  <h3 className="text-lg font-bold text-[#0A0A0C]">
                                    {language === 'bn'
                                      ? 'গুগল ম্যাপস ও জিপিএস লোকেশন প্রিভিউ'
                                      : 'Google Maps Chamber GPS Location Preview'}
                                  </h3>
                                  <p className="text-xs text-[rgba(10,10,12,0.65)] mt-0.5">
                                    {language === 'bn'
                                      ? 'সরাসরি জিপিএস নেভিগেশন ও দিকনির্দেশনা পেতে নিচের ম্যাপ কার্ডে ক্লিক করুন।'
                                      : 'Tap or click the map preview below to launch turn-by-turn navigation directly to Central Basabo.'}
                                  </p>
                                </div>

                                {/* Quick Copy Address */}
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopy(chamberSocials.googleMaps.address, 'addr', e)}
                                    className="btn-water-secondary !py-2 !px-4 !text-xs flex items-center gap-1.5"
                                  >
                                    {copiedKey === 'addr' ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="text-emerald-700 font-bold">{language === 'bn' ? 'ঠিকানা কপি হয়েছে!' : 'Address Copied!'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>{language === 'bn' ? 'ঠিকানা কপি' : 'Copy Address'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* INTERACTIVE GOOGLE MAPS PREVIEW AS LINK */}
                              <a
                                href={chamberSocials.googleMaps.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block rounded-[24px] overflow-hidden border border-slate-300/80 bg-white shadow-md hover:shadow-2xl hover:border-[#34A853] transition-all duration-300 transform hover:scale-[1.015]"
                              >
                                {/* Google Maps UI Simulation Header */}
                                <div className="bg-[#202124] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#EA4335]" />
                                    <span>Google Maps · Dhaka 1214</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-medium">
                                    Open Today
                                  </span>
                                </div>

                                {/* Map Graphic Viewport */}
                                <div className="relative h-48 sm:h-64 w-full bg-[#E5E3DF] overflow-hidden flex items-center justify-center">
                                  {/* Stylized Map Vector Pattern */}
                                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#34A853_1px,transparent_1px)] [background-size:16px_16px]" />
                                  
                                  {/* Visual Street Map Background */}
                                  <div className="absolute inset-0 flex flex-col justify-around opacity-25">
                                    <div className="h-6 w-full bg-white transform -rotate-3" />
                                    <div className="h-10 w-full bg-amber-100 transform rotate-6" />
                                    <div className="h-8 w-full bg-white transform -rotate-1" />
                                  </div>

                                  {/* Pulsing Pin Centerpiece */}
                                  <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-2xl ring-4 ring-white animate-bounce">
                                      <MapPin className="w-6 h-6" />
                                    </div>
                                    <div className="mt-2 px-3 py-1 rounded-full bg-[#202124] text-white text-xs font-bold shadow-md">
                                      Comfort Dental Surgery (Basabo Height)
                                    </div>
                                  </div>

                                  {/* Floating Action Pill */}
                                  <div className="absolute bottom-3 right-3 z-10">
                                    <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#34A853] text-xs font-bold shadow-lg border border-white/60 flex items-center gap-1.5 group-hover:bg-[#34A853] group-hover:text-white transition-all">
                                      <Navigation className="w-3.5 h-3.5" />
                                      <span>{language === 'bn' ? '১-ক্লিকে জিপিএস রুট চালু করুন' : 'Tap for 1-Click GPS Route'}</span>
                                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                                    </div>
                                  </div>
                                </div>

                                {/* Info Card Strip */}
                                <div className="p-4 sm:p-6 bg-white space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-base sm:text-lg font-bold text-[#0A0A0C]">
                                          Comfort Dental Surgery &amp; Implant Center
                                        </h4>
                                        <div className="flex items-center text-amber-500 font-bold text-xs">
                                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                                          <span className="ml-1 text-[#0A0A0C]">{chamberSocials.googleMaps.rating}</span>
                                          <span className="text-slate-400 font-normal ml-1">({chamberSocials.googleMaps.reviewCount})</span>
                                        </div>
                                      </div>
                                      <div className="text-xs text-[#0071E3] font-medium flex items-center gap-1.5 mt-1">
                                        <MapPin className="w-3.5 h-3.5 text-[#0071E3]" />
                                        <span>{chamberSocials.googleMaps.address}</span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-[12px] border border-slate-200 shrink-0">
                                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>{chamberSocials.googleMaps.hours}</span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* DRAWER 3: INSTAGRAM PREVIEW + DOCTORS DIRECTORY */}
                          {/* ========================================================= */}
                          {channel.id === 'instagram' && (
                            <div className="space-y-8">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                                <div>
                                  <h3 className="text-lg font-bold text-[#0A0A0C]">
                                    {language === 'bn'
                                      ? 'ইনস্টাগ্রাম স্মাইল গ্যালারি ও ডাক্তারদের ডিরেক্টরি'
                                      : 'Instagram Smile Gallery & Doctors Directory'}
                                  </h3>
                                  <p className="text-xs text-[rgba(10,10,12,0.65)] mt-0.5">
                                    {language === 'bn'
                                      ? 'চেম্বারের অফিসিয়াল ইনস্টাগ্রাম দেখতে কার্ডে ট্যাপ করুন, এবং নিচে প্রত্যেক ডাক্তারের হ্যান্ডেল দেখুন।'
                                      : 'Tap the main Instagram preview to open the clinic feed, or explore our doctors handles below.'}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => handleCopy(chamberSocials.instagram.url, 'ig', e)}
                                  className="btn-water-secondary !py-2 !px-4 !text-xs flex items-center gap-1.5 shrink-0"
                                >
                                  {copiedKey === 'ig' ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700 font-bold">{language === 'bn' ? 'কপি হয়েছে!' : 'Link Copied!'}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>{language === 'bn' ? 'প্রোফাইল কপি' : 'Copy Handle'}</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* 1. MAIN INSTAGRAM PREVIEW CARD (Image is the link) */}
                              <a
                                href={chamberSocials.instagram.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block rounded-[24px] overflow-hidden border border-slate-300/80 bg-white shadow-md hover:shadow-2xl hover:border-[#DD2A7B] transition-all duration-300 transform hover:scale-[1.015]"
                              >
                                {/* Instagram Simulation Header */}
                                <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-2">
                                    <InstagramIcon className="w-4 h-4" fill="white" />
                                    <span>instagram.com/comfortdentalsurgery</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded-full bg-white/25 text-[10px] text-white font-medium">
                                    Dental Center
                                  </span>
                                </div>

                                {/* Instagram Profile Header Mockup */}
                                <div className="p-4 sm:p-6 bg-white border-b border-slate-100">
                                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                    <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0">
                                      <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                                        <Image
                                          src={chamberSocials.facebook.avatar}
                                          alt="Instagram Avatar"
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex-1 text-center sm:text-left space-y-1">
                                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                        <h4 className="text-base sm:text-lg font-black text-[#0A0A0C]">
                                          comfortdentalsurgery
                                        </h4>
                                        <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-[#0071E3]">
                                          Follow
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-center sm:justify-start gap-5 text-xs text-slate-700 font-medium pt-1">
                                        <span><strong>{chamberSocials.instagram.postsCount}</strong></span>
                                        <span><strong>{chamberSocials.instagram.followersCount}</strong></span>
                                        <span><strong>{chamberSocials.instagram.followingCount}</strong></span>
                                      </div>
                                      <div className="text-xs text-slate-600 max-w-lg pt-1">
                                        Comfort Dental Surgery &amp; Implant Center • Aesthetic Smile Transformations • Basabo, Dhaka
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Instagram 6-Grid Clinical Photography Mockup */}
                                <div className="p-3 sm:p-4 bg-slate-50 relative">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                    {chamberSocials.instagram.previewGridImages.map((img, i) => (
                                      <div
                                        key={i}
                                        className="relative aspect-square rounded-[14px] overflow-hidden bg-slate-200 group-hover:opacity-95 transition-all shadow-2xs"
                                      >
                                        <Image
                                          src={img.src}
                                          alt={img.label}
                                          fill
                                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold p-1 text-center">
                                          {img.label}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Floating Action Pill */}
                                  <div className="absolute bottom-6 right-6 z-10">
                                    <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#DD2A7B] text-xs font-bold shadow-lg border border-white/60 flex items-center gap-1.5 group-hover:bg-[#DD2A7B] group-hover:text-white transition-all">
                                      <span>{language === 'bn' ? 'ইনস্টাগ্রামে ফটো গ্যালারি খুলুন' : 'Tap to Open Instagram Profile'}</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </div>
                                  </div>
                                </div>
                              </a>

                              {/* 2. DOCTORS DIRECTORY SUB-GRID (Crucial Requirement!) */}
                              <div className="pt-4 border-t border-slate-200/80 space-y-4">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-[#0071E3]" />
                                  <h4 className="text-base font-bold text-[#0A0A0C]">
                                    {language === 'bn'
                                      ? 'কমফোর্ট ডেন্টালের ডাক্তারদের ডিরেক্টরি ও ইনস্টাগ্রাম'
                                      : 'Comfort Dental Doctors Directory & Social Handles'}
                                  </h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {doctorsSocialDirectory.map((doctor) => (
                                    <a
                                      key={doctor.id}
                                      href={doctor.instagramUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-4 rounded-[20px] bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0071E3] transition-all duration-200 flex items-center gap-3.5 group/doc"
                                    >
                                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-100 group-hover/doc:ring-[#0071E3] shrink-0">
                                        <Image
                                          src={doctor.avatar}
                                          alt={doctor.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>

                                      <div className="min-w-0 flex-1">
                                        <div className="text-xs font-bold text-[#0A0A0C] group-hover/doc:text-[#0071E3] transition-colors truncate">
                                          {doctor.name}
                                        </div>
                                        <div className="text-[10px] text-[#0071E3] font-semibold truncate">
                                          {doctor.degrees}
                                        </div>
                                        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-0.5 truncate">
                                          <InstagramIcon className="w-3 h-3 text-[#DD2A7B] shrink-0" />
                                          <span className="truncate">{doctor.instagramHandle}</span>
                                        </div>
                                      </div>

                                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/doc:text-[#0071E3] shrink-0" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* DRAWER 4: OUR PROFESSORS & ACADEMIC MENTIONS (Father & Mother) */}
                          {/* ========================================================= */}
                          {channel.id === 'professors' && (
                            <div className="space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                                <div>
                                  <h3 className="text-lg font-bold text-[#0A0A0C]">
                                    {language === 'bn'
                                      ? 'আমাদের প্রফেসরবৃন্দ — ব্যক্তিগত ফেসবুক ও একাডেমিক পোর্টালসমূহ'
                                      : 'Our Professors — Personal Facebook & Academic Portal Mentions'}
                                  </h3>
                                  <p className="text-xs text-[rgba(10,10,12,0.65)] mt-0.5">
                                    {language === 'bn'
                                      ? 'উভয় প্রফেসর ঢাকা ও আন্তর্জাতিকভাবে সমাদৃত। তাদের ফেসবুক ও বিভিন্ন একাডেমিক ওয়েবসাইটের মেনশন নিচে দেখুন।'
                                      : 'Both Associate Professors are departmental heads. Tap their Facebook preview cards or browse academic web portals.'}
                                  </p>
                                </div>

                                {/* Professor Switcher Pills */}
                                <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => setActiveProfTab('prof-father')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                      activeProfTab === 'prof-father'
                                        ? 'bg-[#0071E3] text-white shadow-xs'
                                        : 'text-slate-600 hover:text-[#0A0A0C]'
                                    }`}
                                  >
                                    {language === 'bn' ? 'প্রফেসর ডাঃ আলিম (পিতা)' : 'Prof. Dr. Alim (Father)'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveProfTab('prof-mother')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                      activeProfTab === 'prof-mother'
                                        ? 'bg-[#0071E3] text-white shadow-xs'
                                        : 'text-slate-600 hover:text-[#0A0A0C]'
                                    }`}
                                  >
                                    {language === 'bn' ? 'প্রফেসর ডাঃ শান্তা (মাতা)' : 'Prof. Dr. Shanta (Mother)'}
                                  </button>
                                </div>
                              </div>

                              {/* Selected Professor Showcase */}
                              {professorsProfiles
                                .filter((p) => p.id === activeProfTab)
                                .map((prof) => (
                                  <div key={prof.id} className="space-y-6">
                                    {/* 1. PERSONAL FACEBOOK PREVIEW CARD (Image is the Link!) */}
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                        <span className="flex items-center gap-1.5">
                                          <FacebookIcon className="w-3.5 h-3.5 fill-[#1877F2]" />
                                          <span>
                                            {language === 'bn'
                                              ? `${prof.name} — ফেসবুক প্রোফাইল প্রিভিউ`
                                              : `${prof.name} — Facebook Profile Live Preview`}
                                          </span>
                                        </span>
                                        <button
                                          type="button"
                                          onClick={(e) => handleCopy(prof.facebookUrl, prof.id, e)}
                                          className="text-[#0071E3] hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                          {copiedKey === prof.id ? (
                                            <span className="text-emerald-600 font-bold">{language === 'bn' ? 'কপি হয়েছে' : 'Copied!'}</span>
                                          ) : (
                                            <>
                                              <Copy className="w-3 h-3" />
                                              <span>{language === 'bn' ? 'ফেসবুক লিংক কপি' : 'Copy Facebook Link'}</span>
                                            </>
                                          )}
                                        </button>
                                      </div>

                                      <a
                                        href={prof.facebookUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative block rounded-[24px] overflow-hidden border border-slate-300/80 bg-white shadow-md hover:shadow-2xl hover:border-[#1877F2] transition-all duration-300 transform hover:scale-[1.015]"
                                      >
                                        {/* Facebook Profile Banner UI */}
                                        <div className="bg-[#1877F2] text-white px-4 py-2 flex items-center justify-between text-xs font-semibold">
                                          <div className="flex items-center gap-2">
                                            <FacebookIcon className="w-3.5 h-3.5 fill-white" />
                                            <span>facebook.com/profile</span>
                                          </div>
                                          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                                            {prof.relation} · Verified Faculty
                                          </span>
                                        </div>

                                        <div className="p-5 sm:p-7 bg-gradient-to-r from-white via-sky-50/30 to-blue-50/40 relative">
                                          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                            {/* Real Doctor Portrait */}
                                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[20px] overflow-hidden border-2 border-white shadow-xl ring-4 ring-[#BAE6FD]/80 shrink-0">
                                              <Image
                                                src={prof.image}
                                                alt={prof.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                              />
                                            </div>

                                            <div className="flex-1 text-center sm:text-left space-y-1.5">
                                              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                                <h4 className="text-lg sm:text-xl font-black text-[#0A0A0C]">
                                                  {prof.name}
                                                </h4>
                                                <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0071E3] text-[11px] font-bold">
                                                  {prof.bmdcReg}
                                                </span>
                                              </div>

                                              <div className="text-xs font-semibold text-[#0071E3]">
                                                {prof.degrees}
                                              </div>

                                              <div className="text-xs text-slate-700 font-medium">
                                                {prof.role} • {prof.institution}
                                              </div>

                                              <p className="text-xs text-[rgba(10,10,12,0.68)] leading-relaxed pt-1">
                                                {prof.bio}
                                              </p>
                                            </div>
                                          </div>

                                          {/* Floating Action Pill */}
                                          <div className="mt-4 sm:mt-2 flex justify-end">
                                            <div className="px-3.5 py-1.5 rounded-full bg-[#1877F2] text-white text-xs font-bold shadow-md flex items-center gap-1.5 group-hover:bg-[#0071E3] transition-all">
                                              <span>{language === 'bn' ? 'ফেসবুকে প্রোফাইলটি দেখুন' : 'Tap to Open Facebook Profile'}</span>
                                              <ExternalLink className="w-3.5 h-3.5" />
                                            </div>
                                          </div>
                                        </div>
                                      </a>
                                    </div>

                                    {/* 2. ACADEMIC & EXTERNAL MENTIONS GRID */}
                                    <div className="pt-4 border-t border-slate-200/80 space-y-3">
                                      <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-[#0071E3]" />
                                        <h4 className="text-sm font-bold text-[#0A0A0C] uppercase tracking-wider">
                                          {language === 'bn'
                                            ? 'বিশ্ববিদ্যালয় পোর্টাল, বিএমডিসি রেজিস্ট্রি ও প্রকাশনা লিংক'
                                            : 'Academic Portals, Board Registries & Research Publications'}
                                        </h4>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {prof.externalMentions.map((mention) => (
                                          <a
                                            key={mention.id}
                                            href={mention.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 rounded-[20px] bg-white border border-slate-200 hover:border-[#0071E3] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group/ext"
                                          >
                                            <div>
                                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-[8px] bg-slate-100 text-[#0071E3] border border-slate-200/80">
                                                  {mention.badge}
                                                </span>
                                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/ext:text-[#0071E3] transition-colors" />
                                              </div>
                                              <div className="text-xs font-bold text-[#0A0A0C] group-hover/ext:text-[#0071E3] transition-colors">
                                                {mention.title}
                                              </div>
                                              <div className="text-[11px] font-semibold text-[#0071E3] mt-0.5">
                                                {mention.role}
                                              </div>
                                              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                                                {mention.description}
                                              </p>
                                            </div>

                                            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                                              <span>{mention.domain}</span>
                                              <span className="font-semibold text-[#0071E3] group-hover/ext:underline">
                                                {language === 'bn' ? 'ওয়েবসাইটে যান ↗' : 'Visit Website ↗'}
                                              </span>
                                            </div>
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* DRAWER 5: WHATSAPP DIRECT DESK PREVIEW */}
                          {/* ========================================================= */}
                          {channel.id === 'whatsapp' && (
                            <div className="space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
                                <div>
                                  <h3 className="text-lg font-bold text-[#0A0A0C]">
                                    {language === 'bn'
                                      ? 'হোয়াটসঅ্যাপ সরাসরি হেল্পডেস্ক প্রিভিউ'
                                      : 'WhatsApp Chamber Helpline Preview'}
                                  </h3>
                                  <p className="text-xs text-[rgba(10,10,12,0.65)] mt-0.5">
                                    {language === 'bn'
                                      ? 'সরাসরি চেম্বারের হোয়াটসঅ্যাপে চ্যাট শুরু করতে নিচের প্রিভিউতে ট্যাপ করুন।'
                                      : 'Tap or click the WhatsApp preview below to launch a chat with our receptionist.'}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => handleCopy(chamberSocials.whatsapp.handle, 'wa', e)}
                                  className="btn-water-secondary !py-2 !px-4 !text-xs flex items-center gap-1.5 shrink-0"
                                >
                                  {copiedKey === 'wa' ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-700 font-bold">{language === 'bn' ? 'নাম্বার কপি হয়েছে!' : 'Number Copied!'}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>{language === 'bn' ? 'নাম্বার কপি' : 'Copy Number'}</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* INTERACTIVE WHATSAPP PREVIEW AS LINK */}
                              <a
                                href={chamberSocials.whatsapp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block rounded-[24px] overflow-hidden border border-slate-300/80 bg-[#EFEAE2] shadow-md hover:shadow-2xl hover:border-[#25D366] transition-all duration-300 transform hover:scale-[1.015]"
                              >
                                {/* WhatsApp Header Simulation */}
                                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-2.5">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 shrink-0">
                                      <Image
                                        src="/assets/logo.png"
                                        alt="WhatsApp Desk Logo"
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                                        <span>Comfort Dental Desk</span>
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                      </div>
                                      <div className="text-[10px] text-emerald-200">
                                        {chamberSocials.whatsapp.responseBadge}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 text-[10px]">
                                      Verified Business
                                    </span>
                                  </div>
                                </div>

                                {/* Chat Viewport Background Pattern */}
                                <div className="p-5 sm:p-7 min-h-[160px] flex flex-col justify-end space-y-3 relative">
                                  {/* Incoming Welcome Message */}
                                  <div className="max-w-md bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs text-xs text-[#111827] leading-relaxed self-start border border-slate-200/60">
                                    <div className="font-bold text-[#075E54] mb-1">Comfort Dental Surgery &amp; Implant Center</div>
                                    Assalamu Alaikum! How can we assist with your dental inquiry today? Appointments available with Assoc. Prof. Dr. Alim &amp; Assoc. Prof. Dr. Shanta.
                                    <div className="text-[9px] text-slate-400 text-right mt-1">Just now</div>
                                  </div>

                                  {/* Outgoing Pre-filled Message Preview */}
                                  <div className="max-w-md bg-[#D9FDD3] p-3.5 rounded-2xl rounded-tr-xs shadow-xs text-xs text-[#111827] leading-relaxed self-end border border-emerald-200/60">
                                    {chamberSocials.whatsapp.defaultMessage}
                                    <div className="text-[9px] text-emerald-700 text-right mt-1 flex items-center justify-end gap-1">
                                      <span>Ready to Send</span>
                                      <span>✓✓</span>
                                    </div>
                                  </div>

                                  {/* Floating Action Pill */}
                                  <div className="mt-4 flex justify-end">
                                    <div className="px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold shadow-lg flex items-center gap-1.5 group-hover:bg-[#128C7E] transition-all">
                                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                                      <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট শুরু করুন' : 'Tap to Chat on WhatsApp'}</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
