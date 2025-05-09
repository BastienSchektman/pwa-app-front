import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RChar = styled('span')(({ theme }) => `
  color: ${theme.palette.primary.main};
`);

const ZChar = styled('span')(({ theme }) => `
  color: ${theme.palette.secondary.main};
`);

type Props = {
  link?: boolean;
  onClick?: () => void;
  from?: 'signIn' | 'signUp';
};

function LogoText({ link = false, onClick, from = 'signIn' }: Props) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (onClick) onClick();
    if (link) navigate('/home');
  };

  return (
    <Stack
      mt={!link ? '40px' : '16px'}
      spacing={2}
      sx={{
        ...(link && {
          cursor: 'pointer',
          width: 'fit-content',
          paddingLeft: '12px',
          marginBottom: '52px',
          display: { xs: 'none', sm: 'flex' },
        }),
      }}
    >
      <Stack
        justifyContent={!link ? 'center' : 'start'}
        direction="row"
        onClick={handleOnClick}

      >
        <Typography
          variant={!link ? 'h2' : 'h5'}
          sx={{
            MozUserSelect: '-moz-none',
            KhtmlUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          Rumo
          <RChar>rrrrrrrrrrr</RChar>
          <ZChar>z</ZChar>
        </Typography>
      </Stack>

      {!link && (
      <Stack justifyContent="center" direction="row">
        <Typography variant="h6" fontStyle="italic">
          {t(from === 'signIn' ? 'areYouAware' : 'readyToJoin')}
        </Typography>
        <Typography variant="h6">
          {' '}
          {from === 'signIn' ? '🤫' : '🫡'}
        </Typography>
      </Stack>
      )}
    </Stack>
  );
}

export default LogoText;
