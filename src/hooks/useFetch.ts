import {useCallback, useContext, useMemo, useState} from "react";
import {GlobalActionsContext, GlobalDataContext} from "context/global";

const useFetch = () => {
  const { toggleIsLoading } = useContext(GlobalActionsContext);

  const { isLoading: isGlobalLoading } = useContext(GlobalDataContext);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<null | any[]>(null);

  const request = useCallback(async <RO>(promise: Promise<RO>, withLocalLoading = false) => {
    setIsLoading(true);

    if (!withLocalLoading && !isGlobalLoading && !isLoading) {
      toggleIsLoading();
    }

    try {
      return await promise;
    } catch (e) {
      setErrors([e]);
    } finally {
      if (!withLocalLoading && !isGlobalLoading) {
        toggleIsLoading();
      }

      setIsLoading(false);
    }
  }, [isLoading, toggleIsLoading, isGlobalLoading]);

  return useMemo(() => ({
    isLoading,
    errors,
    request
  }), [
    isLoading,
    errors,
    request
  ])
}

export default useFetch;
