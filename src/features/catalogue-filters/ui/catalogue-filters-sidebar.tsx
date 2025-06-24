'use client';

import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import {
  type CatalogueFilters,
  CatalogueFiltersButton,
  CatalogueFiltersSidebarSkeleton,
  catalogueSortOptions,
  useCatalogueFilters
} from 'features/catalogue-filters';

import { Input } from 'shared/ui/input';

interface CatalogueFiltersSidebarProps {
  filters: CatalogueFilters;
  onFiltersChange: (f: CatalogueFilters) => void;
}

export function CatalogueFiltersSidebar({
  filters,
  onFiltersChange
}: CatalogueFiltersSidebarProps) {
  const { categories, isLoading, maxPrice, minPrice } = useCatalogueFilters();

  const [localMin, setLocalMin] = useState<number | ''>(filters.minPrice ?? '');
  const [localMax, setLocalMax] = useState<number | ''>(filters.maxPrice ?? '');

  const [debouncedMin] = useDebounceValue(localMin, 300);
  const [debouncedMax] = useDebounceValue(localMax, 300);

  useEffect(() => {
    if (
      filters.minPrice !== (typeof debouncedMin === 'number' ? debouncedMin : undefined) ||
      filters.maxPrice !== (typeof debouncedMax === 'number' ? debouncedMax : undefined)
    ) {
      onFiltersChange({
        ...filters,
        minPrice: typeof debouncedMin === 'number' ? debouncedMin : undefined,
        maxPrice: typeof debouncedMax === 'number' ? debouncedMax : undefined
      });
    }
  }, [debouncedMin, debouncedMax, filters, onFiltersChange]);

  useEffect(() => {
    setLocalMin(filters.minPrice ?? '');
    setLocalMax(filters.maxPrice ?? '');
  }, [filters.minPrice, filters.maxPrice]);

  if (isLoading) return <CatalogueFiltersSidebarSkeleton />;

  return (
    <div className="bg-background top-[calc(68px+1rem)] z-auto h-fit min-h-[512px] w-full max-w-[228px] space-y-8 rounded-2xl">
      <div className="space-y-4">
        <h3 className="font-display text-lg uppercase">Категория</h3>
        <ul className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <CatalogueFiltersButton
              key={c.slug}
              selected={(filters.category ?? 'all') === c.slug}
              onClick={() =>
                onFiltersChange({
                  ...filters,
                  category: c.slug === 'all' ? undefined : c.slug
                })
              }
            >
              {c.name}
            </CatalogueFiltersButton>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg uppercase">Цена</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Input
              type="number"
              step="1"
              autoComplete="off"
              inputMode="numeric"
              placeholder="От"
              className="rounded-s-full border-e-0"
              min={minPrice}
              max={localMax || maxPrice}
              value={localMin}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLocalMin(isNaN(val) ? '' : val);
              }}
            />
            <Input
              type="number"
              step="1"
              autoComplete="off"
              inputMode="numeric"
              placeholder="До"
              className="rounded-e-full border-s-0 text-end placeholder:text-end"
              min={localMin || minPrice}
              max={maxPrice}
              value={localMax}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLocalMax(isNaN(val) ? '' : val);
              }}
            />
          </div>
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span>мин: {minPrice?.toLocaleString()} ₽</span>
            <span>макс: {maxPrice?.toLocaleString()} ₽</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-lg uppercase">Сортировка</h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {catalogueSortOptions.map((option) => (
            <CatalogueFiltersButton
              key={option.value}
              selected={filters.sort === option.value}
              onClick={() => {
                if (filters.sort === option.value) return;
                onFiltersChange({ ...filters, sort: option.value });
              }}
            >
              {option.label}
            </CatalogueFiltersButton>
          ))}
        </div>
      </div>
    </div>
  );
}
