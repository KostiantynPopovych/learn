import { memo } from 'react';
import Providers from './providers';
import Topic from 'pages/topic';
import Login from 'pages/login';
import PrivateRoute from 'components/organisms/privateRoute';
import ROUTES from 'constants/routes';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const App = () => (
  <Router>
    <Providers>
      <Switch>
        <PrivateRoute exact path={ROUTES.topic.byId}>
          <Topic />
        </PrivateRoute>
        <Route exact path={ROUTES.auth._} component={Login} />
        <Redirect to={ROUTES.topic._} />
      </Switch>
    </Providers>
  </Router>
);

export default memo(App);
