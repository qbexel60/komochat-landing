'use client';

import { AnimatePresence, m } from 'motion/react';
import { Image as ImageIcon, Mic, Smartphone, Type } from 'lucide-react';
import { useRef } from 'react';
import KomoSymbol from '@/components/ui/KomoSymbol';
import { useOnScreen, useSteps } from '@/lib/hooks';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Rings() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-30px] -translate-x-1/2">
      {[360, 260, 170].map((size) => (
        <div
          key={size}
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full border border-brand-200/70"
          style={{ width: size, height: size, top: -size / 2 + 70 }}
        />
      ))}
    </div>
  );
}

export function Bubble({
  from,
  children,
  lang,
}: {
  from: 'customer' | 'bot';
  children: React.ReactNode;
  lang?: 'bn';
}) {
  return from === 'customer' ? (
    <p
      lang={lang}
      className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-[#f0f0f7] px-3 py-2 text-[13px] leading-snug text-ink"
    >
      {children}
    </p>
  ) : (
    <p
      lang={lang}
      className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-[13px] leading-snug text-white"
    >
      {children}
    </p>
  );
}

export function Typing() {
  return (
    <span className="flex h-8 w-14 items-center justify-center gap-1 self-end rounded-2xl rounded-br-md bg-brand-100">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="wave-bar h-1.5 w-1.5 rounded-full bg-brand"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
        />
      ))}
    </span>
  );
}

const pop = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const },
};

/* ------------------------------------------------------------------ */
/* 1. Chats like a person                                              */
/* ------------------------------------------------------------------ */

const CHAT_STEPS = [700, 1000, 1300, 3600];

export function ChatVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const step = useSteps(CHAT_STEPS, on);

  return (
    <div ref={ref} data-paused={!on} aria-hidden className="relative h-full overflow-hidden">
      <Rings />
      <div className="absolute left-1/2 top-5 -translate-x-1/2">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#a9a1ff,#5b4bff_55%,#3827c8)] text-white shadow-[0_0_0_6px_#fff,0_14px_30px_-8px_rgb(91_75_255/0.6)]">
          <span lang="bn" className="text-[28px] font-semibold leading-none">
            অ
          </span>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-5 mx-auto flex h-[132px] max-w-[330px] flex-col justify-end gap-2 rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-float)]">
        <AnimatePresence initial={false}>
          {step >= 1 && (
            <m.div key="c" {...pop} className="flex flex-col">
              <Bubble from="customer">Apu, eta ki available? Kalo ta</Bubble>
            </m.div>
          )}
          {step === 2 && (
            <m.div key="t" {...pop} className="flex flex-col">
              <Typing />
            </m.div>
          )}
          {step >= 3 && (
            <m.div key="b" {...pop} className="flex flex-col">
              <Bubble from="bot">Ji apu, kalo ta ache! 😊 M ar L size ache, konta lagbe?</Bubble>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Sees photos, hears voice notes                                   */
/* ------------------------------------------------------------------ */

const NODES = [
  { icon: ImageIcon, label: 'Photo', x: 18, y: 24 },
  { icon: Mic, label: 'Voice note', x: 82, y: 24 },
  { icon: Type, label: 'Typos', x: 18, y: 76 },
  { icon: Smartphone, label: 'Screenshot', x: 82, y: 76 },
];
const SENSE_STEPS = [1500, 1500, 1500, 1500];

export function SensesVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const active = useSteps(SENSE_STEPS, on, -1);

  return (
    <div ref={ref} data-paused={!on} aria-hidden className="relative h-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#e7e4ff_0%,#f1f0ff_60%,rgba(255,255,255,0)_72%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {NODES.map((n, i) => (
          <line
            key={n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            vectorEffect="non-scaling-stroke"
            className="dash-flow transition-[stroke] duration-500"
            stroke={active === i ? '#5b4bff' : '#c4bfff'}
            strokeWidth={active === i ? 2 : 1.5}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,#a9a1ff,#5b4bff_55%,#3827c8)] shadow-[0_0_0_6px_#fff,0_14px_30px_-8px_rgb(91_75_255/0.6)]">
        <KomoSymbol className="h-8 w-8 text-white" />
      </div>
      {NODES.map((n, i) => {
        const Icon = n.icon;
        const lit = active === i;
        return (
          <div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-full bg-white shadow-[var(--shadow-float)] ring-2 transition-[box-shadow,transform] duration-500 ${
                lit ? 'scale-110 ring-brand' : 'ring-white'
              }`}
            >
              <Icon className="h-5 w-5 text-brand" />
            </span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-body shadow-sm">
              {n.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Takes the order into AutoMate                                    */
/* ------------------------------------------------------------------ */

const ORDERS = [
  { name: 'Nusrat J.', item: 'Coral dress · M', total: '৳1,320', area: 'Mirpur 10, Dhaka', time: '2:17 AM', via: 'Messenger' },
  { name: 'Tanvir H.', item: 'Panjabi · L', total: '৳2,110', area: 'Agrabad, Chattogram', time: '3:05 AM', via: 'Instagram' },
  { name: 'Mitu R.', item: 'Ceramic mug set', total: '৳920', area: 'Dhanmondi, Dhaka', time: '6:42 AM', via: 'Messenger' },
];
const ORDER_STEPS = [2800, 2800, 2800];

export function OrdersVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const i = useSteps(ORDER_STEPS, on, 0);
  const o = ORDERS[i];

  return (
    <div ref={ref} aria-hidden className="relative h-full overflow-hidden">
      <Rings />
      <div className="absolute inset-x-5 top-1/2 mx-auto max-w-[300px] -translate-y-[42%]">
        {/* Cards waiting behind */}
        <div className="absolute inset-x-6 -top-5 h-24 rounded-2xl border border-line bg-white/80 shadow-sm" />
        <div className="absolute inset-x-3 -top-2.5 h-24 rounded-2xl border border-line bg-white shadow-sm" />
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={i}
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/automate-a-blue.svg" alt="" width={20} height={20} className="h-5 w-5" />
                <span className="text-xs font-bold text-ink">New order</span>
              </span>
              <span className="text-[11px] font-medium text-muted">{o.time}</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-ink">{o.name}</p>
            <p className="text-[13px] text-body">
              {o.item} · {o.area}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm font-bold text-ink">{o.total}</span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand">COD</span>
              <span className="rounded-full bg-[#eaf7ef] px-2 py-0.5 text-[11px] font-semibold text-ok">
                via {o.via}
              </span>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted shadow-sm">
        Example orders
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Bargains only inside your limit                                  */
/* ------------------------------------------------------------------ */

const GAUGE_STEPS = [1600, 1400, 2800];
/** Example shop: price ৳1,250, lowest allowed ৳1,200. Gauge spans ৳1,100–৳1,300. */
const angleFor = (price: number) => ((price - 1100) / 200) * 180;

export function LimitGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const step = useSteps(GAUGE_STEPS, on);
  const atLimit = step >= 1;

  return (
    <div ref={ref} aria-hidden className="relative flex h-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-[58%] rounded-full bg-[radial-gradient(circle,#efedff_0%,rgba(255,255,255,0)_70%)]" />
      <svg viewBox="0 0 240 146" className="relative w-[250px] max-w-full">
        <defs>
          <linearGradient id="gauge-ok" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8c84ff" />
            <stop offset="1" stopColor="#5b4bff" />
          </linearGradient>
        </defs>
        {/* Below the limit: never */}
        <path d="M24 124 A96 96 0 0 1 120 28" fill="none" stroke="#ebeaf3" strokeWidth="16" />
        {/* Allowed range */}
        <path d="M120 28 A96 96 0 0 1 216 124" fill="none" stroke="url(#gauge-ok)" strokeWidth="16" />
        {/* Ticks */}
        {Array.from({ length: 13 }, (_, k) => {
          const a = (Math.PI * k) / 12;
          const x1 = 120 - Math.cos(a) * 74;
          const y1 = 124 - Math.sin(a) * 74;
          const x2 = 120 - Math.cos(a) * 80;
          const y2 = 124 - Math.sin(a) * 80;
          return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9c6dc" strokeWidth="1.5" strokeLinecap="round" />;
        })}
        {/* The shop's lowest price */}
        <circle cx="120" cy="28" r="7" fill="#fdc448" stroke="#fff" strokeWidth="3" />
        {/* Needle: the invisible circle centres the group's box on the hub, so it turns around the hub */}
        <m.g
          initial={false}
          animate={{ rotate: atLimit ? [angleFor(1250), angleFor(1200), angleFor(1206), angleFor(1200)] : angleFor(1250) }}
          transition={atLimit ? { duration: 1.2, times: [0, 0.7, 0.85, 1], ease: 'easeOut' } : { duration: 0.8 }}
        >
          <circle cx="120" cy="124" r="84" fill="none" />
          <line x1="120" y1="124" x2="44" y2="124" stroke="#0a0e1f" strokeWidth="4" strokeLinecap="round" />
        </m.g>
        <circle cx="120" cy="124" r="10" fill="#0a0e1f" />
        <circle cx="120" cy="124" r="4" fill="#fff" />
      </svg>
      <div className="relative mt-1 flex flex-col items-center">
        <span className="text-2xl font-bold tabular-nums text-ink">{atLimit ? '৳1,200' : '৳1,250'}</span>
        <span className="mt-0.5 text-xs font-semibold text-muted">
          {atLimit ? 'Stops at the lowest price you allow' : 'Customer asks for a lower price'}
        </span>
      </div>
      <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted shadow-sm">
        Example shop
      </span>
    </div>
  );
}
