import * as React from "react";
import styled from "styled-components";
import { Text } from "./text";

interface ISubHeaderTextProps {
  text: string;
}

export const SubHeaderText = ({ text }: ISubHeaderTextProps): JSX.Element => {
  return <StyledText>{text}</StyledText>;
};

const StyledText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;
