import fonts from 'assets/fonts';

const createGlobalStyles = () => `${fonts}
html {
    height: 100%;
    -webkit-font-smoothing: auto;
  }
  body {
    height: 100%;
  }
  div#root {
    height: 100%;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }`;

export default createGlobalStyles;
