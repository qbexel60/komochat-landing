import { Sparkle } from '@/components/ui/Eyebrow';
import KomoSymbol from '@/components/ui/KomoSymbol';
import PillLink from '@/components/ui/PillLink';
import HeroStage from '@/components/visuals/HeroStage';
import { SIGN_UP_URL } from '@/lib/links';

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip pt-28 sm:pt-36">
      {/* Soft lavender wash behind the top of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(60%_50%_at_50%_0%,#e9e7ff_0%,rgba(246,246,255,0)_70%)]"
      />

      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm shadow-[var(--shadow-soft)]">
          <Sparkle className="h-3.5 w-3.5 text-gold" />
          <span className="font-semibold text-ink">Launching soon</span>
          <span aria-hidden className="text-muted">·</span>
          <span className="text-body">Runs inside AutoMate</span>
        </p>

        <h1 id="hero-title" className="h-display mt-6 max-w-[16ch] text-ink">
          Never lose a sale <br className="hidden sm:block" />
          to a{' '}
          <span
            aria-hidden
            className="wiggle mx-1 inline-grid h-[1.05em] w-[1.05em] translate-y-[0.06em] place-items-center rounded-[30%] bg-[linear-gradient(140deg,#8c84ff_0%,#5b4bff_45%,#3827c8_100%)] align-baseline shadow-[0_10px_24px_-6px_rgb(91_75_255/0.55),0_0_0_4px_#fff]"
          >
            <KomoSymbol className="h-[0.55em] w-[0.55em] text-white" />
          </span>{' '}
          late reply
        </h1>

        <p className="mt-6 max-w-[620px] text-base leading-relaxed text-body sm:text-lg">
          KomoChat is an AI salesman for your online shop. It answers customers on Facebook Messenger and Instagram
          the way your best salesperson would: short, warm, in Bangla or Banglish, day and night. Then it puts the
          order straight into AutoMate.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <PillLink href={SIGN_UP_URL} size="lg">
            Create your AutoMate account
          </PillLink>
          <a
            href="#compare"
            className="rounded-full px-5 py-3 text-base font-semibold text-ink underline decoration-brand-300 decoration-2 underline-offset-[6px] transition-colors hover:decoration-brand"
          >
            See how it works
          </a>
        </div>
        <p className="mt-4 max-w-[460px] text-sm text-muted">
          KomoChat is launching soon. Create your account now and switch it on inside AutoMate the day it launches.
        </p>
      </div>

      <HeroStage />
    </section>
  );
}
