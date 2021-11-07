import React, {memo} from 'react';
import Editor from 'components/organisms/editor';
import SideBar from 'components/organisms/sideBar';
import Header from 'components/organisms/header';
import Pulse from "components/atoms/puls";

import sm from './sm.module.scss';
import useHome from "./useHome";

const Home = () => {
  const { isLoading } = useHome();

  return (
    <div className={sm.Container}>
      <Pulse isVisible={isLoading} />
      <SideBar />
      <div className={sm.Container_Right}>
        <Header />
        <div className={sm.Container_Right_Editor}>
          <Editor />
        </div>
      </div>
    </div>
  )
};

export default memo(Home);
