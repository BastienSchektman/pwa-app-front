import { ColorsType } from './colors';

declare module '@mui/material/styles' {
}

const createPalette = (theme: 'light' | 'dark', colors: ColorsType) => ({
  mode: theme,
  primary: {
    main: colors.primary,
    light: colors.primaryLight,
    dark: colors.primaryDark,
  },
  secondary: {
    main: colors.secondary,
    light: colors.secondaryLight,
    dark: colors.secondaryDark,
  },
  background: {
    default: colors.background,
  },
  grey: {
    100: colors.grey100,
    200: colors.grey200,
    300: colors.grey300,
  },
});

export default createPalette;
