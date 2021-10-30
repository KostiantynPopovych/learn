import {createContext, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useParams, useLocation, useRouteMatch} from "react-router-dom";
import useFetch from "hooks/useFetch";
import {getDoc, doc, DocumentSnapshot, DocumentData} from "firebase/firestore";
import {topicsCollection} from 'app/firebase';

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
  const { topicId } = useParams<TopicDetailsParams>();
  const loc = useLocation();
  console.log(loc);
  console.log(useRouteMatch());
  const [details, setDetails] = useState<KeyValue<TopicDetails>>(defaultDataContextState);

  const { request } = useFetch<DocumentSnapshot<DocumentData>>();

  const receiveDetails = useCallback(async (id: string) => {
    if (details[id]) return details[id];
    console.log(details);
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
      if (topicId && !details[topicId]) {
        await receiveDetails(topicId);
      }
    })();
  }, [topicId, receiveDetails, details]);

  return (
    <TopicDetailsDataContext.Provider
      value={useMemo(
        () =>  details[topicId],
        [details, topicId],
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
