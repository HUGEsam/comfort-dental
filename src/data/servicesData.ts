import { ServiceDetail } from '@/types';

export const servicesData: ServiceDetail[] = [
  {
    id: 'implants',
    title: 'Advanced Dental Implants',
    subtitle: 'Swiss & German Biocompatible Titanium Systems',
    category: 'Implantology & Surgery',
    fullDescription:
      'Permanent, biomimetic tooth replacements anchored directly into the alveolar bone using aerospace-grade grade-IV titanium. Designed to restore 100% masticatory bite force and prevent post-extraction bone atrophy.',
    highlights: [
      'Immediate Loading & Same-Day Provisional Crowns',
      'Minimally Invasive Computer-Guided Flapless Surgery',
      'Sinus Membrane Elevation & Bio-Oss Bone Augmentation',
      'Lifetime Structural Osseointegration Guarantee',
    ],
    duration: '45–60 Minutes per Implant',
    anesthesia: 'Computer-Controlled Local Anesthesia / Sedation',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“Dental implantology has entered a new era of digital precision. With our special training in Japan, Malaysia, and India, we utilize 3D CBCT bone-density navigation to place Swiss-grade titanium fixtures with zero compromise. The procedure preserves your facial bone volume, prevents neighboring teeth from tipping, and offers chewing stability indistinguishable from biological roots.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“From the prosthetic perspective, our goal is absolute aesthetic harmony. We fabricate individual custom zirconia abutments that support the delicate emergence profile of your marginal gingiva. No gray lines, no artificial gum recession—only a radiant, natural tooth that blends seamlessly into your smile.”',
    },
  },
  {
    id: 'maxillofacial',
    title: 'Oral & Maxillofacial Surgery',
    subtitle: 'Hospital-Grade Surgical Operatory',
    category: 'Implantology & Surgery',
    fullDescription:
      'Advanced surgical interventions for deeply impacted wisdom teeth, benign jaw cysts, ameloblastomas, facial bone fractures, and pre-malignant oral mucosal lesions under strict sterile theatre conditions.',
    highlights: [
      'Atraumatic Piezosurgical Wisdom Tooth Sectioning',
      'Odontogenic Cyst Enucleation with Carnoy’s Fixation',
      'Facial Trauma Management & Zygomatic Fixation',
      'Histopathological Biopsy & Early Oral Cancer Screening',
    ],
    duration: '30–90 Minutes',
    anesthesia: 'Profound Nerve Block with Vasoconstrictor Optimization',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“Impacted mandibular third molars often rest millimeters from the inferior alveolar nerve bundle. Through high-magnification surgical visualization and ultrasonic piezosurgery, we isolate and remove the tooth while fully safeguarding neurosensory integrity. Post-operative swelling is minimized, allowing rapid recovery within 48 to 72 hours.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“Surgery and restorative preservation work hand-in-hand. When cysts or surgical lesions affect adjacent teeth, we perform simultaneous apicoectomy and retro-filling using bioactive mineral trioxide aggregate (MTA), saving natural roots that other clinics would routinely sacrifice.”',
    },
  },
  {
    id: 'laser',
    title: 'Japanese Laser Dentistry',
    subtitle: 'Zero-Blood, Pain-Free Soft Tissue Precision',
    category: 'Restorative & Laser',
    fullDescription:
      'Directly utilizing techniques from advanced laser training in Tokyo, Japan. Specialized soft-tissue diodes vaporize bacteria, coagulate capillaries instantly, and reshape gummy smile architecture without scalpel blades or sutures.',
    highlights: [
      'Gummy Smile Aesthetic Gingivectomy without Bleeding',
      'Melanin Pigment Depigmentation (Pink Gum Restorations)',
      'Subgingival Laser Pocket Sterilization (LANAP equivalent)',
      'Aphthous Ulcer & TMJ Pain Low-Level Laser Therapy (LLLT)',
    ],
    duration: '20–35 Minutes',
    anesthesia: 'Topical Anesthetic Gel / Minimal Infiltration',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“Our Tokyo laser protocols revolutionize surgical recovery. Because the laser beam seals lymphatics and micro-vessels upon contact, there is virtually zero bleeding during surgery and remarkably negligible inflammatory discomfort post-operatively. Patients resume normal eating and speaking immediately.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“Laser technology is equally transformative in aesthetic dentistry. When preparing teeth for porcelain veneers, laser sulcular troughing delivers pristine impressions without gum bleeding. We also use laser photodynamic energy to sterilize refractory root canals deep inside dentinal tubules.”',
    },
  },
  {
    id: 'endodontics',
    title: 'Pain-Free Rotary Root Canal (RCT)',
    subtitle: 'Single-Sitting Microscopic Endodontic Care',
    category: 'Restorative & Laser',
    fullDescription:
      'Preserve your natural tooth through computerized nickel-titanium rotary file systems, 3D warm vertical gutta-percha obturation, and electronic apex location. Cures acute toothache comfortably in just 45 minutes.',
    highlights: [
      'Single-Visit Endodontic Protocol for Busy Professionals',
      'Electronic Apex Locators for Sub-Millimeter Accuracy',
      'Bio-Ceramic Sealer for Hermetic Periapical Seal',
      'Endodontic Retreatment for Failed Prior Canal Fillings',
    ],
    duration: '40–50 Minutes (Single Visit)',
    anesthesia: 'Painless Micro-Syringe Local Anesthesia',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“When deep infections break past the tooth root into the jaw bone causing acute abscesses, surgical decompression combined with Dr. Shanta’s endodontic therapy saves teeth that would otherwise require emergency extraction.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“As an FCPS endodontic specialist, I treat root canals with microscopic precision. Every canal curve, accessory branching, and isthmus is chemomechanically debrided with warm sodium hypochlorite irrigation and sealed with biocompatible silicate ceramics. The procedure is entirely painless.”',
    },
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics & Clear Aligners',
    subtitle: 'Invisible Straightening for Teens & Adults',
    category: 'Orthodontics & Cosmetics',
    fullDescription:
      'Correct crooked, crowded, spaced, or proclined teeth using transparent medical-grade polymer aligners or aesthetic self-ligating ceramic brackets with digital progress simulation.',
    highlights: [
      '100% Invisible Removable Clear Aligners',
      'Self-Ligating Low-Friction Ceramic Brackets',
      'Class II & III Jaw Discrepancy Correction',
      'Digital 3D Smile Trajectory Simulation',
    ],
    duration: '6–18 Months Treatment Plan',
    anesthesia: 'None Required',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“For adult patients presenting with severe skeletal malocclusions or facial asymmetry, we combine orthodontic tooth alignment with minor orthognathic corrective surgery to optimize both airway volume and profile balance.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“Clear aligners are custom-molded to fit snugly over your teeth, gently applying calculated forces to align your smile discreetly. You can remove them for important presentations, meals, and flossing with zero dietary restrictions.”',
    },
  },
  {
    id: 'aesthetic',
    title: 'Cosmetic Smile Makeovers',
    subtitle: 'Ultra-Thin E-max Porcelain Veneers & Whitening',
    category: 'Orthodontics & Cosmetics',
    fullDescription:
      'Comprehensive facial smile design analyzing incisal display, lip dynamics, and tooth proportions. 0.3mm handcrafted lithium disilicate (E-max) veneers and cold-light laser teeth whitening.',
    highlights: [
      'CAD/CAM Monolithic E-max Porcelain Veneers',
      'Digital Smile Design (DSD) Mockup Verification',
      'Laser Accelerated Teeth Whitening (4–8 Shades Lighter)',
      'Direct Multilayered Composite Diastema Closures',
    ],
    duration: '2 Appointments across 5 Days',
    anesthesia: 'Mild / Optional',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“A Hollywood smile is grounded in anatomical stability. Before placing aesthetic veneers, we evaluate the temporomandibular joint (TMJ) and canine guidance to ensure your newly designed smile withstands heavy masticatory forces without chipping.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“Cosmetic veneers are an artistic endeavor. We preserve maximum natural enamel through microscopic enamel feathering, layering translucent opalescent porcelain that captures and reflects light identically to pristine dental enamel.”',
    },
  },
  {
    id: 'prosthodontics',
    title: 'Zirconia Crowns, Bridges & Dentures',
    subtitle: 'CAD/CAM Multi-Layered Natural Restorations',
    category: 'Emergency & General',
    fullDescription:
      'Computer-milled multi-layered translucent Zirconia crowns, porcelain-fused-to-metal bridges, and flexible BPS dentures tailored for natural speech, chewing comfort, and longevity.',
    highlights: [
      'Multi-Layered Monolithic Zirconia (1200 MPa Strength)',
      'Digital Intra-oral Scanning (No Choking Impression Putty)',
      'Full & Partial Flexible Thermoplastic Dentures',
      'Full-Arch Implant-Supported Hybrid Overdentures',
    ],
    duration: '3–5 Business Days',
    anesthesia: 'Standard Local Infiltration',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“Implant-supported zirconia bridges provide elderly patients who suffered tooth loss with a lifetime restoration. No loose dentures or bone shrinkage—chew apples, meat, and nuts with complete peace of mind.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“Every crown we bond is fabricated using sub-micron CAD/CAM milling to ensure an airtight marginal fit. This prevents secondary micro-leakage and bacteria ingress, safeguarding the underlying tooth for decades.”',
    },
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dental Care',
    subtitle: 'Gentle, Fear-Free Treatment for Children',
    category: 'Emergency & General',
    fullDescription:
      'Specialized gentle dentistry designed for infants, children, and teenagers. Establishing positive dental memories through behavioral conditioning, cavity prevention, and space management.',
    highlights: [
      'Painless Child Cavity Treatment & White Fillings',
      'Medical Fluoride Varnish Shield Therapy',
      'Molar Pit & Fissure Deep Groove Sealants',
      'Space Maintainers for Premature Primary Tooth Loss',
    ],
    duration: '20–30 Minutes',
    anesthesia: 'Topical Flavored Anesthetic Gel',
    drAlim: {
      doctorName: 'Assoc. Prof. Dr. Md. Abdul Alim',
      doctorRole: 'Head of Dept. | Oral & Maxillofacial Surgery',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-teeth-41481-large.mp4',
      videoThumbnail: '/dr-alim.jpg',
      aiStreamingText:
        '“Early intervention for pediatric oral trauma, tongue ties (frenectomy), or supernumerary teeth prevents complex orthognathic and speech impairments as the child grows.”',
    },
    drShanta: {
      doctorName: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      doctorRole: 'Head of Dept. | Conservative Dentistry & Endodontics',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-working-in-a-dental-office-41480-large.mp4',
      videoThumbnail: '/dr-shanta.jpg',
      aiStreamingText:
        '“We make dental visits enjoyable for children! By applying high-potency fluoride shields and painless micro-fillings, we safeguard primary teeth until adult teeth erupt in their ideal positions.”',
    },
  },
];
