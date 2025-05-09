type NumberToString = {
  text: string | number;
  nbDecimal?: number;
  space?: boolean;
};

export const numberToString = ({
  text,
  nbDecimal = 2,
  space = false,
}: NumberToString) => {
  let formatedText = text;
  if (typeof formatedText === 'number') {
    formatedText = nbDecimal === Infinity
      ? formatedText.toString()
      : parseFloat(formatedText.toFixed(nbDecimal)).toString();
  }
  if (typeof formatedText !== 'string') return '';
  if (formatedText === 'Infinity' || formatedText === '-Infinity') return '∞';

  formatedText = formatedText
    .replace(/\./g, ',')
    .replace(/[^0-9,-]/g, '')
    .replace(/\s+/g, '');
  const nbCommas = (formatedText.match(/,/g) || []).length;
  const commaPosition = formatedText.indexOf(',');
  let beforeComma = formatedText.substring(0, commaPosition + 1);
  let afterComma = formatedText.substring(commaPosition + 1, formatedText.length);

  if (nbCommas === 1 && afterComma.length > nbDecimal) {
    afterComma = afterComma.substring(0, nbDecimal);
  }

  if (nbCommas > 1) {
    afterComma = afterComma.replace(/,/g, '');
  }

  beforeComma = beforeComma.replace(/[^0-9,-]/g, '');
  afterComma = afterComma.replace(/[^0-9,-]/g, '');

  if (space === true) { beforeComma = beforeComma.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  formatedText = beforeComma + afterComma;

  if (nbDecimal < 1) formatedText = formatedText.replace(/,/g, '');
  return formatedText;
};

export const stringToFloat = (str: string) => (str ? parseFloat(str.replace(/,/g, '.').replace(/\s+/g, '')) : undefined);
