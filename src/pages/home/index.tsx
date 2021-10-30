import {memo, useContext} from 'react';
import Editor from 'components/organisms/editor';
import SideBar from 'components/organisms/sideBar';
import Header from 'components/organisms/header';
import Pulse from "components/atoms/puls";
import {GlobalDataContext} from "context/global";

import sm from './sm.module.scss';

const Home = () => {
  const { isLoading } = useContext(GlobalDataContext);

  return (
    <div className={sm.Container}>
      <Pulse isVisible={isLoading} />
      <SideBar />
      <div className={sm.Container_Right}>
        <Header />
        <div>
          <Editor />
        </div>
      </div>
    </div>
  )
};

export default memo(Home);
