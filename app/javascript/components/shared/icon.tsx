import * as React from "react";
import IcoMoon from "react-icomoon";
import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";
import { baseTheme } from "../../themes/base";
const iconSet = require("../../assets/icons/selection.json");

type StyledSystemProps = LayoutProps & SpaceProps;
export interface IIconProps extends StyledSystemProps {
  icon: string;
  iconColor?: string;
  size?: string | number;
  style?: object;
  disableFill?: boolean;
  removeInlineStyle?: boolean;
}

export const IconContainer = styled.div<StyledSystemProps>`
  ${layout}
  ${space}
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IconContainerWithPadding = styled(IconContainer)`
  padding-right: 10px;
  color: ${props => props.theme.colors.grey60};
`;

export const Icon = (props: IIconProps) => {
  const { icon, iconColor, size = "25px", disableFill, removeInlineStyle, ...restProps } = props;
  return (
    <IconContainer {...restProps}>
      <IcoMoon
        icon={icon}
        iconSet={iconSet}
        color={`${iconColor in baseTheme.colors ? baseTheme.colors[iconColor] : iconColor}`}
        size={size}
        disableFill={disableFill}
        removeInlineStyle={removeInlineStyle}
      />
    </IconContainer>
  );
};

export const RawIcon = (props: IcoMoon) => <IcoMoon iconSet={iconSet} {...props} />;
