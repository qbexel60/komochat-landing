/** Where the page's buttons go, in one place. */

/** KomoChat turns on inside AutoMate, so every sign-up goes to AutoMate. */
export const SIGN_UP_URL = 'https://automate.qbexel.com/sign-up';
export const SIGN_IN_URL = 'https://automate.qbexel.com/sign-in';
export const AUTOMATE_URL = 'https://automate.qbexel.com';
export const QBEXEL_URL = 'https://qbexel.com';

/** KomoChat's privacy, terms and data deletion are covered by AutoMate's pages. */
export const PRIVACY_URL = 'https://automate.qbexel.com/privacy';
export const TERMS_URL = 'https://automate.qbexel.com/terms';
export const DATA_DELETION_URL = 'https://automate.qbexel.com/data-deletion';

export const EMAIL = 'admin@qbexel.com';
export const PHONE_LABEL = '+880 1982-780739';
export const PHONE_HREF = 'tel:+8801982780739';
export const WHATSAPP_URL = 'https://wa.me/8801982780739';
/** Head office in Tangail (current trade licence, D-U-N-S); Dhaka office is the address Meta verified. */
export const OFFICES = [
  { label: 'Head office', address: 'Shibnath School Market, Tuhin Road, Tangail, Bangladesh' },
  { label: 'Dhaka office', address: 'Road 1, Nikunja 2, Khilkhet, Dhaka 1216, Bangladesh' },
] as const;
export const FACEBOOK_URL = 'https://www.facebook.com/qbexel';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/104429970';

/** In-page sections, used by the menu and the footer. */
export const NAV_LINKS = [
  { label: 'What it does', href: '#skills' },
  { label: 'How it works', href: '#compare' },
  { label: 'Your rules', href: '#rules' },
  { label: 'AutoMate', href: '#automate' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'FAQ', href: '#faq' },
] as const;

/** "Talk to us" buttons go to the WhatsApp, phone and email cards near the end of the page. */
export const CONTACT_HREF = '#contact';
