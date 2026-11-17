'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceDetail } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Bot,
} from 'lucide-react';

interface ServiceModalProps {
  service?: ServiceDetail | null;
  onClose?: () => void;
}

// AI Typewriter Streaming Hook
function useTypewriter(text: string, speed = 18, delay = 300) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      setDisplayedText('');
      setIsTyping(true);
      let currentIndex = 0;
      interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return { displayedText, isTyping };
}

// Doctor Video Module Component (Apple Frosted Glass Card + Water-Drop Video Controls)
function DoctorVideoModule({
  doctorName,
  doctorRole,
  videoUrl,
  videoThumbnail,
  aiStreamingText,
  onBook,
}: {
  doctorName: string;
  doctorRole: string;
  videoUrl: string;
  videoThumbnail: string;
  aiStreamingText: string;
  onBook: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { displayedText, isTyping } = useTypewriter(aiStreamingText, 14, 400);

  return (
    <div className="flex flex-col bg-white/80 backdrop-blur-xl rounded-[24px] border border-white/90 p-5 shadow-[0_12px_32px_-8px_rgba(10,37,64,0.10)] relative overflow-hidden group hover:border-[rgba(10,132,255,0.28)] transition-all">
      {/* Modernized Doctor Header Block */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#007AFF]/25 shrink-0 shadow-sm bg-white">
          <Image src={videoThumbnail} alt={doctorName} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-base font-bold text-[#0A0A0C] tracking-tight leading-snug">{doctorName}</h4>
          <span className="text-xs text-[#007AFF] font-semibold block mt-0.5">{doctorRole}</span>
        </div>
      </div>

      {/* Video Preview Card */}
      <div className="relative rounded-[20px] overflow-hidden aspect-video bg-slate-900 ring-1 ring-black/10 mb-4 group/video shadow-inner">
        <video
          src={videoUrl}
          poster={videoThumbnail}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          ref={(videoElement) => {
            if (videoElement) {
              if (isPlaying) {
                videoElement.play().catch(() => {});
              } else {
                videoElement.pause();
              }
            }
          }}
        />

        {/* Embedded Transparent Water-Drop Play Overlay Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 flex items-center justify-center opacity-95 group-hover/video:opacity-100 transition-opacity">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-liquid-icon w-14 h-14 text-white !bg-white/25 hover:!bg-white/40 !border-white/75"
            aria-label={isPlaying ? 'Pause explanation' : 'Play explanation'}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
          </button>
        </div>

        {/* Translucent Water-Drop Sound Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="btn-liquid-icon w-8 h-8 !bg-white/25 !border-white/60 text-white absolute bottom-3 right-3"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Sharp Clinical Briefing Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-bold text-[#059669] border border-white/90 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Clinical Briefing</span>
        </div>
      </div>

      {/* AI Streaming Medical Commentary (iOS Inset Bubble) */}
      <div className="flex-1 bg-[#F2F2F7]/85 rounded-[18px] p-4 border border-white/90 mb-4 relative flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#8E8E93] mb-2">
            <span className="flex items-center gap-1.5 text-[#007AFF]">
              <Bot className="w-3.5 h-3.5 text-[#007AFF]" />
              Doctor Medical Insights
            </span>
            {isTyping && (
              <span className="text-[10px] text-amber-600 font-mono animate-pulse">
                Streaming...
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#1C1C1E] leading-relaxed italic font-normal">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-3.5 bg-[#007AFF] ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>

      {/* Water-Drop Book Doctor CTA */}
      <button
        onClick={onBook}
        className="btn-water-primary w-full !py-3.5 !text-xs sm:!text-sm !font-semibold text-white"
      >
        <Calendar className="w-4 h-4 text-white" />
        <span>Book Consultation with {doctorName.split(' ')[2] || doctorName}</span>
      </button>
    </div>
  );
}

export default function ServiceModal({ service, onClose }: ServiceModalProps = {}) {
  const { scrollToBooking, activeServiceModal, setActiveServiceModal } = useApp();

  const currentService = service !== undefined ? service : activeServiceModal;
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else setActiveServiceModal(null);
  }, [onClose, setActiveServiceModal]);

  // Keyboard Escape listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (currentService) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentService, handleClose]);

  if (!currentService) return null;

  const handleBookDoctor = (docName: string) => {
    const serviceTitle = currentService.title;
    handleClose();
    scrollToBooking(docName, serviceTitle);
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-950/45 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={currentService.title}
      >
        {/* Apple Spatial Liquid Glass Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-5xl rounded-[32px] bg-white/88 backdrop-blur-3xl saturate-180 border border-white/90 text-[#0A0A0C] shadow-[0_32px_80px_-16px_rgba(10,37,64,0.28)] overflow-hidden my-6"
        >
          {/* Ambient sky radial glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[240px] bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

          {/* Translucent Close Water-Drop Button */}
          <button
            onClick={handleClose}
            aria-label="Close procedure details"
            className="btn-liquid-icon w-10 h-10 text-[#3C3C43] hover:text-[#0A0A0C] absolute top-5 right-5 z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            data-lenis-prevent
            className="p-5 sm:p-8 md:p-10 max-h-[88dvh] overflow-y-auto overscroll-contain relative z-10"
          >
            {/* Header */}
            <div className="max-w-3xl mb-8 space-y-2 pr-10">
              <span className="btn-liquid-chip !py-1 !px-3.5 text-[#007AFF] !text-xs">
                {currentService.category}
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A0A0C]">
                {currentService.title}
              </h2>

              <p className="text-sm md:text-base text-[#007AFF] font-semibold">
                {currentService.subtitle}
              </p>

              <p className="text-[rgba(10,10,12,0.72)] text-sm leading-relaxed pt-2">
                {currentService.fullDescription}
              </p>
            </div>

            {/* Clinical Spec Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-7">
              <div className="rounded-[20px] bg-white/75 backdrop-blur-md border border-[rgba(10,132,255,0.16)] p-4 shadow-xs hover:border-[#007AFF]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Procedure Duration</span>
                </div>
                <div className="text-xs font-bold text-[#0A0A0C]">{currentService.duration}</div>
              </div>

              <div className="rounded-[20px] bg-white/75 backdrop-blur-md border border-[rgba(10,132,255,0.16)] p-4 shadow-xs hover:border-[#007AFF]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] font-medium mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Anesthesia Protocol</span>
                </div>
                <div className="text-xs font-bold text-[#0A0A0C]">{currentService.anesthesia}</div>
              </div>

              <div className="rounded-[20px] bg-white/75 backdrop-blur-md border border-[rgba(10,132,255,0.16)] p-4 shadow-xs hover:border-[#007AFF]/40 transition-colors sm:col-span-2">
                <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Clinical Standard</span>
                </div>
                <div className="text-xs font-bold text-[#0A0A0C]">European Class-B Autoclave Sterilized</div>
              </div>
            </div>

            {/* Clinical Highlights Checklist */}
            <div className="p-5 rounded-[24px] bg-[#F0F6FE]/75 border border-[rgba(10,132,255,0.16)] mb-8">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF] mb-3">
                Key Clinical Advantages & Technology
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentService.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0A0C]">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual Specialist Section */}
            <div className="mb-4">
              <h3 className="text-lg font-extrabold text-[#0A0A0C] flex items-center gap-2 tracking-tight">
                <Sparkles className="w-4 h-4 text-[#007AFF]" />
                Dual Specialist Explanations & Streaming Insights
              </h3>
              <p className="text-xs text-[#8E8E93] mt-0.5">
                Watch short briefings and read real-time clinical commentary from our Department Heads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoctorVideoModule
                doctorName={currentService.drAlim.doctorName}
                doctorRole={currentService.drAlim.doctorRole}
                videoUrl={currentService.drAlim.videoUrl}
                videoThumbnail={currentService.drAlim.videoThumbnail}
                aiStreamingText={currentService.drAlim.aiStreamingText}
                onBook={() => handleBookDoctor(currentService.drAlim.doctorName)}
              />

              <DoctorVideoModule
                doctorName={currentService.drShanta.doctorName}
                doctorRole={currentService.drShanta.doctorRole}
                videoUrl={currentService.drShanta.videoUrl}
                videoThumbnail={currentService.drShanta.videoThumbnail}
                aiStreamingText={currentService.drShanta.aiStreamingText}
                onBook={() => handleBookDoctor(currentService.drShanta.doctorName)}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
