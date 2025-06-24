import type { ReactNode } from 'react';

import { Header } from 'widgets/header';

export default function Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flowers-01">
      <Header sticky />
      {children}
    </main>
  );
}
