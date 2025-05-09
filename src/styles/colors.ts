 type ColorsType = {
   background: string;
   primaryLight: string;
   primary: string;
   primaryDark: string;
   secondaryLight: string;
   secondary: string;
   secondaryDark: string;
   grey100: string;
   grey200: string;
   grey300: string;
 };

const LightColors: ColorsType = {
  background: '#1F2028', // If you change background don't forget to change it in white flash handler in public/index.html
  primaryLight: '#54D6FF',
  primary: '#54D6FF',
  primaryDark: '#54D6FF',
  secondaryLight: '#F93DF1',
  secondary: '#F93DF1',
  secondaryDark: '#F93DF1',
  grey100: '#9F9FA3',
  grey200: '#71767B',
  grey300: '#32333B',
};

const DarkColors: ColorsType = {
  background: '#1F2028', // If you change background don't forget to change it in white flash handler in public/index.html
  primaryLight: '#54D6FF',
  primary: '#54D6FF',
  primaryDark: '#54D6FF',
  secondaryLight: '#F93DF1',
  secondary: '#F93DF1',
  secondaryDark: '#F93DF1',
  grey100: '#9F9FA3',
  grey200: '#71767B',
  grey300: '#32333B',
};

export { LightColors, DarkColors }; export type { ColorsType };
