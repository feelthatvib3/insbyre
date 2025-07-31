import { useQuery } from '@tanstack/react-query';

import { getCategories } from 'shared/api/category/category.api';

export const GET_CATEGORIES_QUERY_KEY = 'CATEGORIES';

export function useCategoriesQuery() {
  return useQuery({
    queryKey: [GET_CATEGORIES_QUERY_KEY],
    queryFn: getCategories
  });
}
