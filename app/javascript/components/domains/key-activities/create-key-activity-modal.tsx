import * as React from "react";
import { useEffect, useState } from "react";
import { Button as RebassButton } from "rebass";
import styled from "styled-components";
import { Avatar } from "~/components/shared/avatar";
import {
  Container,
  FlexContainer,
  IssuePynModalContainer,
} from "~/components/shared/styles/modals";
import { useMst } from "../../../setup/root";
import { baseTheme } from "../../../themes";
import { Icon } from "../../shared/icon";
import { ModalWithHeader } from "../../shared/modal-with-header";
import { TextInput } from "../../shared/text-input";
import { PrioritySelector } from "~/components/shared/issues-and-key-activities/priority-selector";
import { DueDateSelector } from "~/components/shared/issues-and-key-activities/due-date-selector";
import { ScheduledGroupSelector } from "~/components/shared/issues-and-key-activities/scheduled-group-selector";

interface ICreateKeyActivityModalProps {
  createKeyActivityModalOpen: boolean;
  setCreateKeyActivityModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultTypeAsWeekly: boolean;
  todayModalClicked?: boolean;
  defaultSelectedGroupId?: number;
  todayFilterGroupId?: number;
}

export const CreateKeyActivityModal = (
  props: ICreateKeyActivityModalProps
): JSX.Element => {
  const { keyActivityStore, sessionStore, userStore } = useMst();
  const {
    createKeyActivityModalOpen,
    setCreateKeyActivityModalOpen,
    defaultTypeAsWeekly,
  } = props;
  const [keyActivityDescription, setKeyActivityDescription] = useState<string>(
    ""
  );
  const [selectedPriority, setSelectedPriority] = useState<number>(0);
  const [weeklyList, setWeeklyList] = useState<boolean>(defaultTypeAsWeekly);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<Date>(null);
  const [personal, setPersonal] = useState<boolean>(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(null);

  useEffect(() => {
    setSelectedUser(sessionStore.profile);
    if (props.todayModalClicked) {
      setSelectedGroupId(props.todayFilterGroupId);
    } else {
      setSelectedGroupId(props.defaultSelectedGroupId);
    }
  }, [props.todayModalClicked, props.defaultSelectedGroupId]);

  return (
    <ModalWithHeader
      modalOpen={createKeyActivityModalOpen}
      setModalOpen={setCreateKeyActivityModalOpen}
      headerText="Pyn"
      width="640px"
    >
      <Container>
        <TextInputFlexContainer>
          <TextInput
            textValue={keyActivityDescription}
            setTextValue={setKeyActivityDescription}
            width={"100%"}
            placeholder={"e.g. Prep for team meeting"}
            style={{
              height: "35px",
              marginTop: "auto",
              marginBottom: "auto",
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
          />
        </TextInputFlexContainer>
        <FlexContainer>
          <PrioritySelector
            itemPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
          />
          <DueDateSelector
            selectedDueDate={selectedDueDate}
            setSelectedDueDate={setSelectedDueDate}
          />

          <OptionsContainer>
            <IssuePynModalContainer>
              <LockContainer onClick={() => setPersonal(!personal)}>
                <Icon
                  icon={"Lock"}
                  size={"18px"}
                  iconColor={personal ? "mipBlue" : "grey60"}
                />
              </LockContainer>
              <ScheduledGroupSelector
                selectedGroupId={selectedGroupId}
                setSelectedGroupId={setSelectedGroupId}
              />
            </IssuePynModalContainer>
            {selectedUser && (
              <AvatarContainer>
                <Avatar
                  defaultAvatarColor={selectedUser.defaultAvatarColor}
                  avatarUrl={selectedUser.avatarUrl}
                  firstName={selectedUser.firstName}
                  lastName={selectedUser.lastName}
                  size={34}
                  marginLeft={"auto"}
                />
              </AvatarContainer>
            )}
          </OptionsContainer>
        </FlexContainer>

        <FlexContainer>
          <StyledButton
            disabled={keyActivityDescription.length == 0}
            onClick={() =>
              keyActivityStore
                .createKeyActivity({
                  description: keyActivityDescription,
                  priority: selectedPriority,
                  weeklyList: weeklyList,
                  userId: selectedUser.id,
                  dueDate: selectedDueDate,
                  personal: personal,
                  scheduledGroupId: selectedGroupId,
                })
                .then((result) => {
                  if (result) {
                    setKeyActivityDescription("");
                    setSelectedDueDate(null);
                    setCreateKeyActivityModalOpen(false);
                    setSelectedPriority(0);
                    setWeeklyList(defaultTypeAsWeekly);
                    setPersonal(false);
                  }
                })
            }
          >
            Add Pyn
          </StyledButton>
        </FlexContainer>
      </Container>
    </ModalWithHeader>
  );
};

type StyledButtonType = {
  disabled: boolean;
};

const StyledButton = styled(RebassButton)<StyledButtonType>`
  background-color: ${(props) =>
    props.disabled ? baseTheme.colors.grey60 : baseTheme.colors.primary100};
  width: 130px;
  height: 35px;
  &: hover {
    cursor: ${(props) => !props.disabled && "pointer"};
  }
`;

const AvatarContainer = styled.div`
  margin-left: 15px;
  &: hover {
    cursor: pointer;
  }
`;

const TextInputFlexContainer = styled(FlexContainer)`
  margin-bottom: 10px;
`;

const LockContainer = styled.div`
  &: hover {
    cursor: pointer;
  }
`;

const OptionsContainer = styled.div`
  margin-left: auto;
  display: flex;
`;
