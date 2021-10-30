import {createContext, memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import useFetch from "hooks/useFetch";
import {getDoc, doc, DocumentSnapshot, DocumentData} from "firebase/firestore";
import {topicsCollection} from 'app/firebase';
import useGetParams from "hooks/useGetParams";
import ROUTES from "constants/routes";
import {GlobalActionsContext} from "./global";

const defaultDataContextState = {};

const defaultActionsContextState = {
  receiveDetails: (topicId: string) => {}
};

export const TopicDetailsDataContext = createContext<TopicDetails>(
  defaultDataContextState as TopicDetails,
);

export const TopicDetailsActionsContext = createContext<
  typeof defaultActionsContextState
  >(defaultActionsContextState);

export default memo(({ children }) => {
  const params = useGetParams<TopicDetailsParams>(ROUTES.home);

  const { setMarkDown } = useContext(GlobalActionsContext);

  const [details, setDetails] = useState<KeyValue<TopicDetails>>(defaultDataContextState);

  const { request } = useFetch<DocumentSnapshot<DocumentData>>();

  const receiveDetails = useCallback(async (id: string) => {
    if (details[id]) return details[id];

    const d = doc(topicsCollection, id);

    const res = await request(getDoc(d));

    if (res) {
      setDetails(prevState => ({
          ...prevState,
          [id]: res.data() as TopicDetails
        })
      );
    }

    return res;
  }, [details, request]);

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
          }),
          [receiveDetails],
        )}
      >
        {children}
      </TopicDetailsActionsContext.Provider>
    </TopicDetailsDataContext.Provider>
  );
});
