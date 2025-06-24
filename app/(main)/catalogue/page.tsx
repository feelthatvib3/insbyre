import { Suspense } from 'react';

import { CataloguePage } from 'pages/catalogue';

export default function Page({ searchParams }: { searchParams: { c?: string } }) {
  const category = searchParams.c ?? undefined;

  return (
    <Suspense fallback={null}>
      <CataloguePage category={category} />
    </Suspense>
  );
}
