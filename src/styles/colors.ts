// styles/colors.ts

export type ColorsType = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  background: string;
  grey100: string;
  grey200: string;
  grey300: string;
};

export const LightColors: ColorsType = {
  primary: '#37474F',           // Bleu-gris foncé
  primaryLight: '#62727B',
  primaryDark: '#102027',
  secondary: '#00BFA5',         // Turquoise
  secondaryLight: '#5df2d6',
  secondaryDark: '#008e76',
  background: '#f5f5f5',        // Gris très clair
  grey100: '#eeeeee',
  grey200: '#e0e0e0',
  grey300: '#bdbdbd',
};

export const DarkColors: ColorsType = {
  primary: '#90CAF9',           // Bleu clair
  primaryLight: '#E3F2FD',
  primaryDark: '#42A5F5',
  secondary: '#80CBC4',         // Vert d’eau
  secondaryLight: '#B2DFDB',
  secondaryDark: '#4DB6AC',
  background: '#121212',        // Noir profond
  grey100: '#1e1e1e',
  grey200: '#2c2c2c',
  grey300: '#424242',
};