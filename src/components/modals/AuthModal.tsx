'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  X,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
} from 'lucide-react';

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps = {}) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState<UserRole>('customer');

  const { isAuthModalOpen, setIsAuthModalOpen, loginOrSignUp, setCurrentView } = useApp();

  const showModal = isOpen !== undefined ? isOpen : isAuthModalOpen;
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else setIsAuthModalOpen(false);
  }, [onClose, setIsAuthModalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (showModal) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal, handleClose]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginOrSignUp({
      name: name.trim() || 'Patient Member',
      email: email.trim() || 'patient@comfortdental.com',
      phone: phone.trim() || '01778-320966',
      role,
    });
    setCurrentView('customer-portal');
    handleClose();
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    if (demoRole === 'admin') {
      loginOrSignUp({
        name: 'Super Admin',
        email: 'dralim.comfort79@gmail.com',
        phone: '01778-320966',
        role: 'admin',
      });
      setCurrentView('admin-dashboard');
    } else if (demoRole === 'moderator') {
      loginOrSignUp({
        name: 'Staff Moderator',
        email: 'staff@comfortdentalsurgerybd.com',
        phone: '02 47291419',
        role: 'moderator',
      });
      setCurrentView('moderator-dashboard');
    } else {
      loginOrSignUp({
        name: 'Tanvir Ahmed',
        email: 'tanvir@gmail.com',
        phone: '01712-106499',
        role: 'customer',
      });
      setCurrentView('customer-portal');
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 backdrop-blur-lg flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Account Access"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-md rounded-[32px] bg-white/88 backdrop-blur-3xl saturate-180 border border-white/90 text-[#0A0A0C] shadow-[0_30px_70px_-15px_rgba(10,37,64,0.28)] p-6 sm:p-8 overflow-hidden"
        >
          {/* Ambient radial glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

          {/* Translucent Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close sign in dialog"
            className="btn-liquid-icon w-8 h-8 text-[#3C3C43] absolute top-5 right-5 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand Header */}
          <div className="text-center mb-6 relative z-10">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-sky-500/20 bg-white shadow-md mx-auto mb-3 flex items-center justify-center">
              <Image
                src="/assets/logo.png"
                alt="Comfort Dental Surgery"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
            <h3 className="text-xl font-extrabold text-[#0A0A0C] tracking-tight">
              {isSignUp ? 'Create Patient Account' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-[#8E8E93] font-medium mt-1">
              Comfort Dental Surgery & Implant Center (Dhaka-1214)
            </p>
          </div>

          {/* 1-Click Role Access (Liquid Glass Pills) */}
          <div className="mb-5 p-3 rounded-[22px] bg-[#F2F2F7]/80 border border-white/90 text-center relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E8E93] block mb-2">
              Quick Portal Access
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="btn-liquid-chip !py-2 !px-2 !text-[11px] text-[#007AFF] justify-center"
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('moderator')}
                className="btn-liquid-chip !py-2 !px-2 !text-[11px] text-[#059669] justify-center"
              >
                Moderator
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn-liquid-chip !py-2 !px-2 !text-[11px] text-amber-600 justify-center"
              >
                Admin CMS
              </button>
            </div>
          </div>

          {/* Google Water-Drop Secondary CTA */}
          <div className="space-y-2 mb-5 relative z-10">
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="btn-water-secondary w-full !py-2.5 !px-4 !text-xs !font-semibold flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200/80 w-full" />
            <span className="bg-white/90 px-3 text-[10px] text-[#8E8E93] font-semibold uppercase tracking-wider rounded-full">
              Or with credentials
            </span>
            <div className="border-t border-slate-200/80 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
            {isSignUp && (
              <div>
                <label className="text-[11px] font-bold uppercase text-[#8E8E93]">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <UserIcon className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="squircle-input w-full pl-10 pr-3 py-2.5 text-xs text-[#0A0A0C]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase text-[#8E8E93]">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. patient@example.com"
                  className="squircle-input w-full pl-10 pr-3 py-2.5 text-xs text-[#0A0A0C]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#8E8E93]">
                Phone Number
              </label>
              <div className="relative mt-1">
                <Phone className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01778-320966"
                  className="squircle-input w-full pl-10 pr-3 py-2.5 text-xs text-[#0A0A0C]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#8E8E93]">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="squircle-input w-full pl-10 pr-3 py-2.5 text-xs text-[#0A0A0C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-water-primary w-full !py-3 !text-xs !font-bold text-white mt-4"
            >
              {isSignUp ? 'Create Account & Open Portal' : 'Sign In'}
            </button>
          </form>

          {/* Toggle between login / sign up */}
          <div className="text-center mt-4 relative z-10">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="btn-liquid-chip !text-xs text-[#007AFF]"
            >
              {isSignUp ? 'Already registered? Sign In' : 'Need an account? Register'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
