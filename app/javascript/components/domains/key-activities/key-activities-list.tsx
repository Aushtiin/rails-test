import * as React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { KeyActivityRecord } from "~/components/shared/issues-and-key-activities/key-activity-record";

interface IKeyActivitiesListProps {
  keyActivities: Array<any>;
  droppableId: string;
}

export const KeyActivitiesList = ({
  keyActivities,
  droppableId,
}: IKeyActivitiesListProps): JSX.Element => {
  const splittedDroppableId = droppableId.split("-");
  const updateId = splittedDroppableId[splittedDroppableId.length - 1];

  const renderKeyActivitiesList = () => {
    return keyActivities.map((keyActivity, index) => {
      const draggableId = () => {
        if (isNaN(parseInt(updateId))) {
          return `keyActivity-${keyActivity.id}`;
        } else {
          return `keyActivity-${keyActivity.id}-${updateId}`;
        }
      };

      return (
        <Draggable
          draggableId={draggableId()}
          index={index}
          key={keyActivity["id"]}
          type={"keyActivity"}
        >
          {provided => (
            <KeyActivityContainer
              key={keyActivity["id"]}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <KeyActivityRecord
                keyActivity={keyActivity}
                dragHandleProps={...provided.dragHandleProps}
              />
            </KeyActivityContainer>
          )}
        </Draggable>
      );
    });
  };

  return (
    <Container>
      <Droppable droppableId={droppableId} key={"keyActivity"}>
        {(provided, snapshot) => (
          <KeyActivitiesContainer ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {renderKeyActivitiesList()}
            {provided.placeholder}
          </KeyActivitiesContainer>
        )}
      </Droppable>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  height: 100%;
`;

type KeyActivityContainerType = {
  borderBottom?: string;
};

const KeyActivityContainer = styled.div<KeyActivityContainerType>`
  border-bottom: ${props => props.borderBottom};
  margin-right: ${props => (props.borderBottom ? "8px" : "")};
`;

type KeyActivitiesContainerType = {
  isDraggingOver: any;
};

const KeyActivitiesContainer = styled.div<KeyActivitiesContainerType>`
  height: 100%;
`;
