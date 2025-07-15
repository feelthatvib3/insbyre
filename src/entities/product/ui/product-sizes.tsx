'use client';

import type { ProductSize } from '@prisma/client';
import { useState } from 'react';

import { cn } from 'shared/lib/cn';

interface ProductSizesProps {
  sizes: ProductSize[];
  onChange?: (size: string) => void;
}

export function ProductSizes({ sizes, onChange }: ProductSizesProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSelect = (size: string, inStock: boolean) => {
    if (!inStock) return;
    setSelectedSize(size);
    onChange?.(size);
  };

  return (
    <div className="space-y-2">
      <p className="text-lg">Размер</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const isSelected = selectedSize === s.size;

          return (
            <button
              type="button"
              key={s.size}
              disabled={!s.inStock}
              onClick={() => handleSelect(s.size, s.inStock)}
              className={cn(
                'flex size-12 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                !s.inStock
                  ? 'text-muted-foreground cursor-not-allowed'
                  : isSelected
                    ? 'border-united-nations-blue bg-united-nations-blue text-white'
                    : 'hover:border-united-nations-blue/50 cursor-pointer'
              )}
            >
              {s.size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
