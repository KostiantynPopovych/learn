import React, {
  useState,
  useEffect,
  createContext,
  memo,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import {
  getAuth,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  signOut,
} from 'firebase/auth';
import { firebaseInstance, permissionsCollection } from 'app/firebase';
import { useHistory } from 'react-router-dom';
import { GlobalActionsContext } from './global';
import ROUTES from 'constants/routes';
import { UserPermissions, UserWithPermissions } from 'types/user';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from 'firebase/firestore';
import useFetch from 'hooks/useFetch';

const auth = getAuth(firebaseInstance);

const INPUT = 'INPUT';

const DEFAULT_PERMISSIONS: UserPermissions = {
  write: false,
  create: false,
};

const defaultDataContextState = {
  user: null as Nullable<UserWithPermissions>,
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
  const [user, setUser] = useState<Nullable<UserWithPermissions>>(null);

  const { toggleIsLoading } = useContext(GlobalActionsContext);

  const { request } = useFetch();

  const [isInitializing, setIsInitializing] = useState(true);

  const { replace, location } = useHistory();

  const sendLink = useCallback(
    async (email) => {
      toggleIsLoading();
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      });

      localStorage.setItem(INPUT, email);
      toggleIsLoading();
    },
    [toggleIsLoading],
  );

  const getUserPermissions = useCallback(
    async (id: string) => {
      const d = doc(permissionsCollection, id);
      return await request<DocumentSnapshot<DocumentData>>(getDoc(d));
    },
    [request],
  );

  const signIn = useCallback(
    async (code) => {
      toggleIsLoading();

      const input = localStorage.getItem(INPUT);

      const result = await signInWithEmailLink(auth, input as string, code);

      const permissionsResult = await getUserPermissions(result.user.uid);

      setUser({
        ...result.user,
        permissions:
          (permissionsResult?.data() as UserPermissions) || DEFAULT_PERMISSIONS,
      });

      localStorage.removeItem(INPUT);
      toggleIsLoading();
      replace(ROUTES.topic._);
    },
    [replace, toggleIsLoading, getUserPermissions],
  );

  const logout = useCallback(async () => {
    toggleIsLoading();
    await signOut(auth);
    setUser(null);
    toggleIsLoading();
  }, [toggleIsLoading]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let permissionsResult;

      if (user) {
        permissionsResult = await getUserPermissions(user.uid);

        setUser({
          ...user,
          permissions:
            (permissionsResult?.data() as UserPermissions) ||
            DEFAULT_PERMISSIONS,
        });
      }

      setIsInitializing(false);

      if (user && location.pathname.includes(ROUTES.auth._)) {
        window.location.replace('/#/topic');
      }
    });

    return () => unsubscribe();
  }, [replace, location, getUserPermissions]);

  useEffect(() => {
    if (window.location.search && window.location.hash === `#${ROUTES.auth._}`) {
      window.location.replace(`${window.location.hash}${window.location.search}`);
    }
  }, [window.location.search]);

  return (
    <AuthDataContext.Provider
      value={useMemo(
        () => ({
          user,
          isInitializing,
        }),
        [user, isInitializing],
      )}
    >
      <AuthActionsContext.Provider
        value={useMemo(
          () => ({
            sendLink,
            signIn,
            logout,
          }),
          [sendLink, signIn, logout],
        )}
      >
        {children}
      </AuthActionsContext.Provider>
    </AuthDataContext.Provider>
  );
});
