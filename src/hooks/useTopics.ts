import { useCallback, useMemo, useState } from 'react';
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

const useTopics = () => {
  const { isLoading, request } = useFetch();

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

  const handleManageTopic = useCallback(
    (type: ActionType, topic) => {
      if (type === ActionType.Delete) {
        const { [topic.id]: exclude, ...rest } = topics[topic.sectionId];

        return setTopics({
          ...topics,
          [topic.sectionId]: {
            ...rest,
          },
        });
      }

      setTopics({
        ...topics,
        [topic.sectionId]: {
          ...topics[topic.sectionId],
          [topic.id]:
            type === ActionType.Add
              ? topic
              : {
                  ...topics[topic.id],
                  topic,
                },
        },
      });
    },
    [topics],
  );

  return useMemo(
    () => ({
      topics,
      isLoading,
      receiveTopics,
      handleManageTopic,
    }),
    [topics, isLoading, receiveTopics, handleManageTopic],
  );
};

export default useTopics;
