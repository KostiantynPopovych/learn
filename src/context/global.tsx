import { createContext, memo, useCallback, useMemo, useState } from 'react';
import useToggle from "hooks/useToggle";

const defaultDataContextState = {
  markDown: '',
  isEditing: false,
  isLoading: false
};

const defaultActionsContextState = {
  setMarkDown: (newOne: string) => {},
  toggleIsEditing: () => {},
  toggleIsLoading: () => {},
};

export const GlobalDataContext = createContext<typeof defaultDataContextState>(
  defaultDataContextState,
);

export const GlobalActionsContext = createContext<
  typeof defaultActionsContextState
>(defaultActionsContextState);

export default memo(({ children }) => {
  const [markDown, setMarkDown] = useState('');

  const [isEditing, toggleIsEditing] = useToggle();

  const [isLoading, toggleIsLoading] = useToggle();

  const handleSetMarkDown = useCallback((incoming) => {
    setMarkDown(incoming);
  }, []);

  return (
    <GlobalDataContext.Provider
      value={useMemo(
        () => ({
          markDown,
          isEditing,
          isLoading,
        }),
        [markDown, isEditing, isLoading],
      )}
    >
      <GlobalActionsContext.Provider
        value={useMemo(
          () => ({
            setMarkDown: handleSetMarkDown,
            toggleIsEditing,
            toggleIsLoading
          }),
          [handleSetMarkDown, toggleIsEditing, toggleIsLoading],
        )}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalDataContext.Provider>
  );
});
