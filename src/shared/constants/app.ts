export const BASE_URL =
  typeof window !== 'undefined'
    ? ''
    : (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
