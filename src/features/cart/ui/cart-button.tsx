'use client';

import { ShoppingBagIcon } from '@phosphor-icons/react';

import { useCartStore } from 'features/cart';

import { cn } from 'shared/lib/cn';
import { Button } from 'shared/ui/button';

export function CartButton() {
  const { count } = useCartStore();

  return (
    <Button variant="outline" className="gap-x-1 rounded-full !px-2">
      <ShoppingBagIcon className="size-5" />
      <p className={cn(count > 0 ? 'block' : 'hidden')}>{count}</p>
    </Button>
  );
}
