export interface ProductSize {
  size: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  price: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  categories: string[];
  sizes?: ProductSize[];
  isFeatured: boolean;
  inStock: boolean;
  thumbnail: string;
  care?: string;
  shipping?: string;
  fit?: string;
  materials?: string;
  returns?: string;
}
