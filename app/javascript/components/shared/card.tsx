import * as React from "react";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps, typography, TypographyProps } from "styled-system";

type StyledProps = LayoutProps & SpaceProps;

export interface ICardProps extends StyledProps {
  children?: any;
  alignment?: string;
  border?: string;
  headerComponent?: any;
  noHeaderBorder?: boolean;
}

export const Card = (props: ICardProps): JSX.Element => {
  const { children, alignment, headerComponent, border, noHeaderBorder, ...restProps } = props;
  return (
    <CardContainer {...restProps}>
      {headerComponent ? (
        <CardHeader noHeaderBorder={noHeaderBorder}>{headerComponent}</CardHeader>
      ) : null}
      {children}
    </CardContainer>
  );
};

export const CardHeaderText = styled.h4<TypographyProps>`
  ${typography}
`;

export const CardBody = styled.div<LayoutProps>`
  ${layout}
  padding: 15px 15px 15px 15px;
`;

interface ICardContainerProps extends StyledProps {
  alignment?: string;
  border?: string;
}

const CardContainer = styled.div<ICardContainerProps>`
  ${layout}
  ${space}
  border: ${props => props.border || `1px solid ${props => props.theme.colors.borderGrey}`};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ alignment }) =>
    (alignment === "left" && "start") ||
    (alignment === "center" && "center") ||
    (alignment === "right" && "end")}
  min-height: 100px;
  box-shadow: 1px 3px 6px 1px rgba(0, 0, 0, 0.1);
`;

interface ICardHeaderProps extends TypographyProps {
  noHeaderBorder?: boolean;
}

const CardHeader = styled.div<ICardHeaderProps>`
  ${typography}
  border-bottom: ${props =>
    props.noHeaderBorder ? "none" : "1px solid " + props.theme.colors.borderGrey};
  display: inline-block;
  font-family: Lato;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;
