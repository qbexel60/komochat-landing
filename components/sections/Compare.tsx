'use client';

import {
  AnimatePresence,
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { ArrowRight, Check, Clock3, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import KomoSymbol from '@/components/ui/KomoSymbol';

type Step = { title: string; text: string; at: number };

const hm = (h: number, min: number) => h * 60 + min;
const START = hm(2, 14);

/** An example night: a voice note about a dress arrives at 2:14 AM. Times are part of the example. */
const BY_HAND: Step[] = [
  { title: 'The message waits', text: 'It arrived at 2:14 AM. You see it when you wake up.', at: hm(9, 5) },
  { title: 'Play the voice note, find the dress', text: 'Scroll back through your posts to work out which one they mean.', at: hm(9, 12) },
  { title: 'Check the stock', text: 'Open the stock sheet or call the warehouse: is M size left?', at: hm(9, 21) },
  { title: 'Type the price and delivery charge', text: 'The same answer you have typed again and again.', at: hm(9, 25) },
  { title: 'Wait for a reply', text: 'The customer has gone quiet. Maybe they bought from another page.', at: hm(11, 40) },
  { title: 'Ask for name, phone and address', text: 'Often in three separate messages.', at: hm(11, 52) },
  { title: 'Copy it into your order list', text: 'And fix the typos in the address.', at: hm(12, 6) },
];

const WITH_KOMOCHAT: Step[] = [
  { title: 'Replies right away', text: 'Understands the voice note and answers in Banglish.', at: hm(2, 14) },
  { title: 'Finds the dress, checks stock', text: 'Price, sizes and stock come from your AutoMate catalogue.', at: hm(2, 14) },
  { title: 'Shares price and delivery charge', text: 'Your own charges, inside and outside Dhaka.', at: hm(2, 15) },
  { title: 'Takes the order', text: 'Collects name, phone and address and places the order in AutoMate.', at: hm(2, 17) },
];

const clock = (minutes: number) => {
  const total = Math.floor(minutes);
  const h24 = Math.floor(total / 60) % 24;
  const min = total % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(min).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`;
};

export default function Compare() {
  const [run, setRun] = useState(0);
  const [finished, setFinished] = useState({ hand: false, komo: false });

  return (
    <section id="compare" aria-labelledby="compare-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="reveal flex items-center justify-center gap-2 text-sm font-semibold text-body">
          By hand <ArrowRight aria-hidden className="h-4 w-4 text-brand" /> With KomoChat
        </p>
        <h2 id="compare-title" className="h-section reveal mt-3 text-ink">
          One order at 2:14 AM. <span className="text-gradient">Two very different mornings.</span>
        </h2>
        <p className="reveal mt-4 text-base leading-relaxed text-body sm:text-lg">
          An example night: a customer sends a voice note asking about a dress.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
        <Column
          kind="hand"
          title="By hand"
          subtitle="You, the next morning"
          steps={BY_HAND}
          stepMs={1250}
          run={run}
          onDone={() => setFinished((f) => ({ ...f, hand: true }))}
          result="Order taken at 12:06 PM, if the customer is still there."
        />
        <Column
          kind="komo"
          title="With KomoChat"
          subtitle="While you sleep"
          steps={WITH_KOMOCHAT}
          stepMs={850}
          run={run}
          onDone={() => setFinished((f) => ({ ...f, komo: true }))}
          result="Order waiting in AutoMate before you wake up."
        />
      </div>

      <div className="mt-8 flex h-12 justify-center">
        {finished.hand && finished.komo && (
          <button
            type="button"
            onClick={() => {
              setFinished({ hand: false, komo: false });
              setRun((r) => r + 1);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-[var(--shadow-soft)] transition-colors hover:border-brand-300"
          >
            <RotateCcw aria-hidden className="h-4 w-4 text-brand" />
            Play the night again
          </button>
        )}
      </div>
    </section>
  );
}

function Column({
  kind,
  title,
  subtitle,
  steps,
  stepMs,
  run,
  onDone,
  result,
}: {
  kind: 'hand' | 'komo';
  title: string;
  subtitle: string;
  steps: Step[];
  stepMs: number;
  run: number;
  onDone: () => void;
  result: string;
}) {
  const komo = kind === 'komo';
  const headRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const started = useInView(headRef, { once: true, margin: '0px 0px -30% 0px' });
  const [done, setDone] = useState(0);
  const shown = reduce ? steps.length : done;
  const complete = shown === steps.length;

  // Restart when "play again" is pressed.
  const lastRun = useRef(run);
  useEffect(() => {
    if (run !== lastRun.current) {
      lastRun.current = run;
      setDone(0);
    }
  }, [run]);

  // Tick through the steps once the column is on screen.
  useEffect(() => {
    if (reduce || !started || done >= steps.length) return;
    const t = window.setTimeout(() => setDone((d) => d + 1), done === 0 ? 500 : stepMs);
    return () => window.clearTimeout(t);
  }, [reduce, started, done, steps.length, stepMs]);

  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });
  useEffect(() => {
    if (complete) doneRef.current();
  }, [complete]);

  // The clock rolls forward to the time of the last finished step.
  const target = shown === 0 ? START : steps[shown - 1].at;
  const minutes = useMotionValue(target);
  const label = useTransform(minutes, clock);
  useEffect(() => {
    if (reduce) {
      minutes.set(target);
      return;
    }
    const controls = animate(minutes, target, { duration: 0.8, ease: 'easeOut' });
    return () => controls.stop();
  }, [target, reduce, minutes]);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={headRef}
        className="reveal flex items-center justify-between gap-3 rounded-[20px] border border-line bg-white p-4 shadow-[var(--shadow-card)] sm:p-5"
      >
        <div>
          <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">{title}</h3>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
        <p
          className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold tabular-nums ${
            komo ? 'bg-brand-50 text-brand' : 'bg-[#f1f1f6] text-ink'
          }`}
        >
          <Clock3 aria-hidden className="h-4 w-4" />
          <span className="sr-only">Clock: </span>
          <m.span>{label}</m.span>
        </p>
      </div>

      <ol className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const isDone = i < shown;
          const isActive = i === shown && started && !reduce;
          return (
            <li
              key={step.title}
              className={`rounded-[18px] border bg-white p-4 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-500 ${
                isActive ? (komo ? 'border-brand-300 ring-4 ring-brand/10' : 'border-[#cfd0db] ring-4 ring-ink/5') : 'border-line'
              }`}
            >
              <div className="flex items-start gap-3">
                {komo ? (
                  <KomoSymbol className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" />
                ) : (
                  <Clock3 aria-hidden className="mt-0.5 h-[18px] w-[18px] shrink-0 text-muted" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-ink">
                    {i + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-body">{step.text}</p>
                </div>
                <span
                  aria-hidden
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
                    isDone
                      ? komo
                        ? 'border-brand bg-brand text-white'
                        : 'border-[#8b90a4] bg-[#8b90a4] text-white'
                      : isActive
                        ? komo
                          ? 'border-brand'
                          : 'border-[#8b90a4]'
                        : 'border-line'
                  }`}
                >
                  {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="sr-only">{isDone ? 'done' : 'not yet'}</span>
              </div>
            </li>
          );
        })}
      </ol>

      <AnimatePresence>
        {complete && (
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-start gap-2.5 rounded-[18px] p-4 text-[15px] font-semibold ${
              komo
                ? 'bg-brand text-white shadow-[0_14px_30px_-12px_rgb(91_75_255/0.7)]'
                : 'border border-[#f7dd94] bg-[#fff8e6] text-ink'
            }`}
          >
            {komo ? (
              <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
            ) : (
              <Clock3 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#b7860b]" />
            )}
            {result}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
