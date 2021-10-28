import { memo, useContext } from 'react';
import { PageHeader } from 'antd';
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { GlobalActionsContext } from 'context/global';
import { GlobalDataContext } from 'context/global';
import sm from './sm.module.scss';

const Header = () => {
  const { handleToggleIsEditing } = useContext(GlobalActionsContext);

  const { isEditing } = useContext(GlobalDataContext);

  return (
    <PageHeader
      className={sm.Header}
      title="Title"
      subTitle="This is a subtitle"
      extra={
        <button className={sm.Header_Button} onClick={handleToggleIsEditing}>
          {isEditing ? (
            <CheckCircleOutlined className={sm.Header_Button_Icon} />
          ) : (
            <EditOutlined className={sm.Header_Button_Icon} />
          )}
        </button>
      }
    />
  );
};

export default memo(Header);
