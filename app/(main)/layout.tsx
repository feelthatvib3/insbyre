import type { ReactNode } from 'react';

import { Header } from 'widgets/header';

export default function Layout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <Header sticky />
      {children}
    </main>
  );
}
