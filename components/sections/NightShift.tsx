import PillLink from '@/components/ui/PillLink';
import ActivityFeed from '@/components/visuals/ActivityFeed';
import { SIGN_UP_URL } from '@/lib/links';

/** Star positions in the night panel (left %, top %, size px, gold?). */
const STARS: [number, number, number, boolean?][] = [
  [8, 12, 2], [22, 28, 3], [36, 8, 2], [48, 22, 2, true], [58, 6, 3], [70, 30, 2],
  [86, 44, 2], [64, 52, 3, true], [92, 14, 2], [14, 52, 2], [30, 64, 2], [78, 70, 2],
  [44, 40, 2], [52, 78, 2, true],
];

export default function NightShift() {
  return (
    <section id="night" aria-labelledby="night-title" className="mx-auto max-w-[1200px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="card reveal grid items-center gap-10 overflow-hidden rounded-[32px] p-5 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:p-14">
        <div>
          <h2 id="night-title" className="h-section text-ink">
            Replies in seconds. <br className="hidden sm:block" />
            <span className="text-gradient">Even at 2 AM.</span>
          </h2>
          <p className="mt-5 max-w-[460px] text-base leading-relaxed text-body sm:text-lg">
            Customers message when they are free, and that is often late at night. KomoChat reads each message, checks
            your stock in AutoMate and answers before they move on to another page.
          </p>
          <p className="mt-4 max-w-[460px] text-base font-semibold text-ink sm:text-lg">
            You wake up to orders, not to unread messages.
          </p>
          <div className="mt-8">
            <PillLink href={SIGN_UP_URL}>Create AutoMate account</PillLink>
          </div>
        </div>

        <div className="relative lg:pl-14">
          <div className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(120%_90%_at_80%_0%,#3827c8_0%,#1b1767_38%,#060b1e_78%)] px-5 pb-28 pt-6 sm:px-7 sm:pt-7 lg:h-[520px] lg:pb-7">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {STARS.map(([x, y, s, gold], i) => (
                <span
                  key={i}
                  className={`absolute rounded-full ${gold ? 'bg-gold' : 'bg-white/70'}`}
                  style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
                />
              ))}
              {/* Crescent moon */}
              <span className="absolute right-6 top-6 h-10 w-10 rounded-full shadow-[inset_-10px_5px_0_0_#fdc448] lg:left-12 lg:right-auto lg:top-10 lg:h-12 lg:w-12 lg:shadow-[inset_-12px_6px_0_0_#fdc448]" />
            </div>

            <div className="relative lg:absolute lg:right-9 lg:top-9 lg:text-right">
              <p className="text-4xl font-bold tracking-tight text-white tabular-nums sm:text-6xl">2:14 AM</p>
              <p className="mt-2 max-w-[220px] text-sm text-white/75 sm:max-w-none sm:text-base">
                Your shop is asleep. <span className="font-semibold text-white">KomoChat is not.</span>
              </p>
            </div>
          </div>

          {/* Phones and tablets: the card overlaps the bottom of the night panel */}
          <div className="relative mx-2 -mt-20 sm:mx-6 lg:hidden">
            <ActivityFeed />
          </div>
          {/* Desktop: the card floats over the panel's left edge */}
          <div className="absolute bottom-10 left-0 hidden w-[320px] lg:block">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </section>
  );
}
