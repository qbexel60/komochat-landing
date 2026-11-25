'use client';

import { ChartColumn, Database } from 'lucide-react';
import { useRef } from 'react';
import { useOnScreen } from '@/lib/hooks';

const RETURNS = [
  { branch: 'Uttara', share: 9, top: true },
  { branch: 'Mirpur', share: 5 },
  { branch: 'Gulshan', share: 4 },
];

/**
 * The two faces of a custom KomoChat project, both built on the company's own
 * data: an agent that talks to customers, and Qbot that talks to the owner.
 * Example content only. The connector lines are the one loop; they rest off
 * screen and stay still for reduced motion.
 */
export default function EnterpriseVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);

  return (
    <div
      ref={ref}
      data-paused={!on}
      className="relative flex h-full flex-col items-center overflow-hidden rounded-[28px] border border-line bg-brand-50 px-4 pb-6 pt-12 sm:px-8"
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_50%,#000,transparent)]" />
      <span className="absolute right-4 top-4 rounded-full border border-line bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
        Example
      </span>

      {/* Faces customers: a support chat in Bangla */}
      <figure className="relative w-full max-w-[400px]">
        <figcaption className="mb-2 text-sm font-semibold text-ink">Talks to your customers</figcaption>
        <div className="rounded-[20px] bg-white p-4 shadow-[var(--shadow-float)]">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/komochat-symbol-purple.svg" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink">Your company</p>
              <p className="text-[11px] text-muted">Support chat · answered by your KomoChat agent</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-3 text-[13px] leading-snug">
            <p lang="bn" className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-[#f0f0f7] px-3 py-2 text-ink">
              আমার পার্সেল কবে পাব?
            </p>
            <p lang="bn" className="max-w-[88%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white">
              আপনার পার্সেলটি এখন মিরপুর হাবে আছে। কাল দুপুরের মধ্যে পৌঁছে যাবে।
            </p>
          </div>
        </div>
      </figure>

      <Connector />
      <p className="relative flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-[13px] font-semibold text-ink shadow-[var(--shadow-soft)]">
        <Database aria-hidden className="h-4 w-4 text-brand" />
        Your data, systems and rules
      </p>
      <Connector />

      {/* Faces the owner: Qbot answers from the company's numbers */}
      <figure className="relative w-full max-w-[400px]">
        <figcaption className="mb-2 text-sm font-semibold text-ink">Talks to you</figcaption>
        <div className="rounded-[20px] bg-white p-4 shadow-[var(--shadow-float)]">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <span aria-hidden className="grid h-[22px] w-[22px] place-items-center rounded-md bg-indigo text-white">
              <ChartColumn className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink">Qbot</p>
              <p className="text-[11px] text-muted">For owners and managers · read-only</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-3 text-[13px] leading-snug">
            <p className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#f0f0f7] px-3 py-2 text-ink">
              Which branch had the most returns last month?
            </p>
            <div className="max-w-[92%] self-start rounded-2xl rounded-bl-md bg-brand-50 px-3 py-2.5 text-ink ring-1 ring-brand-100">
              <p>Uttara: 9% of its orders came back, up from 6%. Most were size exchanges.</p>
              <ul className="mt-2.5 flex flex-col gap-1.5" aria-label="Returns by branch, share of orders">
                {RETURNS.map((r) => (
                  <li key={r.branch} className="grid grid-cols-[64px_1fr_28px] items-center gap-2 text-[11px]">
                    <span className={r.top ? 'font-semibold text-ink' : 'text-muted'}>{r.branch}</span>
                    <span className="h-1.5 rounded-full bg-white">
                      <span
                        className={`block h-full rounded-full ${r.top ? 'bg-indigo' : 'bg-brand-300'}`}
                        style={{ width: `${r.share * 10}%` }}
                      />
                    </span>
                    <span className="text-right tabular-nums text-muted">{r.share}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}

/** Short dashed line between the cards and the data in the middle. */
function Connector() {
  return (
    <svg aria-hidden width="2" height="28" viewBox="0 0 2 28" className="relative my-1.5 text-brand-light">
      <line x1="1" y1="0" x2="1" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="dash-flow" />
    </svg>
  );
}
