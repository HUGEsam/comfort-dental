import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0C' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://comfortdentalsurgery.com'),
  title: 'Comfort Dental Surgery & Implant Center | Dr. Md. Abdul Alim & Dr. Kamrun Nahar Shanta',
  description:
    'Dhaka’s premier center for advanced Dental Implants, Japanese Laser Dentistry, and Oral & Maxillofacial Surgery. Directed by Assoc. Prof. Dr. Md. Abdul Alim & Assoc. Prof. Dr. Kamrun Nahar (Shanta). Located at BDDL Basabo Height, Dhaka.',
  keywords: [
    'Comfort Dental Surgery',
    'Dental Implants Dhaka',
    'Dr. Md. Abdul Alim',
    'Dr. Kamrun Nahar Shanta',
    'Oral Maxillofacial Surgery Dhaka',
    'Laser Dentistry Bangladesh',
    'Basabo Dental Clinic',
    'Painless Root Canal Dhaka',
    'Wisdom Tooth Surgery Dhaka',
    'Cosmetic Smile Makeover Bangladesh',
  ],
  authors: [{ name: 'Comfort Dental Surgery & Implant Center' }],
  alternates: {
    canonical: 'https://comfortdentalsurgery.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    url: 'https://comfortdentalsurgery.com',
    title: 'Comfort Dental Surgery & Implant Center | Your Smile is Our Passion',
    description:
      'World-Class Dental Implants, Laser & Maxillofacial Surgery in Dhaka led by Associate Professors Dr. Md. Abdul Alim and Dr. Kamrun Nahar Shanta.',
    images: [
      {
        url: '/assets/logo.png',
        width: 800,
        height: 800,
        alt: 'Comfort Dental Surgery & Implant Center Official Crest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comfort Dental Surgery & Implant Center | Dhaka',
    description:
      'Advanced Dental Implants, Japanese Laser Dentistry & Maxillofacial Care in Dhaka. Directed by Associate Professors.',
    images: ['/assets/logo.png'],
  },
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

const clinicSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  '@id': 'https://comfortdentalsurgery.com/#clinic',
  name: 'Comfort Dental Surgery & Implant Center',
  alternateName: 'কমফোর্ট ডেন্টাল সার্জারি অ্যান্ড ইমপ্ল্যান্ট সেন্টার',
  url: 'https://comfortdentalsurgery.com',
  logo: 'https://comfortdentalsurgery.com/assets/logo.png',
  image: 'https://comfortdentalsurgery.com/images/hero-clinic.webp',
  description:
    'Dhaka’s premier center for advanced Swiss Dental Implants, Japanese Laser Dentistry, and Oral & Maxillofacial Surgery. Directed by Assoc. Prof. Dr. Md. Abdul Alim & Assoc. Prof. Dr. Kamrun Nahar (Shanta). Established in 2004.',
  telephone: '+8801778320966',
  email: 'dralim.comfort79@gmail.com',
  priceRange: '$$',
  currenciesAccepted: 'BDT',
  paymentAccepted: 'Cash, Credit Card, bKash, Nagad',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'BDDL Basabo Height, 1 Central Basabo, 2nd Floor (East Side)',
    addressLocality: 'Basabo, Dhaka',
    postalCode: '1214',
    addressCountry: 'BD',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.7371,
    longitude: 90.4312,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '13:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '16:00',
      closes: '23:59',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '16:00',
      closes: '23:00',
    },
  ],
  medicalSpecialty: [
    'Dentistry',
    'OralAndMaxillofacialSurgery',
    'Endodontics',
    'Periodontics',
    'Orthodontics',
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Dental Implants Surgery',
      description: 'Swiss & German biocompatible titanium and zirconia implants with computer-guided flapless placement.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Oral & Maxillofacial Surgery',
      description: 'Surgical extraction of impacted wisdom teeth, jaw cyst enucleation, and facial trauma reconstruction.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Japanese Laser Dentistry',
      description: 'Painless laser gum treatment, depigmentation, and laser-assisted surgical disinfection.',
    },
    {
      '@type': 'MedicalProcedure',
      name: 'Pain-Free Microscopic Endodontics (Root Canal)',
      description: 'Single-visit rotary root canal therapy with apex locator precision and 3D warm vertical obturation.',
    },
  ],
  founder: [
    {
      '@type': 'Physician',
      name: 'Assoc. Prof. Dr. Md. Abdul Alim',
      jobTitle: 'Head of Dept. | Oral & Maxillofacial Surgery',
      medicalSpecialty: 'Oral & Maxillofacial Surgery',
      description: 'Associate Prof. & Head of Oral & Maxillofacial Surgery at MH Samorita Medical College Hospital, Dental Unit.',
    },
    {
      '@type': 'Physician',
      name: 'Assoc. Prof. Dr. Kamrun Nahar (Shanta)',
      jobTitle: 'Head of Dept. | Conservative Dentistry & Endodontics',
      medicalSpecialty: 'Conservative Dentistry & Endodontics',
      description: 'Associate Prof. & Head of Conservative Dentistry & Endodontics at MH Samorita Medical College Hospital Dental Unit.',
    },
  ],
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://comfortdentalsurgery.com#appointment',
      inLanguage: ['en', 'bn'],
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
        'http://schema.org/IOSPlatform',
        'http://schema.org/AndroidPlatform',
      ],
    },
    result: {
      '@type': 'Reservation',
      name: 'Chamber Dental Appointment',
    },
  },
  sameAs: ['https://www.facebook.com/ComfortDentelSurgery'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#F9FAFC] text-[#0A0A0C] antialiased selection:bg-[#0071E3] selection:text-white pb-24 md:pb-0">
        <AppProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AppProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
