import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';
import { buttonVariants } from 'shared/ui/button';

export function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  );
}
