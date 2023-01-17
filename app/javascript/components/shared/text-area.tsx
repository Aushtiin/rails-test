import * as React from "react";
import styled from "styled-components";
import { Textarea } from "@rebass/forms";
import { baseTheme } from "../../themes";

interface ITextAreaProps {
  textValue: string;
  onChange: (e) => void;
  height?: string;
  width?: string;
  placeholder?: string;
  style?: any;
  rows?: number;
}

export const TextArea = (props: ITextAreaProps) => {
  const { onChange, height, width, placeholder, style, textValue, rows } = props;

  return (
    <StyledTextarea
      placeholder={placeholder || "Type here..."}
      value={textValue}
      sx={{
        border: `1px solid ${baseTheme.colors.grey40}`,
        height: `${height}`,
        width: `${width}`,
      }}
      onChange={onChange}
      style={style}
      rows={rows ? rows : 5}
    />
  );
};

const StyledTextarea = styled(Textarea)`
  border-radius: 5px;
`;
