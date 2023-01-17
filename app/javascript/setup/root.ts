import { setupEnvironment } from "./environment";
import { RootStoreModel } from "../stores/root-store";
import { Instance } from "mobx-state-tree";
import { createContext, useContext } from "react";

const environment = setupEnvironment();
const initialState = {
  router: environment.router,
  userStore: {
    users: [],
  },
  keyActivityStore: {
    keyActivities: [],
  },
  sessionStore: {
    profile: null,
    loading: false,
    scheduledGroups: [],
  },
};

export const rootStore = RootStoreModel.create(initialState, environment);

// add API Monitors
const { api } = environment;

export type RootInstance = Instance<typeof RootStoreModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
