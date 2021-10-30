import { memo } from 'react';
import GlobalContext from 'context/global';
import TopicDetailsContext from 'context/topicsDetails';
import Home from 'pages/home';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import './firebase';

const App = () => (
  <Router>
    <GlobalContext>
      <TopicDetailsContext>
        <Switch>
          <Route path="/:topicId?" component={Home} />
        </Switch>
      </TopicDetailsContext>
    </GlobalContext>
  </Router>
);

export default memo(App);
