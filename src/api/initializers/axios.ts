import axios, { AxiosRequestConfig } from 'axios';

export const LOCAL_URL = 'http://localhost:3001/api';
export const BASE_URL = 'https://web-production-c5b7f.up.railway.app/api';
export const BASE_URL_CHAT = 'https://web-production-c5b7f.up.railway.app/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export async function request<T, R>(options: AxiosRequestConfig<R>): Promise<T> {
  return api(options);
}
