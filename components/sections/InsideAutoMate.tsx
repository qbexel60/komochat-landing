'use client';

import { AnimatePresence, m } from 'motion/react';
import { Check } from 'lucide-react';
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';

type Tab = {
  label: string;
  icon: string;
  heading: string;
  text: string;
  Mock: () => ReactNode;
};

const TABS: Tab[] = [
  {
    label: 'KomoChat sells',
    icon: '/brand/komochat-symbol-light-purple.svg',
    heading: 'It sells in your inbox.',
    text: 'KomoChat answers customers on Messenger and Instagram and takes the order, using the products, prices and stock in your AutoMate catalogue.',
    Mock: ChatMock,
  },
  {
    label: 'AutoMate runs the shop',
    icon: '/brand/automate-a-light-blue.svg',
    heading: 'Orders land where you already work.',
    text: 'Every order KomoChat takes appears in AutoMate with the product, price and address, next to the rest of your orders, stock and deliveries.',
    Mock: OrdersMock,
  },
  {
    label: 'KomoBox for your team',
    icon: '/brand/komobox-k-light-purple.svg',
    heading: 'Your team steps in when it matters.',
    text: "Complaints, special requests or anything KomoChat can't handle go to your staff in KomoBox, the team inbox, with the whole chat so far.",
    Mock: InboxMock,
  },
];

/** The rest of Qbexel's family, with the same status words on every product page. */
const FAMILY: { name: string; logo: { src: string; w: number }; status: string; live: boolean; text: string }[] = [
  {
    name: 'AutoMate',
    logo: { src: '/brand/automate-logo-color-on-dark.svg', w: 703 },
    status: 'Live',
    live: true,
    text: 'Orders, couriers, cash on delivery, stock and profit in one app. KomoChat runs inside it.',
  },
  {
    name: 'KomoBox',
    logo: { src: '/brand/komobox-logo-color-on-dark.svg', w: 692 },
    status: 'Live in AutoMate',
    live: true,
    text: 'The team inbox for Messenger and Instagram, where KomoChat hands chats to your staff.',
  },
  {
    name: 'KomoVoice',
    logo: { src: '/brand/komovoice-logo-color-on-dark.svg', w: 825 },
    status: 'Live',
    live: true,
    text: 'The AI phone agent. It calls customers in Bangla to confirm cash-on-delivery orders.',
  },
  {
    name: 'Eastrak',
    logo: { src: '/brand/eastrak-logo-color-on-dark.svg', w: 551 },
    status: 'Early access',
    live: false,
    text: 'Server-side tracking for your ads, so Meta, Google and TikTok see every sale.',
  },
];

/** Dark band: how KomoChat fits with AutoMate and KomoBox, as three tabs, then the rest of the family. */
export default function InsideAutoMate() {
  const id = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = TABS.length - 1;
    let next = -1;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  const tab = TABS[active];
  const Mock = tab.Mock;

  return (
    <section id="automate" aria-labelledby="automate-title" className="px-2 pt-24 sm:px-4 sm:pt-32">
      <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[32px] bg-night px-4 py-16 sm:rounded-[40px] sm:px-8 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_50%_0%,rgb(91_75_255/0.35)_0%,rgb(56_39_200/0.12)_45%,transparent_75%)]"
        />
        <div className="relative mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="reveal mx-auto flex w-fit items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/85">
              Runs inside
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/automate-logo-color-on-dark.svg" alt="AutoMate" width={88} height={19} className="h-[19px] w-auto" />
            </p>
            <h2 id="automate-title" className="h-section reveal mt-5 text-white">
              Part of AutoMate. <br className="hidden sm:block" />
              Built to work with your team.
            </h2>
            <p className="reveal mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              KomoChat is one part of Qbexel&apos;s connected tools. One AutoMate account covers it, so there is no
              separate app to learn.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="How KomoChat works with AutoMate and KomoBox"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0"
          >
            {TABS.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-brand-light ${
                    selected
                      ? 'border-brand bg-brand text-white'
                      : 'border-white/15 text-white/75 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.icon} alt="" width={18} height={18} className={`h-[18px] w-[18px] ${selected ? 'brightness-0 invert' : ''}`} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className="mt-8">
            <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(90%_80%_at_50%_100%,#2a1f9e_0%,#141050_45%,#0a0e2a_100%)] px-4 py-10 sm:min-h-[440px] sm:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]"
              />
              <span className="absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
                Example
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative flex w-full justify-center"
                >
                  <Mock />
                </m.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-10">
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">{tab.heading}</h3>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">{tab.text}</p>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-10 sm:mt-16 sm:pt-12">
            <h3 className="reveal text-center text-lg font-bold tracking-tight text-white sm:text-xl">The Qbexel family</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {FAMILY.map((p, i) => (
                <li
                  key={p.name}
                  className="reveal rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  style={{ '--d': `${i * 0.06}s` } as CSSProperties}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo.src} alt={p.name} width={p.logo.w} height={152} className="h-[19px] w-auto" />
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold ${
                        p.live ? 'bg-[#1f9d55]/15 text-[#6fdc9b]' : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {p.live && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#3ccb7f]" />}
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Mock screens (example data) ---------------- */

function ChatMock() {
  return (
    <div className="relative w-full max-w-[360px]">
      <div className="rounded-[22px] bg-white p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/komochat-symbol-purple.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">Your shop</p>
            <p className="text-[11px] text-muted">Messenger · replied by KomoChat</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-3 text-[13px] leading-snug">
          <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-[#f0f0f7] px-3 py-2 text-ink">Coral dress ta M size e ache?</p>
          <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white">
            Ji apu, ache 😊 Dam ৳1,250. Order korben?
          </p>
          <p className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-[#f0f0f7] px-3 py-2 text-ink">Ji, korbo</p>
          <p className="mt-1 flex items-center gap-1.5 self-center rounded-full bg-[#eaf7ef] px-3 py-1 text-xs font-semibold text-ok">
            <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} /> Order placed in AutoMate
          </p>
        </div>
      </div>
    </div>
  );
}

const ORDER_ROWS = [
  { name: 'Nusrat Jahan', item: 'Coral dress · M', total: '৳1,320', status: 'New', komo: true },
  { name: 'Rafiq Ahmed', item: 'Panjabi · L', total: '৳2,110', status: 'Confirmed' },
  { name: 'Sadia Islam', item: 'Ceramic mug set', total: '৳920', status: 'Shipped' },
];

function OrdersMock() {
  return (
    <div className="w-full max-w-[560px] rounded-[22px] bg-white p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] sm:p-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/automate-logo-color-on-light.svg" alt="AutoMate" width={92} height={20} className="h-5 w-auto" />
        <p className="text-xs font-semibold text-muted">Orders · today</p>
      </div>
      <ul className="mt-2 divide-y divide-line">
        {ORDER_ROWS.map((row) => (
          <li
            key={row.name}
            className={`flex items-center gap-3 rounded-xl px-2 py-3 ${row.komo ? 'bg-brand-50' : ''}`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand">
              {row.name[0]}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="truncate">{row.name}</span>
                {row.komo && (
                  <span className="hidden shrink-0 items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-brand shadow-sm sm:inline-flex">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/komochat-symbol-purple.svg" alt="" width={10} height={10} className="h-2.5 w-2.5" />
                    from KomoChat
                  </span>
                )}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted">
                {row.item} · {row.total} · COD
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                row.status === 'New'
                  ? 'bg-brand text-white'
                  : row.status === 'Confirmed'
                    ? 'bg-[#fff4d6] text-[#8a6100]'
                    : 'bg-[#eaf7ef] text-ok'
              }`}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InboxMock() {
  return (
    <div className="w-full max-w-[560px] rounded-[22px] bg-white p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] sm:p-5">
      <div className="flex items-center justify-between border-b border-line pb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/komobox-logo-color-on-light.svg" alt="KomoBox" width={91} height={20} className="h-5 w-auto" />
        <p className="text-xs font-semibold text-muted">Team inbox</p>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[180px_1fr]">
        <ul className="flex flex-col gap-1.5">
          {[
            { n: 'Sadia I.', t: 'Wants to talk to a person', on: true },
            { n: 'Karim U.', t: 'Answered by KomoChat' },
            { n: 'Mim A.', t: 'Answered by KomoChat' },
          ].map((c) => (
            <li key={c.n} className={`rounded-xl px-3 py-2 ${c.on ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}>
              <p className="text-[13px] font-semibold text-ink">{c.n}</p>
              <p className="truncate text-[11px] text-muted">{c.t}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 rounded-xl bg-[#f7f7fb] p-3 text-[12px] leading-snug">
          <p className="self-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand shadow-sm">
            Handed over by KomoChat
          </p>
          <p lang="bn" className="max-w-[90%] self-start rounded-2xl rounded-bl-md bg-white px-3 py-2 text-ink shadow-sm">
            হ্যাঁ, একজনের সাথে কথা বলতে চাই।
          </p>
          <p className="mt-auto rounded-lg border border-line bg-white px-3 py-2 text-muted">Your staff reply here…</p>
        </div>
      </div>
    </div>
  );
}
