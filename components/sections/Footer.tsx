import {
  AUTOMATE_URL,
  DATA_DELETION_URL,
  EMAIL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  NAV_LINKS,
  OFFICES,
  PHONE_HREF,
  PHONE_LABEL,
  PRIVACY_URL,
  QBEXEL_URL,
  SIGN_UP_URL,
  TERMS_URL,
  WHATSAPP_URL,
} from '@/lib/links';
import ProductSites from '@/components/ui/ProductSites';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function Footer() {
  const columns = [
    { title: 'KomoChat', links: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })) },
    {
      title: 'Qbexel',
      links: [
        { label: 'AutoMate', href: AUTOMATE_URL, external: true },
        { label: 'Create AutoMate account', href: SIGN_UP_URL },
        { label: 'qbexel.com', href: QBEXEL_URL, external: true },
        { label: 'Facebook', href: FACEBOOK_URL, external: true },
        { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: PHONE_LABEL, href: PHONE_HREF },
        { label: 'WhatsApp', href: WHATSAPP_URL, external: true },
        { label: EMAIL, href: `mailto:${EMAIL}` },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: PRIVACY_URL, external: true },
        { label: 'Terms', href: TERMS_URL, external: true },
        { label: 'Data deletion', href: DATA_DELETION_URL, external: true },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-white sm:mt-32">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/komochat-logo-color-on-light.svg" alt="KomoChat" width={168} height={28} className="h-7 w-auto" />
            <p className="mt-4 max-w-[320px] text-[15px] leading-relaxed text-body">
              The AI salesman for online shops. Local languages, Bangla first, starting in Bangladesh. Launching soon,
              inside AutoMate.
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted">
              <p>Made by Qbexel</p>
              {OFFICES.map((o) => (
                <p key={o.label}>{o.label}: {o.address}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-bold text-ink">{col.title}</h2>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...('external' in link && link.external ? ext : {})}
                        className="break-words text-sm text-body transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <nav aria-label="Qbexel products" className="mt-12 border-t border-line pt-8">
          <h2 className="text-sm font-bold text-ink">Products</h2>
          <ProductSites className="-mx-3 mt-3 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6" />
        </nav>
        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Qbexel. All rights reserved.</p>
          <p>Example chats, prices and orders on this page are examples, not real customers.</p>
        </div>
      </div>
    </footer>
  );
}
