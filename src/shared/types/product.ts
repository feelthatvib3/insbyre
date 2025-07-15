import type { Product, ProductSize } from '@prisma/client';

export type SerializedProduct = Omit<Product, 'price' | 'createdAt' | 'updatedAt'> & {
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductWithOptionalSizes = Product & { sizes?: ProductSize[] };
