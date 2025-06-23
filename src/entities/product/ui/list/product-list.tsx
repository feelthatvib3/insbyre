'use client';

import { useQuery } from '@tanstack/react-query';

import type { CatalogueFilters } from 'features/catalogue-filters';

import { ProductCard, ProductListSkeleton, getProducts } from 'entities/product';

interface ProductListProps {
  filters: CatalogueFilters;
}

export function ProductList({ filters }: ProductListProps) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts({ filters })
  });

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (products.length === 0) {
    return <p className="text-muted-foreground">Артикулы не найдены.</p>;
  }

  return (
    <ul className="560:grid-cols-2 grid grid-cols-1 gap-4 pb-[10000px] lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
