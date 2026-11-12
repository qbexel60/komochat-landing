import PillLink from '@/components/ui/PillLink';
import { ChatVisual, LimitGauge, OrdersVisual, SensesVisual } from '@/components/visuals/SkillVisuals';
import { SIGN_UP_URL } from '@/lib/links';

const SKILLS = [
  {
    title: 'Chats like a person',
    text: 'Short, warm replies in Bangla or Banglish, even when customers write with typos and half sentences.',
    Visual: ChatVisual,
  },
  {
    title: 'Sees photos, hears voice notes',
    text: 'A screenshot, a product photo or a voice note is enough. KomoChat works out which product they mean.',
    Visual: SensesVisual,
  },
  {
    title: 'Takes the order into AutoMate',
    text: 'It collects the name, phone number and full address, and the order lands in AutoMate. No copy-paste.',
    Visual: OrdersVisual,
  },
  {
    title: 'Bargains only inside your limit',
    text: 'You set the lowest price. KomoChat never goes below it and never makes up offers of its own.',
    Visual: LimitGauge,
  },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[640px]">
          <h2 id="skills-title" className="h-section reveal text-ink">
            One salesman. <span className="text-gradient">Every skill a shop needs.</span>
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-body sm:text-lg" style={{ '--d': '0.08s' } as React.CSSProperties}>
            KomoChat learns your products, prices, stock, delivery charges and payment rules. Then it sells the way
            your best salesperson does, on every chat, at any hour.
          </p>
        </div>
        <div className="reveal shrink-0" style={{ '--d': '0.12s' } as React.CSSProperties}>
          <PillLink href={SIGN_UP_URL}>Create AutoMate account</PillLink>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 md:gap-5">
        {SKILLS.map(({ title, text, Visual }, i) => (
          <article
            key={title}
            className="card reveal flex flex-col overflow-hidden"
            style={{ '--d': `${(i % 2) * 0.08}s` } as React.CSSProperties}
          >
            <div className="h-[260px] sm:h-[290px]">
              <Visual />
            </div>
            <div className="px-6 pb-6 pt-2 sm:px-7 sm:pb-7">
              <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
