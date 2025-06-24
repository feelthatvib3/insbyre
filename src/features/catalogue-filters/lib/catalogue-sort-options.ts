import type { CatalogueSort } from 'features/catalogue-filters';

export const catalogueSortOptions: { value: CatalogueSort; label: string }[] = [
  { value: 'newest', label: 'Новые' },
  { value: 'alphabetical_asc', label: 'По алфавиту (А—Я)' },
  { value: 'alphabetical_desc', label: 'В обратном порядке (Я–А)' },
  { value: 'price_asc', label: 'Цена по возрастанию' },
  { value: 'price_desc', label: 'Цена по убыванию' }
];
