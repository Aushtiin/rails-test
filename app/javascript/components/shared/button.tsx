// @ts-nocheck
import * as React from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  variant,
} from "styled-system";

type StyledSystemProps = ColorProps & LayoutProps & SpaceProps & TypographyProps;

interface IButtonProps extends StyledSystemProps {
  variant?: string;
  onClick: () => void | void;
  disabled?: boolean;
  small?: boolean;
  style?: object;
  fontOverride?: string;
}

const StyledButton = styled.button<IButtonProps>`
  ${color}
  ${layout}
  ${space}
  ${typography}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  &:hover {
    cursor: pointer;
    opacity: ${props => (props.variant.includes("Outline") || props.disabled ? "1.0" : "0.85")};
    background: ${props =>
      props.variant.includes("Outline") && !props.disabled ? "rgba(0, 0, 0, 0.02)" : null};
  }
  &:focus {
    outline: 0
  }
  &:active {
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, .1);
    transform: translate(1px, 1px)
  }
  transition: all ease 0.1s;
  ${props =>
    variant({
      variants: {
        primary: {
          bg: props.disabled ? "primary60" : "primary100",
          color: "white",
          borderColor: props.disabled ? "primary60" : "primary100",
        },
        primaryOutline: {
          bg: "white",
          color: props.disabled ? "primary60" : "primary100",
          borderColor: props.disabled ? "primary60" : "primary100",
        },
        redOutline: {
          bg: "white",
          color: props.disabled ? "fadedRed" : "warningRed",
          borderColor: props.disabled ? "fadedRed" : "warningRed",
        },
        grey: {
          bg: "backgroundGrey",
          color: "grey80",
          borderColor: "backgroundGrey",
        },
        noOutline: {
          bg: "transparent",
          borderWidth: "0px",
          color: props.disabled ? "primary60" : "primary100",
          paddingLeft: "6px",
          paddingRight: "6px",
        },
      },
    })}
`;

export const Button: React.FunctionComponent<IButtonProps> = ({
  onClick,
  disabled,
  small,
  children,
  fontOverride,
  ...restProps
}): JSX.Element => {
  return (
    <StyledButton
      {...restProps}
      fontFamily={"Lato"}
      fontSize={fontOverride ? fontOverride : small ? 1 : 2}
      px={4}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      height={small ? "32px" : "40px"}
    >
      {children}
    </StyledButton>
  );
};
