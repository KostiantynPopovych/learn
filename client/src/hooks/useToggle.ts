import { useCallback, useMemo, useState } from 'react';

const useToggle = (defaultState = false): [boolean, () => void, Function] => {
  const [state, setState] = useState(defaultState);

  const handleChangeState = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  return useMemo(
    () => [state, handleChangeState, setState],
    [state, setState, handleChangeState],
  );
};

export default useToggle;
