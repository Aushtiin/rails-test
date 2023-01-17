import { types } from "mobx-state-tree";

export const ScheduledGroupModel = types
  .model("ScheduledGroupModel")
  .props({
    id: types.identifierNumber,
    name: types.string,
  })
  .views(self => ({}))
  .actions(self => ({}));

type ScheduledGroupModelType = typeof ScheduledGroupModel.Type;
type ScheduledGroupModelDataType = typeof ScheduledGroupModel.CreationType;

export interface ScheduledGroup extends ScheduledGroupModelType {}
export interface ScheduledGroupData extends ScheduledGroupModelDataType {}
