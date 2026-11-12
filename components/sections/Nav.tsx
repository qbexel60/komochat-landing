'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PillLink from '@/components/ui/PillLink';
import { NAV_LINKS, SIGN_UP_URL } from '@/lib/links';

/**
 * Top bar: clear over the hero, a white floating bar once the page moves.
 * It slides away while reading down and comes back on the way up.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 16);
        const goingDown = y > lastY.current + 4;
        const goingUp = y < lastY.current - 4;
        if (goingDown && y > 160) setHidden(true);
        else if (goingUp || y < 160) setHidden(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const showBar = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-out sm:px-4 ${
        hidden && !open ? '-translate-y-[120%]' : 'translate-y-0'
      }`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto max-w-[1200px] rounded-[20px] border transition-[background-color,border-color,box-shadow] duration-300 ${
          showBar
            ? 'border-line bg-white shadow-[var(--shadow-float)]'
            : 'border-transparent bg-transparent shadow-none'
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 pl-4 pr-2 sm:h-16 sm:pl-5">
          <a href="#top" className="shrink-0 rounded-lg" aria-label="KomoChat, back to top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/komochat-logo-color-on-light.svg" alt="" width={150} height={25} className="h-[22px] w-auto sm:h-6" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-body transition-colors hover:bg-brand-50 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <PillLink href={SIGN_UP_URL} className="hidden sm:inline-flex">
              Create AutoMate account
            </PillLink>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-brand-50 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" hidden={!open} className="border-t border-line px-3 pb-4 pt-2 lg:hidden">
          <ul className="grid gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-brand-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <PillLink href={SIGN_UP_URL} className="mt-3 w-full justify-between sm:hidden">
            Create your AutoMate account
          </PillLink>
        </div>
      </nav>
    </header>
  );
}
