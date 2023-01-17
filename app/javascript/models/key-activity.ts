import { types } from "mobx-state-tree";

export const KeyActivityModel = types
  .model("KeyActivityModel")
  .props({
    id: types.optional(types.number, 0),
    description: types.maybeNull(types.string),
    completedAt: types.maybeNull(types.string),
    priority: types.maybeNull(types.string),
    meetingId: types.maybeNull(types.number),
    position: types.maybeNull(types.number),
    user: types.maybeNull(types.frozen()),
    createdAt: types.maybeNull(types.string),
    dueDate: types.maybeNull(types.string),
    personal: types.boolean,
    scheduledGroupId: types.maybeNull(types.number),
    teamId: types.maybeNull(types.number),
    movedToTodayOn: types.maybeNull(types.string),
  })
  .views((self) => ({}))
  .actions((self) => ({}));

type KeyActivityModelType = typeof KeyActivityModel.Type;
type KeyActivityModelDataType = typeof KeyActivityModel.CreationType;

export interface IKeyActivity extends KeyActivityModelType {}
export interface IKeyActivityData extends KeyActivityModelDataType {}
