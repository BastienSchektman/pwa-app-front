import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';

const SignIn = React.lazy(() => import('screens/static/SignIn'));
const SignUp = React.lazy(() => import('screens/static/SignUp'));

function Nav() {
  const { t } = useTranslation(['common']);
  return (
    <React.Suspense fallback={<>{t('loading')}</>}>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="*"
          element={<Navigate to="/sign-in" replace />}
        />
      </Routes>
    </React.Suspense>
  );
}

export default Nav;
