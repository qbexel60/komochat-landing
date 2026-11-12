'use client';

import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { BookOpenCheck, Instagram, MessageCircle, Mic, PackageCheck, Settings, UsersRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useOnScreen } from '@/lib/hooks';

/** One example night in a shop's inbox, newest on top. */
const EVENTS = [
  { icon: MessageCircle, title: 'Replied on Messenger', sub: '1:52 AM · "Dam koto?"' },
  { icon: Mic, title: 'Understood a voice note', sub: '2:14 AM · Coral dress, size M' },
  { icon: PackageCheck, title: 'Order placed in AutoMate', sub: '2:17 AM · ৳1,320 · Cash on delivery' },
  { icon: BookOpenCheck, title: 'Answered from your FAQ', sub: '3:02 AM · Exchange policy' },
  { icon: Instagram, title: 'Replied on Instagram', sub: '3:40 AM · "M size ache?"' },
  { icon: UsersRound, title: 'Handed to your team', sub: '4:05 AM · Waiting in KomoBox' },
];
const SHOWN = 3;
const ROW = 64;

/**
 * The floating "KomoChat" card: an auto-reply switch and a live feed of
 * what it did overnight. A new line slides in on top every few seconds.
 */
export default function ActivityFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const reduce = useReducedMotion();
  const [head, setHead] = useState(SHOWN - 1);

  useEffect(() => {
    if (reduce || !on) return;
    const t = window.setInterval(() => setHead((h) => h + 1), 2600);
    return () => window.clearInterval(t);
  }, [reduce, on]);

  // Newest first: head, head-1, head-2 (wrapping through the list).
  const rows = Array.from({ length: SHOWN }, (_, k) => {
    const n = head - k;
    return { n, ...EVENTS[((n % EVENTS.length) + EVENTS.length) % EVENTS.length] };
  });

  return (
    <div ref={ref} className="w-full rounded-[20px] border border-line bg-white p-4 shadow-[var(--shadow-float)]">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/komochat-symbol-purple.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
          KomoChat
        </p>
        <Settings aria-hidden className="h-4 w-4 text-muted" />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
        <span className="text-[13px] font-semibold text-ink">Auto-reply is on</span>
        <span aria-hidden className="relative h-5 w-9 rounded-full bg-brand">
          <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow" />
        </span>
      </div>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted">Tonight · example</p>
      <ul className="relative mt-2 overflow-hidden" style={{ height: SHOWN * ROW - 8 }} aria-label="Example activity overnight">
        <AnimatePresence initial={false}>
          {rows.map((row, k) => {
            const Icon = row.icon;
            return (
              <m.li
                key={row.n}
                initial={{ opacity: 0, y: -ROW }}
                animate={{ opacity: 1, y: k * ROW }}
                exit={{ opacity: 0, y: SHOWN * ROW }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-x-0 top-0 flex h-14 items-center gap-3 rounded-xl bg-brand-50 px-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm">
                  <Icon aria-hidden className="h-4 w-4" />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[13px] font-semibold text-ink">{row.title}</span>
                  <span className="block truncate text-xs text-muted">{row.sub}</span>
                </span>
                <svg aria-hidden viewBox="0 0 16 16" className="ml-auto h-4 w-4 shrink-0 text-ok">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </m.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
