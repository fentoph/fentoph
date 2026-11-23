/**
 * Fentoph Corporate Portal Version Configuration
 * Following the Custom Versioning Rule: x.y.z.a
 * - x (fix): Tuzatishlar soni (+1 fentophid.vercel.app/signup yo'naltirish)
 * - y (feat): Yangi funksiyalar soni
 * - z (mm): Chiqqan oy (11 = Noyabr)
 * - a (yy): Chiqqan yil (26 = 2026)
 */

export const APP_VERSION = '3.2.11.26';

export const VERSION_METADATA = {
  version: APP_VERSION,
  fix: 3,
  feat: 2,
  month: 11,
  year: 26,
  releaseName: 'Titanium SSO Signup Redirect Edition',
  releaseDate: '2026-11-23',
  tag: 'v3.2.11.26'
};
