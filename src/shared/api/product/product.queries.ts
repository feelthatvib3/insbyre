import { useQuery } from '@tanstack/react-query';

import { getProductBySlug, getProducts } from 'shared/api/product/product.api';

export const GET_PRODUCTS_QUERY_KEY = 'PRODUCTS';
export const GET_PRODUCT_BY_SLUG_QUERY_KEY = 'PRODUCT_BY_SLUG';

export function useProductsQuery({ category }: { category?: string }) {
  return useQuery({
    queryKey: [GET_PRODUCTS_QUERY_KEY, category],
    queryFn: () => getProducts(category)
  });
}

export function useGetProductBySlugQuery(productSlug: string) {
  return useQuery({
    queryKey: [GET_PRODUCT_BY_SLUG_QUERY_KEY, productSlug],
    queryFn: () => getProductBySlug(productSlug)
  });
}
