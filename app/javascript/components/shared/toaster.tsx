// @ts-nocheck
import * as React from "react";
import styled from "styled-components";
import { color, layout, space } from "styled-system";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Text } from "./text";
import { Icon } from "./icon";

const StyledToastContainer = styled(ToastContainer).attrs({
  // custom props
})`
  margin-right: 50px;
  .Toastify__toast-container {
    width: 350px;
  }
  .Toastify__toast {
    height: 100%;
    width: 350px;
    border-radius: 13px;
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    &--default {
      background: white;
      color: ${props => props.theme.colors.text};
    }
    &--info {
      background: white;
      color: ${props => props.theme.colors.text};
    }
    &--success {
      background: white;
      color: ${props => props.theme.colors.text};
    }
    &--warning {
      background: white;
      color: ${props => props.theme.colors.text};
    }
    &--error {
      background: white;
      color: ${props => props.theme.colors.text};
    }
  }
  .Toastify__progress-bar {
    height: 0;
  }
`;

const ToastMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ColorBar = styled.div`
  width: 12px;
  height: 64px;
  margin-right: 12px;
  background-color: ${props => props.color};
`;

const TextContainer = styled.div`
  ${space}
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-around:
  align-items: flex-start;
`;

export const ToastMessage = ({ heading, message, color, iconName }) => (
  <ToastMessageContainer>
    <ColorBar color={color} />
    <Icon icon={iconName} size={"1.8em"} iconColor={color} />
    <TextContainer ml={3}>
      <Text fontSize={"18px"} pt={2} pl={0} pb={1} pr={0} m={0}>
        {heading}
      </Text>
      <Text color={"grey60"} fontSize={"13px"} pt={1} pl={0} pb={1} pr={0} m={0}>
        {message}
      </Text>
    </TextContainer>
  </ToastMessageContainer>
);

const CloseBox = styled.div`
  width: 70px;
  height: 64px;
  border-left: 1px solid ${props => props.theme.colors.grey40};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = ({ closeToast }) => (
  <CloseBox onClick={closeToast}>
    <Text color={"grey60"} fontSize={"13px"}>
      Close
    </Text>
  </CloseBox>
);

export const Toaster = props => (
  <StyledToastContainer
    position={props.position}
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    closeButton={CloseButton}
  />
);
