import {useEffect, useMemo, useState} from "react";
import {getDocs, QuerySnapshot, DocumentData} from "firebase/firestore";
import {sectionsCollection} from "app/firebase";
import useFetch from "hooks/useFetch";

const useSections = () => {
  const { isLoading, errors, request } = useFetch<QuerySnapshot<DocumentData>>();

  const [sections, setSections] = useState<KeyValue<Section>>({});

  useEffect(() => {
    (async() => {
      const sectionsDocs = await request(getDocs(sectionsCollection));

      let normalizedSections: KeyValue<Section> = {};

      if (sectionsDocs) {
        sectionsDocs.forEach((doc) => {
          const { name } = doc.data();
          normalizedSections = {
            ...normalizedSections,
            [doc.id]: {
              id: doc.id,
              name,
            }
          };
        });
      }

      setSections(normalizedSections);
    })()
  }, []);

  return useMemo(() => ({
    sections,
    isLoading,
    errors
  }), [
    sections,
    isLoading,
    errors
  ])
};

export default useSections;