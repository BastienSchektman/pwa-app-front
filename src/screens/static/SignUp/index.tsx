import React from 'react';
import Stack from '@mui/material/Stack';
import LogoText from 'components/LogoText';
import { Link, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Form from './Form';

function SignUp() {
  const { t } = useTranslation('signIn');
  return (
    <Stack height="100%" direction={{ xs: 'row', sm: 'column-reverse', lg: 'row' }}>
      <Stack justifyContent="space-between" px="44px" flex="1">
        <LogoText from="signUp" />
        <Form />
        <Link to="/sign-in" mb="10px" component={NavLink}>
          <Stack alignItems="center">
            <Typography>{t('alreadyAnAccount')}</Typography>
            <Typography>{t('connectHere')}</Typography>
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

export default SignUp;
