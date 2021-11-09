import { useCallback, memo, useState, useMemo, createContext } from 'react';
import {
  DocumentData,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import useFetch from 'hooks/useFetch';
import getQueryStaticParts from 'utils/firestoreQueryBuilder';
import { topicsCollection } from 'app/firebase';
import { ActionType } from 'constants/global';

const GET_TOPICS_QUERY = getQueryStaticParts('sectionId', '==');

const GET_FILTERED_TOPICS_QUERY = getQueryStaticParts('isArchived', '!=');

const TOPICS_INITIAL_STATE = {};

const defaultDataContextState = {
  topics: {} as KeyValue<KeyValue<Topic>>,
};

const defaultActionsContextState = {
  receiveTopics: (sectionId: string) => {},
  handleManageTopic: (action: ActionType, topic: Partial<Topic>) => {},
};

export const TopicsDataContext = createContext<typeof defaultDataContextState>(
  defaultDataContextState,
);

export const TopicsActionsContext = createContext<
  typeof defaultActionsContextState
>(defaultActionsContextState);

export default memo(({ children }) => {
  const { request } = useFetch();

  const [topics, setTopics] =
    useState<KeyValue<KeyValue<Topic>>>(TOPICS_INITIAL_STATE);

  const receiveTopics = useCallback(
    async (sectionId: string) => {
      if (topics[sectionId]) return topics[sectionId];

      const q = query(
        topicsCollection,
        where(
          GET_FILTERED_TOPICS_QUERY.fieldName,
          GET_FILTERED_TOPICS_QUERY.type,
          true,
        ),
        orderBy(GET_FILTERED_TOPICS_QUERY.fieldName),
        where(GET_TOPICS_QUERY.fieldName, GET_TOPICS_QUERY.type, sectionId),
        orderBy('name'),
      );

      const topicsDocs = await request<QuerySnapshot<DocumentData>>(getDocs(q));

      let normalizedTopics: KeyValue<Topic> = {};

      if (topicsDocs) {
        topicsDocs.forEach((doc) => {
          const { name } = doc.data();
          normalizedTopics = {
            ...normalizedTopics,
            [doc.id]: {
              id: doc.id,
              name,
              sectionId,
            },
          };
        });
      }

      setTopics((prevState) => ({
        ...prevState,
        [sectionId]: normalizedTopics,
      }));

      return normalizedTopics;
    },
    [topics, request],
  );

  const handleManageTopic = useCallback((type: ActionType, topic) => {
    setTopics((prevState) => {
      if (type === ActionType.Delete) {
        const { [topic.id]: exclude, ...rest } = prevState[topic.sectionId];

        return {
          ...prevState,
          [topic.sectionId]: {
            ...rest,
          },
        };
      }

      return {
        ...prevState,
        [topic.sectionId]: {
          ...prevState[topic.sectionId],
          [topic.id]:
            type === ActionType.Add
              ? topic
              : {
                  ...prevState[topic.id],
                  ...topic,
                },
        },
      };
    });
  }, []);

  return (
    <TopicsDataContext.Provider
      value={useMemo(
        () => ({
          topics,
        }),
        [topics],
      )}
    >
      <TopicsActionsContext.Provider
        value={useMemo(
          () => ({
            receiveTopics,
            handleManageTopic,
          }),
          [receiveTopics, handleManageTopic],
        )}
      >
        {children}
      </TopicsActionsContext.Provider>
    </TopicsDataContext.Provider>
  );
});
