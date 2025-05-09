import { Stack, useTheme } from '@mui/material';
import useWindowDimensions from 'hooks/useWindowDimensions';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode
};

function NavigationWrapper({ children }: Props) {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const { width } = useWindowDimensions();
  const theme = useTheme();

  useEffect(() => {
    if (width >= theme.breakpoints.values.lg) {
      setIsChatModalOpen(false);
    }
  }, [width, theme]);

  useEffect(() => {
    const bodyEl = document.querySelector('body');
    if (bodyEl) {
      if (isChatModalOpen) {
        bodyEl.style.overflow = 'hidden';
      } else {
        bodyEl.style.overflow = 'visible';
      }
    }
  }, [isChatModalOpen]);

  return (
    <Stack direction="row" justifyContent={{ sm: 'end', lg: 'center' }}>
      <Stack
        sx={{
          borderRight: { xs: 'none', sm: `1px solid ${theme.palette.grey[300]}` },
          borderTop: { xs: `1px solid ${theme.palette.grey[300]}`, sm: 'none' },
          display: 'flex',
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 1,
          height: { xs: '56px', sm: '100%' },
          width: { xs: '100%', sm: '25%' },
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: `${theme.palette.background.default}`,
        }}
      >
        <Navbar />
      </Stack>
      <Stack
        sx={{
          position: 'relative',
          zIndex: 0,
          width: { xs: '100%', sm: '75%', lg: '50%' },
        }}
        pb={{ xs: '55px', sm: '0' }}
      >
        {children}
      </Stack>
      <Stack
        sx={{
          borderLeft: `1px solid ${theme.palette.grey[300]}`,
          width: isChatModalOpen ? '100%' : '25%',
          zIndex: 2,
          backgroundColor: theme.palette.background.default,
          display: { xs: isChatModalOpen ? 'flex' : 'none', lg: 'flex' },
          position: 'fixed',
          right: 0,
          height: '100%',
        }}
      />
    </Stack>
  );
}

export default NavigationWrapper;
