import {useContext, useMemo} from "react";
import {GlobalActionsContext, GlobalDataContext} from "context/global";
import {TopicDetailsDataContext} from "context/topicsDetails";
import useSections from "hooks/useSections";

const useHeader = () => {
  const { toggleIsEditing } = useContext(GlobalActionsContext);

  const { isEditing } = useContext(GlobalDataContext);

  const details = useContext(TopicDetailsDataContext);

  const { sections } = useSections();

  return useMemo(() => ({
    isEditing,
    toggleIsEditing,
    subTitle: details?.name,
    title: sections[details?.sectionId || '']?.name
  }), [
    sections,
    details,
    isEditing,
    toggleIsEditing
  ]);
}

export default useHeader;
