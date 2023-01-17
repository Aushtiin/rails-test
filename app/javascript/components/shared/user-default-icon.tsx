import * as React from "react";
import { color, space, typography } from "styled-system";
import styled from "styled-components";
import { baseTheme } from "../../themes";
import { Text } from "./text";

interface IUserDefaultIconProps {
  firstName: string;
  lastName: string;
  size?: number;
  marginLeft?: string;
  marginRight?: string;
  border?: string;
  defaultAvatarColor?: string;
}

export const UserDefaultIcon = (props: IUserDefaultIconProps) => {
  const { firstName, lastName, size, marginLeft, marginRight, border, defaultAvatarColor } = props;

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <Container
      size={size}
      marginLeft={marginLeft}
      marginRight={marginRight}
      border={border}
      defaultAvatarColor={defaultAvatarColor}
    >
      <StyledText size={size}> {initials.toUpperCase()} </StyledText>
    </Container>
  );
};

type ContainerProps = {
  size?: number;
  marginLeft?: string;
  marginRight?: string;
  border?: string;
  defaultAvatarColor?: string;
};

const Container = styled.div<ContainerProps>`
  background-color: ${props => baseTheme.colors[props.defaultAvatarColor] || baseTheme.colors.bali};
  margin-left: ${props => props.marginLeft || "auto"};
  margin-right: ${props => props.marginRight};
  border-radius: 9999px;
  height: ${props => props.size || 48}px;
  width: ${props => props.size || 48}px;
  min-width: ${props => props.size || 48}px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: ${props => props.border};
`;

type StyledTextProps = {
  size?: number;
};

const StyledText = styled(Text)<StyledTextProps>`
  text-align: center;
  font-size: ${props => (props.size ? props.size / 3 : 16)}pt;
  color: ${baseTheme.colors.white};
`;
