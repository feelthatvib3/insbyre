'use client';

import { useState } from 'react';

import { type CatalogueFilters, CatalogueFiltersSidebar } from 'features/catalogue-filters';

import { ProductList } from 'entities/product';

export default function Page() {
  const [filters, setFilters] = useState<CatalogueFilters>({});

  return (
    <div>
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:space-y-12 md:py-12 xl:px-0">
        <h1 className="font-display text-4xl uppercase md:text-5xl">Каталог</h1>
        <div className="flex gap-x-8">
          <div className="hidden shrink-0 md:block">
            <CatalogueFiltersSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
          <ProductList filters={filters} />
        </div>
      </div>
    </div>
  );
}
