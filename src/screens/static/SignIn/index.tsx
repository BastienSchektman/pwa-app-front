import React from 'react';
import Stack from '@mui/material/Stack';
import LogoText from 'components/LogoText';
import { Link, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Form from './Form';

function SignIn() {
  const { t } = useTranslation('signIn');
  return (
    <Stack height="100%" direction={{ xs: 'row', sm: 'column-reverse', lg: 'row' }}>
      <Stack justifyContent="space-between" px="44px" flex="1">
        <LogoText />
        <Form />
        <Link to="/sign-up" mb="10px" component={NavLink}>
          <Stack alignItems="center">
            <Typography>{t('noAccount')}</Typography>
            <Typography>{t('joinUs')}</Typography>
          </Stack>
        </Link>
      </Stack>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flex: { xs: '0.4', lg: '1.5' },
          backgroundColor: 'primary.main',
        }}
      />
    </Stack>
  );
}

export default SignIn;
