import * as React from "react";
import styled from "styled-components";
import { HomeContainerBorders } from "../home/shared-components";
import { Icon } from "~/components/shared";
import { useTranslation } from "react-i18next";

interface ICreateKeyActivityButtonProps {
  onButtonClick: any;
}

export const CreateKeyActivityButton = ({
  onButtonClick,
}: ICreateKeyActivityButtonProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container onClick={onButtonClick}>
      <AddNewKeyActivityPlus>
        <Icon icon={"Plus"} size={16} />
      </AddNewKeyActivityPlus>
      <AddNewKeyActivityText> {t("keyActivities.addTitle")}</AddNewKeyActivityText>
    </Container>
  );
};

const Container = styled(HomeContainerBorders)`
  display: flex;
  margin-left: 4px;
  margin-top: 16px;
  &: hover {
    cursor: pointer;
  }
`;

const AddNewKeyActivityPlus = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 12px;
  color: ${props => props.theme.colors.grey80};
`;

const AddNewKeyActivityText = styled.p`
  font-size: 16px;
  margin-left: 21px;
  color: ${props => props.theme.colors.grey80};
`;
