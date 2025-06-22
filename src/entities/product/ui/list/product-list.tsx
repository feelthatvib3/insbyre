'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductCard, ProductListSkeleton, getProducts } from 'entities/product';

export function ProductList() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (products.length === 0) {
    return <p className="text-muted-foreground">Товары не найдены.</p>;
  }

  return (
    <ul className="560:grid-cols-2 760:grid-cols-3 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {products.map((product) => (
        <>
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        </>
      ))}
    </ul>
  );
}
