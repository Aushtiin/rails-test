import * as React from "react";
import styled from "styled-components";

import { Icon } from "~/components/shared/icon";

interface IDueDateButtonProps {
  displayColor?: string;
  onClick?: () => void;
  text?: string;
}

export const DateButton = ({ onClick, text, displayColor }: IDueDateButtonProps): JSX.Element => {
  return (
    <DateButtonContainer onClick={onClick} displayColor={displayColor}>
      <Icon icon={"Deadline-Calendar"} iconColor={"inherit"} size={"16px"} mr={"8px"} />
      {text}
    </DateButtonContainer>
  );
};

const DateButtonContainer = styled.div<IDueDateButtonProps>`
  color: ${props => props.displayColor};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }
`;
