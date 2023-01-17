import * as React from "react";
import styled from "styled-components";

interface KeyActivitiesHeaderProps {
  title: string;
}

export const KeyActivitiesHeader = (props: KeyActivitiesHeaderProps): JSX.Element => {
  return (
    <Container>
      <KeyActivitiesText> {props.title} </KeyActivitiesText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  padding-left: 10px;
  padding-right: 10px;
`;

const KeyActivitiesText = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
`;
