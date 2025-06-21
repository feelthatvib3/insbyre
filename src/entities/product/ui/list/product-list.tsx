'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ProductCard, getProducts } from 'entities/product';

export function ProductList() {
  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (products.length === 0) {
    return <p className="text-muted-foreground">Товары не найдены.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
