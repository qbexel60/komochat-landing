'use client';

import { m } from 'motion/react';
import { BookOpenCheck, Check, PackageCheck, ScanSearch, Shirt } from 'lucide-react';
import type { ReactNode } from 'react';
import { Bubble } from '@/components/visuals/SkillVisuals';

/**
 * Small example chats, one per moment. Each one plays once when its tab
 * opens (the panel remounts on every tab change). Prices and rules are an
 * example shop's own settings.
 */

function Seq({ children }: { children: ReactNode[] }) {
  return (
    <>
      {children.map((child, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.75, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col"
        >
          {child}
        </m.div>
      ))}
    </>
  );
}

function Note({ icon, children, img }: { icon?: ReactNode; children: ReactNode; img?: string }) {
  return (
    <span className="inline-flex items-center gap-2 self-center rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt="" width={16} height={16} className="h-4 w-4" />
      ) : (
        <span className="text-brand">{icon}</span>
      )}
      {children}
    </span>
  );
}

const ok = <Check className="h-3.5 w-3.5" strokeWidth={3} />;

export function PriceDemo() {
  return (
    <Seq>
      <Bubble from="customer">Dam koto? M size ache?</Bubble>
      <Note img="/brand/automate-a-blue.svg">Checked price and stock in AutoMate</Note>
      <Bubble from="bot">Ji apu, M size ache 😊 Dam ৳1,250. Dhakar moddhe delivery ৳70.</Bubble>
    </Seq>
  );
}

export function PhotoDemo() {
  return (
    <Seq>
      <div className="flex flex-col items-start gap-1.5">
        <span className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#ffd6c7,#ff9d84)]">
          <Shirt aria-hidden className="h-11 w-11 text-white" strokeWidth={1.5} />
          <span className="scan-line absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-transparent to-white/70" />
        </span>
        <Bubble from="customer">Apu, eta ache?</Bubble>
      </div>
      <Note icon={<ScanSearch className="h-3.5 w-3.5" />}>Found it: Coral Summer Dress · in stock</Note>
      <Bubble from="bot">Ji apu, ache! 😊 Coral summer dress, ৳1,250. M ar L size ache, konta lagbe?</Bubble>
    </Seq>
  );
}

export function BargainDemo() {
  return (
    <Seq>
      <Bubble from="customer" lang="bn">
        ভাই, দামটা একটু কম হবে?
      </Bubble>
      <Note icon={ok}>Your lowest price: ৳1,200</Note>
      <Bubble from="bot" lang="bn">
        ভাইয়া, আজ অর্ডার করলে ৫০ টাকা ছাড় দিতে পারব। এর চেয়ে কম সম্ভব না, দুঃখিত 🙏
      </Bubble>
    </Seq>
  );
}

export function FaqDemo() {
  return (
    <Seq>
      <Bubble from="customer" lang="bn">
        এক্সচেঞ্জ করা যাবে?
      </Bubble>
      <Note icon={<BookOpenCheck className="h-3.5 w-3.5" />}>From your FAQ: exchange policy</Note>
      <Bubble from="bot" lang="bn">
        জি, ডেলিভারির সময় দেখে নিতে পারবেন। সাইজ না মিললে ৩ দিনের মধ্যে এক্সচেঞ্জ করা যাবে।
      </Bubble>
    </Seq>
  );
}

export function OrderDemo() {
  return (
    <Seq>
      <Bubble from="bot">Order korte apnar naam, phone number ar full address din please.</Bubble>
      <Bubble from="customer">Nusrat Jahan, 017XX-XXXXXX, Mirpur 10, Dhaka</Bubble>
      <div className="self-center rounded-2xl border border-line bg-white p-3 text-xs shadow-[var(--shadow-soft)]">
        <p className="flex items-center gap-1.5 font-bold text-ink">
          <PackageCheck aria-hidden className="h-4 w-4 text-ok" /> Placed in AutoMate
        </p>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-body">
          <dt className="text-muted">Order</dt>
          <dd className="font-semibold text-ink">Coral dress · M</dd>
          <dt className="text-muted">Total</dt>
          <dd className="font-semibold text-ink">৳1,320 with delivery · COD</dd>
          <dt className="text-muted">Address</dt>
          <dd className="font-semibold text-ink">Mirpur 10, Dhaka</dd>
        </dl>
      </div>
    </Seq>
  );
}

export function HandoffDemo() {
  return (
    <Seq>
      <Bubble from="customer" lang="bn">
        আপনি কি মানুষ নাকি বট?
      </Bubble>
      <Bubble from="bot" lang="bn">
        আমি এই পেজের AI সহকারী। চাইলে আমাদের টিমের একজনকে দিয়ে দিচ্ছি 🙂
      </Bubble>
      <Bubble from="customer" lang="bn">
        হ্যাঁ, একজনের সাথে কথা বলতে চাই।
      </Bubble>
      <Note img="/brand/komobox-k-purple.svg">Chat handed to your team in KomoBox</Note>
    </Seq>
  );
}
