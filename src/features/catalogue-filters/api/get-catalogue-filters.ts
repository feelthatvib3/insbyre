import { BASE_URL } from 'shared/constants/app';

export interface CatalogueFiltersResponse {
  categories: {
    slug: string;
    name: string;
  }[];
  minPrice: number;
  maxPrice: number;
}

export const getCatalogueFilters = async (): Promise<CatalogueFiltersResponse> => {
  const res = await fetch(`${BASE_URL}/api/catalogue/filters`);

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({
      message: 'Не удалось получить фильтры'
    }));
    throw new Error(message);
  }

  return res.json();
};
