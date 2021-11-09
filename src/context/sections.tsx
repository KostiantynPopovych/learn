import {
  useCallback,
  memo,
  useState,
  useMemo,
  createContext,
  useEffect,
} from 'react';
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
import { sectionsCollection } from 'app/firebase';
import { ActionType } from 'constants/global';

const GET_FILTERED_SECTIONS_QUERY = getQueryStaticParts('isArchived', '!=');

const SECTIONS_INITIAL_STATE = {};

const defaultDataContextState = {
  sections: {} as KeyValue<Section>,
};

const defaultActionsContextState = {
  handleManageSection: (action: ActionType, section: Partial<Section>) => {},
};

export const SectionsDataContext = createContext<
  typeof defaultDataContextState
>(defaultDataContextState);

export const SectionsActionsContext = createContext<
  typeof defaultActionsContextState
>(defaultActionsContextState);

export default memo(({ children }) => {
  const { request } = useFetch();

  const [sections, setSections] = useState<KeyValue<Section>>(
    SECTIONS_INITIAL_STATE,
  );

  useEffect(() => {
    (async () => {
      const q = query(
        sectionsCollection,
        where(
          GET_FILTERED_SECTIONS_QUERY.fieldName,
          GET_FILTERED_SECTIONS_QUERY.type,
          true,
        ),
        orderBy(GET_FILTERED_SECTIONS_QUERY.fieldName),
        orderBy('name'),
      );

      const sectionsDocs = await request<QuerySnapshot<DocumentData>>(
        getDocs(q),
      );

      let normalizedSections: KeyValue<Section> = {};

      if (sectionsDocs) {
        sectionsDocs.forEach((doc) => {
          const { name } = doc.data();
          normalizedSections = {
            ...normalizedSections,
            [doc.id]: {
              id: doc.id,
              name,
            },
          };
        });
      }

      setSections(normalizedSections);
    })();
  }, [request]);

  const handleManageSection = useCallback((type: ActionType, section) => {
    setSections((prevState) => {
      if (type === ActionType.Delete) {
        const { [section.id]: exclude, ...rest } = prevState;
        return rest;
      }

      return {
        ...prevState,
        [section.id]:
          type === ActionType.Add
            ? section
            : {
                ...prevState[section.id],
                ...section,
              },
      };
    });
  }, []);

  return (
    <SectionsDataContext.Provider
      value={useMemo(
        () => ({
          sections,
        }),
        [sections],
      )}
    >
      <SectionsActionsContext.Provider
        value={useMemo(
          () => ({
            handleManageSection,
          }),
          [handleManageSection],
        )}
      >
        {children}
      </SectionsActionsContext.Provider>
    </SectionsDataContext.Provider>
  );
});
