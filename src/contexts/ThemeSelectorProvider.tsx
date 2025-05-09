import useThemeDetector from 'hooks/useThemeDetector';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeSelectorContext = createContext<{
  theme: 'light' | 'dark';
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}>({
  theme: 'dark',
  setTheme: () => null,
});

const useContextTheme = () => {
  const context = useContext(ThemeSelectorContext);

  if (!context) {
    throw new Error('useContextTheme must be wrapped in ThemeSelectorProvider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

function ThemeSelectorProvider({ children }: Props) {
  const systemTheme = useThemeDetector();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme);

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeSelectorContext.Provider value={value}>
      {children}
    </ThemeSelectorContext.Provider>
  );
}

export { ThemeSelectorProvider, useContextTheme };
