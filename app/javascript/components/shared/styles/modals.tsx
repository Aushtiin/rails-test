import styled from "styled-components";
import { Button } from "~/components/shared/button";
import { baseTheme } from "~/themes/base";
export const Container = styled.div`
  padding: 20px;
  padding-bottom: 0;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const PriorityContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-top: 5px;
`;

export const IssuePynModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-items: center;
  margin-top: 0;
  height: 35px;
`;

export const IconContainer = styled.div`
  margin-left: 10px;
`;

//CONTEXT ISSUE, CANNOT USE SHARED STYLD BUTTON
// type StyledButtonType = {
//   disabled: boolean;
// };

// export const StyledButton = styled(Button)<StyledButtonType>`
//   background-color: ${props =>
//     props.disabled ? baseTheme.colors.grey60 : baseTheme.colors.primary100};
//   width: 130px;
//   &: hover {
//     cursor: ${props => !props.disabled && "pointer"};
//   }
// `;
