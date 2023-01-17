import * as React from "react";
import styled from "styled-components";
import { Input } from "@rebass/forms";
import { baseTheme } from "../../themes";

interface ITextInputProps {
  textValue: string;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  placeholder?: string;
  style?: any;
}

export const TextInput = (props: ITextInputProps) => {
  const { textValue, setTextValue, width, placeholder, style } = props;

  return (
    <StyledInput
      placeholder={placeholder || "e.g. Still waiting on feedback"}
      value={textValue}
      sx={{ border: `1px solid ${baseTheme.colors.grey40}`, width: `${width}` }}
      onChange={e => setTextValue(e.target.value)}
      style={style}
    />
  );
};

const StyledInput = styled(Input)`
  border-radius: 5px;
`;
