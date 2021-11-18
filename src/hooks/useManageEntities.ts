import {
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import {
  ActionEntity,
  SideBarActiveAction,
} from 'components/organisms/sideBar/sideBarTypes';
import { sectionsCollection, topicsCollection } from 'app/firebase';
import { v4 as uuidv4 } from 'uuid';
import { ActionType } from 'constants/global';
import { SectionsActionsContext } from 'context/sections';
import { TopicsActionsContext } from 'context/topics';

const getRefs = (id?: string) => ({
  [ActionEntity.Topics]: doc(topicsCollection, id),
  [ActionEntity.Sections]: doc(sectionsCollection, id),
});

const useManageEntities = () => {
  const [activeAction, setActiveAction] =
    useState<Nullable<SideBarActiveAction>>(null);

  const { handleManageSection } = useContext(SectionsActionsContext);

  const { handleManageTopic } = useContext(TopicsActionsContext);

  const handleResetAction = useCallback(() => {
    setActiveAction(null);
  }, []);

  const handleUpdateEntity = useCallback(
    (entity: ActionEntity, type: ActionType, data) => {
      const cbs = {
        [ActionEntity.Sections]: handleManageSection,
        [ActionEntity.Topics]: handleManageTopic,
      };

      cbs[entity](type, data);
    },
    [handleManageTopic, handleManageSection],
  );

  const handleDeleteEntity = useCallback(
    async ({ parentId: sectionId, ...params }: SideBarActiveAction) => {
      const refs = getRefs(params.id);

      const ref = refs[params.entity];

      const updateData = { isArchived: true };

      await updateDoc(ref, updateData);

      handleUpdateEntity(params.entity, ActionType.Delete, {
        ...params,
        ...updateData,
        sectionId,
      });

      handleResetAction();
    },
    [handleResetAction, handleUpdateEntity],
  );

  const handleAddEditEntity = useCallback(
    async ({ input: name }) => {
      const id = activeAction?.id || uuidv4();

      const content = activeAction?.id ? undefined : '';

      const sectionId = activeAction?.parentId;

      const refs = getRefs(id);

      const ref = refs[(activeAction as SideBarActiveAction).entity];

      const data = {
        name,
        isArchived: false,
        ...(sectionId ? { sectionId } : {}),
        ...(activeAction?.entity === ActionEntity.Topics && !activeAction?.id
          ? { content }
          : {}),
      };

      if (activeAction?.id) {
        await updateDoc(ref, data);
      } else {
        await setDoc(ref, data);
      }

      handleUpdateEntity(
        activeAction?.entity as ActionEntity,
        activeAction?.type as ActionType,
        { ...data, id },
      );

      handleResetAction();
    },
    [activeAction, handleResetAction, handleUpdateEntity],
  );

  const handleManageEntityClick = useCallback(
    (params: SideBarActiveAction) => (ev: SyntheticEvent) => {
      ev.stopPropagation();

      const cbs = {
        [ActionType.Add]: setActiveAction,
        [ActionType.Edit]: setActiveAction,
        [ActionType.Delete]: handleDeleteEntity,
      };

      cbs[params.type](params);
    },
    [handleDeleteEntity],
  );

  return useMemo(
    () => ({
      handleManageEntityClick,
      activeAction,
      handleAddEditEntity,
      handleResetAction,
    }),
    [
      handleManageEntityClick,
      activeAction,
      handleAddEditEntity,
      handleResetAction,
    ],
  );
};

export default useManageEntities;
