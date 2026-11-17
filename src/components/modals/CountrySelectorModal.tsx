'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, Globe } from 'lucide-react';
import { CountryInfo } from '@/types';
import { useApp } from '@/context/AppContext';

export const countryList: CountryInfo[] = [
  { code: 'BD', name: 'Bangladesh', nativeName: 'বাংলাদেশ (বাংলা)', flag: '🇧🇩', phoneCode: '+880', currency: 'BDT (৳)' },
  { code: 'AU', name: 'Australia', nativeName: 'Australia (English)', flag: '🇦🇺', phoneCode: '+61', currency: 'AUD ($)' },
  { code: 'US', name: 'United States', nativeName: 'United States (English)', flag: '🇺🇸', phoneCode: '+1', currency: 'USD ($)' },
  { code: 'GB', name: 'United Kingdom', nativeName: 'United Kingdom (English)', flag: '🇬🇧', phoneCode: '+44', currency: 'GBP (£)' },
  { code: 'JP', name: 'Japan', nativeName: '日本 (日本語)', flag: '🇯🇵', phoneCode: '+81', currency: 'JPY (¥)' },
  { code: 'AE', name: 'United Arab Emirates', nativeName: 'الإمارات العربية المتحدة (العربية)', flag: '🇦🇪', phoneCode: '+971', currency: 'AED' },
  { code: 'MY', name: 'Malaysia', nativeName: 'Malaysia (Bahasa Melayu)', flag: '🇲🇾', phoneCode: '+60', currency: 'MYR (RM)' },
  { code: 'IN', name: 'India', nativeName: 'भारत (हिन्दी / English)', flag: '🇮🇳', phoneCode: '+91', currency: 'INR (₹)' },
  { code: 'CA', name: 'Canada', nativeName: 'Canada (English / Français)', flag: '🇨🇦', phoneCode: '+1', currency: 'CAD ($)' },
  { code: 'SA', name: 'Saudi Arabia', nativeName: 'المملكة العربية السعودية (العربية)', flag: '🇸🇦', phoneCode: '+966', currency: 'SAR' },
  { code: 'SG', name: 'Singapore', nativeName: 'Singapore (English)', flag: '🇸🇬', phoneCode: '+65', currency: 'SGD ($)' },
  { code: 'DE', name: 'Germany', nativeName: 'Deutschland (Deutsch)', flag: '🇩🇪', phoneCode: '+49', currency: 'EUR (€)' },
];

interface CountrySelectorModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CountrySelectorModal({ isOpen, onClose }: CountrySelectorModalProps = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedCountry, setSelectedCountry, setLanguage, isCountryModalOpen, setIsCountryModalOpen } = useApp();

  const showModal = isOpen !== undefined ? isOpen : isCountryModalOpen;
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else setIsCountryModalOpen(false);
  }, [onClose, setIsCountryModalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (showModal) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal, handleClose]);

  if (!showModal) return null;

  const filteredCountries = countryList.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (c: CountryInfo) => {
    setSelectedCountry(c);
    if (c.code === 'BD') {
      setLanguage('bn');
    } else {
      setLanguage('en');
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/45 backdrop-blur-lg flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Select Country and Language"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg rounded-[32px] bg-white/88 backdrop-blur-3xl saturate-180 border border-white/90 text-[#0A0A0C] shadow-[0_30px_70px_-15px_rgba(10,37,64,0.28)] p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[9px] bg-gradient-to-b from-[#30B0C7] to-[#007AFF] text-white flex items-center justify-center shadow-xs">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#0A0A0C]">Select Country & Language</h3>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close selector"
              className="btn-liquid-icon w-8 h-8 text-[#3C3C43]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative my-4">
            <Search className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country or native language..."
              className="squircle-input w-full pl-10 pr-4 py-2.5 text-sm text-[#0A0A0C]"
            />
          </div>

          {/* Country List in iOS Inset Group */}
          <div className="max-h-72 overflow-y-auto ios-settings-group divide-y divide-slate-200/60">
            {filteredCountries.map((c) => {
              const isSelected = selectedCountry.code === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => handleSelect(c)}
                  className={`w-full flex items-center justify-between p-3.5 transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#E8F2FF]/80 text-[#007AFF] font-bold'
                      : 'hover:bg-white text-[#0A0A0C]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="btn-liquid-chip !py-0.5 !px-2 !text-[10px] font-mono text-[#007AFF]">
                          {c.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8E8E93] mt-0.5">{c.nativeName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#8E8E93]">{c.currency}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#007AFF] text-white flex items-center justify-center shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-3 text-[11px] text-[#8E8E93] text-center font-medium">
            Default country is Bangladesh (BD 🇧🇩). International consultations supported via WhatsApp & Zoom.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
