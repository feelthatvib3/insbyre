import { supabase } from 'shared/api/supabase';
import type { Product } from 'shared/types/product';

export async function getProductBySlug(productSlug: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select()
    .eq('slug', productSlug)
    .single<Product>();
  if (error) {
    throw new Error('Произошла ошибка при получении товара. Попробуйте позже.');
  }
  return data;
}

export async function getProducts(category?: string): Promise<Product[]> {
  let query = supabase.from('products').select();

  if (category) {
    query = query.contains('categories', [category]);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Произошла ошибка при получении списка товаров. Попробуйте позже.');
  }

  return data;
}
