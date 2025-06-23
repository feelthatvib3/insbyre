import { NextResponse } from 'next/server';

import type { CatalogueFiltersResponse } from 'features/catalogue-filters';

import { ApiError } from 'shared/lib/api-error';
import { prisma } from 'shared/lib/prisma';

export async function GET() {
  try {
    const [priceResult, categories] = await Promise.all([
      prisma.product.aggregate({
        _min: { price: true },
        _max: { price: true }
      }),
      prisma.category.findMany({
        select: {
          slug: true,
          name: true
        },
        orderBy: {
          name: 'asc'
        }
      })
    ]);

    const minPrice = priceResult._min.price?.toNumber() ?? 0;
    const maxPrice = priceResult._max.price?.toNumber() ?? 0;

    return NextResponse.json<CatalogueFiltersResponse>({
      categories,
      minPrice,
      maxPrice
    });
  } catch (err) {
    const error =
      err instanceof ApiError
        ? err
        : new ApiError('Не удалось получить фильтры', 500, 'GET_FILTERS_FAILED');

    return error.toResponse();
  }
}
