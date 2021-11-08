import {useCallback, useContext, useMemo} from "react";
import useSections from "hooks/useSections";
import useTopics from "hooks/useTopics";
import {useHistory, useParams} from "react-router-dom";
import {TopicDetailsActionsContext, TopicDetailsDataContext} from "context/topicsDetails";
import ROUTES from "constants/routes";
import {AuthDataContext} from "context/auth";

const useSideBar =() => {
  const { sections } = useSections();

  const { topicId } = useParams<TopicDetailsParams>();

  const details = useContext(TopicDetailsDataContext);

  const { user } = useContext(AuthDataContext);

  const { push } = useHistory();

  const canCreate = useMemo(() => user?.permissions.write, [user]);

  const { receiveDetails } = useContext(TopicDetailsActionsContext);

  const { receiveTopics, topics } = useTopics();

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
    handleOpenSection,
    handleTopicHover,
    details,
    selectedKeys,
    canCreate
  }), [
    handleTopicClick,
    topics,
    sections,
    handleOpenSection,
    handleTopicHover,
    details,
    selectedKeys,
    canCreate
  ])
}

export default useSideBar;
