import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import 'core/styles/globals.css';

import { TanstackQueryClientProvider } from 'app/providers';

import { cn } from 'shared/lib/cn';

const sans = localFont({
  src: '../public/fonts/liter.ttf',
  variable: '--font-sans'
});

const display = localFont({
  src: '../public/fonts/murs-gothic-wide-dark.woff2',
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'INSBYRE',
  description: 'Одежда, в которой ты к месту.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('antialised overflow-x-hidden', sans.variable, display.variable)}>
        <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
      </body>
    </html>
  );
}
