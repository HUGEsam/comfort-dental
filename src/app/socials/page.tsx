import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import SocialsDigitalHub from '@/components/sections/SocialsDigitalHub';
import CountrySelectorModal from '@/components/modals/CountrySelectorModal';
import ServiceModal from '@/components/modals/ServiceModal';
import ThreeDotDrawer from '@/components/modals/ThreeDotDrawer';
import AuthModal from '@/components/modals/AuthModal';

export const metadata: Metadata = {
  title: 'Official Socials & Academic Hub | Comfort Dental Surgery & Implant Center',
  description:
    'Connect directly with Comfort Dental Surgery on Facebook, Google Maps GPS, and Instagram. Explore our Doctors Directory, and academic portals of Assoc. Prof. Dr. Md. Abdul Alim & Assoc. Prof. Dr. Kamrun Nahar Shanta.',
  openGraph: {
    title: 'Official Socials & Academic Hub | Comfort Dental Surgery',
    description:
      'Verified social channels, Google Maps directions, Instagram doctors directory, and professors academic publications.',
    images: ['/assets/logo.png'],
  },
};

export default function SocialsPage() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#0071E3] selection:text-white relative bg-[#FFFFFF] transition-colors duration-300">
      <Navbar />

      {/* Spacer for fixed floating navbar */}
      <div className="h-28 sm:h-36" />

      {/* Main Socials & Digital Hub Component */}
      <div className="flex-1">
        <SocialsDigitalHub isStandalonePage={true} />
      </div>

      <Footer />

      {/* Global Interactive Overlays */}
      <CountrySelectorModal />
      <ServiceModal />
      <ThreeDotDrawer />
      <AuthModal />
      <FloatingWidgets />
    </main>
  );
}
