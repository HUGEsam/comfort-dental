'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, ChevronRight, X, ArrowUpRight } from 'lucide-react';
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
        {/* Full-width dark pill-shaped search bar with glowing border */}
        <div className="relative w-full flex items-center rounded-full bg-[#030712]/90 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/30 shadow-2xl transition-all duration-300 py-1.5 pl-5 pr-2">
          {/* Left magnifying glass icon */}
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />

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
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="p-1 rounded-full text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* High-contrast white rounded Search button */}
          <button
            type="submit"
            className="shrink-0 px-5 sm:px-7 py-2.5 rounded-full bg-white text-[#0A2540] hover:bg-slate-100 font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-cyan-500/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {language === 'bn' ? 'অনুসন্ধান' : 'Search'}
          </button>
        </div>
      </form>

      {/* Floating Live Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl bg-[#091122]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Matching Procedures & Consultations ({filteredServices.length})</span>
            <span className="text-cyan-400 font-mono text-[11px]">Click to view dual-doctor briefing</span>
          </div>

          {filteredServices.length > 0 ? (
            <div className="p-2 divide-y divide-slate-800/60">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {service.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {service.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Briefing</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No exact match for &quot;{query}&quot;. Try searching for &quot;Implants&quot;, &quot;Laser&quot;, &quot;RCT&quot;, or &quot;Wisdom Tooth&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
