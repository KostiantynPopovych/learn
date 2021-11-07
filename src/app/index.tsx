import { memo } from 'react';
import GlobalContext from 'context/global';
import TopicDetailsContext from 'context/topicsDetails';
import AuthContext from 'context/auth';
import Topic from 'pages/topic';
import Login from 'pages/login';
import PrivateRoute from 'components/organisms/privateRoute';
import ROUTES from 'constants/routes';
import {
  BrowserRouter as Router, Redirect,
  Route,
  Switch
} from "react-router-dom";

const App = () => (
  <Router>
    <GlobalContext>
      <TopicDetailsContext>
        <AuthContext>
          <Switch>
            <PrivateRoute exact path={ROUTES.topic.byId}>
              <Topic />
            </PrivateRoute>
            <Route exact path={ROUTES.auth._} component={Login} />
            <Redirect to={ROUTES.topic._} />
          </Switch>
        </AuthContext>
      </TopicDetailsContext>
    </GlobalContext>
  </Router>
);

export default memo(App);
