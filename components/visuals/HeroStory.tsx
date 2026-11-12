'use client';

import { AnimatePresence, m, useScroll, useTransform } from 'motion/react';
import { Check, Instagram, MessageCircle } from 'lucide-react';
import { useRef } from 'react';
import CustomerAvatar from '@/components/ui/CustomerAvatar';
import KomoSymbol from '@/components/ui/KomoSymbol';
import { useMediaQuery, useOnScreen, usePrefersReducedMotion, useSteps } from '@/lib/hooks';

/*
 * The hero picture, told as a short loop in four scenes:
 *  1. convert  – chats that are going nowhere slide into KomoChat and come out handled
 *  2. orbit    – KomoChat answers customers all around it
 *  3. process  – it checks stock and prices in AutoMate
 *  4. connect  – customers on one side, orders in AutoMate and the team in KomoBox on the other
 * KomoChat itself morphs between a tall bar (scene 1) and a round orb (scenes 2–4).
 * Everything here is an illustration with example data.
 */

const STAGES = ['convert', 'orbit', 'process', 'connect'] as const;
const DURATIONS = [7200, 5600, 2800, 6000];
const LABELS: Record<(typeof STAGES)[number], string> = {
  convert: 'Turning chats into orders',
  orbit: 'Answering every customer',
  process: 'Checking stock in AutoMate',
  connect: 'Orders into AutoMate',
};

const LANES = [
  { from: 'Unread at 2 AM', to: 'Replied in Banglish' },
  { from: 'Voice note, no reply', to: 'Product found' },
  { from: 'Same question again', to: 'Answered from your FAQ' },
  { from: 'Order not taken', to: 'Order in AutoMate' },
];

const EASE = [0.65, 0, 0.35, 1] as const;

export default function HeroStory() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref, '0px');
  const reduce = usePrefersReducedMotion();
  const small = useMediaQuery('(max-width: 639px)');
  const idx = useSteps(DURATIONS, on, 3);
  const stage = STAGES[idx];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const swell = useTransform(scrollYProgress, [0.4, 0.85], [1, 1.22]);

  // Sizes for phones (S) and everything wider (D).
  const g = small
    ? { cap: [66, 228, 22], orb: 96, disc: 252, inner: 52, sym: 26, lanes: [-80, -27, 27, 80], r1: 104, r2: 140, av: 40, nx: 126, ny: 92, elbow: 84, arc: [64, 74] }
    : { cap: [84, 300, 28], orb: 120, disc: 360, inner: 64, sym: 32, lanes: [-102, -34, 34, 102], r1: 150, r2: 228, av: 52, nx: 236, ny: 112, elbow: 120, arc: [80, 94] };
  const W = small ? 360 : 1100;
  const H = small ? 440 : 530;
  const orbR = g.orb / 2;
  const isBar = stage === 'convert';

  return (
    <div
      ref={ref}
      data-paused={!on}
      className="relative z-10 mx-auto h-[440px] w-full max-w-[1100px] sm:h-[530px]"
    >
      <p className="sr-only">
        Illustration: messages that would go unanswered pass through KomoChat and come out answered; KomoChat answers
        customers on all sides, checks stock in AutoMate, and sends orders to AutoMate and hand-offs to your team in
        KomoBox.
      </p>

      <div aria-hidden className="absolute inset-0">
        {/* ---------- Scene 1: lanes and pills ---------- */}
        <AnimatePresence>
          {stage === 'convert' && (
            <m.div
              key="convert"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              {g.lanes.map((y, i) => (
                <div key={i}>
                  <span
                    className="absolute left-[-30vw] right-[-30vw] h-[1.5px] bg-[linear-gradient(90deg,transparent,#fff_14%,#fff_86%,transparent)]"
                    style={{ top: `calc(50% + ${y}px)` }}
                  />
                  <m.span
                    className="absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold text-ink shadow-[var(--shadow-float)] sm:gap-2 sm:py-2 sm:pl-2 sm:pr-3.5 sm:text-[13px]"
                    style={{ top: `calc(50% + ${y}px)`, right: `calc(50% + ${g.cap[0] / 2 - 8}px)` }}
                    initial={{ x: '-46vw', opacity: 0 }}
                    animate={{ x: ['-46vw', '2vw'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.6, delay: 0.3 + i * 0.75, ease: 'easeInOut', times: [0, 0.18, 0.86, 1] }}
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-[#e5484d] text-[10px] font-bold leading-none text-white sm:h-[18px] sm:w-[18px]">
                      !
                    </span>
                    {LANES[i].from}
                  </m.span>
                  <m.span
                    className="absolute flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold text-ink shadow-[var(--shadow-float)] sm:gap-2 sm:py-2 sm:pl-2 sm:pr-3.5 sm:text-[13px]"
                    style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${g.cap[0] / 2 - 8}px)` }}
                    initial={{ x: '-2vw', opacity: 0 }}
                    animate={{ x: ['-2vw', '46vw'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.8, delay: 2.65 + i * 0.75, ease: 'easeInOut', times: [0, 0.14, 0.78, 1] }}
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-ok text-white sm:h-[18px] sm:w-[18px]">
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3.5} />
                    </span>
                    {LANES[i].to}
                  </m.span>
                </div>
              ))}
            </m.div>
          )}
        </AnimatePresence>

        {/* ---------- Scene 2: the disc and customers circling ---------- */}
        <AnimatePresence>
          {stage === 'orbit' && (
            <m.div
              key="orbit"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.45 } }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <m.div style={reduce ? undefined : { scale: swell }}>
                  <m.div
                    className="rounded-full border-2 border-white/80 bg-[radial-gradient(circle_at_50%_40%,rgb(196_191_255/0.55)_0%,rgb(140_132_255/0.55)_60%,rgb(91_75_255/0.5)_100%)] shadow-[0_30px_80px_-24px_rgb(91_75_255/0.6),inset_0_0_40px_rgb(255_255_255/0.45)]"
                    style={{ width: g.disc, height: g.disc }}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={reduce ? { scale: 1, opacity: 1 } : { scale: [0.4, 1, 0.86, 1, 0.9], opacity: 1 }}
                    transition={{
                      scale: { duration: 5.2, times: [0, 0.18, 0.45, 0.72, 1], ease: 'easeInOut' },
                      opacity: { duration: 0.5 },
                    }}
                  />
                </m.div>
              </div>

              {/* inner ring of customers */}
              <div className="spin-a absolute left-1/2 top-1/2 h-0 w-0">
                {[30, 120, 210, 300].map((deg, k) => (
                  <OrbitAvatar key={deg} deg={deg} r={g.r1} size={g.av} look={k} delay={0.15 + k * 0.12} rev="spin-a-rev" />
                ))}
                {/* the little square that runs round the ring */}
                <div className="spin-dot absolute left-0 top-0 h-0 w-0">
                  <span className="absolute h-[7px] w-[7px] rounded-[2px] bg-brand" style={{ left: g.r1 * 0.72, top: -g.r1 * 0.72 }} />
                </div>
              </div>
              {/* outer ring */}
              <div className="spin-b absolute left-1/2 top-1/2 h-0 w-0">
                {[75, 165, 255, 345].map((deg, k) => (
                  <OrbitAvatar key={deg} deg={deg} r={g.r2} size={g.av} look={k + 4} delay={0.3 + k * 0.12} rev="spin-b-rev" />
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* ---------- Scene 3: spinning arcs ---------- */}
        <AnimatePresence>
          {stage === 'process' && (
            <m.svg
              key="process"
              className="absolute left-1/2 top-1/2 overflow-visible"
              style={{ width: 240, height: 240, marginLeft: -120, marginTop: -120 }}
              viewBox="-120 -120 240 240"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.35 } }}
              transition={{ duration: 0.45 }}
            >
              <g className="spin-fast" style={{ transformOrigin: '0 0' }}>
                <circle r={g.arc[1]} fill="none" stroke="#5b4bff" strokeWidth="5" strokeLinecap="round" strokeDasharray="70 34 26 160" />
              </g>
              <g className="spin-fast-rev" style={{ transformOrigin: '0 0' }}>
                <circle r={g.arc[0]} fill="none" stroke="#8c84ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 50 90 60" />
              </g>
            </m.svg>
          )}
        </AnimatePresence>

        {/* ---------- Scene 4: connections ---------- */}
        <AnimatePresence>
          {stage === 'connect' && (
            <m.div
              key="connect"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <svg
                className="absolute left-1/2 top-1/2 overflow-visible"
                style={{ width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2 }}
                viewBox={`${-W / 2} ${-H / 2} ${W} ${H}`}
              >
                {[-1, 1].map((side) =>
                  [-1, 0, 1].map((row) => {
                    const d = connectPath(side, row, g, orbR, small);
                    const k = (side + 1) * 1.5 + row + 1;
                    return (
                      <g key={`${side}${row}`}>
                        <m.path
                          d={d}
                          fill="none"
                          stroke="rgb(205 200 255)"
                          strokeWidth="1.6"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.7, delay: 0.25 + k * 0.06, ease: 'easeOut' }}
                        />
                        <path
                          d={d}
                          pathLength={100}
                          fill="none"
                          stroke="#5b4bff"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          className="travel"
                          style={{ animationDelay: `${0.9 + k * 0.28}s`, opacity: reduce ? 0 : 1 }}
                        />
                      </g>
                    );
                  }),
                )}
              </svg>

              {[-1, 0, 1].map((row) => (
                <Placed key={`c${row}`} x={-(g.nx + (row === 0 ? 34 : 0))} y={row * g.ny}>
                  <m.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1 + (row + 1) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <AvatarBubble look={[2, 1, 4][row + 1]} size={g.av} channel={row === 0 ? 'instagram' : 'messenger'} />
                  </m.div>
                </Placed>
              ))}

              {[-1, 0, 1].map((row) => (
                <Placed key={`o${row}`} x={g.nx + (row === 0 ? 34 : 0)} y={row * g.ny} anchor={small ? 'center' : 'left'}>
                  <m.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.5 + (row + 1) * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <Outcome row={row} small={small} />
                  </m.div>
                </Placed>
              ))}
            </m.div>
          )}
        </AnimatePresence>

        {/* ---------- KomoChat: tall bar <-> orb ---------- */}
        <m.div
          className="absolute left-1/2 top-1/2 z-20 grid -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden shadow-[0_24px_50px_-14px_rgb(56_39_200/0.55),0_0_0_6px_rgb(255_255_255/0.7)]"
          initial={false}
          animate={
            isBar
              ? { width: g.cap[0], height: g.cap[1], borderRadius: g.cap[2] }
              : { width: g.orb, height: g.orb, borderRadius: g.orb / 2 }
          }
          transition={{ duration: 0.9, ease: EASE }}
        >
          <m.span
            className="absolute inset-0 bg-[linear-gradient(180deg,#5b4bff_0%,#7d73ff_42%,#c9c5ff_80%,#efeeff_100%)]"
            initial={false}
            animate={{ opacity: isBar ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <m.span
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,#a9a1ff_0%,#5b4bff_52%,#3827c8_100%)]"
            initial={false}
            animate={{ opacity: isBar ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <span
            className="relative grid place-items-center rounded-full bg-white shadow-[inset_0_-4px_10px_rgb(91_75_255/0.18),0_6px_16px_rgb(56_39_200/0.35)]"
            style={{ width: g.inner, height: g.inner }}
          >
            <span className="block" style={{ width: g.sym, height: g.sym }}>
              <KomoSymbol className="h-full w-full text-brand" />
            </span>
          </span>
        </m.div>

        {/* ---------- Status pill ---------- */}
        <AnimatePresence>
          {!isBar && (
            <m.div
              key="pill"
              className="absolute left-1/2 z-30 -translate-x-1/2"
              style={{ top: `calc(50% + ${orbR + 20}px)` }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className="flex h-9 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white px-4 text-[13px] font-semibold text-ink shadow-[var(--shadow-float)] sm:text-sm">
                <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-ok" />
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={stage}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {LABELS[stage]}
                  </m.span>
                </AnimatePresence>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Geo = { orb: number; nx: number; ny: number; elbow: number; av: number };

/** Elbow line between a node and the orb: flat from the node, then straight to the orb's edge. */
function connectPath(side: number, row: number, g: Geo, orbR: number, small: boolean) {
  const y = row * g.ny;
  const nodeX = side * (g.nx + (row === 0 ? 34 : 0));
  // Start just outside the node: avatars are centred on nodeX; desktop outcome tiles start at nodeX.
  const startX = side < 0 || small ? nodeX - side * (g.av / 2 + 6) : nodeX - 6;
  if (row === 0) return `M${startX} 0 L${side * (orbR + 8)} 0`;
  const ex = side * g.elbow;
  const len = Math.hypot(ex, y);
  const endX = (ex / len) * (orbR + 8);
  const endY = (y / len) * (orbR + 8);
  return `M${startX} ${y} L${ex} ${y} L${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

function Placed({
  x,
  y,
  anchor = 'center',
  children,
}: {
  x: number;
  y: number;
  anchor?: 'center' | 'left';
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute -translate-y-1/2 ${anchor === 'center' ? '-translate-x-1/2' : ''}`}
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    >
      {children}
    </div>
  );
}

function AvatarBubble({ look, size, channel }: { look: number; size: number; channel?: 'messenger' | 'instagram' }) {
  const Icon = channel === 'instagram' ? Instagram : MessageCircle;
  return (
    <span
      className="relative block rounded-full bg-white p-[3px] shadow-[0_6px_16px_-4px_rgb(40_30_140/0.35)]"
      style={{ width: size, height: size }}
    >
      <CustomerAvatar look={look} className="h-full w-full rounded-full" />
      {channel && (
        <span className="absolute -bottom-0.5 -right-0.5 grid h-[18px] w-[18px] place-items-center rounded-full bg-white shadow">
          <Icon className="h-2.5 w-2.5 text-brand" strokeWidth={2.6} />
        </span>
      )}
    </span>
  );
}

function OrbitAvatar({
  deg,
  r,
  size,
  look,
  delay,
  rev,
}: {
  deg: number;
  r: number;
  size: number;
  look: number;
  delay: number;
  rev: string;
}) {
  const a = (deg * Math.PI) / 180;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: Math.cos(a) * r, top: Math.sin(a) * r }}
    >
      <div className={rev}>
        <m.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay, ease: [0.2, 0.9, 0.3, 1.2] }}
        >
          <AvatarBubble look={look} size={size} />
        </m.div>
      </div>
    </div>
  );
}

const OUTCOMES = [
  { icon: '/brand/automate-a-blue.svg', title: 'New order', text: 'Coral dress · ৳1,320' },
  { icon: '/brand/automate-a-blue.svg', title: 'New order', text: 'Panjabi · ৳2,110' },
  { icon: '/brand/komobox-k-purple.svg', title: 'To your team', text: 'Sadia wants a person' },
];

function Outcome({ row, small }: { row: number; small: boolean }) {
  const o = OUTCOMES[row + 1];
  if (small) {
    return (
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-[0_6px_16px_-4px_rgb(40_30_140/0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={o.icon} alt="" width={20} height={20} className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[var(--shadow-float)]">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={o.icon} alt="" width={20} height={20} className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold text-muted">{o.title}</span>
        <span className="block text-[13px] font-bold text-ink">{o.text}</span>
      </span>
    </span>
  );
}
