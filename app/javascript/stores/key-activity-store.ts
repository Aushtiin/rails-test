import { ApiResponse } from "apisauce";
import { flow, types, getRoot } from "mobx-state-tree";
import { ToastMessageConstants } from "~/constants/toast-types";
import { showToast } from "~/utils/toast-message";
import { withEnvironment } from "../lib/with-environment";
import { KeyActivityModel } from "../models/key-activity";
import * as R from "ramda";

export const KeyActivityStoreModel = types
  .model("KeyActivityStoreModel")
  .props({
    keyActivities: types.array(KeyActivityModel),
    loading: types.maybeNull(types.boolean),
    loadingList: types.maybeNull(types.string),
  })
  .extend(withEnvironment())
  .views(self => ({
    keyActivitiesByScheduledGroupName(scheduledGroupName) {
      const {
        sessionStore: { scheduledGroups },
      } = getRoot(self);
      const scheduledGroup = scheduledGroups.find(group => group.name == scheduledGroupName);
      const filteredKeyActivities = self.keyActivities.filter(
        keyActivity => keyActivity.scheduledGroupId == scheduledGroup.id,
      );
      return filteredKeyActivities;
    },
  }))
  .views(self => ({
    get completedActivities() {
      return self.keyActivities.filter(keyActivity => keyActivity.completedAt);
    },
    get completedToday() {
      const today = new Date().getDate();
      return self.keyActivities.filter(
        keyActivity => new Date(keyActivity.completedAt).getDate() === today,
      );
    },
    get completedYesterday() {
      const today = new Date().getDate();
      const yesterday = today - 1;
      return self.keyActivities.filter(
        keyActivity =>
          new Date(keyActivity.completedAt).getDate() === yesterday ||
          (!R.isNil(keyActivity.completedAt) &&
            new Date(keyActivity.movedToTodayOn).getDate() < today),
      );
    },
  }))
  .views(self => ({
    get nextActivities() {
      return self
        .keyActivitiesByScheduledGroupName("Tomorrow")
        .concat(self.keyActivitiesByScheduledGroupName("Weekly List"));
    },
    get tomorrowKeyActivities() {
      return self.keyActivitiesByScheduledGroupName("Tomorrow");
    },
    get weeklyKeyActivities() {
      const filteredKeyActivities = self.keyActivitiesByScheduledGroupName("Weekly List");
      return filteredKeyActivities.filter(keyActivity => !keyActivity.completedAt);
    },
    get incompleteMasterKeyActivities() {
      return self.keyActivitiesByScheduledGroupName("Backlog").filter(mka => !mka.completedAt);
    },
    get completedMasterKeyActivities() {
      return self.keyActivitiesByScheduledGroupName("Backlog").filter(mka => mka.completedAt);
    },
    get todaysPriorities() {
      return self
        .keyActivitiesByScheduledGroupName("Today")
        .filter(keyActivity => !keyActivity.completedAt);
    },
  }))
  .views(self => ({
    get todaysPrioritiesFromPreviousDays() {
      const today = new Date().getDate();
      return self.todaysPriorities.filter(
        keyActivity => new Date(keyActivity.movedToTodayOn).getDate() < today,
      );
    },
  }))
  .actions(self => ({
    reset() {
      self.keyActivities = [] as any;
    },
    startLoading(loadingList = null) {
      self.loading = true;
      self.loadingList = loadingList;
    },
    finishLoading() {
      self.loading = false;
      self.loadingList = null;
    },
  }))
  .actions(self => ({
    fetchKeyActivities: flow(function*() {
      const response: ApiResponse<any> = yield self.environment.api.getKeyActivities();
      self.finishLoading();
      if (response.ok) {
        self.keyActivities = response.data;
      }
    }),
    updateKeyActivityStatus: flow(function*(keyActivity, value) {
      const response: ApiResponse<any> = yield self.environment.api.updateKeyActivityStatus(
        keyActivity,
        value,
        false, // team meeting concept not yet introduced
      );
      if (response.ok) {
        self.keyActivities = response.data;
        return true;
      } else {
        return false;
      }
    }),
    createKeyActivity: flow(function*(keyActivityObject) {
      const response: ApiResponse<any> = yield self.environment.api.createKeyActivity(
        keyActivityObject,
      );
      if (response.ok) {
        self.keyActivities = response.data;
        showToast("Pyn created.", ToastMessageConstants.SUCCESS);
        return true;
      } else {
        showToast("There was a problem creating the pyn.", ToastMessageConstants.ERROR);
        return false;
      }
    }),
    destroyKeyActivity: flow(function*(id, fromTeamMeeting = false) {
      const response: ApiResponse<any> = yield self.environment.api.destroyKeyActivity({
        id,
        fromTeamMeeting,
      });
      if (response.ok) {
        self.keyActivities = response.data;
        return true;
      } else {
        return false;
      }
    }),
    resortKeyActivities: flow(function*(sortParams) {
      const response: ApiResponse<any> = yield self.environment.api.resortKeyActivities(sortParams);
      if (response.ok) {
        self.keyActivities = response.data as any;
        return true;
      } else {
        return false;
      }
    }),
  }))
  .actions(self => ({
    updateKeyActivityState(id, field, value) {
      let keyActivities = self.keyActivities;
      let keyActivityIndex = keyActivities.findIndex(ka => ka.id == id);
      keyActivities[keyActivityIndex][field] = value;
      self.keyActivities = keyActivities;
    },
  }))
  .actions(self => ({
    load: flow(function*() {
      self.reset();
      yield self.fetchKeyActivities();
    }),
  }));

type KeyActivityStoreType = typeof KeyActivityStoreModel.Type;
export interface IKeyActivityStore extends KeyActivityStoreType {
  keyActivities: any;
}
