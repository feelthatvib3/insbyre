'use client';

import { ShoppingBagIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from 'features/cart';

import type { Product } from 'entities/product';

import { Button } from 'shared/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { increment } = useCartStore();
  return (
    <Link href={`/catalogue/${product.slug}`} className="group block overflow-hidden">
      <div className="">
        <div className="bg-muted group-hover:bg-united-nations-blue/5 group-hover:border-united-nations-blue/25 rounded-2xl border p-2 transition">
          <div className="aspect-[1/0.75] overflow-hidden rounded-[8px]">
            <Image
              src={product.thumbnail || product.images[0]}
              alt={product.name}
              width={300}
              height={225}
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-2 pt-4">
          <h2 className="font-display text-xl tracking-wide uppercase">{product.name}</h2>
          <p className="text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
        <div className="flex items-center gap-x-2 p-2 pt-4">
          <Button
            variant="outline-brand"
            rounded="full"
            className="uppercase"
            onClick={(e) => {
              e.preventDefault();
              increment();
            }}
          >
            <ShoppingBagIcon className="size-5" weight="fill" />
            <span>В корзину</span>
          </Button>
          <p>{Number(product.price).toLocaleString()} ₽</p>
        </div>
      </div>
    </Link>
  );
}
