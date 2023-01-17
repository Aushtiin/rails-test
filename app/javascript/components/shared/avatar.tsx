import * as React from "react";
import { Image } from "rebass";
import styled from "styled-components";
import { UserDefaultIcon } from "./user-default-icon";

const StyledInitials = styled.div`
  border-radius: 9999;
  background-color: ${props => props.theme.colors.fadedGreen};
  color: ${props => props.theme.colors.white};
`;

interface AvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  size?: number;
  marginLeft?: string;
  marginRight?: string;
  border?: string;
  defaultAvatarColor?: string;
}

type ImageContainerProps = {
  border?: string;
  size?: number;
  marginLeft?: string;
  marginRight?: string;
};

const ImageContainer = styled.div<ImageContainerProps>`
  border: ${props => props.border};
  border-radius: 9999px;
  width: ${props => props.size || 48}px;
  height: ${props => props.size || 48}px;
  min-width: ${props => props.size || 48}px;
  margin-left: ${props => props.marginLeft || "auto"};
  margin-right: ${props => props.marginRight};
`;

export const Avatar = ({
  firstName,
  lastName,
  avatarUrl,
  size,
  marginLeft,
  marginRight,
  border,
  defaultAvatarColor,
}: AvatarProps): JSX.Element =>
  avatarUrl ? (
    <ImageContainer
      border={border}
      size={size}
      marginLeft={marginLeft || "auto"}
      marginRight={marginRight}
    >
      <Image
        style={{
          width: size || 48,
          height: size || 48,
          borderRadius: 9999,
        }}
        src={avatarUrl}
      />
    </ImageContainer>
  ) : (
    <UserDefaultIcon
      size={size || 48}
      firstName={firstName}
      lastName={lastName}
      marginLeft={marginLeft}
      marginRight={marginRight}
      border={border}
      defaultAvatarColor={defaultAvatarColor}
    />
  );
