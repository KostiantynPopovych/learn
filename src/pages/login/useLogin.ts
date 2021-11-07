import {useCallback, useContext, useEffect, useMemo} from "react";
import {AuthActionsContext, AuthDataContext} from "context/auth";
import {useLocation} from "react-router-dom";
import {GlobalDataContext} from "context/global";

const useLogin = () => {
  const { search } = useLocation();

  const { sendLink, signIn } = useContext(AuthActionsContext);

  const { isLoading } = useContext(GlobalDataContext);

  const { user, isInitializing } = useContext(AuthDataContext);

  const handleSubmitForm = useCallback(({ input }) => {
    sendLink(input)
  }, [sendLink]);

  useEffect(() => {
    if(search && !user && !isInitializing) {
      signIn(window.location.href);
    }
  }, [user, signIn, search, isInitializing]);

  return useMemo(() => ({
    handleSubmitForm,
    isLoading
  }), [handleSubmitForm, isLoading]);
};

export default useLogin;
