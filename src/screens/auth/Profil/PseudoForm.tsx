import {
  CircularProgress, darken, Stack, Typography,
} from '@mui/material';
import TextFieldForm from 'components/TextFieldForm';
import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import { LoadingButton } from '@mui/lab';
import { useMutationUser, userKey } from 'api/user';
import { useContextUser } from 'contexts/UserProvider';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { validatePseudoSchema } from './validation';
// // eslint-disable-next-line import/extensions
// import { askPermission } from '../../../service-worker';

function PseudoForm() {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['common']);
  const { user } = useContextUser();

  const { mutate, isLoading } = useMutationUser({
    onSettled: () => queryClient.invalidateQueries([userKey]),
    onSuccess: () => toast('Données mises à jour'),
  });

  return (
    <Stack>
      <Formik
        initialValues={{
          pseudo: user?.username || '',
        }}
        validationSchema={validatePseudoSchema}
        onSubmit={({ pseudo }, formikHelper) => {
          mutate(
            { username: pseudo },
            {
              onError: () => formikHelper.resetForm(),
            },
          );
        }}
        enableReinitialize
      >
        {() => (
          <Form>
            <Stack spacing={4}>
              <Stack direction="row" justifyContent="flex-end" maxHeight="24px" spacing={2}>
                <Stack>
                  {!isLoading ? (
                    <LoadingButton
                      color="secondary"
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={(theme) => ({
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        width: 'fit-content',

                        padding: '0',
                        color: theme.palette.primary.main,
                        '& .MuiTouchRipple-root': {
                          color: 'transparent',
                        },
                        '&:hover': {
                          color: darken(theme.palette.primary.main, 0.2),
                          transition: 'none',
                          backgroundColor: 'transparent',
                          border: 'none',
                          boxShadow: 'none',
                          width: 'fit-content',
                        },
                      })}
                    >
                      <Typography fontFamily="Open Sans" fontWeight="600">
                        Modifier profil
                      </Typography>
                    </LoadingButton>
                  ) : (
                    <CircularProgress />
                  )}
                </Stack>
              </Stack>
              <TextFieldForm
                icon={<PersonIcon fontSize="inherit" />}
                label={t('pseudo')}
                name="pseudo"
              />
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
}

export default PseudoForm;
