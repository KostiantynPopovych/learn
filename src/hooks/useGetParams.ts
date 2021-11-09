import { useRouteMatch } from 'react-router-dom';
import { useMemo } from 'react';

const useGetParams = <T>(path: string) => {
  const match = useRouteMatch(path);

  return useMemo(() => match?.params as T | undefined, [match?.params]);
};

export default useGetParams;
