import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

export type LocationType = {
  id: string;
};

type UserType = {
  id: string;
  username: string;
  locations: LocationType[];
};

const UserContext = React.createContext<{
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}>({
  user: null,
  setUser: () => null,
});

const useContextUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useContextUser must be wrapped in UserProvider');
  }

  return context;
};

type Props = {
  children?: React.ReactNode;
};

function UserProvider({ children = null }: Props) {
  const [user, setUser] = useState<UserType | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useContextUser }; export type { UserType };
