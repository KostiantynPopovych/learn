import {createContext, memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import useFetch from "hooks/useFetch";
import {getDoc, setDoc, doc, DocumentSnapshot, DocumentData} from "firebase/firestore";
import {topicsCollection} from 'app/firebase';
import useGetParams from "hooks/useGetParams";
import ROUTES from "constants/routes";
import {GlobalActionsContext} from "./global";

const defaultDataContextState = {};

const defaultActionsContextState = {
  receiveDetails: (topicId: string) => {},
  updateDetails: (update: TopicDetails) => {}
};

export const TopicDetailsDataContext = createContext<TopicDetails>(
  defaultDataContextState as TopicDetails,
);

export const TopicDetailsActionsContext = createContext<
  typeof defaultActionsContextState
  >(defaultActionsContextState);

export default memo(({ children }) => {
  const params = useGetParams<TopicDetailsParams>(ROUTES.topic.byId);

  const { setMarkDown } = useContext(GlobalActionsContext);

  const [details, setDetails] = useState<KeyValue<TopicDetails>>(defaultDataContextState);

  const { request } = useFetch();

  const receiveDetails = useCallback(async (id: string) => {
    if (details[id]) return details[id];

    const d = doc(topicsCollection, id);

    const res = await request<DocumentSnapshot<DocumentData>>(getDoc(d));

    if (res) {
      setDetails(prevState => ({
          ...prevState,
          [id]: {
            ...res.data() as TopicDetails,
            id
          }
        })
      );
    }

    return res;
  }, [details, request]);

  const updateDetails = useCallback(async (updated: TopicDetails) => {
    const prevDetails = details[params?.topicId as string];

    const d = doc(topicsCollection, updated.id);

    const updatedDetails = {
      ...prevDetails,
      ...updated
    };

    await request(setDoc(d, updatedDetails));

    setDetails(prevState => ({
      ...prevState,
      [params?.topicId as string]: updatedDetails
    }));
  }, [request, details, params?.topicId]);

  useEffect(() => {
    (async () => {
      if (params?.topicId && !details[params.topicId]) {
        await receiveDetails(params.topicId);
      }
    })();
  }, [params?.topicId, receiveDetails, details]);

  useEffect(() => {
    if (params?.topicId && details[params.topicId]) {
      setMarkDown(details[params.topicId].content);
    }
  }, [setMarkDown, details, params?.topicId]);

  return (
    <TopicDetailsDataContext.Provider
      value={useMemo(
        () =>  details[params?.topicId || ''],
        [details, params?.topicId],
      )}
    >
      <TopicDetailsActionsContext.Provider
        value={useMemo(
          () => ({
            receiveDetails,
            updateDetails
          }),
          [receiveDetails, updateDetails],
        )}
      >
        {children}
      </TopicDetailsActionsContext.Provider>
    </TopicDetailsDataContext.Provider>
  );
});
