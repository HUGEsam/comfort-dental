'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { sanitizeText, normalizePatientName, safeJsonParse } from '@/utils/security';
import {
  User,
  UserRole,
  ThemeConfig,
  OfferItem,
  PatientInquiry,
  CountryInfo,
  ServiceDetail,
  Language,
} from '@/types';

type ThemeMode = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  selectedDoctor: string;
  setSelectedDoctor: (doc: string) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  scrollToBooking: (doctorOrService?: string, serviceName?: string) => void;

  // Global Dynamic Theme & Gradients
  themeConfig: ThemeConfig;
  updateThemeConfig: (newConfig: Partial<ThemeConfig>) => void;

  // Active Country & Language
  selectedCountry: CountryInfo;
  setSelectedCountry: (country: CountryInfo) => void;
  isCountryModalOpen: boolean;
  setIsCountryModalOpen: (open: boolean) => void;

  // Interactive Service Modal
  activeServiceModal: ServiceDetail | null;
  setActiveServiceModal: (service: ServiceDetail | null) => void;

  // Top-Right 3-Dot Drawer
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  drawerActiveTab: 'profile' | 'offers' | 'payment' | 'points' | 'auth';
  setDrawerActiveTab: (tab: 'profile' | 'offers' | 'payment' | 'points' | 'auth') => void;

  // Auth & 3-Tier Views
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  loginPatientByName: (name: string) => { success: boolean; needsRegistration?: boolean; user?: User };
  registerPatient: (data: { name: string; phone: string; email: string; role?: UserRole }) => User;
  logoutPatient: () => void;
  updateUserName: (newName: string) => void;
  updateUserProfile: (updates: { name?: string; phone?: string; email?: string }) => void;
  loginOrSignUp: (params: { name: string; email: string; phone: string; role: UserRole }) => User;
  allUsers: User[];
  updateUserStatus: (userId: string, updates: Partial<User>) => void;
  currentView: 'home' | 'customer-portal' | 'moderator-dashboard' | 'admin-dashboard';
  setCurrentView: (view: 'home' | 'customer-portal' | 'moderator-dashboard' | 'admin-dashboard') => void;

  // Points, Referral & Feedback Engine
  generateReferralLink: () => string;
  processReferralClick: (refId: string, timestamp: number) => { success: boolean; message: string };
  submitFeedback: (rating: number, text: string) => { success: boolean; message: string };
  claimGoogleReviewPoints: () => { success: boolean; message: string };
  purchasePoints: (amount: number, method: string) => { success: boolean; message: string };

  // Offers
  offers: OfferItem[];
  addOffer: (offer: OfferItem) => void;
  deleteOffer: (id: string) => void;

  // Inquiries
  inquiries: PatientInquiry[];
  addInquiry: (inquiry: Omit<PatientInquiry, 'id' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: PatientInquiry['status']) => void;
}

const defaultThemeConfig: ThemeConfig = {
  primaryAccent: '#00A8E8',
  gradientFrom: '#030712', // Hostinger-style deep obsidian
  gradientVia: '#0B132B',  // Midnight blue
  gradientTo: '#050D1A',    // Dark sapphire
  goldAccent: '#D4AF37',
  cardBackground: 'rgba(13, 27, 42, 0.85)',
  glowColor: 'rgba(0, 168, 232, 0.25)',
};

const initialOffers: OfferItem[] = [
  {
    id: 'off-1',
    title: 'Complimentary 3D CBCT Bone Scan',
    badge: 'FREE SCAN',
    description: 'Complete volumetric mandibular/maxillary bone analysis for implant patients.',
    discount: '100% Free (Worth ৳4,000)',
    pointsRequired: 80,
    validUntil: '2026-12-31',
    category: 'Implantology',
  },
  {
    id: 'off-2',
    title: 'Japanese Laser Gum Whitening Voucher',
    badge: '25% OFF',
    description: 'Melanin depigmentation & soft-tissue cosmetic contouring with Dr. Alim.',
    discount: '৳2,500 Off',
    pointsRequired: 120,
    validUntil: '2026-11-30',
    category: 'Laser',
  },
  {
    id: 'off-3',
    title: 'VIP Single-Sitting RCT Consultation',
    badge: 'PRIORITY',
    description: 'Rotary microscopic endodontic assessment by Assoc. Prof. Dr. Kamrun Nahar.',
    discount: '৳1,500 Off',
    pointsRequired: 60,
    validUntil: '2026-12-15',
    category: 'Endodontics',
  },
  {
    id: 'off-4',
    title: 'Full Smile Veneer Package Upgrade',
    badge: 'LUXURY',
    description: 'Free in-office laser teeth whitening included with 6+ E-max porcelain veneers.',
    discount: '৳8,000 Value Included',
    pointsRequired: 200,
    validUntil: '2026-12-31',
    category: 'Cosmetics',
  },
];

const initialInquiries: PatientInquiry[] = [
  {
    id: 'inq-101',
    patientName: 'Kazi Farhan',
    phone: '01712-106499',
    email: 'kazi@gmail.com',
    service: 'Dental Implants Consultation',
    preferredDoctor: 'Assoc. Prof. Dr. Md. Abdul Alim',
    status: 'pending',
    createdAt: 'Today, 10:15 AM',
    notes: 'Missing upper second molar. Wants Swiss titanium implant.',
  },
  {
    id: 'inq-102',
    patientName: 'Nusrat Jahan',
    phone: '01779-320966',
    email: 'nusrat@gmail.com',
    service: 'Pain-Free Root Canal Treatment',
    preferredDoctor: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
    status: 'verified',
    createdAt: 'Yesterday, 4:30 PM',
    notes: 'Severe night pain in lower right molar.',
  },
  {
    id: 'inq-103',
    patientName: 'Rafiqul Islam',
    phone: '01924042036',
    email: 'rafiqul@yahoo.com',
    service: 'Japanese Laser Bleeding Gum Care',
    preferredDoctor: 'Assoc. Prof. Dr. Md. Abdul Alim',
    status: 'verified',
    createdAt: '2 days ago',
    notes: 'Gums bleed while brushing. Inquiring about Tokyo laser therapy.',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  // Global Dynamic Theme Config
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultThemeConfig);

  // Active Country & Language
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>({
    code: 'BD',
    name: 'Bangladesh',
    nativeName: 'বাংলাদেশ (বাংলা)',
    flag: '🇧🇩',
    phoneCode: '+880',
    currency: 'BDT (৳)',
  });
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  // Active Service Modal
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceDetail | null>(null);

  // Top-Right 3-Dot Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerActiveTab, setDrawerActiveTab] = useState<'profile' | 'offers' | 'payment' | 'points' | 'auth'>('profile');

  // Auth Modal & State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'customer-portal' | 'moderator-dashboard' | 'admin-dashboard'>('home');

  // Device-scoped patient state (starts empty on unconfigured device)
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [allUsers, setAllUsers] = useState<User[]>([
    {
      id: 'CDS-TANVIR-01778-9842',
      name: 'Tanvir Ahmed',
      email: 'tanvir@gmail.com',
      phone: '01778-320966',
      role: 'customer',
      bio: 'Patient member since 2024.',
      avatar: '/images/dr-alim.jpg',
      points: 0,
      dailyShareCount: 0,
      lastShareDate: '2026-10-20',
      hasSubmittedFeedback: false,
      hasCompletedGoogleReview: false,
      isBanned: false,
      isPointsFrozen: false,
      isFeedbackMuted: false,
      activityLog: [],
    },
    {
      id: 'CDS-MEHEDI-01924-4412',
      name: 'Mehedi Hasan',
      email: 'mehedi@gmail.com',
      phone: '01924042036',
      role: 'customer',
      bio: 'Dental implant restoration patient.',
      avatar: '/images/dr-shanta.jpg',
      points: 100,
      dailyShareCount: 0,
      lastShareDate: '2026-10-20',
      hasSubmittedFeedback: false,
      hasCompletedGoogleReview: true,
      isBanned: false,
      isPointsFrozen: false,
      isFeedbackMuted: false,
      activityLog: [
        { id: 'act-1', action: 'Google Review Reward (+100 BDT discount)', pointsChange: 100, timestamp: '15 Oct 2026' }
      ],
    },
    {
      id: 'CDS-STAFF-02472-1001',
      name: 'Staff Moderator',
      email: 'staff@comfortdentalsurgerybd.com',
      phone: '02 47291419',
      role: 'moderator',
      bio: 'Senior Clinical Coordinator at Basabo Chamber.',
      avatar: '/assets/logo.png',
      points: 300,
      dailyShareCount: 0,
      lastShareDate: '2026-10-20',
      hasSubmittedFeedback: true,
      hasCompletedGoogleReview: true,
      isBanned: false,
      isPointsFrozen: false,
      isFeedbackMuted: false,
      activityLog: [],
    },
  ]);

  const [offers, setOffers] = useState<OfferItem[]>(initialOffers);
  const [inquiries, setInquiries] = useState<PatientInquiry[]>(initialInquiries);

  // Sync Dynamic CSS variables to DOM
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--primary-cyan', themeConfig.primaryAccent);
      root.style.setProperty('--gradient-from', themeConfig.gradientFrom);
      root.style.setProperty('--gradient-via', themeConfig.gradientVia);
      root.style.setProperty('--gradient-to', themeConfig.gradientTo);
      root.style.setProperty('--gold-accent', themeConfig.goldAccent);
    }
  }, [themeConfig]);

  // Load saved preferences
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('comfort_dental_theme') as ThemeMode;
      if (savedTheme) {
        setTimeout(() => setThemeState(savedTheme), 0);
        if (savedTheme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      const savedLang = localStorage.getItem('comfort_dental_lang') as Language;
      if (savedLang) {
        setTimeout(() => setLanguageState(savedLang), 0);
      }

      // Safe device-scoped patient session hydration
      const activePatientName = localStorage.getItem('cds_active_patient_name');
      if (activePatientName) {
        const normalized = normalizePatientName(activePatientName);
        const savedSession = localStorage.getItem('patient_session_' + normalized);
        if (savedSession) {
          const parsed = safeJsonParse<User | null>(savedSession, null);
          if (parsed && parsed.name) {
            setTimeout(() => {
              setUser(parsed);
              setIsLoggedIn(true);
            }, 0);
          }
        } else {
          const legacyData = localStorage.getItem('cds_patient_data');
          if (legacyData) {
            const parsedLegacy = safeJsonParse<Partial<User> | null>(legacyData, null);
            if (parsedLegacy && parsedLegacy.name) {
              const userObj: User = {
                id: parsedLegacy.id || `CDS-${normalizePatientName(parsedLegacy.name).toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-4)}`,
                name: parsedLegacy.name,
                phone: parsedLegacy.phone || '',
                email: parsedLegacy.email || '',
                role: (parsedLegacy.role as UserRole) || 'customer',
                bio: parsedLegacy.bio || 'Patient member at Comfort Dental Surgery.',
                avatar: parsedLegacy.avatar || '/images/dr-alim.jpg',
                points: parsedLegacy.points || 0,
                dailyShareCount: 0,
                lastShareDate: new Date().toISOString().split('T')[0],
                hasSubmittedFeedback: !!parsedLegacy.hasSubmittedFeedback,
                hasCompletedGoogleReview: !!parsedLegacy.hasCompletedGoogleReview,
                isBanned: false,
                isPointsFrozen: false,
                isFeedbackMuted: false,
                activityLog: parsedLegacy.activityLog || [],
                registeredAt: parsedLegacy.registeredAt || new Date().toISOString(),
              };
              setTimeout(() => {
                setUser(userObj);
                setIsLoggedIn(true);
              }, 0);
            }
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('comfort_dental_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
  };

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('comfort_dental_theme', t);
    if (t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  const updateThemeConfig = (newConfig: Partial<ThemeConfig>) => {
    setThemeConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const scrollToBooking = (doctorOrService?: string, serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    if (doctorOrService) {
      const lower = doctorOrService.toLowerCase();
      if (lower.includes('dr.') || lower.includes('prof') || lower.includes('alim') || lower.includes('shanta') || lower.includes('ডাঃ')) {
        setSelectedDoctor(doctorOrService);
      } else {
        setSelectedService(doctorOrService);
      }
    }
    if (currentView !== 'home') setCurrentView('home');
    setTimeout(() => {
      const target = document.getElementById('appointment');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  // Device-Scoped Patient Authentication & Session Management
  const loginPatientByName = useCallback((nameInput: string): { success: boolean; needsRegistration?: boolean; user?: User } => {
    const clean = sanitizeText(nameInput);
    if (!clean) return { success: false };
    const normalized = normalizePatientName(clean);

    try {
      // 1. Check patient_session_<normalizedName>
      const sessionData = localStorage.getItem('patient_session_' + normalized);
      if (sessionData) {
        const parsed = safeJsonParse<User | null>(sessionData, null);
        if (parsed && parsed.name) {
          setUser(parsed);
          setIsLoggedIn(true);
          localStorage.setItem('cds_active_patient_name', parsed.name);
          localStorage.setItem('cds_patient_data', JSON.stringify(parsed));
          return { success: true, user: parsed };
        }
      }

      // 2. Check general cds_patient_data
      const legacyData = localStorage.getItem('cds_patient_data');
      if (legacyData) {
        const parsed = safeJsonParse<Partial<User> | null>(legacyData, null);
        if (parsed && parsed.name && normalizePatientName(parsed.name) === normalized) {
          const userObj: User = {
            id: parsed.id || `CDS-${normalized.toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-4)}`,
            name: parsed.name,
            phone: parsed.phone || '',
            email: parsed.email || '',
            role: 'customer',
            bio: 'Patient member at Comfort Dental Surgery.',
            avatar: '/images/dr-alim.jpg',
            points: parsed.points || 0,
            dailyShareCount: 0,
            lastShareDate: new Date().toISOString().split('T')[0],
            hasSubmittedFeedback: !!parsed.hasSubmittedFeedback,
            hasCompletedGoogleReview: !!parsed.hasCompletedGoogleReview,
            isBanned: false,
            isPointsFrozen: false,
            isFeedbackMuted: false,
            activityLog: parsed.activityLog || [],
            registeredAt: parsed.registeredAt || new Date().toISOString(),
          };
          setUser(userObj);
          setIsLoggedIn(true);
          localStorage.setItem('cds_active_patient_name', userObj.name);
          localStorage.setItem('patient_session_' + normalized, JSON.stringify(userObj));
          return { success: true, user: userObj };
        }
      }
    } catch {
      // safe fallback
    }

    return { success: false, needsRegistration: true };
  }, []);

  const registerPatient = useCallback((data: { name: string; phone: string; email: string; role?: UserRole }): User => {
    const cleanName = sanitizeText(data.name);
    const cleanPhone = sanitizeText(data.phone);
    const cleanEmail = sanitizeText(data.email);
    const normalized = normalizePatientName(cleanName);

    const newUser: User = {
      id: `CDS-${normalized.toUpperCase().slice(0, 8)}-${Date.now().toString().slice(-4)}`,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      role: data.role || 'customer',
      bio: 'Patient member at Comfort Dental Surgery & Implant Center.',
      avatar: '/images/dr-alim.jpg',
      points: 0,
      dailyShareCount: 0,
      lastShareDate: new Date().toISOString().split('T')[0],
      hasSubmittedFeedback: false,
      hasCompletedGoogleReview: false,
      isBanned: false,
      isPointsFrozen: false,
      isFeedbackMuted: false,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          action: 'Patient Account Created on Device',
          pointsChange: 0,
          timestamp: 'Just now',
        },
      ],
      registeredAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('patient_session_' + normalized, JSON.stringify(newUser));
      localStorage.setItem('cds_patient_data', JSON.stringify(newUser));
      localStorage.setItem('cds_active_patient_name', cleanName);
    } catch {}

    setUser(newUser);
    setIsLoggedIn(true);
    setAllUsers((prev) => [newUser, ...prev.filter((u) => u.id !== newUser.id)]);
    return newUser;
  }, []);

  const logoutPatient = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('cds_active_patient_name');
    } catch {}
  }, []);

  // Account Generation Logic (Full Name + Email + Phone -> Unique User ID)
  const loginOrSignUp = useCallback(({
    name,
    email,
    phone,
    role,
  }: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
  }): User => {
    return registerPatient({ name, phone, email, role });
  }, [registerPatient]);

  const updateUserName = (newName: string) => {
    if (!user) return;
    const trimmed = sanitizeText(newName);
    if (!trimmed) return;
    const updatedUser = { ...user, name: trimmed };
    const normalized = normalizePatientName(trimmed);
    try {
      localStorage.setItem('patient_session_' + normalized, JSON.stringify(updatedUser));
      localStorage.setItem('cds_patient_data', JSON.stringify(updatedUser));
      localStorage.setItem('cds_active_patient_name', trimmed);
    } catch {}
    setUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
  };

  const updateUserProfile = useCallback(({
    name,
    phone,
    email,
  }: {
    name?: string;
    phone?: string;
    email?: string;
  }) => {
    if (!user) return;
    const cleanName = name ? sanitizeText(name) : user.name;
    const cleanPhone = phone ? sanitizeText(phone) : user.phone;
    const cleanEmail = email ? sanitizeText(email) : user.email;

    const updatedUser: User = {
      ...user,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
    };

    const normalized = normalizePatientName(cleanName);
    try {
      localStorage.setItem('patient_session_' + normalized, JSON.stringify(updatedUser));
      localStorage.setItem('cds_patient_data', JSON.stringify(updatedUser));
      localStorage.setItem('cds_active_patient_name', cleanName);
    } catch {}

    setUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
  }, [user]);

  const updateUserStatus = (userId: string, updates: Partial<User>) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updates } : u))
    );
    if (user && user.id === userId) {
      setUser({ ...user, ...updates });
    }
  };

  // Google Review Reward (100 Points = 100 BDT discount)
  const claimGoogleReviewPoints = (): { success: boolean; message: string } => {
    const reviewUrl = 'https://maps.app.goo.gl/1NVP8EeWixrjVEhV7?g_st=ac';
    if (typeof window !== 'undefined') {
      window.open(reviewUrl, '_blank');
    }

    if (!user) {
      return {
        success: true,
        message: 'Google Review page opened. Please log in to have your 100 reward points credited to your wallet!',
      };
    }

    if (user.isPointsFrozen || user.isBanned) {
      return { success: false, message: 'Your points wallet is currently restricted.' };
    }

    if (user.hasCompletedGoogleReview) {
      return {
        success: false,
        message: 'Google Review reward (100 Points) has already been claimed for this account.',
      };
    }

    const newPoints = Math.min(300, user.points + 100);
    const updatedUser: User = {
      ...user,
      points: newPoints,
      hasCompletedGoogleReview: true,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          action: 'Google Review Completed (+100 BDT discount)',
          pointsChange: 100,
          timestamp: 'Just now',
        },
        ...user.activityLog,
      ],
    };

    setUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    return {
      success: true,
      message: `Google Review opened! 100 Points (৳100 discount) awarded to your wallet (New balance: ${newPoints}/300 PTS).`,
    };
  };

  // 5-Minute Window Referral Link Generator
  const generateReferralLink = (): string => {
    const userId = user?.id || 'CDS-GUEST';
    const timestamp = Date.now();
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/?ref=${userId}&t=${timestamp}`;
    }
    return `https://comfortdentalsurgerybd.com/?ref=${userId}&t=${timestamp}`;
  };

  // 5-Minute Window Referral Click Processor
  const processReferralClick = (refId: string, timestamp: number): { success: boolean; message: string } => {
    const now = Date.now();
    const elapsedMinutes = (now - timestamp) / (1000 * 60);

    if (elapsedMinutes > 5) {
      return {
        success: false,
        message: 'Referral link expired: Outside the 5-minute validation window.',
      };
    }

    // Award +3 Points to user if daily limit not exceeded (Max 10 shares / 30 pts per day, max 300 pts cap)
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === refId) {
          const today = new Date().toISOString().split('T')[0];
          const sharesToday = u.lastShareDate === today ? u.dailyShareCount : 0;
          if (sharesToday >= 10 || u.isPointsFrozen || u.isBanned) return u;

          const newPoints = Math.min(300, u.points + 3);
          return {
            ...u,
            points: newPoints,
            dailyShareCount: sharesToday + 1,
            lastShareDate: today,
            activityLog: [
              {
                id: `act-${Date.now()}`,
                action: 'Verified 5-Minute Referral Visit',
                pointsChange: 3,
                timestamp: 'Just now',
              },
              ...u.activityLog,
            ],
          };
        }
        return u;
      })
    );

    if (user && user.id === refId) {
      const today = new Date().toISOString().split('T')[0];
      const sharesToday = user.lastShareDate === today ? user.dailyShareCount : 0;
      if (sharesToday < 10 && !user.isPointsFrozen && !user.isBanned) {
        setUser({
          ...user,
          points: Math.min(300, user.points + 3),
          dailyShareCount: sharesToday + 1,
          lastShareDate: today,
        });
      }
    }

    return {
      success: true,
      message: 'Verified 5-minute referral: +3 Points awarded successfully!',
    };
  };

  // Inquiry Management
  const addInquiry = useCallback((inquiry: Omit<PatientInquiry, 'id' | 'createdAt'>) => {
    const newInq: PatientInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: 'Just now',
    };
    setInquiries((prev) => [newInq, ...prev]);
  }, []);

  const updateInquiryStatus = useCallback((id: string, status: PatientInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }, []);

  // Lifetime Chamber Feedback (+20 Points, strictly 1 rewarded per lifetime)
  const submitFeedback = useCallback((rating: number, text: string): { success: boolean; message: string } => {
    if (!user) {
      return { success: false, message: 'Please log in or create an account to submit feedback.' };
    }
    if (user.isFeedbackMuted || user.isBanned) {
      return { success: false, message: 'Your account is restricted from submitting chamber feedback.' };
    }
    if (user.hasSubmittedFeedback) {
      return {
        success: false,
        message: 'Lifetime limit reached: You have already claimed your 20 feedback reward points.',
      };
    }

    const newPoints = Math.min(300, user.points + 20);

    const updatedUser: User = {
      ...user,
      points: newPoints,
      hasSubmittedFeedback: true,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          action: `Lifetime Chamber Feedback (${rating}★) Approved`,
          pointsChange: 20,
          timestamp: 'Just now',
        },
        ...user.activityLog,
      ],
    };

    setUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    // Record inquiry / feedback log for moderator review
    addInquiry({
      patientName: user.name,
      phone: user.phone,
      email: user.email,
      service: 'Chamber Experience Review',
      preferredDoctor: 'Both Consultants (Dr. Alim & Dr. Shanta)',
      status: 'verified',
      feedbackRating: rating,
      feedbackText: text,
      notes: `Verified feedback from User ID: ${user.id}`,
    });

    // 1. Dual Auto-Forwarding to WhatsApp
    const waText = encodeURIComponent(
      `*New Chamber Feedback & Review - Comfort Dental Surgery*\n\n` +
      `👤 *Patient:* ${user.name} (${user.id})\n` +
      `📞 *Phone:* ${user.phone}\n` +
      `⭐ *Rating:* ${rating}/5 Stars\n` +
      `💬 *Review:* "${text}"\n\n` +
      `Reward Status: +20 Points added (New balance: ${newPoints}/300 PTS)`
    );
    const waUrl = `https://wa.me/8801778320966?text=${waText}`;

    // 2. Dual Auto-Forwarding to Email via Web3Forms API
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          to_email: 'dralim.comfort79@gmail.com',
          from_name: 'Comfort Dental Surgery Feedback System',
          subject: `★ ${rating}-Star Verified Feedback: ${user.name}`,
          user_id: user.id,
          patient_name: user.name,
          phone: user.phone,
          rating: `${rating} / 5`,
          feedback_text: text,
        }),
      }).catch(() => {});
    } catch {}

    // Open WhatsApp in background/tab
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }

    return {
      success: true,
      message: `Thank you! 20 Points awarded (Total: ${newPoints}/300 PTS). Forwarded to clinic email & WhatsApp!`,
    };
  }, [user, addInquiry]);

  // Buy Points up to 300 Hard Cap
  const purchasePoints = (amount: number, method: string): { success: boolean; message: string } => {
    if (!user) {
      return { success: false, message: 'Please log in to purchase or recharge points.' };
    }
    if (user.isPointsFrozen || user.isBanned) {
      return { success: false, message: 'Points wallet is frozen by administration.' };
    }

    const availableSpace = 300 - user.points;
    if (availableSpace <= 0) {
      return { success: false, message: 'You have reached the maximum hard cap of 300 Points!' };
    }

    const added = Math.min(amount, availableSpace);
    const newPoints = user.points + added;

    const updatedUser: User = {
      ...user,
      points: newPoints,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          action: `Purchased ${added} Points via ${method}`,
          pointsChange: added,
          timestamp: 'Just now',
        },
        ...user.activityLog,
      ],
    };

    setUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    return {
      success: true,
      message: `Successfully added ${added} Points to your wallet via ${method}! New balance: ${newPoints} / 300 PTS.`,
    };
  };

  // Offer CRUD
  const addOffer = (offer: OfferItem) => {
    setOffers((prev) => [offer, ...prev]);
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        selectedDoctor,
        setSelectedDoctor,
        selectedService,
        setSelectedService,
        scrollToBooking,
        themeConfig,
        updateThemeConfig,
        selectedCountry,
        setSelectedCountry,
        isCountryModalOpen,
        setIsCountryModalOpen,
        activeServiceModal,
        setActiveServiceModal,
        isDrawerOpen,
        setIsDrawerOpen,
        drawerActiveTab,
        setDrawerActiveTab,
        isAuthModalOpen,
        setIsAuthModalOpen,
        user,
        isLoggedIn,
        setUser,
        loginPatientByName,
        registerPatient,
        logoutPatient,
        updateUserName,
        updateUserProfile,
        loginOrSignUp,
        allUsers,
        updateUserStatus,
        currentView,
        setCurrentView,
        generateReferralLink,
        processReferralClick,
        submitFeedback,
        claimGoogleReviewPoints,
        purchasePoints,
        offers,
        addOffer,
        deleteOffer,
        inquiries,
        addInquiry,
        updateInquiryStatus,
      }}
    >
      <div className={language === 'bn' ? 'font-bangla' : 'font-english'}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
