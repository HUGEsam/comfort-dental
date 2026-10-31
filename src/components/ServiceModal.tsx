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

// Doctor Video Module Component
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
  accentColor?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { displayedText, isTyping } = useTypewriter(aiStreamingText, 14, 400);

  return (
    <div className="flex flex-col bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/90 p-5 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
      {/* Modernized Doctor Header Block */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-sky-500/30 shrink-0 shadow-md">
          <Image src={videoThumbnail} alt={doctorName} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white tracking-tight leading-snug">{doctorName}</h4>
          <span className="text-xs text-sky-400 font-medium block mt-0.5">{doctorRole}</span>
        </div>
      </div>

      {/* Video Preview Card with ring-1 ring-white/10 and backdrop-blur play overlay */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/90 ring-1 ring-white/10 mb-4 group/video shadow-inner">
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

        {/* Embedded Play Overlay Button with backdrop-blur */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-center justify-center opacity-90 group-hover/video:opacity-100 transition-opacity">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-white/20 hover:bg-sky-500 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl cursor-pointer"
            aria-label={isPlaying ? 'Pause explanation' : 'Play explanation'}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
          </button>
        </div>

        {/* Sound toggle button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-sm text-white text-xs border border-white/20 cursor-pointer transition-colors"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Sharp Clinical Briefing Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Clinical Briefing</span>
        </div>
      </div>

      {/* AI Streaming Medical Commentary */}
      <div className="flex-1 bg-slate-950/80 rounded-xl p-4 border border-sky-500/20 mb-4 relative flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Bot className="w-3.5 h-3.5 text-sky-400" />
              Doctor Medical Insights
            </span>
            {isTyping && (
              <span className="text-[10px] text-amber-400 font-mono animate-pulse">
                Generating text...
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-normal">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-3.5 bg-sky-400 ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>

      {/* Book Doctor CTA */}
      <button
        onClick={onBook}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md transition-all cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-sky-200" />
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
    handleClose();
    scrollToBooking(docName);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={currentService.title}
      >
        {/* Base Modal: bg-slate-950/95 backdrop-blur-xl border border-slate-800/80 shadow-2xl rounded-3xl */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl rounded-3xl bg-slate-950/95 backdrop-blur-xl border border-slate-800/80 text-white shadow-2xl overflow-hidden my-6"
        >
          {/* Subtle Radial Ambient Lighting behind modal header */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto relative z-10">
            {/* Header */}
            <div className="max-w-3xl mb-8 space-y-2">
              {/* Category tag: Pill badge bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold px-3 py-1 rounded-full */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {currentService.category}
              </span>

              {/* Procedure Title: text-3xl md:text-4xl font-bold tracking-tight text-white */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                {currentService.title}
              </h2>

              {/* Clinical Subtitle: text-sky-300/90 font-medium text-sm md:text-base */}
              <p className="text-sm md:text-base text-sky-300/90 font-medium">
                {currentService.subtitle}
              </p>

              {/* Body Description: text-slate-300 text-sm leading-relaxed */}
              <p className="text-slate-300 text-sm leading-relaxed pt-2">
                {currentService.fullDescription}
              </p>
            </div>

            {/* Quick clinical specs badge strip: Glass cards bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-sky-500/40 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-sky-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Procedure Duration</span>
                </div>
                <div className="text-xs font-bold text-white">{currentService.duration}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-sky-500/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Anesthesia Protocol</span>
                </div>
                <div className="text-xs font-bold text-white">{currentService.anesthesia}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 hover:border-sky-500/40 transition-colors sm:col-span-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Clinical Standard</span>
                </div>
                <div className="text-xs font-bold text-white">European Class-B Autoclave Sterilized</div>
              </div>
            </div>

            {/* Clinical Highlights Checklist */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Clinical Advantages & Technology
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentService.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Title for Dual Doctor Explanations */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Dual Specialist Explanations & Streaming Insights
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Watch short briefings and read real-time clinical commentary from our Department Heads.
              </p>
            </div>

            {/* Dual Doctor Explanation Modules (Side-by-Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor 1: Assoc. Prof. Dr. Md. Abdul Alim */}
              <DoctorVideoModule
                doctorName={currentService.drAlim.doctorName}
                doctorRole={currentService.drAlim.doctorRole}
                videoUrl={currentService.drAlim.videoUrl}
                videoThumbnail={currentService.drAlim.videoThumbnail}
                aiStreamingText={currentService.drAlim.aiStreamingText}
                onBook={() => handleBookDoctor(currentService.drAlim.doctorName)}
              />

              {/* Doctor 2: Assoc. Prof. Dr. Kamrun Nahar (Shanta) */}
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
