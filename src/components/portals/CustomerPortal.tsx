'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  Share2,
  CheckCircle,
  Copy,
  Star,
  ExternalLink,
  Edit3,
  Award,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Phone,
  Mail,
  User as UserIcon,
  LogOut,
  UserPlus,
  ThumbsUp,
} from 'lucide-react';
import { validatePhone, validateEmail } from '@/utils/security';

export default function CustomerPortal() {
  const {
    user,
    isLoggedIn,
    loginPatientByName,
    registerPatient,
    logoutPatient,
    updateUserProfile,
    generateReferralLink,
    language,
  } = useApp();

  // Active Tab state for Engagement Tabs: 'share' | 'maps' | 'facebook'
  const [activeTab, setActiveTab] = useState<'share' | 'maps' | 'facebook'>('share');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  // Unauthenticated / Auth form state
  const [loginInputName, setLoginInputName] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regError, setRegError] = useState<string | null>(null);

  // Edit Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formName, setFormName] = useState(user?.name || '');
  const [formPhone, setFormPhone] = useState(user?.phone || '');
  const [formEmail, setFormEmail] = useState(user?.email || '');
  const [editError, setEditError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentPoints = user?.points || 0;
  const maxPoints = 300;
  const pointsPercentage = Math.min(100, (currentPoints / maxPoints) * 100);

  const handleCopy = async () => {
    const link = generateReferralLink();
    let copied = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(link);
        copied = true;
      } catch {
        // Fallback for non-HTTPS LAN URLs on mobile browsers
      }
    }

    if (!copied && typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.value = link;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      document.body.removeChild(textarea);
    }

    if (copied) {
      setCopiedLink(true);
      setCopyToast(true);
      setTimeout(() => setCopiedLink(false), 3000);
      setTimeout(() => setCopyToast(false), 3000);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginInputName.trim()) {
      setLoginError(language === 'bn' ? 'অনুগ্রহ করে রোগীর নাম লিখুন' : 'Please enter your patient name');
      return;
    }

    const result = loginPatientByName(loginInputName);
    if (result.needsRegistration) {
      setRegName(loginInputName.trim());
      setShowRegisterForm(true);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim()) {
      setRegError(language === 'bn' ? 'অনুগ্রহ করে রোগীর পুরো নাম লিখুন' : 'Please provide your full name');
      return;
    }
    if (!validatePhone(regPhone)) {
      setRegError(language === 'bn' ? 'সঠিক মোবাইল নম্বর লিখুন (১১ ডিজিট)' : 'Please enter a valid phone number');
      return;
    }
    if (!validateEmail(regEmail)) {
      setRegError(language === 'bn' ? 'সঠিক ইমেইল ঠিকানা দিন (Gmail)' : 'Please enter a valid email address');
      return;
    }

    registerPatient({
      name: regName.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
    });
    setShowRegisterForm(false);
  };

  const handleOpenEdit = () => {
    if (!user) return;
    setFormName(user.name);
    setFormPhone(user.phone);
    setFormEmail(user.email);
    setEditError(null);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);

    if (!formName.trim()) {
      setEditError(language === 'bn' ? 'অনুগ্রহ করে নাম লিখুন' : 'Name is required');
      return;
    }
    if (!validatePhone(formPhone)) {
      setEditError(language === 'bn' ? 'সঠিক মোবাইল নম্বর লিখুন' : 'Valid phone number required');
      return;
    }
    if (!validateEmail(formEmail)) {
      setEditError(language === 'bn' ? 'সঠিক ইমেইল লিখুন' : 'Valid email required');
      return;
    }

    updateUserProfile({
      name: formName.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim(),
    });
    setIsEditingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] text-[#0A0A0C] pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top Profile Header Bar (Return Home is now on the top-left waterdrop button) */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,132,255,0.12)]">
          <span className="text-sm sm:text-base font-extrabold text-[#0A0A0C]">
            {language === 'bn' ? 'রোগী প্রোফাইল ও রিওয়ার্ড পোর্টাল' : 'Patient Profile & Rewards Portal'}
          </span>
          <span className="squircle-badge px-3 py-1 text-xs font-semibold">
            {isLoggedIn && user ? 'Verified Patient' : 'Device-Isolated'}
          </span>
        </div>

        {/* Success notification banner */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-[20px] bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-xs"
            >
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'bn' ? 'রোগীর প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Patient profile updated successfully!'}</span>
            </motion.div>
          )}

          {copyToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-[20px] bg-sky-50 border border-sky-300 text-sky-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{language === 'bn' ? 'রেফারেল লিংক ক্লিপবোর্ডে কপি হয়েছে!' : 'Referral link copied to clipboard!'}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* CONDITIONAL: UNCONFIGURED DEVICE / EMPTY STATE LOGIN & REGISTRATION */}
        {/* ========================================================================= */}
        {!isLoggedIn || !user ? (
          <div className="rounded-[32px] squircle-card shadow-xl p-8 sm:p-12 transition-all">
            {!showRegisterForm ? (
              <div className="max-w-md mx-auto space-y-6 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-[var(--blue-ambient)] text-[#0071E3] flex items-center justify-center mx-auto border border-[rgba(10,132,255,0.2)]">
                  <UserIcon className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0C] tracking-tight">
                    {language === 'bn' ? 'রোগী পোর্টাল লগইন' : 'Patient Portal Access'}
                  </h2>
                  <p className="text-xs sm:text-sm text-[rgba(10,10,12,0.6)]">
                    {language === 'bn'
                      ? 'এই ডিভাইসে সংরক্ষিত আপনার প্রোফাইল দেখতে আপনার নাম লিখুন।'
                      : 'Enter your patient name to retrieve your device-isolated profile.'}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-2">
                      {language === 'bn' ? 'রোগীর নাম' : 'Patient Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={loginInputName}
                      onChange={(e) => setLoginInputName(e.target.value)}
                      placeholder="e.g. Samia or Tanvir Ahmed"
                      className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                    />
                  </div>

                  {loginError && (
                    <p className="text-xs font-semibold text-rose-600">
                      {loginError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-water-primary w-full !py-3.5 !px-6 !text-sm !font-bold text-white"
                  >
                    {language === 'bn' ? 'প্রোফাইল খুলুন' : 'Access Profile'}
                  </button>
                </form>

                <div className="pt-4 border-t border-[rgba(10,132,255,0.12)] flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setRegName(loginInputName);
                      setShowRegisterForm(true);
                    }}
                    className="btn-liquid-chip text-[#007AFF]"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'নতুন রোগী? প্রথমবার নিবন্ধন করুন' : 'First time here? Register as a new patient'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* First-Time Registration Card */
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-[20px] bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                    <UserPlus className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A0A0C] tracking-tight">
                    {language === 'bn' ? 'রোগী নিবন্ধন' : 'First-Time Registration'}
                  </h2>
                  <p className="text-xs text-[rgba(10,10,12,0.6)]">
                    {language === 'bn'
                      ? 'এই ডিভাইসে আপনার তথ্য সুরক্ষিতভাবে সংরক্ষণ করুন।'
                      : 'Provide your contact details to register this device.'}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                      {language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Samia"
                      className="squircle-input w-full px-4 py-3 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                      {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number (Mobile)'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="e.g. 01712106499"
                      className="squircle-input w-full px-4 py-3 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                      {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email (Gmail)'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. tanvir@gmail.com"
                      className="squircle-input w-full px-4 py-3 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                    />
                  </div>

                  {regError && (
                    <p className="text-xs font-semibold text-rose-600">
                      {regError}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRegisterForm(false)}
                      className="btn-water-secondary flex-1 !py-3 !px-4 !text-xs !font-bold"
                    >
                      {language === 'bn' ? 'ফিরে যান' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      className="btn-water-primary flex-1 !py-3 !px-4 !text-xs !font-bold text-white"
                    >
                      {language === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* 1. AUTHENTICATED PATIENT PROFILE CARD */
          /* ========================================================================= */
          <div className="rounded-[32px] squircle-card p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[rgba(10,132,255,0.14)]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-[var(--blue-ambient)] text-[#0071E3] border border-[rgba(10,132,255,0.2)] text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>{language === 'bn' ? 'ভেরিফাইড রোগী প্রোফাইল' : 'Verified Patient Profile'}</span>
                </div>

                {/* Patient Name Display */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0C] tracking-tight capitalize">
                  {user.name}
                </h1>

                {/* Contact Info Rows */}
                <div className="space-y-1.5 pt-1">
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-[rgba(10,10,12,0.7)] font-medium">
                      <Phone className="w-4 h-4 text-[#0071E3] shrink-0" />
                      <span>
                        <strong>{language === 'bn' ? 'মোবাইল:' : 'Mobile:'}</strong>{' '}
                        <span className="text-[#0A0A0C] font-semibold">{user.phone}</span>
                      </span>
                    </div>
                  )}

                  {user.email && (
                    <div className="flex items-center gap-2 text-sm text-[rgba(10,10,12,0.7)] font-medium">
                      <Mail className="w-4 h-4 text-[#0071E3] shrink-0" />
                      <span>
                        <strong>{language === 'bn' ? 'ইমেইল:' : 'Email:'}</strong>{' '}
                        <span className="text-[#0A0A0C] font-semibold">{user.email}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Points Summary Badge */}
              <div className="relative p-5 rounded-[20px] bg-white border border-[rgba(10,132,255,0.2)] sm:text-right shrink-0 shadow-xs min-w-[200px]">
                <span className="text-[11px] uppercase font-bold tracking-wider text-[rgba(10,10,12,0.5)] block">
                  {language === 'bn' ? 'পয়েন্ট ব্যালেন্স' : 'POINTS BALANCE'}
                </span>
                <div className="text-3xl font-black text-[#0A0A0C] font-mono mt-0.5">
                  0 <span className="text-sm font-semibold text-slate-400">/ 300 PTS</span>
                </div>
                <span className="text-[11px] text-[#0071E3] font-bold block mt-1">
                  = ৳0 {language === 'bn' ? 'টাকা ক্যাশ ডিসকাউন্ট' : 'BDT Cash Discount'}
                </span>
              </div>
            </div>

            {/* Points System Progress */}
            <div className="pt-6 relative">
              <div className="relative overflow-hidden pointer-events-none select-none backdrop-blur-md bg-white/40 filter blur-[1.5px] rounded-[20px] p-4 border border-[rgba(10,132,255,0.14)]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[rgba(10,10,12,0.65)] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#0071E3]" />
                      {language === 'bn'
                        ? 'সর্বোচ্চ উপার্জন সীমা: ৩০০ পয়েন্ট (১ পয়েন্ট = ১ টাকা ছাড়)'
                        : 'Maximum Earnable Limit: 300 Points (1 Point = 1 BDT Discount)'}
                    </span>
                    <span className="font-mono text-[#0A0A0C] font-bold">
                      300 {language === 'bn' ? 'পয়েন্ট বাকি' : 'PTS remaining to max cap'}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-sky-200 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#0A84FF] to-[#0071E3] rounded-full transition-all duration-500"
                      style={{ width: `${pointsPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Centered Floating Overlay Banner */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px] rounded-[20px]">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 border border-amber-500/30 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Points System: Work in Progress
                </span>
                <p className="text-[11px] text-[rgba(10,10,12,0.5)] mt-1.5 font-medium">Coming soon for verified patients</p>
              </div>
            </div>

            {/* Profile Action Buttons: Edit Profile + Log Out */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-8">
              <button
                onClick={logoutPatient}
                className="btn-water-secondary inline-flex items-center gap-2 !px-5 !py-2.5 !text-xs sm:!text-sm !font-semibold"
              >
                <LogOut className="w-4 h-4 text-[#0071E3]" />
                <span>{language === 'bn' ? 'লগ আউট / রোগী পরিবর্তন' : 'Log Out / Switch Patient'}</span>
              </button>

              <button
                onClick={handleOpenEdit}
                className="btn-water-primary inline-flex items-center gap-2 !px-6 !py-2.5 !text-xs sm:!text-sm !font-bold text-white"
              >
                <Edit3 className="w-4 h-4 text-white" />
                <span>{language === 'bn' ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE ENGAGEMENT TABS (REVIEWS & REFERRALS) */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="border-b border-[rgba(10,132,255,0.12)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0C] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0071E3]" />
                <span>{language === 'bn' ? 'ইন্টারেক্টিভ এনগেজমেন্ট ও রিভিউ' : 'Interactive Engagement & Reviews'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[rgba(10,10,12,0.6)] mt-1">
                {language === 'bn'
                  ? 'ক্লিনিকের সেবা শেয়ার করুন অথবা অফিসিয়াল প্রোফাইলে আপনার মতামত জানান।'
                  : 'Share our services or review our specialist care on official channels.'}
              </p>
            </div>

            {/* 3-way Segmented Control Pill Menu (Liquid Glass) */}
            <div className="inline-flex p-1 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 shadow-xs self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('share')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'share'
                    ? 'btn-water-primary !py-2 !px-4 !text-xs text-white'
                    : 'text-[rgba(10,10,12,0.65)] hover:text-[#007AFF]'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ওয়েবসাইট লিংক' : 'Share Link'}</span>
              </button>

              <button
                onClick={() => setActiveTab('maps')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'maps'
                    ? 'btn-water-primary !py-2 !px-4 !text-xs text-white'
                    : 'text-[rgba(10,10,12,0.65)] hover:text-[#007AFF]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${activeTab === 'maps' ? 'fill-amber-300 text-amber-300' : 'fill-amber-400 text-amber-500'}`} />
                <span>Google Maps</span>
              </button>

              <button
                onClick={() => setActiveTab('facebook')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'facebook'
                    ? 'btn-water-primary !py-2 !px-4 !text-xs text-white'
                    : 'text-[rgba(10,10,12,0.65)] hover:text-[#007AFF]'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${activeTab === 'facebook' ? 'text-white' : 'text-[#007AFF]'}`} />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Active Tab Panel Card */}
          <div className="p-6 sm:p-8 rounded-[32px] squircle-card shadow-lg transition-all duration-300 ease-in-out">
            {activeTab === 'share' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-xs font-semibold bg-[var(--blue-ambient)] text-[#0071E3] border border-[rgba(10,132,255,0.18)]">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'রেফারেল লিংক' : 'Patient Referral URL'}</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0C]">
                      {language === 'bn' ? 'ওয়েবসাইট লিংক শেয়ার করুন' : 'Share Website Link'}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[rgba(10,10,12,0.5)]">
                    5-MIN EXPIRATION
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'আপনার পরিচিতজন ও পরিবারের সাথে কমফোর্ট ডেন্টালের সেবা শেয়ার করুন। নিচে আপনার সুরক্ষিত রেফারেল লিংক তৈরি করা আছে।'
                    : 'Share Comfort Dental Surgery with friends and family. Your dynamic referral link is ready below with one-click copy.'}
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#0A0A0C] truncate select-all">
                    {generateReferralLink()}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="btn-water-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 !py-3 !px-6 !text-sm !font-semibold text-white"
                  >
                    {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied to Clipboard!') : (language === 'bn' ? 'লিংক কপি করুন' : 'Copy Referral Link')}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'maps' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Google Verified Listing</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0C]">
                      {language === 'bn' ? 'গুগল ম্যাপসে রিভিউ দিন' : 'Google Maps Review'}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">
                    4.9 ★★★★★ Rating
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'আমাদের বাসাবো সেন্টারের চিকিৎসা সেবা ও পরামর্শ কেমন লেগেছে? সরাসরি গুগল ম্যাপসে আপনার সৎ মতামত জানিয়ে অন্য রোগীদের সঠিক চিকিৎসা নিতে সহায়তা করুন।'
                    : 'Help other patients find premier oral & maxillofacial care in Dhaka by rating our Basabo chamber directly on Google Maps.'}
                </p>

                <div>
                  <a
                    href="https://maps.app.goo.gl/1NVP8EeWixrjVEhV7?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-water-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 !py-3 !px-6 !text-sm !font-semibold text-white"
                  >
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>{language === 'bn' ? 'গুগল ম্যাপে রিভিউ লিখুন' : 'Open Google Maps Review'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'facebook' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Official Facebook Page</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0C]">
                      {language === 'bn' ? 'ফেসবুক পেজে রিকমেন্ড করুন' : 'Facebook Profile / Page Review'}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">
                    @ComfortDentalSurgeryBD
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'আমাদের অফিসিয়াল ফেসবুক পেজে গিয়ে কমফোর্ট ডেন্টাল সার্জারিকে সুপারিশ (Recommend) করুন এবং নতুন ডেন্টাল স্বাস্থ্য টিপস পান।'
                    : 'Recommend Comfort Dental Surgery on our official Facebook clinic page and follow our latest oral hygiene guidelines.'}
                </p>

                <div>
                  <a
                    href="https://www.facebook.com/ComfortDentelSurgery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-water-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 !py-3 !px-6 !text-sm !font-semibold text-white"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{language === 'bn' ? 'ফেসবুকে রিকমেন্ড করুন' : 'Review on Facebook'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. EDIT PROFILE MODAL (Full Name, Phone Number, Email) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isEditingProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-[32px] squircle-card p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,132,255,0.12)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[12px] bg-[var(--blue-ambient)] text-[#0071E3] flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0C]">
                    {language === 'bn' ? 'রোগী প্রোফাইল সম্পাদনা' : 'Edit Patient Profile'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  aria-label="Close edit modal"
                  className="btn-liquid-icon w-8 h-8 text-[#3C3C43]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[rgba(10,10,12,0.6)] leading-relaxed">
                {language === 'bn'
                  ? 'আপনার সঠিক তথ্য হালনাগাদ করুন। প্রেসক্রিপশন ও অনলাইন বুকিং রেকর্ডে এই তথ্য ব্যবহৃত হবে।'
                  : 'Update your official patient records below. This information will be used for your clinic prescriptions and bookings.'}
              </p>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                    {language === 'bn' ? 'রোগীর পূর্ণ নাম' : 'Patient Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Samia"
                    className="squircle-input w-full px-4 py-3 text-sm text-[#0A0A0C]"
                  />
                </div>

                {/* 2. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                    {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. 01712106499"
                    className="squircle-input w-full px-4 py-3 text-sm text-[#0A0A0C]"
                  />
                </div>

                {/* 3. Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0C] mb-1.5">
                    {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. tanvir@gmail.com"
                    className="squircle-input w-full px-4 py-3 text-sm text-[#0A0A0C]"
                  />
                </div>

                {editError && (
                  <p className="text-xs font-semibold text-rose-600">
                    {editError}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(10,132,255,0.12)]">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="btn-water-secondary !px-5 !py-2.5 !text-xs !font-bold"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="btn-water-primary !px-6 !py-2.5 !text-xs !font-bold text-white"
                  >
                    {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
