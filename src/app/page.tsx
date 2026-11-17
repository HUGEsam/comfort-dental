'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import SearchBar from '@/components/sections/SearchBar';
import Consultants from '@/components/sections/Consultants';
import ServicesBento from '@/components/sections/ServicesBento';
import AssociateDentists from '@/components/sections/AssociateDentists';
import SmileSlider from '@/components/sections/SmileSlider';
import SterilizationProtocol from '@/components/sections/SterilizationProtocol';
import SocialsDigitalHub from '@/components/sections/SocialsDigitalHub';
import BookingAndContact from '@/components/sections/BookingAndContact';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';

// Interactive Overlays & Modals
import CountrySelectorModal from '@/components/modals/CountrySelectorModal';
import ServiceModal from '@/components/modals/ServiceModal';
import ThreeDotDrawer from '@/components/modals/ThreeDotDrawer';
import AuthModal from '@/components/modals/AuthModal';

// Role Dashboards
import CustomerPortal from '@/components/portals/CustomerPortal';
import ModeratorDashboard from '@/components/portals/ModeratorDashboard';
import AdminDashboard from '@/components/portals/AdminDashboard';

import { useApp } from '@/context/AppContext';
import { servicesData } from '@/data/servicesData';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function Home() {
  const { currentView, processReferralClick, language, setActiveServiceModal } = useApp();
  const [referralNotification, setReferralNotification] = useState<string | null>(null);

  const popularPills = language === 'bn'
    ? [
        { label: 'সুইস ডেন্টাল ইমপ্ল্যান্ট', serviceId: 'implants' },
        { label: 'ডাঃ মোঃ আব্দুল আলিম', scrollId: 'consultants' },
        { label: 'টোকিও লেজার চিকিৎসা', serviceId: 'laser' },
        { label: 'ব্যথাহীন রুট ক্যানেল', serviceId: 'endodontics' },
        { label: 'ডাঃ কামরুন নাহার শান্তা', scrollId: 'consultants' },
      ]
    : [
        { label: 'Swiss Dental Implants', serviceId: 'implants' },
        { label: 'Dr. Md. Abdul Alim', scrollId: 'consultants' },
        { label: 'Tokyo Laser Bleaching', serviceId: 'laser' },
        { label: 'Pain-Free Root Canal', serviceId: 'endodontics' },
        { label: 'Dr. Kamrun Nahar Shanta', scrollId: 'consultants' },
      ];

  const handlePopularPillClick = (item: { serviceId?: string; scrollId?: string }) => {
    if (item.serviceId) {
      const found = servicesData.find((s) => s.id === item.serviceId);
      if (found) setActiveServiceModal(found);
    } else if (item.scrollId) {
      const el = document.getElementById(item.scrollId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <main className="min-h-screen flex flex-col selection:bg-[#007AFF] selection:text-white relative bg-[#F9FAFC] transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Referral Link Verification Alert Banner (Apple Liquid Glass) */}
      <AnimatePresence>
        {referralNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4"
          >
            <div className="p-4 rounded-[22px] bg-white/88 backdrop-blur-2xl border border-[rgba(10,132,255,0.22)] text-[#0A0A0C] shadow-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#007AFF] shrink-0" />
              <div className="text-xs sm:text-sm font-semibold">{referralNotification}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conditional View Rendering based on currentView */}
      <ErrorBoundary>
        {currentView === 'customer-portal' ? (
          <div className="min-h-screen">
            <CustomerPortal />
          </div>
        ) : currentView === 'moderator-dashboard' ? (
          <div className="min-h-screen">
            <ModeratorDashboard />
          </div>
        ) : currentView === 'admin-dashboard' ? (
          <div className="min-h-screen">
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

                {/* Interactive Liquid Glass Suggestion Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                  <span className="font-semibold text-[rgba(10,10,12,0.55)] mr-1">
                    {language === 'bn' ? 'জনপ্রিয় সার্চ:' : 'Popular Searches:'}
                  </span>
                  {popularPills.map((pill) => (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => handlePopularPillClick(pill)}
                      className="btn-liquid-chip"
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <Consultants />
            <ServicesBento />
            <AssociateDentists />
            <SmileSlider />
            <SterilizationProtocol />
            <SocialsDigitalHub />
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