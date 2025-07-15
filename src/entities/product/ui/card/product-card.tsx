'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { SerializedProduct } from 'shared/types/product';

interface ProductCardProps {
  product: SerializedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'RUB',
    trailingZeroDisplay: 'stripIfInteger'
  };
  const priceFormat = new Intl.NumberFormat('ru-RU', options);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group group flex h-full flex-col justify-between overflow-hidden"
    >
      <div className="bg-united-nations-blue/5 flowers border-united-nations-blue/15 rounded-2xl border p-2 transition-all duration-300 group-hover:border-transparent group-hover:p-0">
        <div className="aspect-[1] overflow-hidden rounded-[8px] transition-all duration-300 group-hover:rounded-2xl">
          <Image
            src={product.thumbnail || product.images[0]}
            alt={product.name}
            width={750}
            height={750}
            className="size-full object-cover"
          />
        </div>
      </div>
      <div className="space-y-0 px-2 pt-2 pb-2">
        <h2 className="group-hover:text-united-nations-blue font-medium uppercase transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-muted-foreground">{priceFormat.format(product.price)}</p>
      </div>
    </Link>
  );
}
