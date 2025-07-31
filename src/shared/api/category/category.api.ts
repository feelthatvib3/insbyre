import { supabase } from 'shared/api/supabase';
import type { Category } from 'shared/types/category';

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select();
  if (error) {
    throw new Error('Произошла ошибка при получении списка категорий. Попробуйте позже.');
  }
  return data;
}
