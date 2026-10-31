'use client';

import React, { useState } from 'react';
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
  const handleClose = onClose || (() => setIsCountryModalOpen(false));

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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#091122] border border-cyan-500/30 text-white shadow-2xl p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Select Country & Language</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative my-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country or native language..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Country List */}
          <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-800/40">
            {filteredCountries.map((c) => {
              const isSelected = selectedCountry.code === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => handleSelect(c)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                    isSelected
                      ? 'bg-[#00A8E8]/20 border border-cyan-400/40 text-cyan-300'
                      : 'hover:bg-slate-800/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                          {c.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{c.nativeName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">{c.currency}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-400 text-center">
            Default country is Bangladesh (BD 🇧🇩). International consultations supported via WhatsApp & Zoom.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
