import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Comfort Dental Surgery & Implant Center',
    short_name: 'Comfort Dental',
    description:
      'Dhaka’s premier center for Dental Implants, Japanese Laser Dentistry, and Oral & Maxillofacial Surgery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F9FAFC',
    theme_color: '#007AFF',
    icons: [
      {
        src: '/assets/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
