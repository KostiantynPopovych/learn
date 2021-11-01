import {useCallback, useContext, useMemo} from "react";
import {GlobalActionsContext, GlobalDataContext} from "context/global";
import {TopicDetailsActionsContext, TopicDetailsDataContext} from "context/topicsDetails";
import useSections from "hooks/useSections";

const useHeader = () => {
  const { toggleIsEditing } = useContext(GlobalActionsContext);

  const { isEditing, markDown } = useContext(GlobalDataContext);

  const details = useContext(TopicDetailsDataContext);

  const { updateDetails } = useContext(TopicDetailsActionsContext);

  const { sections } = useSections();

  const handleSaveClick = useCallback(() => {
    if (details.content !== markDown) {
      updateDetails({
        ...details,
        content: markDown
      });
    }
    toggleIsEditing();
  }, [updateDetails, details, markDown, toggleIsEditing]);

  return useMemo(() => ({
    isEditing,
    toggleIsEditing,
    subTitle: details?.name,
    title: sections[details?.sectionId || '']?.name,
    handleSaveClick
  }), [
    sections,
    details,
    isEditing,
    toggleIsEditing,
    handleSaveClick
  ]);
}

export default useHeader;
