/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Components, Theme } from '@mui/material';

const button: Components<Omit<Theme, 'components'>> = ({
  MuiButton: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        '&.Mui-disabled': {
          opacity: 0.5,
          ...(ownerState.color === 'secondary' && {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary,
          }),
        },
        borderRadius: '200px',
        textTransform: 'none',
        ...(ownerState.variant === 'contained'
          && {
            fontFamily: 'Raleway',
          }),
        ...(ownerState.size === 'large'
          && {
            padding: '12px 32px',
            fontWeight: 'bold',
          }),
      }),
    },
  },
});

export default button;
