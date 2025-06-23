import { NextRequest, NextResponse } from 'next/server';

import { ApiError } from 'shared/lib/api-error';
import { prisma } from 'shared/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const category = searchParams.get('category') || undefined;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');

    const validCategory = category
      ? await prisma.category.findUnique({ where: { slug: category } })
      : null;

    if (category && !validCategory) {
      throw new ApiError('Категория не найдена', 400, 'INVALID_CATEGORY');
    }

    const price =
      minPrice || maxPrice
        ? {
            gte: minPrice ? Number(minPrice) : undefined,
            lte: maxPrice ? Number(maxPrice) : undefined
          }
        : undefined;

    const where = {
      category: category ? { slug: category } : undefined,
      price
    };

    const orderBy =
      sort === 'alphabetical_asc'
        ? { name: 'asc' as const }
        : sort === 'alphabetical_desc'
          ? { name: 'desc' as const }
          : sort === 'price_asc'
            ? { price: 'asc' as const }
            : sort === 'price_desc'
              ? { price: 'desc' as const }
              : { createdAt: 'desc' as const };

    const products = await prisma.product.findMany({
      where,
      orderBy
    });

    return NextResponse.json(products);
  } catch (err) {
    const error =
      err instanceof ApiError
        ? err
        : new ApiError('Не удалось получить список товаров', 500, 'GET_PRODUCTS_FAILED');

    return error.toResponse();
  }
}
