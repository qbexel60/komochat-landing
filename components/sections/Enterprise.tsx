import { ChartColumn, MessagesSquare, ScanText, Workflow } from 'lucide-react';
import Eyebrow from '@/components/ui/Eyebrow';
import PillLink from '@/components/ui/PillLink';
import EnterpriseVisual from '@/components/visuals/EnterpriseVisual';
import { CONTACT_HREF } from '@/lib/links';

/** What we build for enterprises. Each has one example use, worded as an example, not a client. */
const BUILDS = [
  {
    icon: MessagesSquare,
    title: 'Sales and support agents',
    text: 'Chat agents on your own channels. They answer from your products, prices, policies and records, follow your rules, and pass hard cases to your staff with the whole chat.',
    example: 'Order and delivery questions on your Facebook Page, in Bangla and English.',
  },
  {
    icon: ScanText,
    title: 'Message and document parsing',
    text: "AI that reads chats, forms, invoices and other documents and turns them into clean records for your systems. It is the same skill that turns a shop's chat into an order in AutoMate.",
    example: 'Supplier invoices into your accounts, without retyping.',
  },
  {
    icon: Workflow,
    title: 'Workflow automation',
    text: 'Routine steps done by AI: sort and route requests, fill in records, send updates. Anything with real consequences, like a refund, waits for a person to approve it.',
    example: 'Each new request sent to the right team, with a short summary.',
  },
  {
    icon: ChartColumn,
    title: 'Qbot, an AI analyst for you',
    text: "Ask about sales, stock, returns or costs in plain words. Qbot answers from your company's data with read-only access, and shows the numbers behind each answer.",
    example: '“Which branch had the most returns last month?”',
    owner: true,
  },
];

const STEPS = [
  {
    title: 'Talk to us',
    text: "Tell us which chats, documents or questions take up your team's time. We tell you plainly what AI can do there, and what it can't.",
  },
  {
    title: 'We build on your data and systems',
    text: 'We connect to the tools you already use and set the AI up with your products, policies and records. Your team tests it before any customer sees it.',
  },
  {
    title: 'We run it with you',
    text: 'We keep it running, check its answers and its cost, and improve it as your business changes. A person on your team can always step in.',
  },
];

/** KomoChat for enterprises: the custom AI Qbexel builds on a company's own channels, data and rules. */
export default function Enterprise() {
  return (
    <section id="enterprise" aria-labelledby="enterprise-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[680px]">
          <Eyebrow className="reveal">KomoChat for enterprises</Eyebrow>
          <h2 id="enterprise-title" className="h-section reveal mt-5 text-ink">
            Custom AI for your company. <br className="hidden sm:block" />
            <span className="text-gradient">Built on your data and systems.</span>
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-body sm:text-lg" style={{ '--d': '0.08s' } as React.CSSProperties}>
            KomoChat is also the name for the custom AI that Qbexel builds for larger companies. It works on your own
            channels, data and rules, in local languages, Bangla first.
          </p>
        </div>
        <div className="reveal shrink-0" style={{ '--d': '0.12s' } as React.CSSProperties}>
          <PillLink href={CONTACT_HREF}>Talk to us</PillLink>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[1.3fr_1fr] lg:gap-5">
        <div className="card reveal grid overflow-hidden rounded-[28px] sm:grid-cols-2">
          {BUILDS.map(({ icon: Icon, title, text, example, owner }, i) => (
            <article
              key={title}
              className={`flex flex-col p-6 sm:p-7 ${i > 0 ? 'border-t border-line' : ''} ${
                i === 1 ? 'sm:border-t-0' : ''
              } ${i % 2 === 1 ? 'sm:border-l sm:border-line' : ''}`}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl ${owner ? 'bg-indigo text-white' : 'bg-brand-50 text-brand'}`}
              >
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-body">{text}</p>
              <p className="mt-4 border-t border-dashed border-line pt-3 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">For example:</span> {example}
              </p>
            </article>
          ))}
        </div>

        <div className="reveal flex flex-col" style={{ '--d': '0.08s' } as React.CSSProperties}>
          <EnterpriseVisual />
          <p className="mt-4 px-2 text-[15px] leading-relaxed text-body">
            <span className="font-semibold text-ink">KomoChat agents talk to your customers.</span> Qbot talks to you
            about your business.
          </p>
        </div>
      </div>

      <div className="reveal mt-14 sm:mt-20">
        <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">How a project works</h3>
        <ol className="relative mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {/* The line that joins the three steps on wide screens */}
          <span aria-hidden className="absolute left-[18px] right-[calc((100%_-_3rem)/3_-_18px)] top-[18px] hidden h-px bg-brand-200 md:block" />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[36px_1fr] gap-4 md:block">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white ring-4 ring-canvas">
                {i + 1}
              </span>
              <div className="md:mt-5 md:pr-4">
                <h4 className="text-lg font-bold tracking-tight text-ink">{step.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <PillLink href={CONTACT_HREF} size="lg">
            Talk to us
          </PillLink>
          <p className="text-[15px] text-body">On WhatsApp, by phone or by email, with the Qbexel team.</p>
        </div>
      </div>
    </section>
  );
}
