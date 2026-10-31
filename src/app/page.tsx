'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import Consultants from '@/components/Consultants';
import ServicesBento from '@/components/ServicesBento';
import AssociateDentists from '@/components/AssociateDentists';
import SmileSlider from '@/components/SmileSlider';
import SterilizationProtocol from '@/components/SterilizationProtocol';
import BookingAndContact from '@/components/BookingAndContact';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

// Interactive Overlays & Modals
import CountrySelectorModal from '@/components/CountrySelectorModal';
import ServiceModal from '@/components/ServiceModal';
import ThreeDotDrawer from '@/components/ThreeDotDrawer';
import AuthModal from '@/components/AuthModal';

// Role Dashboards
import CustomerPortal from '@/components/CustomerPortal';
import ModeratorDashboard from '@/components/ModeratorDashboard';
import AdminDashboard from '@/components/AdminDashboard';

import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const { currentView, processReferralClick, language } = useApp();
  const [referralNotification, setReferralNotification] = useState<string | null>(null);

  // Parse incoming referral link (?ref=...&t=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      const t = urlParams.get('t');

      if (ref && t) {
        const timestamp = parseInt(t, 10);
        if (!isNaN(timestamp)) {
          const result = processReferralClick(ref, timestamp);
          const notifyTimer = setTimeout(() => {
            setReferralNotification(result.message);
          }, 0);
          const clearTimer = setTimeout(() => setReferralNotification(null), 6000);
          return () => {
            clearTimeout(notifyTimer);
            clearTimeout(clearTimer);
          };
        }
      }
    }
  }, [processReferralClick]);

  return (
    <main className="min-h-screen flex flex-col selection:bg-[#00A8E8] selection:text-white relative bg-white transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Referral Link Verification Alert Banner */}
      <AnimatePresence>
        {referralNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4"
          >
            <div className="p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-cyan-400 text-white shadow-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs sm:text-sm font-semibold">{referralNotification}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conditional View Rendering based on currentView */}
      <ErrorBoundary>
        {currentView === 'customer-portal' ? (
          <div className="pt-24 min-h-screen">
            <CustomerPortal />
          </div>
        ) : currentView === 'moderator-dashboard' ? (
          <div className="pt-24 min-h-screen">
            <ModeratorDashboard />
          </div>
        ) : currentView === 'admin-dashboard' ? (
          <div className="pt-24 min-h-screen">
            <AdminDashboard />
          </div>
        ) : (
          /* Standard Clinic Home Page */
          <>
            <Hero />

            {/* Full-width Search Bar Section with Glowing Background */}
            <section className="relative -mt-10 sm:-mt-12 z-20 pb-12">
              <div className="max-w-7xl mx-auto px-4">
                <SearchBar />

                {/* Quick Suggestion Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                  <span className="font-bold text-[#111827]">
                    {language === 'bn' ? 'জনপ্রিয় সার্চ:' : 'Popular Searches:'}
                  </span>
                  {(language === 'bn'
                    ? [
                        'সুইস ডেন্টাল ইমপ্ল্যান্ট',
                        'ডাঃ মোঃ আব্দুল আলিম',
                        'টোকিও লেজার চিকিৎসা',
                        'ব্যথাহীন রুট ক্যানেল',
                        'ডাঃ কামরুন নাহার শান্তা',
                      ]
                    : [
                        'Swiss Dental Implants',
                        'Dr. Md. Abdul Alim',
                        'Tokyo Laser Bleaching',
                        'Pain-Free Root Canal',
                        'Dr. Kamrun Nahar Shanta',
                      ]
                  ).map((pill) => (
                    <span
                      key={pill}
                      className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#111827] font-semibold border border-slate-300 transition-colors shadow-sm"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <Consultants />
            <ServicesBento />
            <AssociateDentists />
            <SmileSlider />
            <SterilizationProtocol />
            <BookingAndContact />
          </>
        )}
      </ErrorBoundary>

      {/* Global 3-Tier Footer */}
      <Footer />

      {/* Global Modals & Interactive Overlays */}
      <CountrySelectorModal />
      <ServiceModal />
      <ThreeDotDrawer />
      <AuthModal />
      <FloatingWidgets />
    </main>
  );
}