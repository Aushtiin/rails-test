import * as React from "react";
import { KeyActivitiesHeader } from "./key-activities-header";
import { KeyActivitiesBody } from "./key-activities-body";
import { useState } from "react";
import styled from "styled-components";

export const KeyActivitiesContainer = (): JSX.Element => {
  const [showAllKeyActivities, setShowAllKeyActivities] = useState<boolean>(false);

  return (
    <Container>
      <KeyActivitiesHeader
        showAllKeyActivities={showAllKeyActivities}
        setShowAllKeyActivities={setShowAllKeyActivities}
      />
      <KeyActivitiesBody showAllKeyActivities={showAllKeyActivities} />
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
`;
