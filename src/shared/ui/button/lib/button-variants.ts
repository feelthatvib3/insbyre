import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "aria-invalid:border-destructive flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        destructive:
          'bg-destructive hover:bg-destructive/90 dark:bg-destructive/60 text-white shadow-xs',
        outline:
          'bg-button-outline border-button-outline-border hover:border-button-outline-border-hover border',
        'outline-brand':
          'bg-united-nations-blue/5 text-united-nations-blue border-united-nations-blue/25 hover:bg-united-nations-blue/10 hover:border-united-nations-blue/50 border',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
        ghost: 'hover:bg-ghost-hover bg-transparent',
        link: 'text-primary underline-offset-4 hover:underline',
        brand: 'bg-united-nations-blue hover:bg-united-nations-blue-darken text-white'
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9'
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default'
    }
  }
);
