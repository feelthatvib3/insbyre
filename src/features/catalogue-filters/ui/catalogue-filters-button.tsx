import type { ComponentProps, ReactNode } from 'react';

import { cn } from 'shared/lib/cn';
import { Button } from 'shared/ui/button';

interface CatalogueFiltersButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  selected?: boolean;
}

export function CatalogueFiltersButton({
  children,
  selected,
  ...props
}: CatalogueFiltersButtonProps) {
  return (
    <Button
      variant={selected ? 'outline-brand' : 'outline'}
      size="sm"
      rounded="full"
      className={cn(
        'hover:bg-united-nations-blue/5 hover:border-united-nations-blue/25',
        selected ? 'font-normal' : 'font-normal'
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
