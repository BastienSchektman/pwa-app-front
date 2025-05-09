import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { CommuResponse } from './commus';
import { request } from './initializers/axios';
import { CustomMutationOptions, CustomQueryOptions } from './initializers/reactQuery';
import { UserResponse } from './user';

export type RumorResponse =
{
  id: string,
  content: string,
  location: CommuResponse,
  user: UserResponse,
  date: string,
};

export const rumorsKey = 'Rumors';

export function useQueryCommuRumors(
  locationId: string,
  config?: CustomQueryOptions<RumorResponse[]>,
  options?: AxiosRequestConfig,
) {
  return useQuery([rumorsKey, locationId], () => request(
    {
      ...options,
      url: `/locations/${locationId}/rumor`,
      method: 'get',
    },
  ), { ...config });
}

export function useQueryRumors(
  config?: CustomQueryOptions<RumorResponse[]>,
  options?: AxiosRequestConfig,
) {
  return useQuery([rumorsKey, 'all'], () => request(
    {
      ...options,
      url: '/rumors',
      method: 'get',
    },
  ), { ...config });
}

export type RumorData = {
  content: string;
  locationId: string,
};

export function useMutationRumor(
  config?: CustomMutationOptions<RumorResponse, RumorData>,
  options?: AxiosRequestConfig,
) {
  return useMutation(({ locationId, content }) => request(
    {
      ...options,
      url: `/locations/${locationId}/rumor`,
      method: 'post',
      data: { content },
    },
  ), {
    ...config,
  });
}
