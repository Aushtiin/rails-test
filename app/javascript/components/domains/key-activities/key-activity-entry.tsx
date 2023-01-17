// @ts-nocheck
import { Checkbox, Label } from "@rebass/forms";
import { observer } from "mobx-react";
import React, { useRef, useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import styled from "styled-components";
import { useMst } from "../../../setup/root";
import { baseTheme } from "../../../themes/base";
import { Icon } from "../../shared/icon";
import { KeyActivityPriorityIcon } from "./key-activity-priority-icon";
import { Avatar } from "~/components/shared";
import { DateButton } from "~/components/shared/date-selection/date-button";
import { addDays, parseISO } from "date-fns";
import Popup from "reactjs-popup";
import { Calendar } from "react-date-range";
import { Button } from "~/components/shared/button";
import { useTranslation } from "react-i18next";
import { parseKeyActivityDueDate } from "~/utils/date-time";
import moment from "moment";
import * as R from "ramda";

interface IKeyActivityEntryProps {
  keyActivity: any;
  dragHandleProps?: any;
  meetingId?: string | number;
}

export const KeyActivityEntry = observer(
  ({ keyActivity, dragHandleProps, meetingId }: IKeyActivityEntryProps): JSX.Element => {
    const { keyActivityStore } = useMst();
    const keyActivityRef = useRef(null);
    const { t } = useTranslation();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [selectedDueDate, setSelectedDueDate] = useState<Date>(new Date(keyActivity.dueDate));

    useEffect(() => {
      setSelectedLabel(keyActivity.labels ? keyActivity.labels[0] : null);
    }, [keyActivity]);

    const updatePriority = () => {
      let priority = "";
      switch (keyActivity.priority) {
        case "low":
          priority = "medium";
          break;
        case "medium":
          priority = "high";
          break;
        case "high":
          priority = "frog";
          break;
        case "frog":
          priority = "low";
          break;
        default:
          priority = "";
      }
      keyActivityStore.updateKeyActivityState(keyActivity.id, "priority", priority);
    };

    const handleDescriptionChange = e => {
      if (!e.target.value.includes("<div>")) {
        keyActivityStore.updateKeyActivityState(keyActivity["id"], "description", e.target.value);
      }
    };

    const dueDateObj = parseKeyActivityDueDate(keyActivity);

    const updateDueDate = date => {
      keyActivityStore.updateKeyActivityState(
        keyActivity["id"],
        "dueDate",
        R.isNil(date) ? null : moment(date).format("YYYY-MM-DD"),
      );
    };

    return (
      <Container dragHandleProps={dragHandleProps}>
        <LeftActionsContainer>
          <CheckboxContainer key={keyActivity["id"]}>
            <Checkbox
              key={keyActivity["id"]}
              checked={keyActivity["completedAt"] ? true : false}
              sx={{
                color: baseTheme.colors.primary100,
              }}
              onChange={e => {
                keyActivityStore.updateKeyActivityStatus(keyActivity, e.target.checked);
              }}
            />
          </CheckboxContainer>

          <KeyActivityPriorityContainer onClick={() => updatePriority()}>
            <KeyActivityPriorityIcon priority={keyActivity.priority} />
          </KeyActivityPriorityContainer>
        </LeftActionsContainer>
        <RightContainer>
          <RowContainer>
            <InputContainer>
              <StyledContentEditable
                innerRef={keyActivityRef}
                html={keyActivity.description}
                onChange={e => handleDescriptionChange(e)}
                onKeyDown={key => {
                  if (key.keyCode == 13) {
                    keyActivityRef.current.blur();
                  }
                }}
                style={{
                  textDecoration: keyActivity.completedAt && "line-through",
                  cursor: "text",
                }}
                onBlur={() => keyActivityStore.updateKeyActivity(keyActivity.id)}
              />

              {keyActivity.personal && <Icon icon={"Lock"} size={18} iconColor={"mipBlue"} />}

              <ActionContainer>
                <ActionSubContainer>
                  {meetingId && (
                    <AvatarContainer>
                      <Avatar
                        defaultAvatarColor={keyActivity.user.defaultAvatarColor}
                        firstName={keyActivity.user.firstName}
                        lastName={keyActivity.user.lastName}
                        avatarUrl={keyActivity.user.avatarUrl}
                        size={25}
                      />
                    </AvatarContainer>
                  )}

                  <DeleteButtonContainer
                    onClick={() =>
                      keyActivityStore.destroyKeyActivity(keyActivity.id, meetingId ? true : false)
                    }
                  >
                    <Icon icon={"Delete"} size={20} style={{ marginTop: "2px" }} />
                  </DeleteButtonContainer>
                </ActionSubContainer>
              </ActionContainer>
            </InputContainer>
          </RowContainer>

          <BottomRowContainer>
            <DateContainer>
              <Popup
                arrow={false}
                closeOnDocumentClick
                contentStyle={{
                  border: "none",
                  borderRadius: "6px",
                  padding: 0,
                  width: "auto",
                }}
                on="click"
                onClose={() => {}}
                onOpen={() => {}}
                open={showDatePicker}
                position="bottom center"
                trigger={
                  <DateButtonDiv>
                    <DateButton
                      onClick={() => {
                        setShowDatePicker(true);
                        setSelectedDueDate(new Date(parseISO(keyActivity.dueDate)));
                      }}
                      text={dueDateObj.text}
                      displayColor={dueDateObj.color}
                    />
                  </DateButtonDiv>
                }
              >
                <>
                  <Calendar
                    showDateDisplay={false}
                    showMonthAndYearPickers={false}
                    showSelectionPreview={true}
                    direction={"vertical"}
                    shownDate={new Date()}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 30)}
                    scroll={{
                      enabled: true,
                      calendarWidth: 320,
                      monthWidth: 320,
                    }}
                    rangeColors={[baseTheme.colors.primary80]}
                    date={selectedDueDate}
                    onChange={date => {
                      setSelectedDueDate(date);
                      updateDueDate(date);
                    }}
                  />
                  <Button
                    variant={"primary"}
                    small
                    onClick={() => {
                      setSelectedDueDate(null);
                      updateDueDate(null);
                    }}
                    mx={"auto"}
                    my={"8px"}
                  >
                    {t("datePicker.clearDate")}
                  </Button>
                </>
              </Popup>
            </DateContainer>
          </BottomRowContainer>
        </RightContainer>
      </Container>
    );
  },
);

const DeleteButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  color: ${props => props.theme.colors.grey60};
  display: none;
  &: hover {
    cursor: pointer;
    color: ${props => props.theme.colors.greyActive};
  }
`;

type ContainerProps = {
  dragHandleProps?: any;
};

const Container = styled.div<ContainerProps>`
  font-size: 14px;
  width: inherit;
  padding: 4px 0px 4px 0px;
  &:hover ${DeleteButtonContainer} {
    display: block;
  }
  margin-left: 8px;
  display: flex;
  margin-right: 8px;
  &:active {
    background-color: ${props => props.dragHandleProps && props.theme.colors.grey20};
  }
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 14px;
  padding: 4px 0px 4px 0px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
  padding: 0px 0px 0px 10px;
`;

const DateButtonDiv = styled.div``;

export const KeyActivityPriorityContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 8px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledContentEditable = styled(ContentEditable)`
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin-left: 10px;
  min-width: 105px;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  word-break: break-word;
`;

const CheckboxContainer = props => (
  <Label
    {...props}
    sx={{
      width: "auto",
      marginTop: "auto",
      marginBottom: "auto",
    }}
  >
    {props.children}
  </Label>
);

export const AvatarContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 4px;
  margin-right: 4px;
`;

const LeftActionsContainer = styled.div`
  display: flex;
`;

const ActionContainer = styled.div`
  display: flex;
  margin-left: auto;
  width: 60px;
`;

export const ActionSubContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

const RowContainer = styled.div`
  display: flex;
`;

const BottomRowContainer = styled(RowContainer)`
  margin-top: -5px;
`;

const RightContainer = styled.div`
  width: -webkit-fill-available;
`;
