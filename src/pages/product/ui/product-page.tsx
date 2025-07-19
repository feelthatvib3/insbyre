import { ShoppingBagIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from 'widgets/header';

import { useCartStore } from 'features/cart';

import { ProductGallery } from 'entities/product';

import { cn } from 'shared/lib/cn';
import type { Product } from 'shared/types/product';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'shared/ui/accordion';
import { Button } from 'shared/ui/button';

export const ProductPage = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);
  const [size, setSize] = useState<string>('');
  const [sizeError, setSizeError] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (product?.sizes?.length && !size) {
      setSizeError(true);
      return;
    }

    setSizeError(false);

    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      thumbnail: product.thumbnail || product.images[0],
      price: product.price,
      size
    });
  };

  useEffect(() => {
    if (!productSlug) return;

    import(`shared/data/products/${productSlug}.json`)
      .then((mod) => setProduct(mod.default))
      .catch(() => setError(true));
  }, [productSlug]);

  const priceFormat = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'code',
    maximumFractionDigits: 0
  });

  if (error) {
    return (
      <main>
        <Header sticky />
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <p className="text-destructive">Товар не найден.</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <Header sticky />
        <div className="mx-auto max-w-[1200px] px-4 py-8">
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header sticky />
      <div className="space-y-8 px-4 py-8 xl:px-0">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
            <ProductGallery images={product.images} thumbnail={product.thumbnail} />

            <div className="space-y-4">
              <h1 className="text-4xl font-bold uppercase">{product.name}</h1>

              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}

              <div className="text-2xl font-semibold">
                {priceFormat.format(Number(product.price))}
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-muted-foreground text-sm font-medium uppercase">Размер</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <Button
                        variant="outline"
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => setSize(s.size)}
                        className={cn(
                          s.size === size &&
                            'bg-united-nations-blue border-united-nations-blue hover:border-united-nations-blue text-primary-foreground'
                        )}
                      >
                        {s.size}
                      </Button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-destructive text-sm">
                      Пожалуйста, выберите размер перед добавлением в корзину.
                    </p>
                  )}
                </div>
              )}

              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingBagIcon weight="fill" className="size-5" />
                <span>Добавить в корзину</span>
              </Button>

              <Accordion type="single" collapsible className="w-full space-y-2">
                {product.materials && (
                  <AccordionItem value="materials">
                    <AccordionTrigger>Состав</AccordionTrigger>
                    <AccordionContent>{product.materials}</AccordionContent>
                  </AccordionItem>
                )}
                {product.care && (
                  <AccordionItem value="care">
                    <AccordionTrigger>Уход</AccordionTrigger>
                    <AccordionContent>{product.care}</AccordionContent>
                  </AccordionItem>
                )}
                {product.fit && (
                  <AccordionItem value="fit">
                    <AccordionTrigger>Посадка</AccordionTrigger>
                    <AccordionContent>{product.fit}</AccordionContent>
                  </AccordionItem>
                )}
                {product.shipping && (
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Доставка</AccordionTrigger>
                    <AccordionContent>{product.shipping}</AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
