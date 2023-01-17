import * as React from "react";
import styled from "styled-components";
import { Icon } from "./icon";

export const NoMoodRatings = (): JSX.Element => {
  return (
    <Container>
      <StyledIcon icon={"Emotion-C"} size={"110px"} iconColor={"greyInactive"} />
      <TextContainer>No Data Available</TextContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const TextContainer = styled.div`
  text-align: center;
  font-size: 36px;
  color: ${props => props.theme.colors.greyInactive};
  margin-top: 30px;
`;

const StyledIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
