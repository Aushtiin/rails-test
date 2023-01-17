import { getRoot, IStateTreeNode } from "mobx-state-tree";
import { IRootStore } from "../stores/root-store";

export const withRootStore = () => (self: IStateTreeNode) => ({
  views: {
    get rootStore() {
      return getRoot<IRootStore>(self);
    },
  },
});
