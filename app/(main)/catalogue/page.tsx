'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { type CatalogueFilters, CatalogueFiltersSidebar } from 'features/catalogue-filters';

import { ProductList } from 'entities/product';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams?.get('c') ?? undefined;

  const [filters, setFilters] = useState<CatalogueFilters>({ category: categoryFromUrl });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
  }, [categoryFromUrl]);

  const handleFiltersChange = (newFilters: CatalogueFilters) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.category) params.set('c', newFilters.category);
    else params.delete('c');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:space-y-12 md:py-12 xl:px-0">
        <h1 className="font-display text-4xl uppercase md:text-5xl">Каталог</h1>
        <div className="flex gap-x-8">
          <div className="hidden shrink-0 md:block">
            <CatalogueFiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
          <ProductList filters={filters} />
        </div>
      </div>
    </div>
  );
}
