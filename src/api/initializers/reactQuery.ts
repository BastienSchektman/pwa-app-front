import { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export const queryClientApi = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 2000,
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});

export type CustomQueryOptions<T> = Pick<UseQueryOptions<T>, 'onSuccess' | 'onError' | 'onSettled' | 'enabled' | 'retry' | 'placeholderData'>;

export type CustomMutationOptions<TData, TVariables = void> = Pick<UseMutationOptions<TData, unknown, TVariables, unknown>, 'onSuccess' | 'onError' | 'onSettled' |
'retry' | 'onMutate'>;
