import { Layout, Menu } from 'antd';
import {memo, useCallback} from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import sharedSm from 'styles/shared.module.scss';

import sm from './sm.module.scss';
import useSideBar from "./useSideBar";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = () => {
  const { isLoading, topics, sections, handleTopicClick, handleOpenSection, handleTopicHover } = useSideBar();

  const renderTopic = useCallback((
    topic => (
      <Menu.Item onMouseEnter={handleTopicHover} onClick={handleTopicClick} key={topic.id}>{topic.name}</Menu.Item>
    )
  ), [handleTopicClick, handleTopicHover]);

  const renderSections = useCallback(
    (section: Section) => (
      <SubMenu
        className={sm.Section}
        key={section.id}
        title={section.name}
        onTitleMouseEnter={handleOpenSection}
        onTitleClick={handleOpenSection}
      >
        {
          !isLoading && <button key={`addTo-${section.id}`} className={sm.AddMenuItem}>
              <PlusCircleOutlined className={sharedSm.Icon} />
          </button>
        }
        {
          Object.values(topics[section.id] || {}).map(renderTopic)
        }
      </SubMenu>
    )
  , [handleOpenSection, topics, renderTopic, isLoading]);

  return (
    <Sider collapsible>
      <div className={sm.Logo}>
        <span>learn</span>
      </div>

      {
        !!Object.values(sections).length && (<Menu mode="inline">
          <button key="addToSections" className={sm.AddMenuItem}>
            <PlusCircleOutlined className={sharedSm.Icon} />
          </button>
          {Object.values(sections).map(renderSections)}
        </Menu>)
      }
    </Sider>
  );
};

export default memo(SideBar);
