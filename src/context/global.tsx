import { createContext, memo, useCallback, useMemo, useState } from 'react';

const defaultDataContextState = {
  markDown: '',
  isEditing: false,
};

const defaultActionsContextState = {
  handleToggleIsEditing: () => {},
  handleSetMarkDown: (newOne: string) => {},
};

export const GlobalDataContext = createContext<typeof defaultDataContextState>(
  defaultDataContextState,
);

export const GlobalActionsContext = createContext<
  typeof defaultActionsContextState
>(defaultActionsContextState);

export default memo(({ children }) => {
  const [markDown, setMarkDown] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleIsEditing = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);

  const handleSetMarkDown = useCallback((incoming) => {
    setMarkDown(incoming);
  }, []);

  return (
    <GlobalDataContext.Provider
      value={useMemo(
        () => ({
          markDown,
          isEditing,
        }),
        [markDown, isEditing],
      )}
    >
      <GlobalActionsContext.Provider
        value={useMemo(
          () => ({
            handleSetMarkDown,
            handleToggleIsEditing,
          }),
          [handleSetMarkDown, handleToggleIsEditing],
        )}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalDataContext.Provider>
  );
});
