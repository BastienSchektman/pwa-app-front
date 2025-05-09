import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import getThemeCreated from 'styles/theme';
import {
  ThemeSelectorProvider,
  useContextTheme,
} from 'contexts/ThemeSelectorProvider';
import { UserProvider } from 'contexts/UserProvider';
import AppSelector from 'screens/AppSelector';
import moment from 'moment';

import i18n from 'i18n';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientApi } from 'api/initializers/reactQuery';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import useAxiosInterceptors from 'hooks/useAxiosInterceptors';
import useOnlineStatus from 'hooks/useOnlineStatus';

function Initializer() {
  const { theme } = useContextTheme();
  const { t } = useTranslation(['common']);
  const wasOffline = useRef(false);

  // Initialize online status and axios interceptors
  const { onlineStatus } = useOnlineStatus();
  useEffect(() => {
    if (!onlineStatus) {
      wasOffline.current = true;
      toast.info('Vous êtes hors-ligne', {
        position: 'bottom-left',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else if (onlineStatus && wasOffline.current) {
      wasOffline.current = false;
      toast.info('Vous êtes de nouveau en ligne', {
        position: 'bottom-left',
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [onlineStatus]);
  const { isFetchingUser } = useAxiosInterceptors();

  return (
    <ThemeProvider theme={getThemeCreated(theme)}>
      <CssBaseline />
      {isFetchingUser ? t('loading') : <AppSelector />}
    </ThemeProvider>

  );
}

function App() {
  moment.locale(i18n.language);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClientApi}>
        <BrowserRouter>
          <ThemeSelectorProvider>
            <Initializer />
          </ThemeSelectorProvider>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
