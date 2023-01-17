import * as React from "react";
import { color, space, typography } from "styled-system";
import styled from "styled-components";

const StyledH1 = styled.h1`
  ${color}
  ${space}
  ${typography}
`;

const StyledH2 = styled.h2`
  ${color}
  ${space}
  ${typography}
`;

const StyledH3 = styled.h3`
  ${color}
  ${space}
  ${typography}
`;

const StyledH4 = styled.h4`
  ${color}
  ${space}
  ${typography}
`;

const StyledH5 = styled.h5`
  ${color}
  ${space}
  ${typography}
`;

const StyledH6 = styled.h6`
  ${color}
  ${space}
  ${typography}
`;

export const Heading = props => {
  const { type, children } = props;
  switch (type) {
    case "h1":
      return (
        <StyledH1 {...props} fontFamily={"Exo"}>
          {children}
        </StyledH1>
      );
    case "h2":
      return (
        <StyledH2 {...props} fontFamily={"Exo"}>
          {children}
        </StyledH2>
      );
    case "h3":
      return (
        <StyledH3 {...props} fontFamily={"Exo"}>
          {children}
        </StyledH3>
      );
    case "h4":
      return (
        <StyledH4 {...props} fontFamily={"Exo"}>
          {children}
        </StyledH4>
      );
    case "h5":
      return (
        <StyledH5 {...props} fontFamily={"Exo"}>
          {children}
        </StyledH5>
      );
    case "h6":
      return (
        <StyledH6 {...props} fontFamily={"Exo"}>
          {children}
        </StyledH6>
      );
    default:
      return null;
  }
};
