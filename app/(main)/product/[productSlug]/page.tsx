import { ProductGallery, getProductBySlug } from 'entities/product';

export default async function Page({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;

  const product = await getProductBySlug(productSlug);

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'RUB',
    trailingZeroDisplay: 'stripIfInteger'
  };
  const priceFormat = new Intl.NumberFormat('ru-RU', options);

  return (
    <div className="space-y-8 px-4 py-8 xl:px-0">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} thumbnail={product.thumbnail} />

          <div className="flex flex-col space-y-8 py-8">
            <h1 className="text-3xl leading-tight font-light uppercase">{product.name}</h1>

            {product.description && (
              <p className="text-muted-foreground text-lg font-light">{product.description}</p>
            )}

            <div className="text-3xl font-light">{priceFormat.format(product.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
