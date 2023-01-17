import * as R from "ramda";
import { toJS } from "mobx";
import { types, getEnv, flow, getRoot } from "mobx-state-tree";
import { withEnvironment } from "~/lib/with-environment";
import { withRootStore } from "~/lib/with-root-store";
import { UserModel } from "~/models/user";
import { ScheduledGroupModel } from "~/models/scheduled-group";

export const SessionStoreModel = types
  .model("SessionStoreModel")
  .props({
    loading: types.boolean,
    profile: types.maybeNull(UserModel),
    scheduledGroups: types.maybeNull(types.array(ScheduledGroupModel)),
  })
  .extend(withRootStore())
  .extend(withEnvironment())
  .views(self => ({
    getScheduledGroupIdByName(selectedFilterGroupName) {
      return R.path(
        ["id"],
        (self.scheduledGroups || []).find(group => group.name == selectedFilterGroupName),
      );
    },
  }))
  .actions(self => ({
    loadProfile: flow(function*() {
      self.loading = true;
      try {
        const response: any = yield self.environment.api.profile();
        if (response.ok) {
          //add details to user model
          self.profile = response.data;
          self.scheduledGroups = response.data.scheduledGroups;
        }
      } catch {
        // error messaging handled by API monitor
      }
      self.loading = false;
    }),
  }));

type SessionStoreType = typeof SessionStoreModel.Type;
export interface ISessionStore extends SessionStoreType {}
