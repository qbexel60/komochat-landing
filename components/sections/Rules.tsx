import { BadgePercent, BookOpenCheck, Boxes, MessageSquareHeart, Truck } from 'lucide-react';
import PillLink from '@/components/ui/PillLink';
import { SIGN_UP_URL } from '@/lib/links';

const RULES = [
  {
    icon: MessageSquareHeart,
    title: 'Your voice',
    text: 'Friendly or formal, your greeting, your way of saying thanks. Bangla or Banglish.',
  },
  {
    icon: Boxes,
    title: 'Your products',
    text: 'Products, sizes, colours, prices and stock, straight from your AutoMate catalogue.',
  },
  {
    icon: Truck,
    title: 'Delivery and payment',
    text: 'Your charges inside and outside Dhaka, cash on delivery or advance payment.',
  },
  {
    icon: BadgePercent,
    title: 'Your bargaining limit',
    text: 'How far it may go when a customer bargains. Never below the price you allow.',
  },
  {
    icon: BookOpenCheck,
    title: 'Your FAQ',
    text: 'Exchange, returns, shop hours. Write the answer once; it uses your words every time.',
  },
];

export default function Rules() {
  return (
    <section id="rules" aria-labelledby="rules-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <div className="reveal flex flex-col justify-center pb-4 sm:col-span-2 lg:col-span-1 lg:pb-0 lg:pr-6">
          <h2 id="rules-title" className="h-section text-ink">
            You set the rules. <span className="text-gradient">KomoChat follows them.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body">
            Everything is in your AutoMate settings, and you can change it any time.
          </p>
          <div className="mt-6">
            <PillLink href={SIGN_UP_URL} variant="light">
              Create AutoMate account
            </PillLink>
          </div>
        </div>
        {RULES.map(({ icon: Icon, title, text }, i) => (
          <article
            key={title}
            className="card reveal flex min-h-[220px] flex-col justify-between p-6"
            style={{ '--d': `${(i % 3) * 0.07}s` } as React.CSSProperties}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50">
              <Icon aria-hidden className="h-5 w-5 text-brand" />
            </span>
            <div className="mt-10">
              <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-body">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
