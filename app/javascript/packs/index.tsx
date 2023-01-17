import "mobx-react-lite/batchingForReactDom";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

// components
import { App } from "../components/App";

// stores
import { rootStore, Provider } from "../setup/root";
import { getEnv } from "mobx-state-tree";

import "../i18n/i18n";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider value={rootStore}>
      <Router history={getEnv(rootStore).routerHistory}>
        <App />
      </Router>
    </Provider>,
    document.getElementById("root"),
  );
});
