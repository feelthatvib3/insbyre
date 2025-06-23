import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import {
  type CatalogueFilters,
  CatalogueFiltersButton,
  CatalogueFiltersSidebarSkeleton,
  type CatalogueSort,
  getCatalogueFilters
} from 'features/catalogue-filters';

import { Slider } from 'shared/ui/slider';

interface CatalogueFiltersSidebarProps {
  filters: CatalogueFilters;
  onFiltersChange: (f: CatalogueFilters) => void;
}

const sortOptions: { value: CatalogueSort; label: string }[] = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'alphabetical_asc', label: 'По алфавиту: А–Я' },
  { value: 'alphabetical_desc', label: 'По алфавиту: Я–А' },
  { value: 'price_asc', label: 'Сначала дешёвые' },
  { value: 'price_desc', label: 'Сначала дорогие' }
];

export function CatalogueFiltersSidebar({
  filters,
  onFiltersChange
}: CatalogueFiltersSidebarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['catalogue-filters'],
    queryFn: getCatalogueFilters
  });

  const [sliderValue, setSliderValue] = useState(filters.minPrice ?? data?.minPrice ?? 0);

  const [value] = useDebounceValue(sliderValue, 300);

  const categories = [{ slug: 'all', name: 'Все' }, ...(data?.categories ?? [])];

  useEffect(() => {
    if (filters.minPrice !== value) {
      onFiltersChange({ ...filters, minPrice: value });
    }
  }, [value, filters, onFiltersChange]);

  if (isLoading) {
    return <CatalogueFiltersSidebarSkeleton />;
  }

  return (
    <div className="sticky top-[calc(68px+1rem)] z-auto h-fit min-h-[512px] w-full max-w-[228px] space-y-8">
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
        <div>
          <Slider
            value={sliderValue}
            onChange={(val) => setSliderValue(val)}
            min={data?.minPrice}
            max={data?.maxPrice}
            step={1}
          />
          <div className="flex items-center justify-between">
            <p>{data?.minPrice.toLocaleString()} ₽</p>
            <p>{data?.maxPrice.toLocaleString()} ₽</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-display text-lg uppercase">Сортировка</h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {sortOptions.map((option) => (
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
