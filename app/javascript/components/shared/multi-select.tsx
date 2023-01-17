import * as React from "react";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { Label } from "~/components/shared";
import styled from "styled-components";

interface IMultiSelectProps {
  selections: Array<any>;
  label?: string;
  selectedOptions: Array<any>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<any>>;
  displayFieldName: string;
}

export const MultiSelect = ({
  selections,
  label,
  selectedOptions,
  setSelectedOptions,
  displayFieldName,
}: IMultiSelectProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  const parsedSelectedOptions = selectedOptions.map(option => {
    return option.id || option;
  });

  const handleChange = event => {
    const fullSelectedOptions = event.target.value.map(id => fullSelectedOptionObject(id));
    setSelectedOptions(fullSelectedOptions);
  };

  const fullSelectedOptionObject = item => {
    return selections.find(selection => selection.id == item);
  };

  const renderLabel = item => {
    const selectedItem = selections.find(object => object.id == item);
    return selectedItem[displayFieldName];
  };

  return (
    <FormControl className={classes.formControl}>
      <StyledLabel htmlFor="userRole">{label}</StyledLabel>
      <Select
        labelId="team-select-chip-label"
        id="team-select-chip"
        multiple
        value={parsedSelectedOptions}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {(selected as Array<any>).map(item => (
              <Chip key={item.id} label={renderLabel(item)} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {selections.map(selection => {
          return (
            <MenuItem
              key={selection.id}
              value={selection.id}
              style={getStyles(selection.id, parsedSelectedOptions, theme)}
            >
              {selection[displayFieldName]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (id: number, options: Array<any>, theme: Theme) => {
  return {
    fontWeight:
      options.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const StyledLabel = styled(Label)`
  margin-bottom: -16px;
`;
