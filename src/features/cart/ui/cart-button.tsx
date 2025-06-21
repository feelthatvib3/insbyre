'use client';

import { ShoppingBagIcon } from '@phosphor-icons/react';

import { Button } from 'shared/ui/button';

export function CartButton() {
  return (
    <Button variant="outline" className="rounded-full !px-2">
      <ShoppingBagIcon className="size-5" />
    </Button>
  );
}
