import type { CatalogueFilters } from 'features/catalogue-filters';

import type { Product } from 'entities/product';

import { BASE_URL } from 'shared/constants/app';

interface GetProductsParams {
  filters: CatalogueFilters;
}

export const getProducts = async ({ filters }: GetProductsParams): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (filters.category) params.set('category', filters.category);
  if (filters.minPrice != null) params.set('minPrice', filters.minPrice.toString());
  if (filters.maxPrice != null) params.set('maxPrice', filters.maxPrice.toString());
  if (filters.sort) params.set('sort', filters.sort);

  const res = await fetch(`${BASE_URL}/api/catalogue?${params.toString()}`);

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({
      message: 'Не удалось получить список товаров'
    }));
    throw new Error(message);
  }

  return res.json();
};
