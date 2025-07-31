export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  categories: string[];
  sizes?: string[];
  isFeatured: boolean;
  inStock: boolean;
  care?: string;
  shipping?: string;
  fit?: string;
  materials?: string;
  returns?: string;
}
