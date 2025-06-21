export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  tags: string[];
  isFeatured: boolean;
  inStock: boolean;
  thumbnail?: string;
}
