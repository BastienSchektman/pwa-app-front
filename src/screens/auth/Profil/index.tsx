import React from 'react';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useContextUser } from 'contexts/UserProvider';
import PseudoForm from './PseudoForm';

function Profil() {
  const { t } = useTranslation(['common']);
  const { setUser } = useContextUser();

  return (
    <Stack height={{ xs: 'calc(100vh - 56px)', sm: '100vh' }} p="16px">
      <PseudoForm />
      <Stack justifyContent="center" direction="row" sx={{ marginTop: 'auto' }}>
        <LoadingButton
          color="secondary"
          variant="contained"
          size="large"
          onClick={() => {
            localStorage.removeItem('accessToken');
            setUser(null);
          }}
        >
          {t('logOut')}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}

export default Profil;
