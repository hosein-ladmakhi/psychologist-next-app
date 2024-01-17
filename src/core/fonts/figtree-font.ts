import { Figtree } from 'next/font/google';

export const figtreeFont = Figtree({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});
