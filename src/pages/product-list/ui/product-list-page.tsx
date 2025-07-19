import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from 'widgets/header';

import { ProductCard } from 'entities/product';

import type { Product } from 'shared/types/product';

export function ProductListPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const files = import.meta.glob('/src/shared/data/products/*.json');
      console.log(files);
      const entries = await Promise.all(
        Object.values(files).map((load) =>
          (load() as Promise<{ default: Product }>).then((mod) => mod.default)
        )
      );
      setProducts(entries);
    };

    loadProducts();
  }, []);

  const filtered = categorySlug
    ? products.filter((p) => p.categories?.includes(categorySlug))
    : products;

  return (
    <main>
      <Header sticky />
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:py-8 xl:px-0">
        <ul className="560:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {filtered.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
