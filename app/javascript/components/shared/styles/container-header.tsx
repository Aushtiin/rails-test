import * as React from "react";
import styled from "styled-components";

export interface IContainerHeaderProps {
  text: string;
}
export const ContainerHeaderWithText = ({ text }: IContainerHeaderProps): JSX.Element => (
  <HeaderContainer>
    <HeaderText> {text} </HeaderText>
  </HeaderContainer>
);

export const HeaderContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.borderGrey};
  padding-left: 10px;
  padding-right: 10px;
`;

export const HeaderContainerWithActions = styled(HeaderContainer)`
  justify-content: space-between;
`;

export const HeaderContainerNoBorder = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
`;

export const HeaderText = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
`;

type AccordionHeaderTextType = {
  expanded?: string;
  accordionPanel: string;
};

export const AccordionHeaderText = styled.h4<AccordionHeaderTextType>`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => 
    props.expanded === props.accordionPanel ? props.theme.colors.black : props.theme.colors.grey60};
`;
