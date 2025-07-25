import { Cart } from 'features/cart';
import { Menu } from 'features/menu';

import { cn } from 'shared/lib/cn';

interface HeaderProps {
  sticky?: boolean;
}

export function Header({ sticky }: HeaderProps) {
  return (
    <header
      className={cn(
        sticky ? 'bg-background border-b-united-nations-blue/10 sticky top-0 border-b' : undefined
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 xl:px-0">
        <a href="/" className="font-display z-45 text-xl uppercase">
          Insbyre
        </a>
        <div className="flex items-center gap-x-2">
          <Cart />
          <Menu />
        </div>
      </div>
    </header>
  );
}
