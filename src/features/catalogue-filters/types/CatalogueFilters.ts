import type { CatalogueSort } from 'features/catalogue-filters';

export interface CatalogueFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: CatalogueSort;
}
