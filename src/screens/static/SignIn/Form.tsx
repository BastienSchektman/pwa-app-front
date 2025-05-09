import React from 'react';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Formik, Form as FormikForm } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFieldForm from 'components/TextFieldForm';
import { useTranslation } from 'react-i18next';
import { useMutationLogin } from 'api/user';
import { api } from 'api/initializers/axios';
import { useContextUser } from 'contexts/UserProvider';
import validateSignInSchema from './validation';

function Form() {
  const { t } = useTranslation(['common', 'signIn']);
  const { setUser } = useContextUser();

  const { mutate: login, isLoading } = useMutationLogin({
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`;
      setUser(response.user);
    },
  });

  const handleSubmit = ({ pseudo, password }: { pseudo: string, password: string }) => {
    login({ username: pseudo, password });
  };

  return (
    <Formik
      initialValues={{
        pseudo: '',
        password: '',
      }}
      validationSchema={validateSignInSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <FormikForm>
          <Stack spacing={2}>
            <TextFieldForm
              icon={<PersonIcon fontSize="inherit" />}
              label={t('pseudo')}
              name="pseudo"
            />
            <TextFieldForm
              icon={<LockIcon fontSize="inherit" />}
              label={t('password')}
              name="password"
              type="password"
            />
          </Stack>
          <Stack justifyContent="center" direction="row" mt="40px">
            <LoadingButton
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              loading={isLoading}
            >
              {t('signIn', { ns: 'signIn' })}

            </LoadingButton>
          </Stack>
        </FormikForm>
      )}
    </Formik>
  );
}

export default Form;
