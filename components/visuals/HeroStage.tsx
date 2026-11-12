'use client';

import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Instagram, MessageCircle, Mic, Shirt } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import KomoSymbol from '@/components/ui/KomoSymbol';

/** What KomoChat is doing, shown one after another under the orb. */
const STATUS = [
  'Listening to a voice note',
  'Finding the dress in your catalogue',
  'Checking stock in AutoMate',
  'Replying in Banglish',
  'Placing the order in AutoMate',
];

/**
 * The hero picture: KomoChat's orb in soft rings, with example messages
 * floating around it. Scrolling past it swells the rings (transform only).
 */
export default function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const onScreen = useInView(ref, { margin: '0px 0px -5% 0px' });
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const swell = useTransform(scrollYProgress, [0.45, 0.85], [1, 1.18]);
  const glow = useTransform(scrollYProgress, [0.45, 0.85], [0.55, 1]);

  useEffect(() => {
    if (reduce || !onScreen) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % STATUS.length), 2400);
    return () => window.clearInterval(t);
  }, [reduce, onScreen]);

  const placed = step === STATUS.length - 1;

  return (
    <div
      ref={ref}
      data-paused={!onScreen}
      className="relative mx-auto mt-10 h-[470px] w-full max-w-[1000px] px-4 sm:mt-14 sm:h-[540px] sm:px-6"
    >
      <p className="sr-only">
        Illustration: KomoChat in the middle, with example customer messages around it: a price question on
        Messenger, a voice note, a product photo, a size question on Instagram, and a new order in AutoMate.
      </p>

      <div aria-hidden className="absolute inset-0">
        {/* Rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <m.div style={reduce ? undefined : { scale: swell }} className="relative grid place-items-center">
            <div className="h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,#eceaff_0%,#f1f0ff_55%,rgba(246,246,255,0)_72%)] sm:h-[600px] sm:w-[600px]" />
            <m.div
              style={reduce ? undefined : { opacity: glow }}
              className="absolute h-[250px] w-[250px] rounded-full bg-[radial-gradient(circle_at_50%_35%,#dcd8ff_0%,#c4bfff_55%,#a9a1ff_100%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.7),0_30px_80px_-20px_rgb(91_75_255/0.45)] sm:h-[360px] sm:w-[360px]"
            />
            <div className="ring-out absolute h-[170px] w-[170px] rounded-full border-2 border-brand-light/50 sm:h-[220px] sm:w-[220px]" />
            <div
              className="ring-out absolute h-[170px] w-[170px] rounded-full border-2 border-brand-light/50 sm:h-[220px] sm:w-[220px]"
              style={{ animationDelay: '2.25s' }}
            />
          </m.div>
        </div>

        {/* Orb */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="float grid h-[124px] w-[124px] place-items-center rounded-full bg-white/70 p-2 shadow-[0_20px_50px_-12px_rgb(56_39_200/0.5)] sm:h-[164px] sm:w-[164px] sm:p-2.5">
            <div className="grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#a9a1ff_0%,#5b4bff_50%,#3827c8_100%)] shadow-[inset_0_2px_10px_rgb(255_255_255/0.35)]">
              <KomoSymbol className="h-12 w-12 text-white sm:h-16 sm:w-16" />
            </div>
          </div>
        </div>

        {/* Status pill under the orb */}
        <div className="absolute left-1/2 top-[calc(50%+86px)] -translate-x-1/2 sm:top-[calc(50%+112px)]">
          <div className="flex h-9 min-w-[236px] items-center gap-2.5 overflow-hidden rounded-full bg-white px-4 text-[13px] font-semibold text-ink shadow-[var(--shadow-float)] sm:text-sm">
            <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-ok" />
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={step}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="whitespace-nowrap"
              >
                {STATUS[step]}
              </m.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Messenger question */}
        <Chip className="left-0 top-[2%] sm:left-[6%] sm:top-[8%]" delay="0s">
          <div className="flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[var(--shadow-float)]">
            <Avatar letter="N" icon="messenger" />
            <div className="text-left leading-tight">
              <p className="text-[11px] font-medium text-muted">Messenger · 2:14 AM</p>
              <p className="text-sm font-semibold text-ink">Dam koto?</p>
            </div>
          </div>
        </Chip>

        {/* Voice note */}
        <Chip className="right-0 top-[16%] sm:right-[8%] sm:top-[14%]" delay="-2s">
          <div className="flex items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 shadow-[var(--shadow-float)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
              <Mic className="h-4 w-4" />
            </span>
            <span className="flex h-6 items-center gap-[3px]">
              {[0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.85, 0.55, 0.75, 0.45].map((h, i) => (
                <span
                  key={i}
                  className="wave-bar w-[3px] rounded-full bg-brand-light"
                  style={{ height: `${h * 22}px`, animationDelay: `${i * -0.11}s` }}
                />
              ))}
            </span>
            <span className="text-xs font-semibold text-muted">0:07</span>
          </div>
        </Chip>

        {/* Product photo */}
        <Chip className="left-[4%] top-[56%] hidden sm:block" delay="-4s">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-2 pr-4 shadow-[var(--shadow-float)]">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-[linear-gradient(150deg,#ffd6c7,#ff9d84)]">
              <Shirt className="h-7 w-7 text-white" strokeWidth={1.75} />
            </span>
            <div className="text-left leading-tight">
              <p className="text-[11px] font-medium text-muted">Photo</p>
              <p className="text-sm font-semibold text-ink">Apu, eta ache?</p>
            </div>
          </div>
        </Chip>

        {/* Instagram question */}
        <Chip className="right-[2%] top-[50%] hidden sm:block" delay="-3s">
          <div className="flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[var(--shadow-float)]">
            <Avatar letter="T" icon="instagram" />
            <div className="text-left leading-tight">
              <p className="text-[11px] font-medium text-muted">Instagram · 11:48 PM</p>
              <p className="text-sm font-semibold text-ink">M size ache?</p>
            </div>
          </div>
        </Chip>

        {/* New order */}
        <Chip className="bottom-0 right-0 sm:bottom-[4%] sm:right-[14%]" delay="-1s">
          <div
            className={`w-[212px] rounded-2xl bg-white p-3 text-left shadow-[var(--shadow-float)] ring-2 transition-[box-shadow] duration-500 ${
              placed ? 'ring-brand/40' : 'ring-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/automate-a-blue.svg" alt="" width={20} height={20} className="h-5 w-5" />
              <p className="text-xs font-bold text-ink">New order in AutoMate</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Coral dress · M · ৳1,320</p>
            <p className="mt-0.5 text-xs text-muted">Cash on delivery · Mirpur 10</p>
            <p className="mt-2 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
              Example
            </p>
          </div>
        </Chip>
      </div>
    </div>
  );
}

function Chip({ className, delay, children }: { className: string; delay: string; children: React.ReactNode }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="float" style={{ animationDelay: delay }}>
        {children}
      </div>
    </div>
  );
}

function Avatar({ letter, icon }: { letter: string; icon: 'messenger' | 'instagram' }) {
  const Icon = icon === 'instagram' ? Instagram : MessageCircle;
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand">
      {letter}
      <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-white shadow-sm">
        <Icon className="h-2.5 w-2.5 text-brand" strokeWidth={2.5} />
      </span>
    </span>
  );
}
