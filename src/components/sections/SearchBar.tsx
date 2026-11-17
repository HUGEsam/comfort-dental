'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import { useApp } from '@/context/AppContext';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveServiceModal, scrollToBooking, language } = useApp();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter services and doctors based on search
  const filteredServices = query.trim()
    ? servicesData.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase()) ||
          s.fullDescription.toLowerCase().includes(query.toLowerCase()) ||
          s.highlights.some((h) => h.toLowerCase().includes(query.toLowerCase())) ||
          (query.toLowerCase().includes('alim') && s.drAlim) ||
          (query.toLowerCase().includes('shanta') && s.drShanta)
      )
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectService = (serviceId: string) => {
    const s = servicesData.find((item) => item.id === serviceId);
    if (s) {
      setActiveServiceModal(s);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredServices.length > 0) {
      handleSelectService(filteredServices[0].id);
    } else if (query.toLowerCase().includes('consultant') || query.toLowerCase().includes('doctor')) {
      const el = document.getElementById('consultants');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else if (query.toLowerCase().includes('book') || query.toLowerCase().includes('appointment')) {
      scrollToBooking();
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
        {/* Full-width squircle pill search bar */}
        <div className="relative w-full flex items-center rounded-full bg-white/80 backdrop-blur-2xl saturate-180 border border-white/90 hover:border-[rgba(10,132,255,0.35)] focus-within:border-[#007AFF] focus-within:ring-4 focus-within:ring-[#007AFF]/15 shadow-[0_14px_34px_-6px_rgba(10,25,50,0.12)] transition-all duration-300 py-1.5 pl-5 pr-2">
          {/* Left magnifying glass icon */}
          <Search className="w-5 h-5 text-[#007AFF] shrink-0 mr-3" />

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={
              language === 'bn'
                ? 'ডেন্টাল ইমপ্ল্যান্ট, আক্কেল দাঁত সার্জারি, লেজার, রুট ক্যানেল, ডাঃ আলিম, ডাঃ শান্তা খুঁজুন...'
                : 'Search Dental Implants, Wisdom Teeth, Tokyo Laser, Root Canal, Dr. Alim, Dr. Shanta...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-[#0A0A0C] placeholder:text-slate-400 focus:outline-none"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              aria-label="Clear search"
              className="btn-liquid-icon w-7 h-7 text-slate-500 hover:text-[#0A0A0C] mr-2 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Water Drop Search button */}
          <button
            type="submit"
            className="btn-water-primary shrink-0 !px-5 sm:!px-7 !py-2.5 !text-xs sm:!text-sm !font-semibold text-white tracking-wide"
          >
            {language === 'bn' ? 'অনুসন্ধান' : 'Search'}
          </button>
        </div>
      </form>

      {/* Floating Live Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div data-lenis-prevent className="absolute left-4 right-4 top-full mt-2 rounded-[24px] squircle-card shadow-2xl overflow-hidden z-50 max-h-[60dvh] sm:max-h-96 overflow-y-auto overscroll-contain">
          <div className="p-3.5 bg-[var(--blue-ambient)] border-b border-[rgba(10,132,255,0.12)] flex items-center justify-between text-xs text-[#0A0A0C] font-semibold">
            <span>Matching Procedures & Consultations ({filteredServices.length})</span>
            <span className="text-[#0071E3] font-mono text-[11px]">Tap to view briefing</span>
          </div>

          {filteredServices.length > 0 ? (
            <div className="p-2 divide-y divide-[rgba(10,132,255,0.08)]">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className="w-full flex items-center justify-between p-3.5 rounded-[16px] hover:bg-[var(--blue-ambient)]/60 transition-colors text-left group"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#0A0A0C] group-hover:text-[#0071E3] transition-colors">
                        {service.title}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-[12px] bg-[#E0F2FE] text-[#0071E3] border border-[rgba(10,132,255,0.18)] font-semibold">
                        {service.category}
                      </span>
                    </div>
                    <p className="text-xs text-[rgba(10,10,12,0.6)] line-clamp-1 mt-1">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#0071E3] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    <span className="font-semibold">View</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[rgba(10,10,12,0.6)]">
              No exact match for &quot;{query}&quot;. Try searching for &quot;Implants&quot;, &quot;Laser&quot;, &quot;RCT&quot;, or &quot;Wisdom Tooth&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
