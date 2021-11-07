import React, {useState, useEffect, createContext, memo, useCallback, useMemo, useContext} from 'react';
import { getAuth, signInWithEmailLink, sendSignInLinkToEmail, signOut, User } from 'firebase/auth';
import { firebaseInstance } from 'app/firebase';
import {useHistory} from "react-router-dom";
import {GlobalActionsContext} from "./global";
import ROUTES from 'constants/routes';

const auth = getAuth(firebaseInstance);

const INPUT = 'INPUT';

const defaultDataContextState = {
  user: null as Nullable<User>,
  isInitializing: true,
};

const defaultActionsContextState = {
  sendLink: (email: string) => {},
  signIn: (code: string) => {},
  logout: () => {},
};

export const AuthDataContext = createContext<typeof defaultDataContextState>(
  defaultDataContextState,
);

export const AuthActionsContext = createContext<
  typeof defaultActionsContextState
  >(defaultActionsContextState);


export default memo(({ children }) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  const { toggleIsLoading } = useContext(GlobalActionsContext);

  const [isInitializing, setIsInitializing] = useState(true);

  const { replace, location } = useHistory();

  const sendLink = useCallback(async (email) => {
    toggleIsLoading();
    await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}${ROUTES.auth._}`,
        handleCodeInApp: true,
      })

    localStorage.setItem(INPUT, email);
    toggleIsLoading();
  }, [toggleIsLoading])

  const signIn = useCallback(async (code) => {
    toggleIsLoading()
    const input = localStorage.getItem(INPUT);

    const result = await signInWithEmailLink(auth, input as string, code);

    setUser(result.user);

    localStorage.removeItem(INPUT);
    toggleIsLoading();
    replace(ROUTES.topic._);
  }, [replace, toggleIsLoading]);

  const logout = useCallback(async () => {
    toggleIsLoading();
    await signOut(auth);
    setUser(null);
    toggleIsLoading();
  }, [toggleIsLoading]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsInitializing(false);
      if (user && location.pathname.includes(ROUTES.auth._)) {
        replace(ROUTES.topic._);
      }
    });
    return () => unsubscribe();
  }, [location, replace]);

  return (
    <AuthDataContext.Provider value={useMemo(() => ({
      user, isInitializing
    }), [user,isInitializing])}>
      <AuthActionsContext.Provider value={useMemo(() => ({
        sendLink,
        signIn,
        logout,
      }), [ sendLink,
        signIn,
        logout])}>
      {children}
      </AuthActionsContext.Provider>
    </AuthDataContext.Provider>
  );
});
