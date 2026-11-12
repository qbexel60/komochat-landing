'use client';

import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { WHATSAPP_URL } from '@/lib/links';

const FAQS = [
  {
    q: 'When does KomoChat launch?',
    a: 'Soon. KomoChat turns on inside AutoMate when it launches. Create your AutoMate account today, and it will be one switch away.',
  },
  {
    q: 'Do I need a separate app or account?',
    a: 'No. KomoChat runs inside AutoMate, so one AutoMate account covers both. Your products, prices and stock come from your AutoMate catalogue, and the orders KomoChat takes land there too.',
  },
  {
    q: 'Which channels does it answer on?',
    a: 'Facebook Messenger and Instagram. WhatsApp and TikTok are planned for later.',
  },
  {
    q: 'Does it understand Bangla and Banglish?',
    a: 'Yes. It replies the way your customers write, in Bangla or Banglish, even with typos and half sentences. It also understands product photos, screenshots and voice notes.',
  },
  {
    q: 'Can it give discounts?',
    a: 'Only inside the bargaining limit you set. It never goes below the price you allow and never makes up offers, and you can change the limit any time.',
  },
  {
    q: 'Will customers know they are talking to an AI?',
    a: 'If a customer sincerely asks whether it is a bot, KomoChat tells the truth and offers a person from your team.',
  },
  {
    q: 'What if a customer needs a real person?',
    a: 'KomoChat hands the chat to your staff in KomoBox, the team inbox, so the customer is not left waiting. Your team sees the whole chat so far.',
  },
  {
    q: 'How do I set it up?',
    a: "In your AutoMate settings: choose KomoChat's voice, write your FAQ, and set your delivery charges, payment rules and bargaining limit. Your products come from your AutoMate catalogue.",
  },
];

export default function FAQ() {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <h2 id="faq-title" className="h-section text-ink">
            Questions, <span className="text-gradient">answered</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body">
            Straight answers about KomoChat. Anything else? Ask the Qbexel team on{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline decoration-brand-300 underline-offset-4 hover:decoration-brand"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>

        <ul className="reveal flex flex-col gap-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="card overflow-hidden rounded-[20px]">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-[20px] px-5 py-5 text-left text-base font-bold text-ink sm:px-6 sm:text-lg"
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[rotate,background-color,border-color,color] duration-300 ${
                        isOpen ? 'rotate-45 border-brand bg-brand text-white' : 'border-line bg-white text-ink'
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a-${i}`}
                  role="region"
                  aria-labelledby={`${id}-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="px-5 pb-6 text-[15px] leading-relaxed text-body sm:px-6 sm:text-base">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
