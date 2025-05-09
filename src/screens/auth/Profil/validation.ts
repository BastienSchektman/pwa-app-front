import password from 'constants/validations/passwordValidation';
import pseudo from 'constants/validations/pseudoValidation';
import confirmPassword from 'constants/validations/confirmPasswordValidation';
import * as Yup from 'yup';

export const validatePseudoSchema = Yup.object().shape({
  pseudo,
});

export const validatePasswordSchema = Yup.object().shape({
  oldPassword: password,
  password,
  confirmPassword,
});
