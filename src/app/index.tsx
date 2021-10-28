import React, { memo } from 'react';
import GlobalContext from 'context/global';
import Home from 'pages/home';

const App = () => (
  <GlobalContext>
    <Home />
  </GlobalContext>
);

export default memo(App);
