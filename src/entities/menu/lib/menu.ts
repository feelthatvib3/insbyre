import { BaseballCapIcon, PantsIcon, SparkleIcon, TShirtIcon } from '@phosphor-icons/react';

import type { MenuItem } from 'entities/menu';

export const menu: MenuItem[] = [
  { name: 'Новинки', href: '/catalogue?c=new', icon: SparkleIcon },
  { name: 'Верх', href: '/catalogue?c=top', icon: TShirtIcon },
  { name: 'Низ', href: '/catalogue?c=bottom', icon: PantsIcon },
  { name: 'Аксессуары', href: '/catalogue?c=accessories', icon: BaseballCapIcon }
];
