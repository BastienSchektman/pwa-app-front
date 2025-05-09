import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

const CommuContext = createContext<{
  commuId?: string;
  setCommuId: Dispatch<SetStateAction<string | undefined>>;
}>({
  commuId: undefined,
  setCommuId: () => null,
});

const useContextCommu = () => {
  const context = useContext(CommuContext);

  if (!context) {
    throw new Error('useContextCommu must be wrapped in CommuProvider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

function CommuProvider({ children }: Props) {
  const [commuId, setCommuId] = useState<string | undefined>();

  const value = useMemo(() => ({ commuId, setCommuId }), [commuId]);

  return (
    <CommuContext.Provider value={value}>
      {children}
    </CommuContext.Provider>
  );
}

export { CommuProvider, useContextCommu };
