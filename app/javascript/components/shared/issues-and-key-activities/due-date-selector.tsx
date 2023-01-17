// @ts-nocheck
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "../../shared/icon";
import Popup from "reactjs-popup";
import * as R from "ramda";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Calendar } from "react-date-range";
import { addDays } from "date-fns";
import { baseTheme } from "~/themes";
import { Button } from "~/components/shared/button";

interface IDueDateSelectorProps {
  selectedDueDate: any;
  setSelectedDueDate: any;
}

export const DueDateSelector = ({
  selectedDueDate,
  setSelectedDueDate,
}: IDueDateSelectorProps): JSX.Element => {
  const { t } = useTranslation();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  return (
    <Container>
      <DueDateSelectionContainer>
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
          position="bottom right"
          trigger={
            <DueDateButtonContainer
              onClick={() => {
                setShowDatePicker(!showDatePicker);
              }}
              dateSelected={!R.isNil(selectedDueDate)}
            >
              <Icon icon={"Deadline-Calendar"} iconColor={"inherit"} size={"16px"} mr={"8px"} />

              <TextContainer>
                {R.isNil(selectedDueDate)
                  ? t("datePicker.dueDate")
                  : moment(selectedDueDate).format("MMM Do, YYYY")}
              </TextContainer>
            </DueDateButtonContainer>
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
              }}
            />
            <Button
              variant={"primary"}
              small
              onClick={() => setSelectedDueDate(null)}
              mx={"auto"}
              my={"8px"}
            >
              {t("datePicker.clearDate")}
            </Button>
          </>
        </Popup>
      </DueDateSelectionContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const DueDateButtonContainer = styled.div`
  display: flex;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.borderGrey};
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  &: hover {
    cursor: pointer;
  }
`;

const TextContainer = styled.div`
  font-size: 12px;
  margin-top: auto;
  margin-bottom: auto;
  color: ${props => props.theme.colors.greyActive};
`;

const DueDateSelectionContainer = styled.div`
  border-radius: 6px;
  margin-left: 15px;
`;
