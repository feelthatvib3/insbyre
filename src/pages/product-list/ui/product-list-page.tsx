import { useParams } from 'react-router-dom';

import { Header } from 'widgets/header';

import { ProductCard } from 'entities/product';

import { useProductsQuery } from 'shared/api/product/product.queries';

export function ProductListPage() {
  const { categorySlug } = useParams();

  const { data: products } = useProductsQuery({ category: categorySlug });

  console.log(products);

  return (
    <main>
      <Header sticky />
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 py-8 md:py-8 xl:px-0">
        <ul className="560:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {products && products.length
            ? products.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))
            : null}
        </ul>
      </div>
    </main>
  );
}
