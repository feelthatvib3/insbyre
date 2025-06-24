import { Suspense } from 'react';

import { CataloguePage } from 'pages/catalogue';

export default async function Page({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;

  return (
    <Suspense fallback={null}>
      <CataloguePage category={c} />
    </Suspense>
  );
}
