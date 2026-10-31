import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import SmoothScroll from '@/components/SmoothScroll';

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
  ],
  authors: [{ name: 'Comfort Dental Surgery & Implant Center' }],
  openGraph: {
    title: 'Comfort Dental Surgery & Implant Center | Your Smile is Our Passion',
    description:
      'World-Class Dental Implants, Laser & Maxillofacial Surgery in Dhaka led by Associate Professors.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="min-h-screen bg-white text-[#374151] antialiased selection:bg-[#00A8E8] selection:text-white pb-16 md:pb-0">
        <AppProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
