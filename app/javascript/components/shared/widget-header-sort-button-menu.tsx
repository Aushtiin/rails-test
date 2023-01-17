import * as React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { space, SpaceProps, color, ColorProps } from "styled-system";
import Popup from "reactjs-popup";

import { baseTheme } from "~/themes/base";

import { Icon } from "~/components/shared/icon";

interface IMenuOption {
  label: string;
  value: string;
}

export interface IWidgetHeaderSortButtonMenuProps extends SpaceProps {
  onButtonClick: Dispatch<SetStateAction<boolean>>;
  onMenuItemClick: (value: any) => void;
  menuOpen: boolean;
  menuOptions: Array<IMenuOption>;
}

export const WidgetHeaderSortButtonMenu = ({
  onButtonClick,
  onMenuItemClick,
  menuOpen,
  menuOptions,
  ...restProps
}: IWidgetHeaderSortButtonMenuProps) => {
  const renderOptions = menuOptions.map((option, index) => (
    <MenuItem key={index} option={option} onClick={() => onMenuItemClick(option.value)} />
  ));

  return (
    <Popup
      arrow={false}
      closeOnDocumentClick={true}
      contentStyle={{
        border: `1px solid ${baseTheme.colors.borderGrey}`,
        borderRadius: "6px",
        overflow: "hidden",
        padding: 0,
        width: "197px",
      }}
      on={"click"}
      onClose={() => onButtonClick(false)}
      onOpen={() => onButtonClick(true)}
      open={menuOpen}
      position="bottom right"
      trigger={
        <ButtonContainer {...restProps} onClick={() => onButtonClick(!menuOpen)}>
          Sort
          <Icon
            icon={menuOpen ? "Chevron-Up" : "Chevron-Down"}
            size={10}
            iconColor="grey40"
            ml={"5px"}
          />
        </ButtonContainer>
      }
    >
      <>{renderOptions}</>
    </Popup>
  );
};

const ButtonContainer = styled.div<SpaceProps>`
  ${space}
  color: ${props => props.theme.colors.grey40};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  position: relative;
  &:hover {
    color: ${props => props.theme.colors.primary100};
    cursor: pointer; 
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  color: ${props => props.theme.colors.grey40};
  font-size: 12px;
  font-weight: 400;
  width: 100%;
  height: 30px;
  padding: 4px 8px 4px 8px;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundBlue};
    color: ${props => props.theme.colors.primary100};
    cursor: pointer;
  }
`;

interface IMenuItemProps {
  onClick?: () => void;
  option: any;
}

const MenuItem = ({ onClick, option }): JSX.Element => {
  return <MenuItemContainer onClick={onClick}>{option.label}</MenuItemContainer>;
};
