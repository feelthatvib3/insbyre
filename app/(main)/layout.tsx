import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Header } from 'widgets/header';

export const metadata: Metadata = {
  title: 'INSBYRE — каталог'
};

export default function Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="min-h-dvh">
      <Header sticky />
      {children}
    </main>
  );
}
