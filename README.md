# KomoChat landing page (light style)

A new one-page site for KomoChat, Qbexel's AI salesman for online shops in Bangladesh. Light, airy layout in the
style of Riad's design kit (`omniagent-design/`, kept local and out of git); all code, copy and pictures are our own.

- Next.js 16 (App Router, static export to `out/`), TypeScript, Tailwind 4, `motion` for the small animations.
- Font: Plus Jakarta Sans (Qbexel). Hind Siliguri only for Bangla text and the taka sign.
- Colours: KomoChat purple `#5B4BFF` and light purple `#8C84FF`; Qbexel indigo `#3827C8` and gold `#FDC448` as small
  accents; Night `#060B1E`, Ink `#0A0E1F`. Tokens live in `app/globals.css`.
- Every sign-up button goes to AutoMate sign-up (`lib/links.ts`). The enterprise "Talk to us" buttons go to the
  WhatsApp, phone and email cards (`#contact`). Status words are the same on all five product pages: AutoMate
  `Live`, KomoBox `Live in AutoMate`, KomoVoice `Live`, KomoChat `Launching soon`, Eastrak `Early access`; WhatsApp and
  TikTok "later". The dark "Part of AutoMate" band ends with the rest of the family (AutoMate, KomoBox, KomoVoice,
  Eastrak). Contact email: business@qbexel.com.
- Example chats, prices and orders are labelled as examples. No invented numbers, reviews, customer logos or prices.

## Run

```bash
npm install
npm run dev        # http://localhost:3050 (live reload)
npm run build      # writes the static site to out/
npm start          # serves out/ on http://localhost:3050
```

`npm run lint` and `npm run typecheck` must stay clean.

## Where things are

| Section | File |
| --- | --- |
| Top bar | `components/sections/Nav.tsx` |
| Hero + orb | `components/sections/Hero.tsx`, `components/visuals/HeroStage.tsx` |
| Inbox questions strip | `components/sections/QuestionStrip.tsx` |
| Four skills (chat, photos, orders, bargaining gauge) | `components/sections/Skills.tsx`, `components/visuals/SkillVisuals.tsx` |
| Replies at 2 AM + live feed | `components/sections/NightShift.tsx`, `components/visuals/ActivityFeed.tsx` |
| By hand vs KomoChat clocks | `components/sections/Compare.tsx` |
| Chat moments (tabs) | `components/sections/Situations.tsx`, `components/visuals/SituationDemos.tsx` |
| Your rules | `components/sections/Rules.tsx` |
| Inside AutoMate (dark) | `components/sections/InsideAutoMate.tsx` |
| KomoChat for enterprises (custom AI, Qbot, how a project works) | `components/sections/Enterprise.tsx`, `components/visuals/EnterpriseVisual.tsx` |
| FAQ, get started, footer | `components/sections/FAQ.tsx`, `GetStarted.tsx`, `Footer.tsx` |

Motion rests while a section is off screen and turns off for visitors who ask for reduced motion.
