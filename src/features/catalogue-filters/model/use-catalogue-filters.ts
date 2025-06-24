import { useQuery } from '@tanstack/react-query';

import { getCatalogueFilters } from 'features/catalogue-filters/api/get-catalogue-filters';

export function useCatalogueFilters() {
  const { data, isLoading } = useQuery({
    queryKey: ['catalogue-filters'],
    queryFn: getCatalogueFilters
  });

  const categories = [{ slug: 'all', name: 'Все' }, ...(data?.categories ?? [])];

  return {
    categories,
    minPrice: data?.minPrice,
    maxPrice: data?.maxPrice,
    isLoading
  };
}
