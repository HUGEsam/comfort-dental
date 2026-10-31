export type UserRole = 'customer' | 'moderator' | 'admin';

export interface ActivityItem {
  id: string;
  action: string;
  pointsChange: number;
  timestamp: string;
}

export interface User {
  id: string; // e.g. CDS-TANVIR-01778-9842
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  bio: string;
  avatar: string;
  points: number; // hard capped at 300 (1 Point = 1 BDT)
  dailyShareCount: number; // max 10/day
  lastShareDate: string;
  hasSubmittedFeedback: boolean; // 1 rewarded feedback per lifetime
  hasCompletedGoogleReview?: boolean; // Google Review 100 points
  isBanned: boolean;
  isPointsFrozen: boolean;
  isFeedbackMuted: boolean;
  activityLog: ActivityItem[];
  registeredAt?: string;
}

export interface ThemeConfig {
  primaryAccent: string; // e.g. #00A8E8
  gradientFrom: string; // e.g. #030712
  gradientVia: string; // e.g. #0B132B
  gradientTo: string; // e.g. #050D1A
  goldAccent: string; // e.g. #D4AF37
  cardBackground: string; // e.g. rgba(13, 27, 42, 0.85)
  glowColor: string; // e.g. rgba(0, 168, 232, 0.25)
}

export interface OfferItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  discount: string;
  pointsRequired: number;
  validUntil: string;
  category: string;
}

export interface DoctorExplanation {
  doctorName: string;
  doctorRole: string;
  videoUrl: string;
  videoThumbnail: string;
  aiStreamingText: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  fullDescription: string;
  highlights: string[];
  duration: string;
  anesthesia: string;
  drAlim: DoctorExplanation;
  drShanta: DoctorExplanation;
}

export interface PatientInquiry {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  service: string;
  preferredDoctor: string;
  status: 'pending' | 'verified' | 'contacted' | 'completed';
  createdAt: string;
  notes?: string;
  feedbackRating?: number;
  feedbackText?: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  phoneCode: string;
  currency: string;
}
