import { api } from 'api/initializers/axios';
import { useQueryMe } from 'api/user';
import { AxiosError, AxiosResponse } from 'axios';
import { useContextUser } from 'contexts/UserProvider';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const accessToken = localStorage.getItem('accessToken');

const useAxiosInterceptors = (): { isFetchingUser: boolean } => {
  const [isFetchingUser, setIsFetchingUser] = useState(!!accessToken);
  const { setUser } = useContextUser();
  const { t } = useTranslation(['notification']);

  useEffect(() => {
    if (accessToken) api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const resInterceptor = (response: AxiosResponse) => response.data;
    const errInterceptor = (error: AxiosError<{ message: string }>) => {
      if ((error.response?.status === 401 && error.response?.data?.message === 'Unauthorized')
    || (error.response?.status === 404 && error.response?.data?.message === 'USER_NOT_FOUND')) {
        localStorage.removeItem('accessToken');
        setUser(null);
      } else if (error.response?.data?.message) {
        toast(t(error.response?.data?.message, { ns: 'notification', defaultValue: t('UNKNOW_ERROR') }));
      }

      throw (error);
    };
    const interceptor = api.interceptors.response.use(resInterceptor, errInterceptor);
    return () => api.interceptors.response.eject(interceptor);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useQueryMe({
    enabled: isFetchingUser,
    onSettled: () => setIsFetchingUser(false),
    onSuccess: (payload) => {
      setUser({ ...payload });
    },
    retry: false,
  });

  return { isFetchingUser };
};

export default useAxiosInterceptors;
