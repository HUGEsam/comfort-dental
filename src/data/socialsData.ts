export interface ExternalMention {
  id: string;
  title: string;
  category: string;
  role: string;
  url: string;
  domain: string;
  badge: string;
  description: string;
}

export interface ProfessorProfile {
  id: string;
  relation: string; // 'Father' | 'Mother'
  relationBn: string;
  name: string;
  nameNative: string;
  role: string;
  institution: string;
  degrees: string;
  bmdcReg: string;
  experience: string;
  image: string;
  facebookUrl: string;
  facebookHandle: string;
  bio: string;
  externalMentions: ExternalMention[];
}

export interface DoctorSocialProfile {
  id: string;
  name: string;
  degrees: string;
  bmdc: string;
  role: string;
  avatar: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl?: string;
  specialtyTag: string;
}

export interface ChamberSocials {
  facebook: {
    title: string;
    handle: string;
    url: string;
    statusBadge: string;
    description: string;
    followers: string;
    coverPhoto: string;
    avatar: string;
    recentPostSnippet: string;
    postDate: string;
  };
  googleMaps: {
    title: string;
    handle: string;
    url: string;
    statusBadge: string;
    description: string;
    rating: number;
    reviewCount: number;
    address: string;
    hours: string;
    plusCode: string;
    mapQuery: string;
  };
  instagram: {
    title: string;
    handle: string;
    url: string;
    statusBadge: string;
    description: string;
    postsCount: string;
    followersCount: string;
    followingCount: string;
    previewGridImages: Array<{
      src: string;
      label: string;
    }>;
  };
  whatsapp: {
    title: string;
    handle: string;
    url: string;
    statusBadge: string;
    responseBadge: string;
    description: string;
    businessName: string;
    phoneFormatted: string;
    defaultMessage: string;
  };
}

export const chamberSocials: ChamberSocials = {
  facebook: {
    title: 'Facebook',
    handle: '@ComfortDentelSurgery',
    url: 'https://www.facebook.com/ComfortDentelSurgery',
    statusBadge: 'Official Chamber Page',
    description:
      'Verified dental surgery & implant center official updates, patient video testimonials, and laser dentistry results.',
    followers: '15,400+ Followers · 100% Recommendation Rate',
    coverPhoto: '/images/hero-clinic.jpg',
    avatar: '/assets/logo.png',
    recentPostSnippet:
      '✨ Advanced Swiss Dental Implants & Japanese Tokyo Laser Gum Dentistry in Dhaka. World-class sterilization protocol with European Class-B Autoclaves.',
    postDate: 'Active Now · Official Page',
  },
  googleMaps: {
    title: 'Google Maps',
    handle: 'BDDL Basabo Height, Dhaka-1214',
    url: 'https://maps.app.goo.gl/1NVP8EeWixrjVEhV7?g_st=ac',
    statusBadge: 'Verified Medical Chamber',
    description:
      'Direct GPS route navigation, chamber photo tour, 180+ verified 5-star patient reviews, and real-time transit directions.',
    rating: 4.9,
    reviewCount: 186,
    address: 'BDDL Basabo Height, 1 Central Basabo (2nd Floor), Dhaka-1214',
    hours: 'Morning 9:00 AM – 1:00 PM · Evening 4:00 PM – 12:00 AM',
    plusCode: 'Q9F4+5W Dhaka',
    mapQuery: 'BDDL Basabo Height 1 Central Basabo Dhaka',
  },
  instagram: {
    title: 'Instagram',
    handle: '@comfortdentalsurgery',
    url: 'https://www.instagram.com/comfortdentalsurgery',
    statusBadge: 'Smile Gallery & Case Studies',
    description:
      'High-definition surgical photography, microscopic endodontics, porcelain veneer smile makeovers, and daily patient transformation reels.',
    postsCount: '342 Posts',
    followersCount: '8,450 Followers',
    followingCount: '118 Following',
    previewGridImages: [
      { src: '/images/after-smile.jpg', label: 'Porcelain Smile Design' },
      { src: '/images/implants.jpg', label: 'Swiss Dental Implants' },
      { src: '/images/laser.jpg', label: 'Tokyo Laser Therapy' },
      { src: '/images/root-canal.jpg', label: 'Microscopic Endodontics' },
      { src: '/images/before-smile.jpg', label: 'Gum Depigmentation' },
      { src: '/images/surgery.jpg', label: 'Impacted Tooth Surgery' },
    ],
  },
  whatsapp: {
    title: 'WhatsApp',
    handle: '+880 1778-320966',
    url: 'https://wa.me/8801778320966?text=Hello%20Comfort%20Dental%20Surgery,%20I%20would%20like%20to%20inquire%20about%20an%20appointment',
    statusBadge: 'Priority Direct Desk',
    responseBadge: 'Replies within minutes',
    description:
      'Direct WhatsApp helpline for instant appointment bookings, treatment cost estimates, dental reports review, and emergency triage.',
    businessName: 'Comfort Dental Surgery & Implant Center',
    phoneFormatted: '+880 1778-320966',
    defaultMessage:
      'Hello Comfort Dental, I would like to book a consultation with Associate Professor Dr. Md. Abdul Alim / Dr. Kamrun Nahar Shanta.',
  },
};

export const doctorsSocialDirectory: DoctorSocialProfile[] = [
  {
    id: 'dr-alim',
    name: 'Prof. Dr. Md. Abdul Alim',
    degrees: 'BDS, PGT (OMS), MS (Oral & Maxillofacial Surgery)',
    bmdc: 'BMDC Reg: 3491',
    role: 'Head of Oral & Maxillofacial Surgery',
    avatar: '/images/dr-alim.jpg',
    instagramHandle: '@dr.md.abdul.alim',
    instagramUrl: 'https://www.instagram.com',
    facebookUrl: 'https://www.facebook.com/dralim.oralmaxillofacialsurgery',
    specialtyTag: 'Oral & Maxillofacial Surgery',
  },
  {
    id: 'dr-shanta',
    name: 'Prof. Dr. Kamrun Nahar (Shanta)',
    degrees: 'BDS, FCPS (Conservative Dentistry & Endodontics)',
    bmdc: 'BMDC Reg: 3858',
    role: 'Head of Conservative & Endodontics',
    avatar: '/images/dr-shanta.jpg',
    instagramHandle: '@dr.kamrun.nahar.shanta',
    instagramUrl: 'https://www.instagram.com',
    facebookUrl: 'https://www.facebook.com/drkamrunnahar.endodontics',
    specialtyTag: 'Painless Endodontics & Aesthetics',
  },
  {
    id: 'dr-moinul',
    name: 'Dr. Moinul Hossain Chowdhury',
    degrees: 'BDS (DU)',
    bmdc: 'BMDC Reg: 17928',
    role: 'General & Aesthetic Dental Surgeon',
    avatar: '/images/dental-chair.jpg',
    instagramHandle: '@dr.moinul.dentist',
    instagramUrl: 'https://www.instagram.com',
    specialtyTag: 'Restorative Aesthetics',
  },
  {
    id: 'dr-zannatul',
    name: 'Dr. Zannatul Ferdous Meem',
    degrees: 'BDS (DU)',
    bmdc: 'BMDC Reg: 14793',
    role: 'Endodontics & Conservative Specialist',
    avatar: '/images/root-canal.jpg',
    instagramHandle: '@dr.zannatul.meem',
    instagramUrl: 'https://www.instagram.com',
    specialtyTag: 'Rotary Root Canal',
  },
  {
    id: 'dr-arafa',
    name: 'Dr. Arafa Farhin Ifty',
    degrees: 'BDS (DU)',
    bmdc: 'BMDC Reg: 16604',
    role: 'Orthodontics & Preventive Care',
    avatar: '/images/orthodontics.jpg',
    instagramHandle: '@dr.arafa.ifty',
    instagramUrl: 'https://www.instagram.com',
    specialtyTag: 'Orthodontics & Child Dental',
  },
  {
    id: 'dr-rakibur',
    name: 'Dr. Rakibur Rahman',
    degrees: 'BDS (DU)',
    bmdc: 'BMDC Reg: 17186',
    role: 'Oral Surgery & Implantologist',
    avatar: '/images/surgery.jpg',
    instagramHandle: '@dr.rakibur.rahman',
    instagramUrl: 'https://www.instagram.com',
    specialtyTag: 'Minor Oral Surgeries',
  },
  {
    id: 'dr-sazedur',
    name: 'Dr. S M Sazedur Rahman',
    degrees: 'BDS (DU)',
    bmdc: 'BMDC Registered',
    role: 'Periodontology & Prosthetic Restorations',
    avatar: '/images/implants.jpg',
    instagramHandle: '@dr.sazedur.rahman',
    instagramUrl: 'https://www.instagram.com',
    specialtyTag: 'Gum Surgeries & Prosthetics',
  },
];

export const professorsProfiles: ProfessorProfile[] = [
  {
    id: 'prof-father',
    relation: 'Father',
    relationBn: 'পিতা',
    name: 'Professor Dr. Md. Abdul Alim',
    nameNative: 'প্রফেসর ডাঃ মোঃ আব্দুল আলিম',
    role: 'Head of Oral & Maxillofacial Surgery Department',
    institution: 'MH Samorita Medical College & Hospital Dental Unit',
    degrees: 'BDS (DDC), PGT (OMS), MS (Oral & Maxillofacial Surgery)',
    bmdcReg: 'BMDC Reg No: 3491',
    experience: '22+ Years Faculty & Surgical Excellence',
    image: '/images/dr-alim.jpg',
    facebookUrl: 'https://www.facebook.com/dralim.oralmaxillofacialsurgery',
    facebookHandle: 'Assoc. Prof. Dr. Md. Abdul Alim - Oral & Maxillofacial Surgeon',
    bio: 'Renowned academic leader and surgical authority specializing in complex dental implantology, maxillofacial reconstructive trauma, bone grafting, and orthognathic corrective jaw surgery.',
    externalMentions: [
      {
        id: 'alim-mh-samorita',
        title: 'MH Samorita Medical College & Dental Unit',
        category: 'Official Faculty & Department Head Portal',
        role: 'Associate Professor & Head of Department, Oral & Maxillofacial Surgery',
        url: 'http://mhsamorita.edu.bd',
        domain: 'mhsamorita.edu.bd',
        badge: 'University Medical Faculty',
        description:
          'Leading undergraduate BDS and postgraduate surgeon training, maxillofacial tumor resection, and emergency facial trauma management.',
      },
      {
        id: 'alim-bmdc',
        title: 'Bangladesh Medical & Dental Council (BMDC)',
        category: 'National Medical Registry Verification',
        role: 'Permanent Registered Specialist (Reg # 3491)',
        url: 'https://bmdc.org.bd',
        domain: 'bmdc.org.bd',
        badge: 'Government Registry',
        description:
          'Official verified specialist registration in Oral & Maxillofacial Surgery recognized nationwide by the Ministry of Health.',
      },
      {
        id: 'alim-bamos',
        title: 'Bangladesh Association of Oral & Maxillofacial Surgeons (BAMOS)',
        category: 'Professional Surgical Society',
        role: 'Life Member & Senior Surgical Consultant',
        url: 'https://bamos.org.bd',
        domain: 'bamos.org.bd',
        badge: 'Surgical Fellowship',
        description:
          'Pioneering surgical advancements, clinical conferences, jaw deformity corrections, and specialized dental implant protocols in Bangladesh.',
      },
      {
        id: 'alim-researchgate',
        title: 'ResearchGate & Medical Academic Index',
        category: 'Peer-Reviewed Scientific Publications',
        role: 'Principal Author & Maxillofacial Clinical Investigator',
        url: 'https://www.researchgate.net',
        domain: 'researchgate.net',
        badge: 'Scientific Citations',
        description:
          'Published clinical studies and research papers on mandibular fractures, guided bone regeneration, and long-term titanium implant osseointegration.',
      },
    ],
  },
  {
    id: 'prof-mother',
    relation: 'Mother',
    relationBn: 'মাতা',
    name: 'Professor Dr. Kamrun Nahar (Shanta)',
    nameNative: 'প্রফেসর ডাঃ কামরুন নাহার (শান্তা)',
    role: 'Head of Conservative Dentistry & Endodontics Department',
    institution: 'MH Samorita Medical College & Hospital Dental Unit',
    degrees: 'BDS (DDC), FCPS (Conservative Dentistry & Endodontics)',
    bmdcReg: 'BMDC Reg No: 3858',
    experience: '20+ Years Endodontic & Restorative Mastery',
    image: '/images/dr-shanta.jpg',
    facebookUrl: 'https://www.facebook.com/drkamrunnahar.endodontics',
    facebookHandle: 'Assoc. Prof. Dr. Kamrun Nahar Shanta - FCPS Endodontist',
    bio: 'Premier endodontic authority and BCPS-fellowed specialist mastering painless microscopic root canals, Japanese laser dental bleaching, and non-invasive aesthetic smile reconstruction.',
    externalMentions: [
      {
        id: 'shanta-mh-samorita',
        title: 'MH Samorita Medical College & Dental Unit',
        category: 'Official Faculty & Department Head Portal',
        role: 'Associate Professor & Head of Department, Conservative Dentistry & Endodontics',
        url: 'http://mhsamorita.edu.bd',
        domain: 'mhsamorita.edu.bd',
        badge: 'University Medical Faculty',
        description:
          'Directing clinical training in rotary endodontic microscopes, aesthetic restorative ceramics, and tooth-saving endodontic surgery.',
      },
      {
        id: 'shanta-bmdc',
        title: 'Bangladesh Medical & Dental Council (BMDC)',
        category: 'National Medical Registry Verification',
        role: 'Permanent Registered Specialist (Reg # 3858)',
        url: 'https://bmdc.org.bd',
        domain: 'bmdc.org.bd',
        badge: 'Government Registry',
        description:
          'Verified licensure with post-graduate FCPS specialization in Conservative Dentistry & Endodontics.',
      },
      {
        id: 'shanta-bes',
        title: 'Bangladesh Endodontic Society (BES)',
        category: 'Specialist Professional Body',
        role: 'Executive Member & Keynote Faculty',
        url: 'https://bes-bd.org',
        domain: 'bes-bd.org',
        badge: 'Endodontic Society',
        description:
          'Leading national symposiums and hands-on workshops on single-visit painless root canal therapy, apex locators, and bioceramic sealers.',
      },
      {
        id: 'shanta-pubmed',
        title: 'International Academy of Endodontics & Journal Index',
        category: 'Clinical Research & Case Reports',
        role: 'Contributing Fellow & Specialist Author',
        url: 'https://pubmed.ncbi.nlm.nih.gov',
        domain: 'pubmed.ncbi.nlm.nih.gov',
        badge: 'International Index',
        description:
          'Documented case studies in endodontic retreatments, mineral trioxide aggregate (MTA) apical plugs, and vital pulp preservation.',
      },
    ],
  },
];
