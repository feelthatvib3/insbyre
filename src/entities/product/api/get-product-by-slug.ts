import { serializeProduct } from 'entities/product';

import { prisma } from 'shared/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { sizes: true }
  });

  if (!product) throw new Error('Продукт не найден.');
  return serializeProduct(product);
};
