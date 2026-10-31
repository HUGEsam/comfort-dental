'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  X,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
  Shield,
  ArrowRight,
  Sparkles,
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
  const [role, setRole] = useState<UserRole>('customer');

  const { isAuthModalOpen, setIsAuthModalOpen, loginOrSignUp, setCurrentView } = useApp();

  const showModal = isOpen !== undefined ? isOpen : isAuthModalOpen;
  const handleClose = onClose || (() => setIsAuthModalOpen(false));

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginOrSignUp({
      name: name.trim() || 'Patient Member',
      email: email.trim() || 'patient@comfortdental.com',
      phone: phone.trim() || '01778-320966',
      role,
    });
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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-3xl bg-white/95 dark:bg-[#091122]/95 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/30 text-slate-800 dark:text-white shadow-2xl p-6 sm:p-8 overflow-hidden"
        >
          {/* Glowing Accent Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00A8E8] via-[#D4AF37] to-[#00A8E8]" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00A8E8] to-[#0A2540] text-white flex items-center justify-center mx-auto mb-3 shadow-md font-bold text-lg">
              CD
            </div>
            <h3 className="text-xl font-extrabold text-[#0A2540] dark:text-white">
              {isSignUp ? 'Create Patient Account' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Comfort Dental Surgery & Implant Center (Dhaka-1214)
            </p>
          </div>

          {/* 1-Click Demo Quick Switcher */}
          <div className="mb-5 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              ⚡ Quick Role Test Access
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="py-1.5 px-2 rounded-xl text-[11px] font-bold bg-white dark:bg-slate-800 text-[#00A8E8] hover:shadow-xs border border-slate-200 dark:border-slate-700"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('moderator')}
                className="py-1.5 px-2 rounded-xl text-[11px] font-bold bg-white dark:bg-slate-800 text-emerald-400 hover:shadow-xs border border-slate-200 dark:border-slate-700"
              >
                Moderator
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-1.5 px-2 rounded-xl text-[11px] font-bold bg-white dark:bg-slate-800 text-amber-400 hover:shadow-xs border border-slate-200 dark:border-slate-700"
              >
                Admin CMS
              </button>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-2 mb-5">
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all text-slate-700 dark:text-slate-200 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#091122] px-3 text-[10px] text-slate-400 font-bold uppercase">
              Or with credentials
            </span>
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. patient@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                Phone Number
              </label>
              <div className="relative mt-1">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01778-320966"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A8E8] to-[#0A2540] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all mt-4"
            >
              {isSignUp ? 'Generate Account & Profile' : 'Sign In'}
            </button>
          </form>

          {/* Toggle between login / sign up */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-cyan-400 hover:underline font-semibold"
            >
              {isSignUp ? 'Already registered? Sign In' : 'Need an account? Register'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
