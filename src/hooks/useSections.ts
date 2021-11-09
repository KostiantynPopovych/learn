import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DocumentData,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { sectionsCollection } from 'app/firebase';
import useFetch from 'hooks/useFetch';
import { ActionType } from 'constants/global';
import getQueryStaticParts from 'utils/firestoreQueryBuilder';

const GET_FILTERED_SECTIONS_QUERY = getQueryStaticParts('isArchived', '!=');

const SECTIONS_INITIAL_STATE = {};

const useSections = () => {
  const { isLoading, errors, request } = useFetch();

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

  const handleManageSection = useCallback(
    (type: ActionType, section) => {
      if (type === ActionType.Delete) {
        const { [section.id]: exclude, ...rest } = sections;
        return setSections(rest);
      }

      return setSections({
        ...sections,
        [section.id]:
          type === ActionType.Add
            ? section
            : {
                ...sections[section.id],
                section,
              },
      });
    },
    [sections],
  );

  return useMemo(
    () => ({
      sections,
      isLoading,
      errors,
      handleManageSection,
    }),
    [sections, isLoading, errors, handleManageSection],
  );
};

export default useSections;
