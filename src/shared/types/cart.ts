import type { Product } from 'shared/types/product';

export interface CartItem {
  id: Product['id'];
  slug: Product['slug'];
  name: Product['name'];
  sku: Product['sku'];
  price: Product['price'];
  size?: string;
  thumbnail: Product['thumbnail'];
  quantity: number;
}
