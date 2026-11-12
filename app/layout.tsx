import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import RevealObserver from '@/components/RevealObserver';

// Qbexel's font, variable: one file covers every weight the page uses.
const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

// Only for Bangla script (Jakarta has no Bangla letters); not preloaded.
const hind = Hind_Siliguri({
  variable: '--font-hind',
  subsets: ['bengali'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});

const title = 'KomoChat by Qbexel | The AI salesman for online shops in Bangladesh';
const description =
  'KomoChat answers your customers on Messenger and Instagram like a good salesperson: short, warm, in Bangla or Banglish, day and night. It takes the order and puts it straight into AutoMate. Launching soon.';
const shareTitle = 'KomoChat: never lose a sale to a late reply';
const shareDescription =
  'An AI salesman for your online shop. Replies on Messenger and Instagram in Bangla or Banglish, day and night, and puts orders straight into AutoMate. Launching soon.';

// Set NEXT_PUBLIC_SITE_URL to the live address at build time, so link previews get absolute image URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description,
  applicationName: 'KomoChat',
  authors: [{ name: 'Qbexel', url: 'https://qbexel.com' }],
  creator: 'Qbexel',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'KomoChat by Qbexel',
    title: shareTitle,
    description: shareDescription,
    locale: 'en_BD',
    images: [{ url: '/og-image-1200x630.png', width: 1200, height: 630, alt: 'KomoChat by Qbexel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: shareTitle,
    description: shareDescription,
    images: ['/og-image-1200x630.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f6ff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${hind.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <RevealObserver />
      </body>
    </html>
  );
}
