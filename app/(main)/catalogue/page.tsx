import { Suspense } from 'react';

import { ProductList, ProductListSkeleton } from 'entities/product';

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-[1200px] space-y-8 py-8">
        <h1 className="font-display text-4xl uppercase">Каталог</h1>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  );
}
