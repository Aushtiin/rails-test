import * as React from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { Heading } from "./heading";
import { Icon } from "./icon";

interface IModalWithHeaderProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerText?: string;
  subHeaderText?: string;
  children: any;
  width?: string;
  onCloseAction?: any;
}

export const ModalWithHeader = ({
  modalOpen,
  setModalOpen,
  headerText,
  children,
  width,
  subHeaderText,
  onCloseAction,
}: IModalWithHeaderProps): JSX.Element => {
  return (
    <StyledModal isOpen={modalOpen} style={{ width: width || "30rem" }}>
      <HeaderContainer>
        <RowWrapper>
          <StyledHeading type={"h3"} color={"black"} fontSize={"16px"}>
            {headerText}
          </StyledHeading>
          <CloseIconContainer
            onClick={() => {
              setModalOpen(false);
              if (onCloseAction) {
                onCloseAction();
              }
            }}
          >
            <StyledIcon icon={"Close"} size={18} />
          </CloseIconContainer>
        </RowWrapper>
        {subHeaderText && (
          <RowWrapper>
            <SubHeaderText>{subHeaderText}</SubHeaderText>
          </RowWrapper>
        )}
      </HeaderContainer>
      {children}
    </StyledModal>
  );
};

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.colors.grey60};
`;

const StyledModal = Modal.styled`
  width: 30rem;
  min-height: 100px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.white};
  max-height: 660px;
  overflow: auto;
`;

const HeaderContainer = styled.div`
  border-bottom ${props => `1px solid ${props.theme.colors.grey20}`};
`;

const CloseIconContainer = styled.div`
  margin-left: auto;
  margin-right: 16px;
  margin-top: 14px;
  cursor: pointer;
  &:hover ${StyledIcon} {
    color: ${props => props.theme.colors.greyActive};
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
`;

const SubHeaderText = styled.p`
  color: ${props => props.theme.colors.grey100};
  font-size: 12px;
  margin-top: 0;
`;

const StyledHeading = styled(Heading)`
  font-family: Lato;
  margin-bottom: 8px;
  font-weight: bold;
`;
