import type { Category } from 'shared/types/category';

const modules = import.meta.glob<Category>('/src/shared/data/categories/*.json', {
  eager: true
});

export const categories: Category[] = Object.values(modules).sort((a, b) => a.order - b.order);
