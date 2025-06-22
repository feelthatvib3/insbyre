import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-united-nations-blue/10 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
