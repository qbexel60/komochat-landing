import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Sparkle } from '@/components/ui/Eyebrow';
import KomoSymbol from '@/components/ui/KomoSymbol';
import PillLink from '@/components/ui/PillLink';
import { EMAIL, PHONE_HREF, PHONE_LABEL, SIGN_UP_URL, WHATSAPP_URL } from '@/lib/links';

export default function GetStarted() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="reveal relative overflow-hidden rounded-[32px] bg-[linear-gradient(125deg,#8c84ff_0%,#5b4bff_42%,#3827c8_100%)] px-6 py-14 text-center shadow-[0_30px_70px_-30px_rgb(56_39_200/0.7)] sm:px-12 sm:py-20">
        {/* Big faint KomoChat symbol and a few gold sparkles */}
        <KomoSymbol className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-white/[0.07] sm:-right-16" />
        <KomoSymbol className="pointer-events-none absolute -bottom-32 -left-24 h-[320px] w-[320px] text-white/[0.05]" />
        <Sparkle className="absolute left-[12%] top-[18%] h-4 w-4 text-gold" />
        <Sparkle className="absolute bottom-[20%] right-[14%] h-3 w-3 text-gold/80" />
        <Sparkle className="absolute right-[26%] top-[12%] h-2.5 w-2.5 text-white/60" />

        <div className="relative mx-auto max-w-[680px]">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
            Launching soon
          </p>
          <h2 id="cta-title" className="h-section mt-5 text-white">
            Get your shop ready for KomoChat
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-base leading-relaxed text-white/85 sm:text-lg">
            KomoChat turns on inside AutoMate when it launches. Create your AutoMate account today, add your products,
            and KomoChat will be one switch away.
          </p>
          <div className="mt-8 flex justify-center">
            <PillLink href={SIGN_UP_URL} variant="light" size="lg">
              Create your AutoMate account
            </PillLink>
          </div>
        </div>
      </div>

      <div className="reveal mt-5 grid gap-3 sm:grid-cols-3">
        <ContactCard href={WHATSAPP_URL} external icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="Chat with the Qbexel team" />
        <ContactCard href={PHONE_HREF} icon={<Phone className="h-5 w-5" />} label="Call" value={PHONE_LABEL} />
        <ContactCard href={`mailto:${EMAIL}`} icon={<Mail className="h-5 w-5" />} label="Email" value={EMAIL} />
      </div>
    </section>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="card flex items-center gap-4 rounded-[20px] p-5 transition-[border-color,box-shadow] duration-200 hover:border-brand-300 hover:shadow-[var(--shadow-float)]"
    >
      <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
        {icon}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
        <span className="mt-1 block truncate text-[15px] font-semibold text-ink">{value}</span>
      </span>
    </a>
  );
}
