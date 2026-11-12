'use client';

import { BadgePercent, BookOpenCheck, Image as ImageIcon, ShoppingBag, Tag, UserRound } from 'lucide-react';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import PillLink from '@/components/ui/PillLink';
import {
  BargainDemo,
  FaqDemo,
  HandoffDemo,
  OrderDemo,
  PhotoDemo,
  PriceDemo,
} from '@/components/visuals/SituationDemos';
import { useOnScreen, usePrefersReducedMotion } from '@/lib/hooks';
import { SIGN_UP_URL } from '@/lib/links';

const MOMENTS = [
  {
    tab: 'Price and stock',
    icon: Tag,
    title: 'Answers with your real prices',
    text: 'Price, sizes and stock come from your AutoMate catalogue, so every answer is the one you would give yourself.',
    Demo: PriceDemo,
  },
  {
    tab: 'Photos and voice notes',
    icon: ImageIcon,
    title: 'Finds the product from a photo',
    text: 'Customers send a screenshot, a photo or a voice note instead of typing. KomoChat works out which product they mean.',
    Demo: PhotoDemo,
  },
  {
    tab: 'Bargaining',
    icon: BadgePercent,
    title: 'Bargains, but only inside your limit',
    text: 'When a customer asks for less, KomoChat checks the limit you set. It never goes below your lowest price.',
    Demo: BargainDemo,
  },
  {
    tab: 'Your FAQ',
    icon: BookOpenCheck,
    title: 'Answers from your own FAQ',
    text: 'Write your answers once: exchange, returns, shop hours. KomoChat uses your words every time someone asks.',
    Demo: FaqDemo,
  },
  {
    tab: 'Taking the order',
    icon: ShoppingBag,
    title: 'Takes the order, start to finish',
    text: 'It collects the name, phone number and full address, confirms the total with delivery, and places the order in AutoMate.',
    Demo: OrderDemo,
  },
  {
    tab: 'Wants a person',
    icon: UserRound,
    title: 'Honest, and hands over when needed',
    text: 'If a customer sincerely asks whether it is a bot, it tells the truth. When a person is needed, the chat goes to your staff in KomoBox.',
    Demo: HandoffDemo,
  },
];

/**
 * Moments in a chat, as tabs. The open tab moves on by itself (a thin bar
 * shows the time left) until someone picks a tab; hovering or focusing the
 * section pauses it.
 */
export default function Situations() {
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = usePrefersReducedMotion();
  const onScreen = useOnScreen(sectionRef, '0px 0px -20% 0px');
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const running = auto && !reduce && onScreen && !paused;

  const choose = (i: number, focus = false) => {
    setAuto(false);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = MOMENTS.length - 1;
    const keys: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      choose(keys[e.key], true);
    }
  };

  // On phones the tabs are one sideways row: keep the open one in view.
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
  }, [active, reduce]);

  const moment = MOMENTS[active];
  const Demo = moment.Demo;

  return (
    <section
      ref={sectionRef}
      id="situations"
      aria-labelledby="situations-title"
      className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="mx-auto max-w-[720px] text-center">
        <h2 id="situations-title" className="h-section reveal text-ink">
          Whatever customers ask, <span className="text-gradient">KomoChat knows what to do</span>
        </h2>
        <p className="reveal mt-4 text-base leading-relaxed text-body sm:text-lg">
          Every answer comes from your products, prices and rules, never from guesses. Pick a moment to see an
          example chat.
        </p>
      </div>

      <div className="reveal mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[280px_1fr] lg:gap-8">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Moments in a chat"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="no-scrollbar relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:self-center lg:overflow-visible lg:px-0"
        >
          {MOMENTS.map((mo, i) => {
            const Icon = mo.icon;
            const selected = i === active;
            return (
              <button
                key={mo.tab}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                className={`relative flex shrink-0 items-center gap-2.5 overflow-hidden rounded-xl px-3.5 py-3 text-left text-[15px] font-semibold transition-[background-color,color,box-shadow] duration-200 ${
                  selected
                    ? 'bg-white text-ink shadow-[var(--shadow-card)]'
                    : 'text-body hover:bg-white/70 hover:text-ink'
                }`}
              >
                <Icon aria-hidden className={`h-[18px] w-[18px] ${selected ? 'text-brand' : 'text-muted'}`} />
                {mo.tab}
                {selected && auto && !reduce && (
                  <span
                    aria-hidden
                    key={active}
                    onAnimationEnd={() => setActive((a) => (a + 1) % MOMENTS.length)}
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-light"
                    style={{ animation: 'progress 6.5s linear forwards', animationPlayState: running ? 'running' : 'paused' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className="card grid overflow-hidden rounded-[28px] md:grid-cols-[1fr_1.05fr]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <h3 key={`t-${active}`} className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
              {moment.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-body">{moment.text}</p>
            <div className="mt-7">
              <PillLink href={SIGN_UP_URL}>Create AutoMate account</PillLink>
            </div>
          </div>
          <div className="dot-grid relative flex min-h-[340px] items-center justify-center bg-brand-50 p-5 sm:p-8">
            <div className="w-full max-w-[340px] rounded-[22px] border border-line bg-white p-3 shadow-[var(--shadow-float)]">
              <div className="flex items-center gap-2 border-b border-line px-1 pb-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/komochat-symbol-purple.svg" alt="" width={20} height={20} className="h-5 w-5" />
                <span className="text-[13px] font-bold text-ink">Your shop</span>
                <span className="ml-auto rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                  Example chat
                </span>
              </div>
              <div key={active} className="flex min-h-[236px] flex-col justify-end gap-2.5 px-1 pt-3">
                <Demo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
