import {
  useMutation, useQuery,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { LocationType } from 'contexts/UserProvider';
import { request } from './initializers/axios';
import { CustomMutationOptions, CustomQueryOptions } from './initializers/reactQuery';

export type UserResponse = {
  locations: LocationType[];
  username: string;
  id: string;
};

export const userKey = 'User';

export function useQueryMe(
  config?: CustomQueryOptions<UserResponse>,
  options?: AxiosRequestConfig,
) {
  return useQuery([userKey], () => request(
    {
      ...options,
      url: '/users/me',
      method: 'get',
    },
  ), { ...config });
}

export type LoginData = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    username: string;
    locations: LocationType[];
  };
};

export function useMutationLogin(
  config?: CustomMutationOptions<LoginResponse, LoginData>,
  options?: AxiosRequestConfig,
) {
  return useMutation((data) => request(
    {
      ...options,
      url: '/auth/login',
      method: 'post',
      data,
    },
  ), {
    ...config,
  });
}

export function useMutationRegister(
  config?: CustomMutationOptions<LoginResponse, LoginData>,
  options?: AxiosRequestConfig,
) {
  return useMutation((data) => request(
    {
      ...options,
      url: '/auth/register',
      method: 'post',
      data,
    },
  ), {
    ...config,
  });
}

export type UserData = {
  username: string;
};

export function useMutationUser(
  config?: CustomMutationOptions<UserResponse, UserData>,
  options?: AxiosRequestConfig,
) {
  return useMutation((data) => request(
    {
      ...options,
      url: '/users',
      method: 'patch',
      data,
    },
  ), {
    ...config,
  });
}
