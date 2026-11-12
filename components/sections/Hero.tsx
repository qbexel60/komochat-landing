import { Sparkle } from '@/components/ui/Eyebrow';
import KomoSymbol from '@/components/ui/KomoSymbol';
import PillLink from '@/components/ui/PillLink';
import HeroSmoke from '@/components/visuals/HeroSmoke';
import HeroStory from '@/components/visuals/HeroStory';
import { SIGN_UP_URL } from '@/lib/links';

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip pt-28 sm:pt-36">
      {/* Moving lavender cloud behind the picture (fades out at the top and bottom) */}
      <HeroSmoke className="absolute inset-x-0 top-[250px] h-[720px] [mask-image:linear-gradient(180deg,transparent_0%,#000_22%,#000_72%,transparent_100%)] sm:top-[300px] sm:h-[840px]" />

      {/* Faint guide lines at the content edges, as in the kit */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[1200px] -translate-x-1/2 xl:block">
        <span className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgb(255_255_255/0.9),#fff_40%,#fff_85%,transparent)]" />
        <span className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(180deg,rgb(255_255_255/0.9),#fff_40%,#fff_85%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6">
        <p className="hero-rise inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[13px] shadow-[var(--shadow-soft)] sm:px-4 sm:text-sm">
          <Sparkle className="h-3.5 w-3.5 text-gold" />
          <span className="font-semibold text-ink">AI salesman</span>
          <span aria-hidden className="text-muted">·</span>
          <span className="text-body">Launching soon in AutoMate</span>
        </p>

        <h1 id="hero-title" className="h-display hero-rise mt-5 text-ink" style={{ animationDelay: '0.06s' }}>
          Never lose a sale <br />
          to a{' '}
          <span
            aria-hidden
            className="wiggle mx-0.5 inline-grid h-[1.12em] w-[1.12em] translate-y-[0.08em] place-items-center rounded-[32%] bg-[linear-gradient(140deg,#8c84ff_0%,#5b4bff_45%,#3827c8_100%)] align-baseline shadow-[0_10px_24px_-6px_rgb(91_75_255/0.55),0_0_0_4px_#fff]"
          >
            <KomoSymbol className="h-[0.58em] w-[0.58em] text-white" />
          </span>{' '}
          late reply
        </h1>

        <p className="hero-rise mt-4 max-w-[600px] text-base leading-relaxed text-body sm:text-[17px]" style={{ animationDelay: '0.12s' }}>
          Your AI salesman on Messenger and Instagram. It replies in Bangla or Banglish, day and night, and puts every
          order straight into AutoMate.
        </p>

        <div className="hero-rise mt-7" style={{ animationDelay: '0.18s' }}>
          <PillLink href={SIGN_UP_URL} size="lg">
            Create your AutoMate account
          </PillLink>
        </div>
      </div>

      <div className="relative mt-4 sm:mt-0">
        <HeroStory />
      </div>
    </section>
  );
}
