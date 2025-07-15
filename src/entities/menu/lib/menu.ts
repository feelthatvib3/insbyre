import { BaseballCapIcon, PantsIcon, SparkleIcon, TShirtIcon } from '@phosphor-icons/react';

import type { MenuItem } from 'entities/menu';

export const menu: MenuItem[] = [
  { name: 'Новинки', href: '/catalogue/new', icon: SparkleIcon },
  { name: 'Верх', href: '/catalogue/top', icon: TShirtIcon },
  { name: 'Низ', href: '/catalogue/bottom', icon: PantsIcon },
  { name: 'Аксессуары', href: '/catalogue/accessories', icon: BaseballCapIcon }
];
