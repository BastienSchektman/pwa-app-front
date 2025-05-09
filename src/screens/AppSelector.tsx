import React from 'react';
import AuthNav from 'navigation/auth/Nav';
import StaticNav from 'navigation/static/Nav';
import { useContextUser } from 'contexts/UserProvider';

function AppSelector() {
  const { user } = useContextUser();

  return user ? <AuthNav /> : <StaticNav />;
}

export default AppSelector;
