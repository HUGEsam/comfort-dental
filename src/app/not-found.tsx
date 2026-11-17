import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9FAFC] text-[#0A0A0C] flex items-center justify-center p-6">
      <div className="squircle-card max-w-md w-full p-8 text-center space-y-5">
        <div className="btn-liquid-chip inline-flex items-center px-3.5 py-1 text-xs font-bold">
          404 • Page Not Found
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          We couldn&apos;t find that page
        </h1>
        <p className="text-sm text-[rgba(10,10,12,0.65)] leading-relaxed">
          The page you requested may have moved. Return to Comfort Dental Surgery & Implant Center to view treatments or book a chamber visit.
        </p>
        <div className="pt-2">
          <Link href="/" className="btn-water-primary inline-flex items-center justify-center px-6 py-3 text-sm">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
