'use client';

import { useState } from 'react';

import type { CatalogueFilters } from 'features/catalogue-filters';

import { ProductList } from 'entities/product';

export function CataloguePage() {
  const [filters] = useState<CatalogueFilters>({});

  return (
    <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:py-8 xl:px-0">
      <ProductList filters={filters} />
    </div>
  );
}
