import React from 'react';

export function FacebookIcon({ className = 'w-4 h-4', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'w-4 h-4', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function GoogleMapsIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.13 11.53 7.43 11.8a.86.86 0 0 0 1.14 0C12.87 21.53 20 15.25 20 10c0-4.42-3.58-8-8-8z"
        fill="#EA4335"
      />
      <circle cx="12" cy="10" r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

export function WhatsAppIcon({ className = 'w-4 h-4', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.634-.929-2.238-.244-.589-.493-.509-.678-.518-.175-.009-.377-.009-.578-.009s-.527.075-.803.377c-.276.301-1.054 1.03-1.054 2.511s1.079 2.912 1.23 3.113c.15.201 2.123 3.243 5.143 4.548.718.311 1.279.497 1.716.636.722.23 1.378.197 1.898.12.579-.086 1.78-.728 2.031-1.431.251-.703.251-1.306.176-1.431-.076-.126-.277-.201-.578-.352zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.884.524 3.655 1.455 5.178L2 22l4.981-1.433c1.464.845 3.149 1.445 5.059 1.445 5.524 0 10.012-4.488 10.012-10.012C22.052 6.488 17.564 2 12.04 2z" />
    </svg>
  );
}
