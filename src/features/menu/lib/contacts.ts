import { InstagramLogoIcon, TelegramLogoIcon } from '@phosphor-icons/react';

import type { MenuItem } from 'features/menu';

export const contacts: MenuItem[] = [
  { name: 'Telegram', href: 'https://t.me/insbyre', icon: TelegramLogoIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/insbyre.brand', icon: InstagramLogoIcon }
];
