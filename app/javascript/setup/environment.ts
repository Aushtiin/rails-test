import { createBrowserHistory } from "history";
import { syncHistoryWithStore, RouterModel } from "mst-react-router";
import { identity } from "ramda";
import { mst } from "reactotron-mst";
import * as apisaucePlugin from "reactotron-apisauce";
import { default as reactotron } from "reactotron-react-js";

import { Environment } from "../models/environment";
import { Api } from "../services/api";

declare global {
  interface Console {
    tron: any;
  }
}

function setupReactotron() {
  if (process.env.NODE_ENV !== "production") {
    reactotron
      .configure({ name: "Lynchpyn" })
      .use(apisaucePlugin())
      .use(
        mst({
          filter: x => !x.name.endsWith("@APPLY_SNAPSHOT"),
        }),
      )
      .connect()
      .clear();

    console.tron = reactotron as any;
  } else {
    console.tron = { log: identity, display: identity, error: identity } as any;
  }
}

export function setupEnvironment() {
  const environment = new Environment();
  environment.api = new Api();

  const browserHistory = createBrowserHistory();
  const routerModel = RouterModel.create();
  const history = syncHistoryWithStore(browserHistory, routerModel);
  environment.router = routerModel;
  environment.routerHistory = history;

  setupReactotron();

  return environment;
}
