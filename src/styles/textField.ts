import { Components, Theme } from '@mui/material';

const textField: Components<Omit<Theme, 'components'>> = ({
  MuiTextField: {
    defaultProps: {
      color: 'primary',
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === 'outlined' && {
          borderRadius: 12,
        }),
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
});

export default textField;
