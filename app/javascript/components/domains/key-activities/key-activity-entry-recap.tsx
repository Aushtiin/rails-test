import * as React from "react";
import styled from "styled-components";
import { Avatar } from "~/components/shared";
import { DateButton } from "~/components/shared/date-selection/date-button";
import { TextDiv } from "~/components/shared/text";
import { parseKeyActivityDueDate } from "~/utils/date-time";
import {
  ActionSubContainer,
  AvatarContainer,
  KeyActivityPriorityContainer,
} from "./key-activity-entry";
import { KeyActivityPriorityIcon } from "./key-activity-priority-icon";

export interface IKeyActivityEntryRecapProps {
  keyActivity: any;
}

export const KeyActivityEntryRecap = ({
  keyActivity,
}: IKeyActivityEntryRecapProps): JSX.Element => {
  const {
    user: { defaultAvatarColor, firstName, lastName, avatarUrl },
  } = keyActivity;
  const dueDate = parseKeyActivityDueDate(keyActivity);

  return (
    <Container>
      <KeyActivityPriorityContainer>
        <KeyActivityPriorityIcon priority={keyActivity.priority} />
      </KeyActivityPriorityContainer>
      <TextDateContainer>
        <TextDiv fontSize={"16px"} mb={"8px"}>
          {keyActivity.description}
        </TextDiv>
        <DateContainer>
          <DateButton onClick={() => {}} text={dueDate.text} displayColor={dueDate.color} />
        </DateContainer>
      </TextDateContainer>
      <ActionSubContainer>
        <AvatarContainer>
          <Avatar
            defaultAvatarColor={defaultAvatarColor}
            firstName={firstName}
            lastName={lastName}
            avatarUrl={avatarUrl}
            size={25}
          />
        </AvatarContainer>
      </ActionSubContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  font-size: 14px;
  width: inherit;
  padding: 12px 12px 12px 12px;
  margin-left: 8px;
  margin-right: 8px;
`;

const TextDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0px 4px 0px;
  margin-left: 12px;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
`;
