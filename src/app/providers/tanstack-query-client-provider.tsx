'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

interface TanstackQueryProvider {
  children: ReactNode;
}

export function TanstackQueryClientProvider({ children }: TanstackQueryProvider) {
  const [tanstackQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60
          }
        }
      })
  );
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
