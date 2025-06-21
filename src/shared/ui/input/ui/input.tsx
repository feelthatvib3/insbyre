import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'placeholder:text-placeholder bg-input focus-visible:border-input-border-focus hover:border-input-border-hover border-input-border flex w-full rounded-md border px-4 py-2 text-base transition outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Input };
