import i18n from 'i18n';
import * as Yup from 'yup';

const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), null], i18n.t('confirmPasswordValidation', { ns: 'validation' }));

export default confirmPassword;
