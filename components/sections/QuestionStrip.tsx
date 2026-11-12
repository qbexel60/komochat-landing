import { Instagram, MessageCircle } from 'lucide-react';

/** Everyday inbox questions (written by us as examples, in Banglish and Bangla). */
const QUESTIONS: { text: string; bn?: boolean; ig?: boolean }[] = [
  { text: 'Dam koto?' },
  { text: 'M size ache?', ig: true },
  { text: 'Delivery charge koto?' },
  { text: 'ভাই, দামটা একটু কম হবে?', bn: true },
  { text: 'Original to?', ig: true },
  { text: 'Cash on delivery hobe?' },
  { text: 'এক্সচেঞ্জ করা যাবে?', bn: true, ig: true },
  { text: 'Apu, eta ache? 📷' },
  { text: 'Kobe pabo?', ig: true },
  { text: 'আপনি কি মানুষ নাকি বট?', bn: true },
];

/**
 * A wide gradient band: a line of text on the light end, and the questions
 * shops get all day drifting across the purple end (CSS only).
 */
export default function QuestionStrip() {
  return (
    <section aria-labelledby="strip-title" className="mx-auto mt-6 max-w-[1200px] px-4 sm:mt-10 sm:px-6">
      <div className="reveal relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#ffffff_0%,#eeedff_34%,#8c84ff_70%,#5b4bff_100%)] shadow-[var(--shadow-card)] md:bg-[linear-gradient(100deg,#ffffff_0%,#eeedff_24%,#8c84ff_48%,#5b4bff_74%,#3827c8_100%)]">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="shrink-0 px-6 pb-4 pt-7 md:w-[300px] md:py-9 md:pl-9 md:pr-6">
            <h2 id="strip-title" className="text-lg font-semibold leading-snug text-ink md:text-xl">
              Asked in your inbox, all day and all night
            </h2>
          </div>
          <div aria-hidden className="hidden h-12 w-px shrink-0 bg-white/60 md:block" />
          <div className="marquee no-scrollbar relative min-w-0 flex-1 overflow-hidden py-6 md:py-9 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
                  {QUESTIONS.map((q) => {
                    const Icon = q.ig ? Instagram : MessageCircle;
                    return (
                      <li
                        key={q.text}
                        className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-2 pl-2.5 pr-4 text-[15px] font-semibold text-ink shadow-[0_6px_16px_-6px_rgb(20_10_120/0.35)]"
                      >
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100">
                          <Icon className="h-3.5 w-3.5 text-brand" aria-hidden />
                        </span>
                        <span lang={q.bn ? 'bn' : undefined}>{q.text}</span>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
