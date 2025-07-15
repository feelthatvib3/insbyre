import { Suspense } from 'react';

import { ProductList, ProductListSkeleton, getProducts } from 'entities/product';

import type { CatalogueFilters } from 'shared/types/catalogue';

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const searchParams = await params;

  const filters: CatalogueFilters = {
    category: searchParams.category
  };

  const products = getProducts({ filters });

  return (
    <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:py-8 xl:px-0">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}
