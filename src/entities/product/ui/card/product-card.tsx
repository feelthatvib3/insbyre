'use client';

import {
  CurrencyRubIcon,
  EnvelopeSimpleIcon,
  PlusIcon,
  ShoppingBagIcon
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from 'entities/product';

import { Button } from 'shared/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    // <Link href={`/catalogue/${product.slug}`} className="relative block overflow-hidden">
    <div className="max-w-xs">
      <div className="bg-muted rounded-2xl border p-2">
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
        <p className="text-muted-foreground">{product.description}</p>
      </div>
      <div className="flex items-center gap-x-2 p-2 pt-4">
        <Button variant="outline-brand" rounded="full" className="uppercase">
          <ShoppingBagIcon className="size-5" weight="fill" />
          Купить
        </Button>
        <p>{Number(product.price).toLocaleString()} ₽</p>
      </div>
    </div>
    // </Link>
  );
}
