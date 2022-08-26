import { Db } from 'constants/db';
import { ActionType } from 'constants/global';

export enum ActionEntity {
  Topics = Db.Topics,
  Sections = Db.Sections,
}

export interface SideBarActiveAction {
  type: ActionType;
  entity: ActionEntity;
  id?: string;
  parentId?: string;
  content?: string;
}
