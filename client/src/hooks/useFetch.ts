import { useCallback, useContext, useMemo, useState } from 'react';
import { GlobalActionsContext } from 'context/global';

const useFetch = () => {
  const { toggleIsLoading } = useContext(GlobalActionsContext);

  const [requestsInPending, setRequestsInPending] = useState(new Set());

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<null | any[]>(null);

  const request = useCallback(
    async <RO>(promise: Promise<RO>, withLocalLoading = false) => {
      if (requestsInPending.has(promise)) return;

      setIsLoading(true);

      if (!withLocalLoading) {
        toggleIsLoading();
        setRequestsInPending(requestsInPending.add(promise));
      }

      let res;

      try {
        res = await promise;
      } catch (e) {
        res = e;
        setErrors([e]);
      } finally {
        if (!withLocalLoading && !!requestsInPending.size) {
          toggleIsLoading();
        }
        requestsInPending.delete(promise);
        setIsLoading(false);
      }

      return res as RO;
    },
    [toggleIsLoading, requestsInPending],
  );

  return useMemo(
    () => ({
      isLoading,
      errors,
      request,
    }),
    [isLoading, errors, request],
  );
};

export default useFetch;
