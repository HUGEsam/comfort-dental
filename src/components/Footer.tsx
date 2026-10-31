'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
  Sparkles,
  Send,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { DentalTooth3D } from './ThreeVisuals';

export default function Footer() {
  const { language, scrollToBooking } = useApp();
  const t = translations[language];
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const specialists = [
    {
      name: 'Dr. Md. Abdul Alim',
      degree: 'BDS, PGT, MS (Oral Surgery)',
      role: 'Head of Oral & Maxillofacial Surgery',
      image: '/dr-alim.jpg',
      status: 'Accepting New Patients',
    },
    {
      name: 'Dr. Kamrun Nahar (Shanta)',
      degree: 'BDS, FCPS (Conservative & Endo)',
      role: 'Head of Conservative & Endodontics',
      image: '/dr-shanta.jpg',
      status: 'Accepting New Patients',
    },
  ];

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=BDDL+Basabo+Height+1+Central+Basabo+Dhaka';

  return (
    <footer className="bg-white text-[#374151] relative overflow-hidden pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* ========================================================================= */}
        {/* TIER 1 (TOP): Newsletter + Specialist Avatars with Active Status Badges */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Specialist Team Avatars */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-[#00A8E8]/30 text-xs font-bold text-[#00A8E8]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Premier Dental Faculty • Estd. 2004</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Direct Care by Associate Professors
              </h3>
              <p className="text-xs sm:text-sm text-[#374151] leading-relaxed max-w-lg">
                Both primary consultants serve as Department Heads at MH Samorita Medical College & Hospital Dental Unit,
                providing Tokyo-trained laser precision and Swiss-grade implant longevity.
              </p>

              {/* Specialists Avatars Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {specialists.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#00A8E8]/50 shadow-sm transition-all"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00A8E8] shrink-0">
                      <Image
                        src={spec.image}
                        alt={spec.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111827] leading-tight flex items-center gap-1.5">
                        <span>{spec.name}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-[#00A8E8] font-semibold">{spec.degree}</div>
                      <div className="text-[9px] text-emerald-700 font-medium">{spec.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Newsletter Subscription Input */}
            <div className="lg:col-span-6 lg:pl-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-base font-bold text-[#111827] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00A8E8]" />
                  <span>Exclusive Dental Wellness & Priority Check-in Bulletin</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Join 4,500+ patients in Dhaka receiving quarterly oral hygiene tips, implant maintenance guides, and VIP seasonal appointment vouchers.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email (e.g. name@gmail.com)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:border-[#00A8E8] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0088CC] via-[#00A8E8] to-[#0A2540] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {newsletterSubscribed && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thank you! You are now subscribed to Comfort Dental priority updates.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIER 2 (MIDDLE): Floating Dark Glass Card with 3D Three.js Wireframe & CTA */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#06121E] via-[#030712] to-[#0B1E33] border border-cyan-500/40 shadow-2xl p-6 sm:p-10">
          {/* Subtle neon glow circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left 3D Canvas Container */}
            <div className="lg:col-span-5 h-[280px] sm:h-[320px] relative rounded-2xl bg-slate-950/60 border border-slate-800/80 overflow-hidden flex items-center justify-center group">
              <DentalTooth3D
                className="w-full h-full"
                wireframeColor="#38BDF8"
                glowColor="#D4AF37"
              />
              <div className="absolute bottom-3 left-4 right-4 pointer-events-none flex items-center justify-between text-[11px] text-cyan-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Interactive 3D Implant Wireframe
                </span>
                <span className="text-[10px] text-amber-300 font-semibold">Hover to rotate</span>
              </div>
            </div>

            {/* Right Information & Instant Booking handoff */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Tokyo Laser & Swiss Implant Certified Centre</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Engineered for Pain-Free Masticatory & Aesthetic Perfection
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Whether you need immediate computer-guided dental implants, zero-blood Japanese laser gum depigmentation,
                or single-sitting rotary microscopic root canal therapy, experience world-standard dental surgery in Central Basabo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Class-B European Autoclave Sterility</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00A8E8] shrink-0" />
                  <span>Bio-Oss Guided Bone Regeneration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Ultra-Precision Rotary Apex Locators</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Emergency Tooth Extraction & Trauma Care</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToBooking()}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00A8E8] to-[#0A2540] hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all border border-cyan-400/40 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-cyan-200" />
                  <span>Reserve Priority Chamber Appointment</span>
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 font-bold text-xs sm:text-sm border border-cyan-500/30 flex items-center gap-2 transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>1-Tap Google Maps Route</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TIER 3 (BOTTOM): Full Contact Matrix, Exact Basabo Address & Map Deep Link */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-4">
          {/* Col 1: Clinic Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-[#00A8E8] via-[#D4AF37] to-[#0A2540] shadow-md">
                <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Comfort Dental Surgery Logo"
                    width={52}
                    height={52}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-[#111827] leading-tight">
                  Comfort Dental Surgery
                </h3>
                <p className="text-xs font-semibold text-[#00A8E8] uppercase tracking-wider">
                  & Implant Center • Estd. 2004
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed max-w-sm">
              &quot;Your Smile is Our Passion&quot; — Over two decades of specialized dental excellence, oral surgery, and painless endodontics in Dhaka.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.facebook.com/ComfortDentelSurgery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#00A8E8] hover:text-white transition-colors flex items-center justify-center text-[#0A2540] border border-slate-200"
                aria-label="Facebook Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://wa.me/8801778320966"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center text-white text-xs font-bold shadow-sm"
                aria-label="WhatsApp Helpline"
              >
                WA
              </a>

              <a
                href="mailto:dralim.comfort79@gmail.com"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#00A8E8] hover:text-white transition-colors flex items-center justify-center text-[#0A2540] border border-slate-200 text-xs"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Clinical Services Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Clinical Specializations
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#374151]">
              <li>
                <a href="#services" className="hover:text-[#00A8E8] transition-colors">
                  Advanced Dental Implants (Swiss/German)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A8E8] transition-colors">
                  Oral & Maxillofacial Surgery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A8E8] transition-colors">
                  Japanese Laser Dentistry (Tokyo)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A8E8] transition-colors">
                  Pain-Free Rotary Root Canal Treatment
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00A8E8] transition-colors">
                  Aesthetic Porcelain Veneers & Smile Design
                </a>
              </li>
              <li>
                <a href="#sterilization" className="hover:text-[#00A8E8] transition-colors">
                  Class-B Autoclave Sterilization Suite
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Exact Address with Google Maps Button */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Exact Chamber Location & Navigation
            </h4>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  <strong className="text-[#111827] block font-bold mb-0.5">
                    BDDL Basabo Height, 1 Central Basabo
                  </strong>
                  2nd Floor (East Side)
                  <br />
                  <span className="text-[#00A8E8] font-medium">
                    (West Side of Basabo General Hospital / Samsun Community Center)
                  </span>
                  <br />
                  Dhaka-1214, Bangladesh
                </div>
              </div>

              {/* 1-Tap Google Maps Button */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-110 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>1-Tap Google Maps Navigation & Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Direct Hotlines */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">DIRECT HOTLINE</span>
                <a href="tel:01778320966" className="font-bold text-emerald-700 hover:underline">
                  01778-320966
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">LANDLINE</span>
                <span className="font-semibold text-[#111827]">02 47291419</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">OFFICIAL EMAIL</span>
                <a href="mailto:dralim.comfort79@gmail.com" className="font-semibold text-[#00A8E8] hover:underline">
                  dralim.comfort79@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2004–2026 Comfort Dental Surgery & Implant Center. All BMDC Registrations Verified.</p>
          <div className="flex items-center gap-2 text-[#0A2540]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold">&quot;Your Smile is Our Passion&quot; • Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}