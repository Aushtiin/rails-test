import { RouterModel, SynchronizedHistory } from "mst-react-router";
import { Api } from "../services/api";

export class Environment {
  api: Api;
  router: RouterModel;
  routerHistory: SynchronizedHistory;
}
