import { cache } from 'react';

import { serializeProduct } from 'entities/product';

import { prisma } from 'shared/lib/prisma';
import type { CatalogueFilters } from 'shared/types/catalogue';
import type { SerializedProduct } from 'shared/types/product';

interface GetProductsParams {
  filters: CatalogueFilters;
}

export const getProducts = cache(
  async ({ filters }: GetProductsParams): Promise<SerializedProduct[]> => {
    const where = {
      category: filters.category ? { slug: filters.category } : undefined
    };

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return products.map(serializeProduct);
  }
);
