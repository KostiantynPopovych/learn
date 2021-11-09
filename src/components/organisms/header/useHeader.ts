import { useCallback, useContext, useMemo } from 'react';
import { GlobalActionsContext, GlobalDataContext } from 'context/global';
import {
  TopicDetailsActionsContext,
  TopicDetailsDataContext,
} from 'context/topicsDetails';
import { AuthDataContext } from 'context/auth';
import { SectionsDataContext } from 'context/sections';

const useHeader = () => {
  const { toggleIsEditing } = useContext(GlobalActionsContext);

  const { isEditing, markDown } = useContext(GlobalDataContext);

  const { user } = useContext(AuthDataContext);

  const canEdit = useMemo(() => user?.permissions.write, [user]);

  const details = useContext(TopicDetailsDataContext);

  const { updateDetails } = useContext(TopicDetailsActionsContext);

  const { sections } = useContext(SectionsDataContext);

  const handleSaveClick = useCallback(() => {
    if (details.content !== markDown) {
      updateDetails({
        ...details,
        content: markDown,
      });
    }
    toggleIsEditing();
  }, [updateDetails, details, markDown, toggleIsEditing]);

  return useMemo(
    () => ({
      isEditing,
      toggleIsEditing,
      subTitle: details?.name,
      title: sections[details?.sectionId || '']?.name,
      handleSaveClick,
      canEdit,
    }),
    [canEdit, sections, details, isEditing, toggleIsEditing, handleSaveClick],
  );
};

export default useHeader;
