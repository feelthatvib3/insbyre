'use client';

import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import {
  type CatalogueFilters,
  type CatalogueSort,
  catalogueSortOptions,
  useCatalogueFilters
} from 'features/catalogue-filters';

import { Input } from 'shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shared/ui/select';

interface CatalogueMobileFiltersBarProps {
  filters: CatalogueFilters;
  onFiltersChange: (f: CatalogueFilters) => void;
}

export function CatalogueMobileFiltersBar({
  filters,
  onFiltersChange
}: CatalogueMobileFiltersBarProps) {
  const { categories, minPrice, maxPrice } = useCatalogueFilters();

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Select
          value={filters.category ?? 'all'}
          onValueChange={(val) =>
            onFiltersChange({ ...filters, category: val === 'all' ? undefined : val })
          }
        >
          <SelectTrigger className="w-full rounded-full">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sort ?? 'newest'}
          onValueChange={(val) => onFiltersChange({ ...filters, sort: val as CatalogueSort })}
        >
          <SelectTrigger className="w-full rounded-full">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            {catalogueSortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Цена от"
          className="w-full rounded-full"
          value={localMin}
          min={minPrice}
          max={localMax || maxPrice}
          onChange={(e) => {
            const val = Number(e.target.value);
            setLocalMin(isNaN(val) ? '' : val);
          }}
        />
        <Input
          type="number"
          inputMode="numeric"
          placeholder="Цена до"
          className="w-full rounded-full"
          value={localMax}
          min={localMin || minPrice}
          max={maxPrice}
          onChange={(e) => {
            const val = Number(e.target.value);
            setLocalMax(isNaN(val) ? '' : val);
          }}
        />
      </div>
    </div>
  );
}
