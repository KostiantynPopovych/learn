import { useCallback, useContext, useMemo, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  TopicDetailsActionsContext,
  TopicDetailsDataContext,
} from 'context/topicsDetails';
import ROUTES from 'constants/routes';
import { AuthDataContext } from 'context/auth';
import useManageEntities from 'hooks/useManageEntities';
import { SectionsDataContext } from 'context/sections';
import { TopicsActionsContext, TopicsDataContext } from 'context/topics';
import useClickOutside from 'hooks/useClickOutside';

const useSideBar = () => {
  const {
    activeAction,
    handleManageEntityClick,
    handleAddEditEntity,
    handleResetAction,
  } = useManageEntities();

  const formWrapRef = useRef<Nullable<HTMLDivElement>>(null);

  const { topicId } = useParams<TopicDetailsParams>();

  const details = useContext(TopicDetailsDataContext);

  const { user } = useContext(AuthDataContext);

  const { sections } = useContext(SectionsDataContext);

  const { push } = useHistory();

  const canCreate = useMemo(() => user?.permissions.write, [user]);

  const { receiveDetails } = useContext(TopicDetailsActionsContext);

  const { topics } = useContext(TopicsDataContext);

  const { receiveTopics } = useContext(TopicsActionsContext);

  const selectedKeys = useMemo(() => [details?.id], [details?.id]);

  const formInitialValues = useMemo(
    () =>
      activeAction?.content
        ? {
            input: activeAction.content,
          }
        : undefined,
    [activeAction],
  );

  const handleOpenSection = useCallback(
    async ({ key }) => {
      await receiveTopics(key);
    },
    [receiveTopics],
  );

  const handleTopicClick = useCallback(
    ({ key }) => {
      if (key !== topicId) {
        push(ROUTES.topic.byId.replace(':topicId', key));
      }
    },
    [push, topicId],
  );

  const handleTopicHover = useCallback(
    ({ key }) => {
      receiveDetails(key);
    },
    [receiveDetails],
  );

  useClickOutside(formWrapRef, activeAction ? handleResetAction : () => {});

  return useMemo(
    () => ({
      handleTopicClick,
      topics,
      sections,
      handleOpenSection,
      handleTopicHover,
      details,
      selectedKeys,
      canCreate,
      handleManageEntityClick,
      activeAction,
      handleAddEditEntity,
      formInitialValues,
      formWrapRef,
      handleResetAction,
    }),
    [
      handleTopicClick,
      topics,
      sections,
      handleOpenSection,
      handleTopicHover,
      details,
      selectedKeys,
      canCreate,
      handleManageEntityClick,
      activeAction,
      handleAddEditEntity,
      formInitialValues,
      formWrapRef,
      handleResetAction,
    ],
  );
};

export default useSideBar;
