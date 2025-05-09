import i18n from 'i18n';
import * as Yup from 'yup';

const password = Yup.string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    i18n.t('passwordValidation', { ns: 'validation' }),
  ).required(i18n.t('requiredField', { ns: 'validation' }));

export default password;
