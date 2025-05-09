import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { frFR } from '@mui/material/locale';
import createPalette from './createPalette';
import createGlobalStyles from './createGlobalStyles';
import typography from './typography';
import textField from './textField';
import { DarkColors, LightColors } from './colors';
import button from './button';

const getThemeCreated = (theme: 'light' | 'dark') => {
  const colors = theme === 'light' ? LightColors : DarkColors;
  return responsiveFontSizes(createTheme({
    palette: createPalette(theme, colors),
    typography,
    components: {
      MuiCssBaseline: {
        styleOverrides: createGlobalStyles(),
      },
      ...textField,
      ...button,
    },
  }, frFR));
};

export default getThemeCreated;
