'use client';

import { Noto_Sans_KR, Roboto } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function FontSetup() {
  return (
    <style jsx global>{`
      :root {
        --font-noto-sans-kr: ${notoSansKr.style.fontFamily};
        --font-roboto: ${roboto.style.fontFamily};
      }
    `}</style>
  );
}
