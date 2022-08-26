import { Layout, Menu, Popover } from 'antd';
import { memo, useCallback } from 'react';
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
  SettingFilled,
} from '@ant-design/icons';
import sharedSm from 'styles/shared.module.scss';
import { ActionType } from 'constants/global';
import SingleInputForm from 'components/organisms/form/singleInput';

import sm from './sm.module.scss';
import useSideBar from './useSideBar';
import { ActionEntity } from './sideBarTypes';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = () => {
  const {
    handleManageEntityClick,
    activeAction,
    topics,
    sections,
    handleTopicClick,
    handleOpenSection,
    handleTopicHover,
    details,
    selectedKeys,
    canCreate,
    handleAddEditEntity,
    formInitialValues,
    formWrapRef,
  } = useSideBar();

  const renderTopic = useCallback(
    (topic) => (
      <Menu.Item
        icon={
        canCreate ?
          <Popover
            key={topic.id}
            className={sm.Topic}
            content={
              <>
                <EditFilled
                  onClick={handleManageEntityClick({
                    id: topic.id,
                    content: topic.name,
                    type: ActionType.Edit,
                    entity: ActionEntity.Topics,
                    parentId: topic.sectionId,
                  })}
                  className={sm.Topic_Edit}
                />
                <DeleteFilled
                  onClick={handleManageEntityClick({
                    id: topic.id,
                    type: ActionType.Delete,
                    entity: ActionEntity.Topics,
                    parentId: topic.sectionId,
                  })}
                />
              </>
            }
          >
            <SettingFilled />
          </Popover>
        : undefined}
        onMouseEnter={handleTopicHover}
        onClick={handleTopicClick}
        key={topic.id}
      >
        {topic.name}
      </Menu.Item>
    ),
    [canCreate, handleTopicClick, handleTopicHover, handleManageEntityClick],
  );

  const renderSections = useCallback(
    (section: Section) => (
      <SubMenu
        className={sm.Section}
        key={section.id}
        title={section.name}
        onTitleMouseEnter={handleOpenSection}
        onTitleClick={handleOpenSection}
        icon={canCreate ?
          <Popover
            key={section.id}
            className={sm.Section}
            content={
              <>
                <EditFilled
                  onClick={handleManageEntityClick({
                    id: section.id,
                    content: section.name,
                    type: ActionType.Edit,
                    entity: ActionEntity.Sections,
                  })}
                  className={sm.Section_Edit}
                />
                <DeleteFilled
                  onClick={handleManageEntityClick({
                    id: section.id,
                    type: ActionType.Delete,
                    entity: ActionEntity.Sections,
                  })}
                />
              </>
            }
          >
            <SettingFilled />
          </Popover>
        : undefined}
      >
        {canCreate && (
          <button
            key={`addTo-${section.id}`}
            onClick={handleManageEntityClick({
              type: ActionType.Add,
              parentId: section.id,
              entity: ActionEntity.Topics,
            })}
            className={sm.AddMenuItem}
          >
            <PlusCircleOutlined className={sharedSm.Icon} />
          </button>
        )}
        {Object.values(topics[section.id] || {}).map(renderTopic)}
      </SubMenu>
    ),
    [
      handleOpenSection,
      topics,
      renderTopic,
      canCreate,
      handleManageEntityClick,
    ],
  );

  return (
    <>
      {activeAction && (
        <div className={sm.Background}>
          <div ref={formWrapRef} className={sm.Background_Content}>
            <SingleInputForm
              onSubmit={handleAddEditEntity}
              initialValues={formInitialValues}
            />
          </div>
        </div>
      )}

      <Sider>
        <div className={sm.Logo}>
          <span>learn</span>
        </div>

        {!!Object.values(sections).length && (
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            activeKey={details?.sectionId}
          >
            {canCreate && (
              <button
                key="addToSections"
                onClick={handleManageEntityClick({
                  type: ActionType.Add,
                  entity: ActionEntity.Sections,
                })}
                className={sm.AddMenuItem}
              >
                <PlusCircleOutlined className={sharedSm.Icon} />
              </button>
            )}

            {Object.values(sections).map(renderSections)}
          </Menu>
        )}
      </Sider>
    </>
  );
};

export default memo(SideBar);
