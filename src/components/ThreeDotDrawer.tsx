'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  X,
  User as UserIcon,
  Tag,
  CreditCard,
  Award,
  LogIn,
  LogOut,
  QrCode,
  Smartphone,
  ShieldCheck,
  Share2,
  Clock,
  CheckCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Camera,
} from 'lucide-react';

export default function ThreeDotDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerActiveTab,
    setDrawerActiveTab,
    user,
    setUser,
    setIsAuthModalOpen,
    offers,
    purchasePoints,
    generateReferralLink,
    submitFeedback,
    claimGoogleReviewPoints,
    themeConfig,
  } = useApp();

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
  });

  // Payment Tab State
  const [paymentMethod, setPaymentMethod] = useState<'mfs' | 'card' | 'bank'>('mfs');
  const [mfsProvider, setMfsProvider] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [buyPointsAmount, setBuyPointsAmount] = useState<number>(50);
  const [paymentPhone, setPaymentPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  // Referral Link Copy
  const [copiedLink, setCopiedLink] = useState(false);

  // Chamber Feedback Form State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const currentPoints = user?.points || 0;
  const maxPoints = 300;
  const pointsPercentage = Math.min(100, (currentPoints / maxPoints) * 100);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({
        ...user,
        name: profileForm.name || user.name,
        bio: profileForm.bio,
        phone: profileForm.phone || user.phone,
      });
      setIsEditingProfile(false);
    }
  };

  const handleCopyReferral = () => {
    const link = generateReferralLink();
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    const res = submitFeedback(feedbackRating, feedbackText);
    setFeedbackStatus(res.message);
    if (res.success) {
      setFeedbackText('');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = purchasePoints(buyPointsAmount, `${paymentMethod.toUpperCase()}-${trxId || 'DIRECT'}`);
    setPaymentSuccessMsg(res.message);
    setTrxId('');
    setTimeout(() => setPaymentSuccessMsg(''), 5000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
        {/* Backdrop click */}
        <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md sm:max-w-lg bg-[#050D1A] border-l border-cyan-500/30 text-white h-full flex flex-col shadow-2xl z-10"
        >
          {/* Header Bar */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#030712]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A8E8] to-[#D4AF37] flex items-center justify-center font-bold text-white shadow-md">
                CD
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Member Control Hub</h3>
                <span className="text-[11px] text-cyan-400 font-mono">
                  {user ? `User: ${user.name}` : 'Guest Visitor'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 5-Module Navigation Tabs */}
          <div className="flex border-b border-slate-800/80 bg-slate-900/60 p-1.5 overflow-x-auto gap-1">
            <button
              onClick={() => setDrawerActiveTab('profile')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                drawerActiveTab === 'profile'
                  ? 'bg-[#00A8E8] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setDrawerActiveTab('offers')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                drawerActiveTab === 'offers'
                  ? 'bg-[#00A8E8] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => setDrawerActiveTab('payment')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                drawerActiveTab === 'payment'
                  ? 'bg-[#00A8E8] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment</span>
            </button>

            <button
              onClick={() => setDrawerActiveTab('points')}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                drawerActiveTab === 'points'
                  ? 'bg-[#00A8E8] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Points</span>
            </button>

            <button
              onClick={() => {
                if (user) {
                  setUser(null);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
                user
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-rose-900/50'
                  : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/50'
              }`}
            >
              {user ? <LogOut className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
              <span>{user ? 'Logout' : 'Auth'}</span>
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* ========================================================= */}
            {/* TAB 1: PROFILE (Facebook-style with NO cover photo) */}
            {/* ========================================================= */}
            {drawerActiveTab === 'profile' && (
              <div className="space-y-6">
                {/* Points Progress Bar (Hard cap at 300) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A2540] border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#D4AF37]" />
                      Comfort Dental Points Wallet
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {currentPoints} / {maxPoints} PTS
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pointsPercentage}%` }}
                      className="h-full bg-gradient-to-r from-[#00A8E8] via-[#D4AF37] to-emerald-400 rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>Hard cap: 300 PTS maximum (1 PT = 1 BDT)</span>
                    <span>{300 - currentPoints} PTS to max ceiling</span>
                  </div>
                </div>

                {/* User Profile (Avatar / profile image omitted per specification) */}
                <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-white flex items-center gap-1.5">
                        <span>{user?.name || 'Tanvir Ahmed'}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 uppercase font-mono">
                          {user?.role || 'Customer'}
                        </span>
                      </h4>
                      <span className="text-xs text-slate-400 font-mono block mt-0.5">
                        ID: {user?.id || 'CDS-TANVIR-01778-9842'}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                        📞 {user?.phone || '01778-320966'}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="text-xs font-bold text-cyan-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700"
                    >
                      {isEditingProfile ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {/* Bio */}
                  {!isEditingProfile ? (
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <p className="text-xs text-slate-300 italic">
                        &quot;{user?.bio || 'Patient member since 2024. Regular preventive cleaning & oral checkups.'}&quot;
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleProfileSave} className="mt-4 pt-3 border-t border-slate-800 space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Bio</label>
                        <textarea
                          rows={2}
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          className="w-full mt-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#00A8E8] text-white font-bold text-xs shadow-md"
                      >
                        Save Profile Changes
                      </button>
                    </form>
                  )}
                </div>

                {/* Share Referral Link Module (5-Minute Window Validation) */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-cyan-400" />
                      5-Minute Referral Link Sharing
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      +3 PTS / Verified Visit
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Share your unique link. You receive <strong>+3 Points</strong> whenever someone opens the link within <strong>5 minutes</strong> of generation!
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Daily Share Usage:</span>
                    <strong className="text-cyan-300">
                      {user?.dailyShareCount || 0} / 10 Shares Today (Max 30 PTS/Day)
                    </strong>
                  </div>

                  <button
                    onClick={handleCopyReferral}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 font-bold text-xs text-white transition-all"
                  >
                    {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Referral Link Copied (5-min token active)!' : 'Generate & Copy 5-Min Referral Link'}</span>
                  </button>
                </div>

                {/* Lifetime Chamber Feedback Form (+20 Points, 1 Per Account) */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#121614] border border-[#D4AF37]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                      Chamber Feedback & Direct Doctor Review
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                      +20 PTS (Lifetime)
                    </span>
                  </div>

                  {user?.hasSubmittedFeedback ? (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>You have earned your 20 Lifetime Feedback Points! Thank you for reviewing Dr. Alim & Dr. Shanta.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300">Doctor & Chamber Rating</label>
                        <div className="flex gap-2 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFeedbackRating(star)}
                              className={`text-lg transition-transform ${star <= feedbackRating ? 'text-amber-400 scale-110' : 'text-slate-600'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <textarea
                          rows={2}
                          required
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Write your chamber experience with Dr. Alim or Dr. Shanta..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#00A8E8] hover:brightness-110 text-[#0A2540] font-bold text-xs shadow-md transition-all"
                      >
                        Submit Feedback & Claim 20 Points (Auto-forward to WhatsApp/Email)
                      </button>

                      {feedbackStatus && (
                        <p className="text-[11px] text-cyan-300 font-semibold">{feedbackStatus}</p>
                      )}
                    </form>
                  )}
                </div>

                {/* Activity History */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recent Activity History
                  </h5>
                  <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/60 border border-slate-800/80 p-2">
                    {user?.activityLog && user.activityLog.length > 0 ? (
                      user.activityLog.map((log) => (
                        <div key={log.id} className="py-2 px-2 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-200 font-medium block">{log.action}</span>
                            <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                          </div>
                          <span className={`font-mono font-bold ${log.pointsChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {log.pointsChange >= 0 ? `+${log.pointsChange}` : log.pointsChange} PTS
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 p-2 text-center">No recent transactions.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: OFFERS (Promotions & Point-Redeemable Tiers) */}
            {/* ========================================================= */}
            {drawerActiveTab === 'offers' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300">
                  Redeem your Comfort Dental Points for exclusive surgical discounts and clinical package upgrades.
                </div>

                <div className="space-y-3">
                  {offers.map((offer) => {
                    const canRedeem = currentPoints >= offer.pointsRequired;
                    return (
                      <div
                        key={offer.id}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-white">{offer.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-amber-300 border border-[#D4AF37]/40">
                            {offer.discount}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">{offer.description}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                          <span className="text-cyan-400 font-mono font-semibold">
                            Cost: {offer.pointsRequired} PTS
                          </span>
                          <button
                            disabled={!canRedeem}
                            onClick={() => {
                              alert(`Offer "${offer.title}" code applied! Please show to reception at BDDL Basabo Height.`);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              canRedeem
                                ? 'bg-[#00A8E8] text-white hover:bg-cyan-400'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {canRedeem ? 'Redeem Voucher' : `Need ${offer.pointsRequired - currentPoints} More PTS`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 3: PAYMENT (bKash, Rocket, Nagad, Cards, QR & Bank) */}
            {/* ========================================================= */}
            {drawerActiveTab === 'payment' && (
              <div className="space-y-5">
                <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setPaymentMethod('mfs')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${paymentMethod === 'mfs' ? 'bg-[#00A8E8] text-white' : 'text-slate-400'}`}
                  >
                    MFS (bKash/Nagad)
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${paymentMethod === 'card' ? 'bg-[#00A8E8] text-white' : 'text-slate-400'}`}
                  >
                    Debit / Credit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${paymentMethod === 'bank' ? 'bg-[#00A8E8] text-white' : 'text-slate-400'}`}
                  >
                    Bank & QR Code
                  </button>
                </div>

                {/* Buy Points / Pay Bill Slider */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    Points to Purchase / Balance Top-Up: <strong className="text-cyan-300">{buyPointsAmount} PTS</strong> (৳{buyPointsAmount * 5})
                  </label>
                  <input
                    type="range"
                    min="10"
                    max={Math.max(10, 300 - currentPoints)}
                    value={buyPointsAmount}
                    onChange={(e) => setBuyPointsAmount(Number(e.target.value))}
                    className="w-full accent-[#00A8E8]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>10 PTS (৳10)</span>
                    <span>Max allowed: {300 - currentPoints} PTS</span>
                  </div>
                </div>

                {/* Sub-view: MFS */}
                {paymentMethod === 'mfs' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setMfsProvider('bkash')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${mfsProvider === 'bkash' ? 'border-pink-500 bg-pink-950/30 text-pink-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
                      >
                        bKash
                      </button>
                      <button
                        type="button"
                        onClick={() => setMfsProvider('nagad')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${mfsProvider === 'nagad' ? 'border-orange-500 bg-orange-950/30 text-orange-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
                      >
                        Nagad
                      </button>
                      <button
                        type="button"
                        onClick={() => setMfsProvider('rocket')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${mfsProvider === 'rocket' ? 'border-purple-500 bg-purple-950/30 text-purple-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}
                      >
                        Rocket
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      Send Money to Merchant / Personal Number: <strong className="text-white">01778-320966</strong>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Sender Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder="e.g. 017XXXXXXXX"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Transaction ID (TrxID)</label>
                      <input
                        type="text"
                        required
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. 9J47K2L8"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A8E8] to-[#0A2540] font-bold text-xs text-white shadow-md hover:brightness-110"
                    >
                      Confirm Payment & Add {buyPointsAmount} Points
                    </button>
                  </form>
                )}

                {/* Sub-view: Card */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#00A8E8] font-bold text-xs text-white shadow-md hover:brightness-110"
                    >
                      Process Card Payment (৳{buyPointsAmount * 5})
                    </button>
                  </form>
                )}

                {/* Sub-view: Bank & QR */}
                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                      <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
                        {/* Procedural QR Code Graphic */}
                        <div className="w-full h-full border-4 border-[#0A2540] p-1 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-7 h-7 bg-[#0A2540]" />
                            <div className="w-7 h-7 bg-[#0A2540]" />
                          </div>
                          <div className="text-center font-bold text-[10px] text-[#0A2540]">
                            SCAN & PAY
                          </div>
                          <div className="flex justify-between">
                            <div className="w-7 h-7 bg-[#0A2540]" />
                            <div className="w-7 h-7 bg-[#00A8E8]" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 block">
                        Scan via any Bangladeshi Banking App / bKash QR
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div><strong>Bank Name:</strong> Dutch-Bangla Bank Ltd (DBBL)</div>
                      <div><strong>Account Name:</strong> Comfort Dental Surgery</div>
                      <div><strong>Account Number:</strong> 115.120.0098421</div>
                      <div><strong>Branch:</strong> Basabo Branch, Dhaka</div>
                      <div><strong>Routing:</strong> 090271419</div>
                    </div>
                  </div>
                )}

                {paymentSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-700 text-xs text-emerald-300 font-semibold">
                    {paymentSuccessMsg}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 4: POINTS (Visual Guide on How to Collect/Earn) */}
            {/* ========================================================= */}
            {drawerActiveTab === 'points' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A2540] to-slate-900 border border-cyan-500/30">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    How to Collect & Earn Comfort Points
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Maximum earnable limit is set to <strong>300 Points</strong> (1 Point = 1 BDT discount). Points never expire and are automatically redeemable for treatment discounts. Registration bonus is disabled.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Google Review -> 100 Points */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-600 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                        +100
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Review and get 100 points</span>
                          <span className="text-[10px] text-amber-300 font-mono">(100 BDT)</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Share your genuine treatment review on Google Maps to instantly receive 100 Points discount.
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => claimGoogleReviewPoints()}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0088CC] to-[#0A2540] hover:brightness-110 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Review and get 100 points</span>
                    </button>
                  </div>

                  {/* 5-Minute Referral */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                      +3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">5-Minute Referral Clicks</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Share your referral link. Each visitor who opens within 5 minutes awards 3 Points (Max 10 shares / 30 PTS per day, up to 300 max cap).
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                      🛒
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Instant Purchase via bKash / Cards</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Buy points anytime from the Payment tab at ৳1 per Point up to the 300 PTS cap.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
