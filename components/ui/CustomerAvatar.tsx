/**
 * Simple drawn customer faces for the hero illustration (no stock photos).
 * Each look is our own: background, skin, hair or scarf, and top colour.
 */

type Style = 'short' | 'side' | 'long' | 'curly' | 'hijab' | 'cap';
type Look = { bg: string; skin: string; hair: string; top: string; style: Style };

export const LOOKS: Look[] = [
  { bg: '#e9e7ff', skin: '#c68b67', hair: '#22160f', top: '#5b4bff', style: 'short' },
  { bg: '#ffe7dc', skin: '#b87a56', hair: '#8c2f5a', top: '#ff9a7a', style: 'hijab' },
  { bg: '#dff3ea', skin: '#d9a17c', hair: '#2a1a12', top: '#2f9e6e', style: 'long' },
  { bg: '#fff1cc', skin: '#a8714f', hair: '#1b120d', top: '#3827c8', style: 'side' },
  { bg: '#e3ecff', skin: '#c48662', hair: '#120c08', top: '#f2b544', style: 'curly' },
  { bg: '#f6e3ff', skin: '#b67b58', hair: '#3827c8', top: '#8c84ff', style: 'hijab' },
  { bg: '#e7f6ff', skin: '#cf9671', hair: '#1f1611', top: '#0a0e1f', style: 'cap' },
  { bg: '#ffe9ef', skin: '#d6a07a', hair: '#3b2416', top: '#e0607e', style: 'long' },
];

export default function CustomerAvatar({ look, className = '' }: { look: number; className?: string }) {
  const l = LOOKS[look % LOOKS.length];
  const hijab = l.style === 'hijab';
  const faceY = hijab ? 23.4 : 21.6;
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <circle cx="24" cy="24" r="24" fill={l.bg} />
      {l.style === 'long' && <path d="M13.5 23c0-8 4.7-12.8 10.5-12.8S34.5 15 34.5 23v12.5c-3-1-4.8-4-4.8-8H18.3c0 4-1.8 7-4.8 8z" fill={l.hair} />}
      {hijab && <path d="M12.6 25.5c0-8.6 5.2-14.6 11.4-14.6s11.4 6 11.4 14.6c0 7-4.8 11.4-11.4 12.6-6.6-1.2-11.4-5.6-11.4-12.6z" fill={l.hair} />}
      <path d="M8.5 48c0-9.2 6.9-14.4 15.5-14.4S39.5 38.8 39.5 48z" fill={l.top} />
      {hijab ? (
        <path d="M14.8 35.2c2.6 2.4 5.8 3.6 9.2 4 3.4-.4 6.6-1.6 9.2-4l-2.2-3.6H17z" fill={l.hair} />
      ) : (
        <rect x="21" y="27" width="6" height="8.5" rx="3" fill={l.skin} />
      )}
      <ellipse cx="24" cy={faceY} rx={hijab ? 6.5 : 7} ry={hijab ? 7.1 : 7.6} fill={l.skin} />
      {l.style === 'short' && <path d="M16.7 20.6c-.4-5.7 3-9.1 7.6-9.1 4.8 0 7.9 3.4 7.4 8.7-1.6-2.4-4-3.7-7.6-3.7s-5.9 1.5-7.4 4.1z" fill={l.hair} />}
      {l.style === 'side' && <path d="M16.8 21.6c-.6-6.1 3-9.7 7.8-9.7 4.6 0 7.7 3 7.2 7.9-3.6.3-8.5-1.2-11.3-4-1 2.2-2.1 4.2-3.7 5.8z" fill={l.hair} />}
      {l.style === 'long' && <path d="M16.9 21.2c0-5.6 3.1-8.7 7.1-8.7s7.1 3.1 7.1 8.7c-2.2-2.7-4.5-4.1-7.1-4.1s-4.9 1.4-7.1 4.1z" fill={l.hair} />}
      {l.style === 'curly' && (
        <g fill={l.hair}>
          <circle cx="18" cy="16.4" r="3.4" />
          <circle cx="21.9" cy="13.6" r="3.7" />
          <circle cx="26.4" cy="13.5" r="3.7" />
          <circle cx="30.2" cy="16.6" r="3.3" />
          <circle cx="16.9" cy="20" r="2.4" />
          <circle cx="31.2" cy="20" r="2.4" />
        </g>
      )}
      {l.style === 'cap' && (
        <g>
          <path d="M16.6 19.4c0-4.9 3.3-7.9 7.4-7.9s7.4 3 7.4 7.9z" fill="#5b4bff" />
          <path d="M23 19.1h11.6c.8 0 .8 1.4 0 1.4H23z" fill="#3827c8" />
        </g>
      )}
      {hijab && <path d="M17.2 22.4c.4-5 3.3-7.9 6.8-7.9s6.4 2.9 6.8 7.9" fill="none" stroke={l.hair} strokeWidth="2.4" />}
      <circle cx="21.4" cy={faceY - 0.2} r="0.95" fill="#24170f" />
      <circle cx="26.6" cy={faceY - 0.2} r="0.95" fill="#24170f" />
      <path d={`M21.9 ${faceY + 3}q2.1 1.6 4.2 0`} stroke="#24170f" strokeWidth="0.95" fill="none" strokeLinecap="round" />
    </svg>
  );
}
