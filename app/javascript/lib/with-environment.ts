import { getEnv, IStateTreeNode } from "mobx-state-tree";
import { Environment } from "../models/environment";

export const withEnvironment = () => (self: IStateTreeNode) => ({
  views: {
    get environment() {
      return getEnv<Environment>(self);
    },
  },
});
