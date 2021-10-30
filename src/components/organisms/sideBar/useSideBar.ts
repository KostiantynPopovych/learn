import {useCallback, useContext, useMemo} from "react";
import useSections from "hooks/useSections";
import useTopics from "hooks/useTopics";
import {useHistory, useParams} from "react-router-dom";
import {TopicDetailsActionsContext} from "context/topicsDetails";

const useSideBar =() => {
  const { sections } = useSections();

  const { topicId } = useParams<TopicDetailsParams>();

  const { push } = useHistory();

  const { receiveDetails } = useContext(TopicDetailsActionsContext);

  const { receiveTopics, topics, isLoading } = useTopics();

  const handleOpenSection = useCallback(async ({ key }) => {
    await receiveTopics(key);
  }, [receiveTopics])

  const handleTopicClick = useCallback(({ key }) => {
    if (key !== topicId) {
      push(`/${key}`);
    }
  }, [push]);

  const handleTopicHover = useCallback(({ key }) => {
    receiveDetails(key)
  }, [receiveDetails]);

  return useMemo(() => ({
    handleTopicClick,
    topics,
    sections,
    isLoading,
    handleOpenSection,
    handleTopicHover
  }), [
    handleTopicClick,
    topics,
    sections,
    isLoading,
    handleOpenSection,
    handleTopicHover
  ])
}

export default useSideBar;
