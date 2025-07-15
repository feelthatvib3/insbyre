import type { ProductWithOptionalSizes } from 'shared/types/product';

export function serializeProduct(product: ProductWithOptionalSizes) {
  return {
    ...product,
    price: product.price.toNumber(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString()
  };
}
