import NunitoMedium from './Nunito/Nunito-Medium.ttf';
import NunitoBold from './Nunito/Nunito-Bold.ttf';
import NunitoLight from './Nunito/Nunito-Light.ttf';

import RalewayMedium from './Raleway/Raleway-Medium.ttf';
import RalewayBold from './Raleway/Raleway-Bold.ttf';
import RalewayLight from './Raleway/Raleway-Light.ttf';

import OpenSansMedium from './OpenSans/OpenSans-Medium.ttf';
import OpenSansBold from './OpenSans/OpenSans-Bold.ttf';
import OpenSansLight from './OpenSans/OpenSans-Light.ttf';

const nunitoFonts = `@font-face {
  font-family: 'Nunito';
  font-weight: 300;
  src: local("NunitoLight"),
  url(${NunitoLight}) format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Nunito';
  font-weight: 500;
  src: local("NunitoMedium"),
  url(${NunitoMedium}) format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Nunito';
  font-weight: 700;
  src: local("NunitoBold"),
  url(${NunitoBold}) format("truetype");
  font-display: swap;
}
`;

const railewayFonts = `@font-face {
  font-family: 'Raleway';
  font-weight: 300;
  src: local("RalewayLight"),
  url(${RalewayLight}) format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Raleway';
  font-weight: 500;
  src: local("RalewayMedium"),
  url(${RalewayMedium}) format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Raleway';
  font-weight: 700;
  src: local("RalewayBold"),
  url(${RalewayBold}) format("truetype");
  font-display: swap;
}
`;

const openSansFonts = `@font-face {
  font-family: 'OpenSans';
  font-weight: 300;
  src: local("OpenSansLight"),
  url(${OpenSansLight}) format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'OpenSans';
  font-weight: 500;
  src: local("OpenSansMedium"),
  url(${OpenSansMedium}) format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'OpenSans';
  font-weight: 700;
  src: local("OpenSansBold"),
  url(${OpenSansBold}) format("truetype");
  font-display: swap;
}
`;

const fonts = `${nunitoFonts}
  ${railewayFonts}
  ${openSansFonts}
  `;

export default fonts;
