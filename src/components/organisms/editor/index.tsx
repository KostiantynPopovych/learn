import React, { memo } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import { DEFAULT_VIEW } from './config';
import useEditor from './useEditor';
import sm from './sm.module.scss';

const Editor = () => {
  const {
    mdEditorRef,
    handleRenderEditorHTML,
    handleMarkDownChange,
    markDown,
    isEditing,
  } = useEditor();

  return (
    <div className={!isEditing ? sm.Center : sm.Editing}>
      <MdEditor
        ref={mdEditorRef}
        renderHTML={handleRenderEditorHTML}
        value={markDown}
        onChange={handleMarkDownChange}
        readOnly={!isEditing}
        view={DEFAULT_VIEW}
      />
    </div>
  );
};

export default memo(Editor);
