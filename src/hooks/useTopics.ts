import {useCallback, useMemo, useState} from "react";
import {getDocs, QuerySnapshot, DocumentData, query, where} from "firebase/firestore";
import useFetch from "hooks/useFetch";
import getQueryStaticParts from "utils/firestoreQueryBuilder";
import {topicsCollection} from 'app/firebase';

const GET_TOPICS_QUERY = getQueryStaticParts('sectionId', '==')

const useTopics = () => {
  const { isLoading, errors, request } = useFetch();

  const [topics, setTopics] = useState<KeyValue<KeyValue<Topic>>>({});

  const receiveTopics = useCallback(async (sectionId: string) => {
    if (topics[sectionId]) return topics[sectionId];

    const q = query(topicsCollection, where(GET_TOPICS_QUERY.fieldName, GET_TOPICS_QUERY.type, sectionId));

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
          }
        }
      });
    }

    setTopics(prevState => ({
      ...prevState,
      [sectionId]: normalizedTopics
    }));

    return normalizedTopics;
  }, [topics, request]);

  return useMemo(() => ({
    topics,
    isLoading,
    errors,
    receiveTopics
  }), [
    topics,
    isLoading,
    errors,
    receiveTopics
  ])
};

export default useTopics;