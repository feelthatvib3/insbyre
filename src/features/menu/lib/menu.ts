import { FlowerIcon } from '@phosphor-icons/react';

import type { MenuItem } from 'features/menu';

import { categories, categoryIconMap } from 'entities/category';

export const menu: MenuItem[] = categories.map((c) => ({
  name: c.label,
  href: `/products/${c.slug}`,
  icon: categoryIconMap[c.slug] ?? FlowerIcon
}));
