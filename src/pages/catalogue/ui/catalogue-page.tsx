'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import {
  type CatalogueFilters,
  CatalogueFiltersSidebar,
  CatalogueMobileFiltersBar
} from 'features/catalogue-filters';

import { ProductList } from 'entities/product';

interface CataloguePageProps {
  category?: string;
}

export function CataloguePage({ category }: CataloguePageProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const [filters, setFilters] = useState<CatalogueFilters>({ category });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category }));
  }, [category]);

  const handleFiltersChange = (newFilters: CatalogueFilters) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.category) params.set('c', newFilters.category);
    else params.delete('c');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:space-y-12 md:py-12 xl:px-0">
      <h1 className="font-display text-4xl uppercase md:text-5xl">Каталог</h1>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        {isDesktop ? (
          <CatalogueFiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />
        ) : (
          <CatalogueMobileFiltersBar filters={filters} onFiltersChange={handleFiltersChange} />
        )}
        <ProductList filters={filters} />
      </div>
    </div>
  );
}
