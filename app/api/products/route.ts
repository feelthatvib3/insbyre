import { NextResponse } from 'next/server';

import { ApiError } from 'shared/lib/api-error';
import { prisma } from 'shared/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err) {
    const error =
      err instanceof ApiError
        ? err
        : new ApiError('Не удалось получить список товаров', 500, 'GET_PRODUCTS_FAILED');

    return error.toResponse();
  }
}
