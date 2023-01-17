import { types, flow, IStateTreeNode } from "mobx-state-tree";
import { RouterModel } from "mst-react-router";
import { UserStoreModel, IUserStore } from "./user-store";
import { KeyActivityStoreModel, IKeyActivityStore } from "./key-activity-store";
import { SessionStoreModel, ISessionStore } from "./session-store";

export const RootStoreModel = types
  .model("RootStoreModel")
  .props({
    router: types.optional(RouterModel, {}),
    userStore: UserStoreModel,
    keyActivityStore: KeyActivityStoreModel,
    sessionStore: SessionStoreModel,
  })
  .views((self) => ({}))
  .actions((self) => ({
    startup: flow(function*() {
      //check if there is a cookie, if so try to call the profile endpoint and set logged into true
      self.sessionStore.loadProfile();
      self.userStore.load();
      self.keyActivityStore.load();
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      self.startup();
    },
  }));

export interface IRootStore extends IStateTreeNode {
  router: RouterModel;
  userStore: IUserStore;
  keyActivityStore: IKeyActivityStore;
  sessionStore: ISessionStore;
}
