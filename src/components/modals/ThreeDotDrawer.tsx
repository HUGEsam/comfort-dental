'use client';

import React, { useState, useEffect } from 'react';
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
  Share2,
  CheckCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
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

  // Referral Link Copy & Toast
  const [copiedLink, setCopiedLink] = useState(false);
  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  // Chamber Feedback Form State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDrawerOpen, setIsDrawerOpen]);

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
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
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

  const handleRedeemOffer = (title: string) => {
    setRedeemedNotice(`Voucher "${title}" activated! Please present this confirmation at reception.`);
    setTimeout(() => setRedeemedNotice(null), 5000);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-hidden bg-slate-950/35 backdrop-blur-md flex justify-end"
        role="dialog"
        aria-modal="true"
        aria-label="Member Control Hub"
      >
        <div className="flex-1" onClick={() => setIsDrawerOpen(false)} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          className="relative w-full max-w-md sm:max-w-lg bg-[#F2F2F7]/94 backdrop-blur-3xl saturate-180 border-l border-white/85 text-[#0A0A0C] h-full flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.16)] z-10"
        >
          {/* Sticky iOS Header Bar */}
          <div className="p-5 border-b border-slate-200/70 flex items-center justify-between bg-white/78 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-sky-500/20 bg-white shadow-xs flex items-center justify-center shrink-0">
                <Image
                  src="/assets/logo.png"
                  alt="Comfort Dental Badge"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0A0A0C] tracking-tight">Member Control Hub</h3>
                <span className="text-[11px] text-[#007AFF] font-semibold">
                  {user ? `Active: ${user.name}` : 'Guest Visitor'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close Member Control Hub"
              className="btn-liquid-icon w-8 h-8 text-[#3C3C43]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* iOS Segmented Tab Strip */}
          <div className="p-2.5 bg-white/60 backdrop-blur-lg border-b border-slate-200/70 flex overflow-x-auto gap-1.5">
            <button
              onClick={() => setDrawerActiveTab('profile')}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                drawerActiveTab === 'profile'
                  ? 'btn-water-primary !py-2 !px-3 !text-xs text-white'
                  : 'btn-liquid-chip'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => setDrawerActiveTab('offers')}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                drawerActiveTab === 'offers'
                  ? 'btn-water-primary !py-2 !px-3 !text-xs text-white'
                  : 'btn-liquid-chip'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => setDrawerActiveTab('payment')}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                drawerActiveTab === 'payment'
                  ? 'btn-water-primary !py-2 !px-3 !text-xs text-white'
                  : 'btn-liquid-chip'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment</span>
            </button>

            <button
              onClick={() => setDrawerActiveTab('points')}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                drawerActiveTab === 'points'
                  ? 'btn-water-primary !py-2 !px-3 !text-xs text-white'
                  : 'btn-liquid-chip'
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
              className={`py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1 whitespace-nowrap cursor-pointer ${
                user ? 'btn-liquid-danger !py-2 !px-3 !text-xs' : 'btn-liquid-emerald !py-2 !px-3 !text-xs'
              }`}
            >
              {user ? <LogOut className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
              <span>{user ? 'Logout' : 'Sign In'}</span>
            </button>
          </div>

          {/* Drawer Body Content */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5"
          >
            {redeemedNotice && (
              <div className="p-3.5 rounded-[18px] bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{redeemedNotice}</span>
              </div>
            )}

            {/* TAB 1: PROFILE */}
            {drawerActiveTab === 'profile' && (
              <div className="space-y-5">
                {/* Points Progress Card */}
                <div className="ios-settings-group p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A0A0C] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#007AFF]" />
                      Comfort Dental Points Wallet
                    </span>
                    <span className="text-xs font-mono font-bold text-[#007AFF]">
                      {currentPoints} / {maxPoints} PTS
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pointsPercentage}%` }}
                      className="h-full bg-gradient-to-r from-[#0A84FF] to-[#007AFF] rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#8E8E93]">
                    <span>Hard cap: 300 PTS (1 PT = 1 BDT)</span>
                    <span>{300 - currentPoints} PTS remaining</span>
                  </div>
                </div>

                {/* User Info Card */}
                <div className="ios-settings-group p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-[#0A0A0C]">
                          {user?.name || 'Guest Patient'}
                        </h4>
                        <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] font-mono text-[#007AFF] uppercase">
                          {user?.role || 'Visitor'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8E8E93] font-mono block mt-0.5">
                        ID: {user?.id || 'Unregistered Device'}
                      </span>
                      {user?.phone && (
                        <span className="text-xs text-[#059669] font-semibold block mt-0.5">
                          Mobile: {user.phone}
                        </span>
                      )}
                    </div>

                    {user && (
                      <button
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="btn-liquid-chip text-[#007AFF]"
                      >
                        {isEditingProfile ? 'Cancel' : 'Edit'}
                      </button>
                    )}
                  </div>

                  {!isEditingProfile ? (
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs text-[#3C3C43] italic">
                        &quot;{user?.bio || 'Comfort Dental Surgery patient care portal.'}&quot;
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleProfileSave} className="pt-3 border-t border-slate-100 space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#8E8E93] uppercase">Full Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#8E8E93] uppercase">Bio</label>
                        <textarea
                          rows={2}
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C] resize-none"
                        />
                      </div>
                      <button type="submit" className="btn-water-primary w-full !py-2.5 !text-xs">
                        Save Profile Changes
                      </button>
                    </form>
                  )}
                </div>

                {/* Share Referral Link Card */}
                <div className="ios-settings-group p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A0A0C] flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-[#007AFF]" />
                      5-Minute Referral Link Sharing
                    </span>
                    <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] text-[#007AFF]">
                      +3 PTS / Visit
                    </span>
                  </div>

                  <p className="text-xs text-[#3C3C43] leading-relaxed">
                    Share your personal link. Earn <strong>+3 Points</strong> whenever a visitor opens it within <strong>5 minutes</strong>!
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#8E8E93]">
                    <span>Daily Share Usage:</span>
                    <strong className="text-[#007AFF]">
                      {user?.dailyShareCount || 0} / 10 Today
                    </strong>
                  </div>

                  <button onClick={handleCopyReferral} className="btn-water-secondary w-full !py-2.5 !text-xs">
                    {copiedLink ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Referral Link Copied!' : 'Generate & Copy 5-Min Referral Link'}</span>
                  </button>
                </div>

                {/* Chamber Feedback Card */}
                <div className="ios-settings-group p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0A0A0C] flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-500" />
                      Chamber Feedback & Review
                    </span>
                    <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] text-amber-600">
                      +20 PTS
                    </span>
                  </div>

                  {user?.hasSubmittedFeedback ? (
                    <div className="p-3 rounded-[14px] bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>Thank you for reviewing Dr. Alim & Dr. Shanta! 20 Points awarded.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#8E8E93]">Doctor & Chamber Rating</label>
                        <div className="flex gap-2 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFeedbackRating(star)}
                              className={`text-xl cursor-pointer transition-transform ${
                                star <= feedbackRating ? 'text-amber-400 scale-110' : 'text-slate-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        required
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Share your chamber experience with Dr. Alim or Dr. Shanta..."
                        className="squircle-input w-full px-3 py-2 text-xs text-[#0A0A0C] resize-none"
                      />

                      <button type="submit" className="btn-water-primary w-full !py-2.5 !text-xs">
                        Submit Review & Claim 20 Points
                      </button>

                      {feedbackStatus && (
                        <p className="text-[11px] text-[#007AFF] font-semibold">{feedbackStatus}</p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: OFFERS */}
            {drawerActiveTab === 'offers' && (
              <div className="space-y-4">
                <p className="text-xs text-[#3C3C43] px-1">
                  Redeem your Comfort Dental Points for surgical discounts and clinical package upgrades.
                </p>

                <div className="space-y-3">
                  {offers.map((offer) => {
                    const canRedeem = currentPoints >= offer.pointsRequired;
                    return (
                      <div key={offer.id} className="ios-settings-group p-4 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-[#0A0A0C]">{offer.title}</span>
                          <span className="btn-liquid-chip !py-0.5 !px-2.5 !text-[10px] text-amber-700 shrink-0">
                            {offer.discount}
                          </span>
                        </div>

                        <p className="text-xs text-[#8E8E93] leading-relaxed">{offer.description}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                          <span className="text-[#007AFF] font-mono font-semibold">
                            Cost: {offer.pointsRequired} PTS
                          </span>
                          <button
                            disabled={!canRedeem}
                            onClick={() => handleRedeemOffer(offer.title)}
                            className={
                              canRedeem
                                ? 'btn-water-primary !py-1.5 !px-4 !text-xs'
                                : 'btn-liquid-chip opacity-50 cursor-not-allowed text-[#8E8E93]'
                            }
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

            {/* TAB 3: PAYMENT */}
            {drawerActiveTab === 'payment' && (
              <div className="space-y-4">
                <div className="flex gap-1.5 p-1 rounded-full bg-white/80 border border-white">
                  <button
                    onClick={() => setPaymentMethod('mfs')}
                    className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      paymentMethod === 'mfs' ? 'btn-water-primary !py-2 !text-xs text-white' : 'text-[#8E8E93]'
                    }`}
                  >
                    bKash / Nagad
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      paymentMethod === 'card' ? 'btn-water-primary !py-2 !text-xs text-white' : 'text-[#8E8E93]'
                    }`}
                  >
                    Debit / Credit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      paymentMethod === 'bank' ? 'btn-water-primary !py-2 !text-xs text-white' : 'text-[#8E8E93]'
                    }`}
                  >
                    Bank & QR
                  </button>
                </div>

                <div className="ios-settings-group p-4">
                  <label className="text-xs font-bold text-[#0A0A0C] block mb-2">
                    Top-Up Amount: <strong className="text-[#007AFF]">{buyPointsAmount} PTS</strong> (৳{buyPointsAmount * 5})
                  </label>
                  <input
                    type="range"
                    min="10"
                    max={Math.max(10, 300 - currentPoints)}
                    value={buyPointsAmount}
                    onChange={(e) => setBuyPointsAmount(Number(e.target.value))}
                    className="w-full accent-[#007AFF]"
                  />
                  <div className="flex justify-between text-[10px] text-[#8E8E93] mt-1">
                    <span>10 PTS</span>
                    <span>Max allowed: {300 - currentPoints} PTS</span>
                  </div>
                </div>

                {paymentMethod === 'mfs' && (
                  <form onSubmit={handlePaymentSubmit} className="ios-settings-group p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {(['bkash', 'nagad', 'rocket'] as const).map((prov) => (
                        <button
                          key={prov}
                          type="button"
                          onClick={() => setMfsProvider(prov)}
                          className={`py-2.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                            mfsProvider === prov ? 'btn-water-primary !py-2 !text-xs text-white' : 'btn-liquid-chip'
                          }`}
                        >
                          {prov}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 rounded-[14px] bg-[#F2F2F7] text-xs text-[#3C3C43]">
                      Send Money to Official Hotline: <strong className="text-[#0A0A0C]">01778-320966</strong>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#8E8E93] uppercase">Sender Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder="e.g. 017XXXXXXXX"
                        className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#8E8E93] uppercase">Transaction ID (TrxID)</label>
                      <input
                        type="text"
                        required
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value)}
                        placeholder="e.g. 9J47K2L8"
                        className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C] font-mono"
                      />
                    </div>

                    <button type="submit" className="btn-water-primary w-full !py-3 !text-xs">
                      Confirm Payment & Add {buyPointsAmount} Points
                    </button>
                  </form>
                )}

                {paymentMethod === 'card' && (
                  <form onSubmit={handlePaymentSubmit} className="ios-settings-group p-4 space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#8E8E93] uppercase">Card Number</label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#8E8E93] uppercase">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]" />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#8E8E93] uppercase">CVV</label>
                        <input type="password" placeholder="•••" className="squircle-input w-full mt-1 px-3 py-2 text-xs text-[#0A0A0C]" />
                      </div>
                    </div>

                    <button type="submit" className="btn-water-primary w-full !py-3 !text-xs">
                      Process Card Payment (৳{buyPointsAmount * 5})
                    </button>
                  </form>
                )}

                {paymentMethod === 'bank' && (
                  <div className="ios-settings-group p-4 space-y-4">
                    <div className="text-center space-y-2">
                      <div className="w-32 h-32 mx-auto bg-white p-2 rounded-[16px] shadow-xs border border-slate-200 flex items-center justify-center">
                        <div className="w-full h-full border-4 border-[#0A2540] p-1 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-6 h-6 bg-[#0A2540]" />
                            <div className="w-6 h-6 bg-[#0A2540]" />
                          </div>
                          <div className="text-center font-bold text-[9px] text-[#0A2540]">SCAN & PAY</div>
                          <div className="flex justify-between">
                            <div className="w-6 h-6 bg-[#0A2540]" />
                            <div className="w-6 h-6 bg-[#007AFF]" />
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#8E8E93] block">Scan via Banking App / bKash QR</span>
                    </div>

                    <div className="p-3 rounded-[14px] bg-[#F2F2F7] text-xs text-[#3C3C43] space-y-1">
                      <div><strong>Bank:</strong> Dutch-Bangla Bank Ltd (DBBL)</div>
                      <div><strong>Account Name:</strong> Comfort Dental Surgery</div>
                      <div><strong>Account No:</strong> 115.120.0098421</div>
                      <div><strong>Branch:</strong> Basabo Branch, Dhaka</div>
                    </div>
                  </div>
                )}

                {paymentSuccessMsg && (
                  <div className="p-3 rounded-[14px] bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                    {paymentSuccessMsg}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: POINTS */}
            {drawerActiveTab === 'points' && (
              <div className="space-y-4">
                <div className="ios-settings-group p-4 space-y-2">
                  <h4 className="text-sm font-extrabold text-[#0A0A0C] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#007AFF]" />
                    How to Earn Comfort Points
                  </h4>
                  <p className="text-xs text-[#3C3C43] leading-relaxed">
                    Maximum earnable limit is <strong>300 Points</strong> (1 Point = 1 BDT discount).
                  </p>
                </div>

                <div className="ios-settings-group p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-[10px] bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                      +100
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A0A0C]">Google Maps Review (+100 BDT)</div>
                      <div className="text-[11px] text-[#8E8E93] mt-0.5">
                        Rate our chamber on Google Maps to unlock a ৳100 treatment voucher.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => claimGoogleReviewPoints()}
                    className="btn-water-primary w-full !py-2.5 !text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Review & Claim 100 Points</span>
                  </button>
                </div>

                <div className="ios-settings-group divide-y divide-slate-200/70">
                  <div className="p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#E8F2FF] text-[#007AFF] flex items-center justify-center font-bold text-xs shrink-0">
                      +3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A0A0C]">5-Minute Referral Clicks</div>
                      <div className="text-[11px] text-[#8E8E93] mt-0.5">
                        Share your referral link. Visitors within 5 minutes grant +3 PTS (up to 300 cap).
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                      +20
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0A0A0C]">Chamber Feedback Reward</div>
                      <div className="text-[11px] text-[#8E8E93] mt-0.5">
                        Submit a verified consultation review for +20 lifetime bonus points.
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
