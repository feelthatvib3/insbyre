import type { Product } from 'entities/product';

import { BASE_URL } from 'shared/constants/app';

export const getProducts = async (): Promise<Product[]> => {
  if (typeof window === 'undefined') {
    return [];
  }

  const res = await fetch(`${BASE_URL}/api/products`, {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({
      message: 'Не удалось получить список товаров'
    }));
    throw new Error(message);
  }

  return res.json();
};
