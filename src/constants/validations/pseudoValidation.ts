import i18n from 'i18n';
import * as Yup from 'yup';

const pseudo = Yup.string()
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]*$/, i18n.t('pseudoCharacters', { ns: 'validation' }))
  .max(20, i18n.t('max20Char', { ns: 'validation' }))
  .required(i18n.t('requiredField', { ns: 'validation' }));

export default pseudo;
