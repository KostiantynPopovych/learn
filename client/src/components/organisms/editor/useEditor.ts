import { GlobalActionsContext, GlobalDataContext } from 'context/global';
import { useContext, useRef, useEffect, useMemo, useCallback } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt();

const useEditor = () => {
  const { isEditing, markDown } = useContext(GlobalDataContext);

  const { setMarkDown } = useContext(GlobalActionsContext);

  const mdEditorRef = useRef<null | MdEditor>(null);

  const handleMarkDownChange = useCallback(
    ({ text }) => {
      setMarkDown(text);
    },
    [setMarkDown],
  );

  const handleRenderEditorHTML = useCallback((text) => {
    return mdParser.render(text);
  }, []);

  useEffect(() => {
    if (mdEditorRef.current) {
      mdEditorRef.current.setView({
        menu: isEditing,
        md: isEditing,
        html: true,
      });
    }
  }, [isEditing]);

  return useMemo(
    () => ({
      mdEditorRef,
      handleRenderEditorHTML,
      handleMarkDownChange,
      markDown,
      isEditing,
    }),
    [
      mdEditorRef,
      handleMarkDownChange,
      handleRenderEditorHTML,
      markDown,
      isEditing,
    ],
  );
};

export default useEditor;
