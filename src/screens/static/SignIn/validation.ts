import password from 'constants/validations/passwordValidation';
import pseudo from 'constants/validations/pseudoValidation';
import * as Yup from 'yup';

const validateSignInSchema = Yup.object().shape({
  pseudo,
  password,
});

export default validateSignInSchema;
