import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'placeholder:text-muted-foreground selection:text-primary-foreground flex w-full min-w-0 rounded-lg border bg-white px-3 py-2 text-base transition-colors outline-none focus-visible:border-black/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Input };
