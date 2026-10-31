'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { motion } from 'framer-motion';
import {
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { sanitizeText, validatePhone, validateEmail } from '@/utils/security';

export default function BookingAndContact() {
  const { language, selectedDoctor } = useApp();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: '',
    service: '',
    date: '',
    timeSlot: '',
    notes: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const lastSubmitTimeRef = useRef<number>(0);

  // Sync selected doctor from context (e.g. when clicking "Book Dr. Alim")
  useEffect(() => {
    if (selectedDoctor) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({ ...prev, doctor: selectedDoctor }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedDoctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Throttling: prevent rapid duplicate submissions
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 3000) {
      return;
    }
    lastSubmitTimeRef.current = now;

    // Validation
    const cleanName = sanitizeText(formData.name);
    const cleanPhone = sanitizeText(formData.phone);
    const cleanEmail = sanitizeText(formData.email);
    const cleanNotes = sanitizeText(formData.notes);

    if (!cleanName.trim()) {
      setFormError(language === 'bn' ? 'অনুগ্রহ করে রোগীর নাম প্রদান করুন' : 'Please provide patient name');
      return;
    }

    if (!validatePhone(cleanPhone)) {
      setFormError(
        language === 'bn'
          ? 'সঠিক মোবাইল নম্বর প্রদান করুন (১১ ডিজিট, যেমন 01712-106499)'
          : 'Please enter a valid mobile number (e.g. 01778-320966)'
      );
      return;
    }

    if (cleanEmail && !validateEmail(cleanEmail)) {
      setFormError(
        language === 'bn'
          ? 'সঠিক ইমেইল ঠিকানা প্রদান করুন'
          : 'Please enter a valid email address'
      );
      return;
    }

    setIsSubmitting(true);

    // 1. Prepare WhatsApp message
    const waText = encodeURIComponent(
      `*New VIP Appointment Booking - Comfort Dental Surgery*\n\n` +
      `👤 *Patient Name:* ${cleanName}\n` +
      `📞 *Phone:* ${cleanPhone}\n` +
      `📧 *Email:* ${cleanEmail || 'N/A'}\n` +
      `👨‍⚕️ *Doctor:* ${formData.doctor || 'Any Consultant'}\n` +
      `🦷 *Service:* ${formData.service || 'General Consultation'}\n` +
      `📅 *Date:* ${formData.date || 'Earliest Available'}\n` +
      `⏰ *Shift:* ${formData.timeSlot || 'Any Time'}\n` +
      `📝 *Notes:* ${cleanNotes || 'None'}\n\n` +
      `Please confirm chamber availability.`
    );

    const waUrl = `https://wa.me/8801778320966?text=${waText}`;

    // 2. Send email via Web3Forms API
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE',
          from_name: 'Comfort Dental Surgery Web Portal',
          subject: `New VIP Appointment: ${cleanName} (${cleanPhone})`,
          to_email: 'dralim.comfort79@gmail.com',
          patient_name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          consulting_doctor: formData.doctor,
          treatment_service: formData.service,
          preferred_date: formData.date,
          shift: formData.timeSlot,
          symptoms_notes: cleanNotes,
        }),
      });
    } catch {
      // background dispatch notice
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // 3. Open WhatsApp in new tab for instant real-time confirmation with the coordinator
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="appointment" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* Section Header with Ultra-Crisp Heading (Prompt 6 Spec) */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs sm:text-sm font-semibold text-sky-300 mb-4 shadow-sm">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>{t.booking.badge}</span>
          </div>

          {/* Heading with light blue to white text gradient */}
          <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-sky-400 via-sky-200 to-white bg-clip-text text-transparent drop-shadow-sm">
            {t.booking.title}
          </h2>

          {/* Dual-tone accent bar centered directly beneath headline */}
          <div className="h-1 w-20 bg-gradient-to-r from-sky-400 to-amber-400 rounded-full mx-auto my-3" />

          {/* Subtitle refinement */}
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ========================================================= */}
          {/* VIP Booking Form */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-start gap-3 text-emerald-200 text-sm shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{t.booking.form.successMsg}</div>
                  <div className="text-xs text-emerald-300/80 mt-1">
                    Coordinator Hotline: 01778-320966
                  </div>
                </div>
              </motion.div>
            )}

            {formError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/30 flex items-center gap-3 text-rose-200 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  {t.booking.form.nameLabel} <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.booking.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
                />
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {t.booking.form.phoneLabel} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.booking.form.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {t.booking.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.booking.form.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Service & Shift Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {t.booking.form.serviceLabel}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  >
                    <option value="" className="bg-slate-900">Select Treatment...</option>
                    <option value="Dental Implants" className="bg-slate-900">{t.booking.form.serviceOption1}</option>
                    <option value="Maxillofacial Surgery" className="bg-slate-900">{t.booking.form.serviceOption2}</option>
                    <option value="Japanese Laser Therapy" className="bg-slate-900">{t.booking.form.serviceOption3}</option>
                    <option value="Root Canal Treatment" className="bg-slate-900">{t.booking.form.serviceOption4}</option>
                    <option value="Cosmetic Smile Makeover" className="bg-slate-900">{t.booking.form.serviceOption5}</option>
                    <option value="Orthodontics / Aligners" className="bg-slate-900">{t.booking.form.serviceOption6}</option>
                    <option value="General Dental Care" className="bg-slate-900">{t.booking.form.serviceOption7}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    {t.booking.form.timeLabel}
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  >
                    <option value="" className="bg-slate-900">Select Shift...</option>
                    <option value="Morning: 9:00 AM - 1:00 PM" className="bg-slate-900">{t.booking.form.timeOption1}</option>
                    <option value="Evening: 4:00 PM - 11:30 PM" className="bg-slate-900">{t.booking.form.timeOption2}</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  {t.booking.form.dateLabel}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                />
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  {t.booking.form.notesLabel}
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t.booking.form.notesPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button with Loading State */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-lg hover:shadow-sky-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.booking.form.submitting}</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 text-sky-200" />
                      <span>{t.booking.form.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================= */}
          {/* Direct Chamber Information & Map */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-500/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-400" />
                <span>{t.booking.directContact.title}</span>
              </h3>

              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-sky-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {t.booking.directContact.addressTitle}
                    </div>
                    <div className="font-semibold text-white mt-1">
                      {t.booking.directContact.addressLine1}
                    </div>
                    <div className="text-slate-300">
                      {t.booking.directContact.addressLine2}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {t.booking.directContact.addressLine3}
                    </div>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {t.booking.directContact.phoneTitle}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      <a
                        href="tel:0247291419"
                        className="block font-semibold hover:text-sky-300 transition-colors"
                      >
                        Landline: {t.booking.directContact.phoneLandline}
                      </a>
                      <a
                        href="tel:01778320966"
                        className="block font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        WhatsApp / Mobile: 01778-320966
                      </a>
                      <div className="text-xs text-slate-400">
                        {t.booking.directContact.ownerMobile}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {t.booking.directContact.emailTitle}
                    </div>
                    <a
                      href="mailto:dralim.comfort79@gmail.com"
                      className="block font-semibold text-white hover:text-sky-300 transition-colors mt-1"
                    >
                      {t.booking.directContact.email}
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-sky-400">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {t.booking.directContact.facebookTitle}
                    </div>
                    <a
                      href={t.booking.directContact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold text-sky-200 hover:text-white transition-colors mt-1 text-xs sm:text-sm underline"
                    >
                      {t.booking.directContact.facebookLabel}
                    </a>
                  </div>
                </div>

                {/* Chamber Hours */}
                <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      {t.booking.directContact.hoursTitle}
                    </div>
                    <div className="text-xs text-slate-200 mt-1">
                      {t.booking.directContact.morningShift}
                    </div>
                    <div className="text-xs text-slate-200">
                      {t.booking.directContact.eveningShift}
                    </div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-1">
                      {t.booking.directContact.fridayNote}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl h-64 relative bg-slate-900">
              <iframe
                title="Comfort Dental Surgery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.4285741634796!2d90.4300!3d23.7380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85a3c000001%3A0x1!2sBasabo%2C%20Dhaka%201214!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
