'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
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
    setCurrentView,
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

  const handleCopy = () => {
    const link = generateReferralLink();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link);
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 pt-24 pb-24 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Top return navigation bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-sm cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোমপেজে ফিরে যান' : 'Return to Homepage'}</span>
          </button>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {language === 'bn' ? 'রোগী প্রোফাইল ও রিওয়ার্ড পোর্টাল' : 'Patient Profile & Rewards Portal'}
          </span>
        </div>

        {/* Success notification banner */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-sm"
            >
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{language === 'bn' ? 'রোগীর প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Patient profile updated successfully!'}</span>
            </motion.div>
          )}

          {copyToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-sm"
            >
              <CheckCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>{language === 'bn' ? 'রেফারেল লিংক ক্লিপবোর্ডে কপি হয়েছে!' : 'Referral link copied to clipboard!'}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* CONDITIONAL: UNCONFIGURED DEVICE / EMPTY STATE LOGIN & REGISTRATION */}
        {/* ========================================================================= */}
        {!isLoggedIn || !user ? (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-8 sm:p-12 transition-all">
            {!showRegisterForm ? (
              <div className="max-w-md mx-auto space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto border border-sky-200 dark:border-sky-800">
                  <UserIcon className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {language === 'bn' ? 'রোগী পোর্টাল লগইন' : 'Patient Portal Access'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {language === 'bn'
                      ? 'এই ডিভাইসে সংরক্ষিত আপনার প্রোফাইল দেখতে আপনার নাম লিখুন।'
                      : 'Enter your patient name to retrieve your device-isolated profile.'}
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {language === 'bn' ? 'রোগীর নাম' : 'Patient Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={loginInputName}
                      onChange={(e) => setLoginInputName(e.target.value)}
                      placeholder="e.g. Samia or Tanvir Ahmed"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    />
                  </div>

                  {loginError && (
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {loginError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md cursor-pointer transition-all"
                  >
                    {language === 'bn' ? 'প্রোফাইল খুলুন' : 'Access Profile'}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setRegName(loginInputName);
                      setShowRegisterForm(true);
                    }}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
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
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
                    <UserPlus className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {language === 'bn' ? 'রোগী নিবন্ধন' : 'First-Time Registration'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'bn'
                      ? 'এই ডিভাইসে আপনার তথ্য সুরক্ষিতভাবে সংরক্ষণ করুন।'
                      : 'Provide your contact details to register this device.'}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Samia"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number (Mobile)'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="e.g. 01712106499"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email (Gmail)'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. tanvir@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  {regError && (
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {regError}
                    </p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowRegisterForm(false)}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
                    >
                      {language === 'bn' ? 'ফিরে যান' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md cursor-pointer transition-all"
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
          /* 1. AUTHENTICATED PATIENT PROFILE CARD (Matching Screenshot 2) */
          /* ========================================================================= */
          <div className="rounded-[24px] bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 p-6 sm:p-10 shadow-lg relative overflow-hidden transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-sky-100 dark:border-slate-800">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>{language === 'bn' ? 'ভেরিফাইড রোগী প্রোফাইল' : 'Verified Patient Profile'}</span>
                </div>

                {/* Patient Name Display */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight capitalize">
                  {user.name}
                </h1>

                {/* Contact Info Rows */}
                <div className="space-y-1.5 pt-1">
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>
                        <strong>{language === 'bn' ? 'মোবাইল:' : 'Mobile:'}</strong>{' '}
                        <span className="text-slate-900 dark:text-white font-semibold">{user.phone}</span>
                      </span>
                    </div>
                  )}

                  {user.email && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>
                        <strong>{language === 'bn' ? 'ইমেইল:' : 'Email:'}</strong>{' '}
                        <span className="text-slate-900 dark:text-white font-semibold">{user.email}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Points Summary Badge (Under blurred overlay in WIP Section) */}
              <div className="relative p-5 rounded-2xl bg-white dark:bg-slate-800 border border-sky-200 dark:border-slate-700 sm:text-right shrink-0 shadow-sm min-w-[200px]">
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                  {language === 'bn' ? 'পয়েন্ট ব্যালেন্স' : 'POINTS BALANCE'}
                </span>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  0 <span className="text-sm font-semibold text-slate-400">/ 300 PTS</span>
                </div>
                <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold block mt-1">
                  = ৳0 {language === 'bn' ? 'টাকা ক্যাশ ডিসকাউন্ট' : 'BDT Cash Discount'}
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. POINTS BALANCE SECTION: "WORK IN PROGRESS" LOCK (Prompt 3 Specification) */}
            {/* ========================================================================= */}
            <div className="pt-6 relative">
              {/* Glassmorphism Locked Container */}
              <div className="relative overflow-hidden pointer-events-none select-none backdrop-blur-md bg-white/40 dark:bg-slate-900/40 filter blur-[1.5px] rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-sky-500" />
                      {language === 'bn'
                        ? 'সর্বোচ্চ উপার্জন সীমা: ৩০০ পয়েন্ট (১ পয়েন্ট = ১ টাকা ছাড়)'
                        : 'Maximum Earnable Limit: 300 Points (1 Point = 1 BDT Discount)'}
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white font-bold">
                      300 {language === 'bn' ? 'পয়েন্ট বাকি' : 'PTS remaining to max cap'}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-sky-200 dark:border-slate-700 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${pointsPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Centered Floating Overlay Banner (Exact prompt code) */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-[2px] rounded-2xl">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Points System: Work in Progress
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Coming soon for verified patients</p>
              </div>
            </div>

            {/* Profile Action Buttons: Edit Profile + Log Out / Switch Patient */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-8">
              <button
                onClick={logoutPatient}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{language === 'bn' ? 'লগ আউট / রোগী পরিবর্তন' : 'Log Out / Switch Patient'}</span>
              </button>

              <button
                onClick={handleOpenEdit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-700 to-slate-900 hover:from-sky-600 hover:to-slate-800 shadow-md cursor-pointer transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>{language === 'bn' ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE ENGAGEMENT TABS (REVIEWS & REFERRALS) - Specification 4 */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-500" />
                <span>{language === 'bn' ? 'ইন্টারেক্টিভ এনগেজমেন্ট ও রিভিউ' : 'Interactive Engagement & Reviews'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn'
                  ? 'ক্লিনিকের সেবা শেয়ার করুন অথবা অফিসিয়াল প্রোফাইলে আপনার মতামত জানান।'
                  : 'Share our services or review our specialist care on official channels.'}
              </p>
            </div>

            {/* 3-way Segmented Control Pill Menu */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('share')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'share'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ওয়েবসাইট লিংক' : 'Share Link'}</span>
              </button>

              <button
                onClick={() => setActiveTab('maps')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'maps'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Google Maps</span>
              </button>

              <button
                onClick={() => setActiveTab('facebook')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'facebook'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Active Tab Panel Card (Rounded-2xl, smooth transition, hover:shadow-lg) */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out">
            {activeTab === 'share' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'রেফারেল লিংক' : 'Patient Referral URL'}</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {language === 'bn' ? 'ওয়েবসাইট লিংক শেয়ার করুন' : 'Share Website Link'}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    5-MIN EXPIRATION
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'আপনার পরিচিতজন ও পরিবারের সাথে কমফোর্ট ডেন্টালের সেবা শেয়ার করুন। নিচে আপনার সুরক্ষিত রেফারেল লিংক তৈরি করা আছে।'
                    : 'Share Comfort Dental Surgery with friends and family. Your dynamic referral link is ready below with one-click copy.'}
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 truncate select-all">
                    {generateReferralLink()}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md cursor-pointer transition-all"
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Google Verified Listing</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {language === 'bn' ? 'গুগল ম্যাপসে রিভিউ দিন' : 'Google Maps Review'}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    4.9 ★★★★★ Rating
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'আমাদের বাসাবো সেন্টারের চিকিৎসা সেবা ও পরামর্শ কেমন লেগেছে? সরাসরি গুগল ম্যাপসে আপনার সৎ মতামত জানিয়ে অন্য রোগীদের সঠিক চিকিৎসা নিতে সহায়তা করুন।'
                    : 'Help other patients find premier oral & maxillofacial care in Dhaka by rating our Basabo chamber directly on Google Maps.'}
                </p>

                <div>
                  <a
                    href="https://maps.google.com/?q=Comfort+Dental+Surgery+Basabo+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md cursor-pointer transition-all"
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Official Facebook Page</span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {language === 'bn' ? 'ফেসবুক পেজে রিকমেন্ড করুন' : 'Facebook Profile / Page Review'}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    @ComfortDentalSurgeryBD
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'আমাদের অফিসিয়াল ফেসবুক পেজে গিয়ে কমফোর্ট ডেন্টাল সার্জারিকে সুপারিশ (Recommend) করুন এবং নতুন ডেন্টাল স্বাস্থ্য টিপস পান।'
                    : 'Recommend Comfort Dental Surgery on our official Facebook clinic page and follow our latest oral hygiene guidelines.'}
                </p>

                <div>
                  <a
                    href="https://www.facebook.com/ComfortDentalSurgeryBD/reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md cursor-pointer transition-all"
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
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'bn' ? 'রোগী প্রোফাইল সম্পাদনা' : 'Edit Patient Profile'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'bn'
                  ? 'আপনার সঠিক তথ্য হালনাগাদ করুন। প্রেসক্রিপশন ও অনলাইন বুকিং রেকর্ডে এই তথ্য ব্যবহৃত হবে।'
                  : 'Update your official patient records below. This information will be used for your clinic prescriptions and bookings.'}
              </p>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'bn' ? 'রোগীর পূর্ণ নাম' : 'Patient Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Samia"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>

                {/* 2. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. 01712106499"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>

                {/* 3. Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. tanvir@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  />
                </div>

                {editError && (
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    {editError}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md cursor-pointer transition-all"
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
