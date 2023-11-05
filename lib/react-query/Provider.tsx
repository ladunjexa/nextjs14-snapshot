'use client';

import React, {useState} from 'react';

import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const showDevtools: boolean = true;

export default function Provider({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      {children}
    </QueryClientProvider>
  );
}
