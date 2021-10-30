import {useCallback, useContext, useMemo, useState} from "react";
import {GlobalActionsContext} from "context/global";

const useFetch = <O>(defaultState = null) => {
  const { toggleIsLoading } = useContext(GlobalActionsContext);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<null | any[]>(null);

  const [result, setResult] = useState<Nullable<O>>(defaultState);

  const request = useCallback(async (promise: Promise<O>, withLocalLoading = false) => {
    setIsLoading(true);

    if (!withLocalLoading && !isLoading) {
      toggleIsLoading();
    }

    try {
      const res = await promise;

      setResult(res);

      return res;
    } catch (e) {
      setErrors([e]);
    } finally {
      if (!withLocalLoading) {
        toggleIsLoading();
      }

      setIsLoading(false);
    }
  }, [isLoading, toggleIsLoading]);

  return useMemo(() => ({
    isLoading,
    errors,
    result,
    request
  }), [
    isLoading,
    errors,
    result,
    request
  ])
}

export default useFetch;
