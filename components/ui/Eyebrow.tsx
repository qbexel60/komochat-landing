import type { ReactNode } from 'react';

/** Small white label above a heading, with the KomoChat sparkle. */
export default function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-[var(--shadow-soft)] ${className}`}
    >
      <Sparkle className="h-3.5 w-3.5 text-brand" />
      {children}
    </span>
  );
}

/** KomoChat's four-point star, drawn for small accents. */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}
