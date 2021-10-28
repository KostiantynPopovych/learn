import { GlobalActionsContext } from 'context/global';
import { memo, useContext } from 'react';
import Editor from 'components/organisms/editor';
import SideBar from 'components/organisms/sideBar';

import sm from './sm.module.scss';
import Header from 'components/organisms/header';

const Home = () => (
  <div className={sm.Container}>
    <SideBar />
    <div className={sm.Container_Right}>
      <Header />
      <div>
        <Editor />
      </div>
    </div>
  </div>
);

export default memo(Home);
