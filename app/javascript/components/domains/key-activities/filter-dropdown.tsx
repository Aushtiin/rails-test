import * as React from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import KeyActivitySortConstants from "~/constants/key-activity-sort-types";
import { useMst } from "~/setup/root";

interface IFilterDropdownProps {
  setFilterOpen: any;
  scheduledGroupId: number;
}

export const FilterDropdown = ({
  setFilterOpen,
  scheduledGroupId,
}: IFilterDropdownProps): JSX.Element => {
  const { t } = useTranslation();
  const optionsRef = useRef(null);
  const { keyActivityStore } = useMst();

  useEffect(() => {
    const handleClickOutside = event => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortMenuOptions = [
    {
      label: t("keyActivities.sortByPriority"),
      value: KeyActivitySortConstants.BY_PRIORITY,
    },
    {
      label: t("keyActivities.sortByDueDate"),
      value: KeyActivitySortConstants.BY_DUE_DATE,
    },
  ];

  const renderFilterOptions = () => {
    return sortMenuOptions.map((option, index) => {
      return (
        <OptionContainer
          key={index}
          onClick={() => {
            setFilterOpen(false);
            keyActivityStore.resortKeyActivities({ sort: option.value, scheduledGroupId });
          }}
        >
          <OptionTextContainer>{option.label}</OptionTextContainer>
        </OptionContainer>
      );
    });
  };

  return <Container ref={optionsRef}>{renderFilterOptions()}</Container>;
};

const Container = styled.div`
  width: 250px;
  padding-top: 8px;
  padding-bottom: 8px;
  position: absolute;
  background-color: white;
  z-index: 2;
  border-radius: 5px;
  border: 1px solid #e3e3e3;
`;

const OptionContainer = styled.div`
  display: flex;
  height: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  &: hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.primary100};
    color: ${props => props.theme.colors.white};
  }
`;

const OptionTextContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;
