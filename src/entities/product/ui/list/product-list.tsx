import { use } from 'react';

import { ProductCard } from 'entities/product';

import type { SerializedProduct } from 'shared/types/product';

interface ProductListProps {
  products: Promise<SerializedProduct[]>;
}

export function ProductList({ products }: ProductListProps) {
  const resolved = use(products);

  if (resolved.length === 0) {
    return <p className="text-muted-foreground">Артикулы не найдены.</p>;
  }

  return (
    <ul className="560:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {resolved.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
