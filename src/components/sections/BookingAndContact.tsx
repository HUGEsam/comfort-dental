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
  const { language, selectedDoctor, selectedService, addInquiry } = useApp();
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
  const [lastWaUrl, setLastWaUrl] = useState<string | null>(null);
  const lastSubmitTimeRef = useRef<number>(0);

  // Sync selected doctor and service from context
  useEffect(() => {
    if (selectedDoctor || selectedService) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          doctor: selectedDoctor || prev.doctor,
          service: selectedService || prev.service,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedDoctor, selectedService]);

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
    setLastWaUrl(waUrl);

    // Synchronous user-gesture open before async calls so mobile Safari/Chrome won't block it
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // 2. Send email via Web3Forms API (only when public access key is configured)
    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3formsKey) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsKey,
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
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Record inside local clinical queue for instant moderator/portal visibility
    addInquiry({
      patientName: cleanName,
      phone: cleanPhone,
      email: cleanEmail || 'N/A',
      service: formData.service || 'General Dental Consultation',
      preferredDoctor: formData.doctor || 'Any Senior Consultant',
      status: 'pending',
      notes: cleanNotes || `Requested Date: ${formData.date || 'Earliest'} (${formData.timeSlot || 'Any shift'})`,
    });
  };

  return (
    <section id="appointment" className="scroll-mt-28 py-24 lg:py-36 bg-[#F9FAFC] text-[#0A0A0C] relative overflow-hidden">
      {/* Ambient soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--blue-tint)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] text-xs sm:text-sm font-semibold text-[var(--blue-action)] mb-5 shadow-xs">
            <Calendar className="w-4 h-4 text-[var(--blue-action)]" />
            <span>{t.booking.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0A0C] tracking-tight">
            {t.booking.title}
          </h2>

          <div className="h-1.5 w-20 bg-gradient-to-r from-[#0A84FF] to-[#0071E3] mx-auto rounded-full my-5" />

          <p className="text-base sm:text-lg text-[rgba(10,10,12,0.68)] leading-relaxed max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* VIP Booking Form */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 rounded-[32px] squircle-card p-6 sm:p-10 shadow-xl">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-[20px] bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-900 text-sm shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{t.booking.form.successMsg}</div>
                    <div className="text-xs text-emerald-700 mt-1">
                      Coordinator Hotline: 01778-320966
                    </div>
                  </div>
                </div>
                {lastWaUrl && (
                  <a
                    href={lastWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-emerald px-4 py-2 text-xs font-bold whitespace-nowrap self-start sm:self-center"
                  >
                    Open WhatsApp Confirmation
                  </a>
                )}
              </motion.div>
            )}

            {formError && (
              <div className="mb-6 p-4 rounded-[20px] bg-rose-50 border border-rose-300 flex items-center gap-3 text-rose-900 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                  {t.booking.form.nameLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.booking.form.namePlaceholder}
                  className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                />
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                    {t.booking.form.phoneLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.booking.form.phonePlaceholder}
                    className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                    {t.booking.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.booking.form.emailPlaceholder}
                    className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C] placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Service & Shift Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                    {t.booking.form.serviceLabel}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C]"
                  >
                    <option value="">Select Treatment...</option>
                    <option value="Swiss Dental Implants">{t.booking.form.serviceOption1}</option>
                    <option value="Advanced Dental Implants">Advanced Dental Implants</option>
                    <option value="Oral & Maxillofacial Surgery">{t.booking.form.serviceOption2}</option>
                    <option value="Japanese Laser Dentistry">{t.booking.form.serviceOption3}</option>
                    <option value="Pain-Free Root Canal Treatment">{t.booking.form.serviceOption4}</option>
                    <option value="Porcelain Veneers & Smile Design">{t.booking.form.serviceOption5}</option>
                    <option value="Clear Aligners & Orthodontics">{t.booking.form.serviceOption6}</option>
                    <option value="Dental Crowns & Bridges">Dental Crowns & Bridges</option>
                    <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    <option value="General Dental Care">{t.booking.form.serviceOption7}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                    {t.booking.form.timeLabel}
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C]"
                  >
                    <option value="">Select Shift...</option>
                    <option value="Morning: 9:00 AM - 1:00 PM">{t.booking.form.timeOption1}</option>
                    <option value="Evening: 4:00 PM - 11:30 PM">{t.booking.form.timeOption2}</option>
                  </select>
                </div>
              </div>

              {/* Preferred Doctor & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                    {language === 'bn' ? 'পছন্দের বিশেষজ্ঞ চিকিৎসক' : 'Preferred Consultant / Doctor'}
                  </label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C]"
                  >
                    <option value="">{language === 'bn' ? 'যেকোনো সিনিয়র কনসালটেন্ট' : 'Any Senior Consultant'}</option>
                    <option value="Assoc. Prof. Dr. Md. Abdul Alim">Assoc. Prof. Dr. Md. Abdul Alim</option>
                    <option value="Assoc. Prof. Dr. Kamrun Nahar (Shanta)">Assoc. Prof. Dr. Kamrun Nahar (Shanta)</option>
                    {t.associates.doctors.map((doc, idx) => (
                      <option key={idx} value={doc.name}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                    {t.booking.form.dateLabel}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C]"
                  />
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0C] uppercase tracking-wider mb-2">
                  {t.booking.form.notesLabel}
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t.booking.form.notesPlaceholder}
                  className="squircle-input w-full px-4 py-3.5 text-sm text-[#0A0A0C] placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Submit Button with Loading State */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-water-primary w-full !py-4 !text-base !font-semibold flex items-center justify-center gap-2 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.booking.form.submitting}</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span>{t.booking.form.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* ========================================================= */}
          {/* Direct Chamber Information & Map (#contact target) */}
          {/* ========================================================= */}
          <div id="contact" className="scroll-mt-32 lg:col-span-5 space-y-6">
            <div className="rounded-[32px] squircle-card p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-[#0A0A0C] mb-6 flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#0071E3]" />
                <span>{t.booking.directContact.title}</span>
              </h3>

              <div className="space-y-6 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] flex items-center justify-center shrink-0 text-[#0071E3]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0071E3]">
                      {t.booking.directContact.addressTitle}
                    </div>
                    <div className="font-semibold text-[#0A0A0C] mt-1">
                      {t.booking.directContact.addressLine1}
                    </div>
                    <div className="text-[rgba(10,10,12,0.7)] text-xs mt-0.5">
                      {t.booking.directContact.addressLine2}
                    </div>
                    <div className="text-[rgba(10,10,12,0.5)] text-xs">
                      {t.booking.directContact.addressLine3}
                    </div>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[12px] bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0071E3]">
                      {t.booking.directContact.phoneTitle}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      <a
                        href="tel:0247291419"
                        className="block font-semibold text-[#0A0A0C] hover:text-[#0071E3] transition-colors"
                      >
                        Landline: {t.booking.directContact.phoneLandline}
                      </a>
                      <a
                        href="tel:01778320966"
                        className="block font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        WhatsApp / Mobile: 01778-320966
                      </a>
                      <div className="text-xs text-[rgba(10,10,12,0.5)]">
                        {t.booking.directContact.ownerMobile}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[12px] bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0071E3]">
                      {t.booking.directContact.emailTitle}
                    </div>
                    <a
                      href="mailto:dralim.comfort79@gmail.com"
                      className="block font-semibold text-[#0A0A0C] hover:text-[#0071E3] transition-colors mt-1"
                    >
                      {t.booking.directContact.email}
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-[12px] bg-[var(--blue-ambient)] border border-[rgba(10,132,255,0.18)] flex items-center justify-center shrink-0 text-[#0071E3]">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0071E3]">
                      {t.booking.directContact.facebookTitle}
                    </div>
                    <a
                      href={t.booking.directContact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold text-[#0071E3] hover:underline transition-colors mt-1 text-xs sm:text-sm"
                    >
                      {t.booking.directContact.facebookLabel}
                    </a>
                  </div>
                </div>

                {/* Chamber Hours */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-[rgba(10,132,255,0.12)]">
                  <div className="w-10 h-10 rounded-[12px] bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0071E3]">
                      {t.booking.directContact.hoursTitle}
                    </div>
                    <div className="text-xs text-[rgba(10,10,12,0.8)] mt-1">
                      {t.booking.directContact.morningShift}
                    </div>
                    <div className="text-xs text-[rgba(10,10,12,0.8)]">
                      {t.booking.directContact.eveningShift}
                    </div>
                    <div className="text-[11px] text-amber-600 font-semibold mt-1">
                      {t.booking.directContact.fridayNote}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-[32px] overflow-hidden border border-[rgba(10,132,255,0.18)] shadow-xl h-64 relative bg-slate-100">
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
