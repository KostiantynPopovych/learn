import {useCallback, useContext, useMemo} from "react";
import useSections from "hooks/useSections";
import useTopics from "hooks/useTopics";
import {useHistory, useParams} from "react-router-dom";
import {TopicDetailsActionsContext, TopicDetailsDataContext} from "context/topicsDetails";
import ROUTES from "constants/routes";

const useSideBar =() => {
  const { sections } = useSections();

  const { topicId } = useParams<TopicDetailsParams>();

  const details = useContext(TopicDetailsDataContext);

  const { push } = useHistory();

  const { receiveDetails } = useContext(TopicDetailsActionsContext);

  const { receiveTopics, topics, isLoading } = useTopics();

  const selectedKeys = useMemo(() => ([details?.id]), [details?.id]);

  const handleOpenSection = useCallback(async ({ key }) => {
    await receiveTopics(key);
  }, [receiveTopics])

  const handleTopicClick = useCallback(({ key }) => {
    if (key !== topicId) {
      push(ROUTES.topic.byId.replace(':topicId', key));
    }
  }, [push, topicId]);

  const handleTopicHover = useCallback(({ key }) => {
    receiveDetails(key)
  }, [receiveDetails]);

  return useMemo(() => ({
    handleTopicClick,
    topics,
    sections,
    isLoading,
    handleOpenSection,
    handleTopicHover,
    details,
    selectedKeys
  }), [
    handleTopicClick,
    topics,
    sections,
    isLoading,
    handleOpenSection,
    handleTopicHover,
    details,
    selectedKeys
  ])
}

export default useSideBar;
