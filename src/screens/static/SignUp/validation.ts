import password from 'constants/validations/passwordValidation';
import pseudo from 'constants/validations/pseudoValidation';
import confirmPassword from 'constants/validations/confirmPasswordValidation';
import * as Yup from 'yup';

const validateSignUpSchema = Yup.object().shape({
  pseudo,
  password,
  confirmPassword,
});

export default validateSignUpSchema;
