import {
  useQuery,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { request } from './initializers/axios';
import { CustomQueryOptions } from './initializers/reactQuery';

export type CommuResponse =
  {
    id: string;
    location: string;
  };

export const commusKey = 'Commus';

export function useQueryCommus(
  config?: CustomQueryOptions<CommuResponse[]>,
  options?: AxiosRequestConfig,
) {
  return useQuery([commusKey], () => request(
    {
      ...options,
      url: '/locations',
      method: 'get',
    },
  ), { ...config });
}
