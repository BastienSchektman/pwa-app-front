import { CommuProvider } from 'contexts/CommuProvider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavigationWrapper from './NavigationWrapper';

const Home = React.lazy(() => import('screens/auth/Home'));
const CommuSearch = React.lazy(() => import('screens/auth/CommuSearch'));
const Commu = React.lazy(() => import('screens/auth/Commu'));
const Profil = React.lazy(() => import('screens/auth/Profil'));

function Nav() {
  const { t } = useTranslation(['common']);
  return (
    <CommuProvider>
      <NavigationWrapper>
        <React.Suspense fallback={<>{t('loading')}</>}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/commus" element={<CommuSearch />} />
            <Route path="/commus/:commuId" element={<Commu />} />
            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
          </Routes>
        </React.Suspense>
      </NavigationWrapper>
    </CommuProvider>
  );
}

export default Nav;
