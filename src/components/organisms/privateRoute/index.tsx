import React, {useContext, memo, FC, useCallback} from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import {AuthDataContext} from "context/auth";
import ROUTES from 'constants/routes';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { user, isInitializing } = useContext(AuthDataContext);

  const render = useCallback(() => (user ? children : <Redirect to={ROUTES.auth._} />), [user, children]);

  if (isInitializing) return null;

  return (
    <Route
      {...rest}
      render={render}
    />
  );
};

export default memo(PrivateRoute);