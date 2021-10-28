import { Layout, Menu } from 'antd';
import { memo } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import sharedSm from 'styles/shared.module.scss';

import sm from './sm.module.scss';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = () => {
  console.log('side');
  return (
    <Sider collapsible>
      <div className={sm.Logo}>
        <span>learn</span>
      </div>
      <Menu mode="inline">
        <button key="zxxc" className={sm.AddMenuItem}>
          <PlusCircleOutlined className={sharedSm.Icon} />
        </button>
        <SubMenu key="sub1" title="subnav 1">
          <button key="zxc" className={sm.AddMenuItem}>
            <PlusCircleOutlined className={sharedSm.Icon} />
          </button>
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title="subnav 2">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title="subnav 3">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
          <Menu.Item key="13">option13</Menu.Item>
          <Menu.Item key="14">option14</Menu.Item>
          <Menu.Item key="15">option15</Menu.Item>
          <Menu.Item key="16">option16</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default memo(SideBar);
