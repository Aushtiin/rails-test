import * as React from "react";
import * as R from "ramda";
import { observer } from "mobx-react";
//import { RouterModel } from "mst-react-router";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

// stores
import { IUserStore } from "../stores/user-store";
// theme
import {} from "styled-components/cssprop";
import { baseTheme } from "../themes/base";
import { GlobalStyles } from "./global-styles";

// components

import { useMst } from "../setup/root";
import styled from "styled-components";

import { HomeContainer } from "./domains/home/home-container";
import { IKeyActivityStore } from "../stores/key-activity-store";
import { ModalProvider } from "styled-react-modal";
import { Toaster } from "./shared/toaster";

const Container = styled.div`
  margin-left: 136px;
  margin-right: 40px;
  margin-bottom: 50px;
  padding-top: 96px;
  height: inherit;
`;

export interface IAppProps {
  userStore?: IUserStore;
  keyActivityStore?: IKeyActivityStore;
}

export const App = observer(
  (props: IAppProps): JSX.Element => {
    const { keyActivityStore, sessionStore } = useMst();

    const onDragEnd = result => {
      const { destination, source, draggableId } = result;

      if (!result.destination) {
        return;
      }

      let newPosition = destination.index;
      if (newPosition === source.index && destination.droppableId === source.droppableId) {
        return;
      }

      const splittedDraggableId = destination.droppableId.split("-");

      if (R.includes("keyActivity", draggableId)) {
        const keyActivityId = parseInt(R.replace("keyActivity-", "", draggableId));
        keyActivityStore.updateKeyActivityState(keyActivityId, "position", newPosition + 1);
        if (destination.droppableId === "weekly-activities") {
          keyActivityStore.startLoading("weekly-activities");
          keyActivityStore.updateKeyActivityState(
            keyActivityId,
            "scheduledGroupId",
            sessionStore.getScheduledGroupIdByName("Weekly List"),
          );
        } else if (destination.droppableId === "master-activities") {
          keyActivityStore.startLoading("master-activities");
          keyActivityStore.updateKeyActivityState(
            keyActivityId,
            "scheduledGroupId",
            sessionStore.getScheduledGroupIdByName("Backlog"),
          );
        } else if (destination.droppableId === "todays-priorities") {
          keyActivityStore.startLoading("todays-priorities");
          keyActivityStore.updateKeyActivityState(
            keyActivityId,
            "scheduledGroupId",
            sessionStore.getScheduledGroupIdByName("Today"),
          );
        } else if (R.includes("todays-activities", destination.droppableId)) {
          keyActivityStore.startLoading("home-key-activities");
          keyActivityStore.updateKeyActivityState(
            keyActivityId,
            "scheduledGroupId",
            parseInt(splittedDraggableId[splittedDraggableId.length - 1]),
          );
        } else if (R.includes("scheduled-group-activities", destination.droppableId)) {
          keyActivityStore.startLoading("home-key-activities");
          keyActivityStore.updateKeyActivityState(
            keyActivityId,
            "scheduledGroupId",
            parseInt(splittedDraggableId[splittedDraggableId.length - 1]),
          );
        }
        keyActivityStore.updateKeyActivity(keyActivityId);
      }
    };
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <ThemeProvider theme={baseTheme}>
          <ModalProvider>
            <GlobalStyles />
            <Toaster position="bottom-right" />

            <Switch>
              <Route exact path={["/"]}>
                <>
                  <Container>
                    <Route exact path="/" component={HomeContainer} />
                  </Container>
                </>
              </Route>
            </Switch>
          </ModalProvider>
        </ThemeProvider>
      </DragDropContext>
    );
  },
);
