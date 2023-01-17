import * as React from "react";
import styled from "styled-components";
import { baseTheme } from "../../themes";

import { Select as RebassSelect } from "@rebass/forms";

export const Input = props => <StyledInput {...props}>{props.children}</StyledInput>;

export const Label = props => <StyledLabel {...props}>{props.children}</StyledLabel>;

const StyledLabel = styled.label`
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  font-family: Lato;
  font-weight: bold;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-family: Lato;
  border: 1px solid ${props => props.theme.colors.grey40};
  background-color: transparent;
  padding: 8px;
  box-sizing: border-box;
  appearance: none;
`;

export const Select = props => (
  <RebassSelect
    {...props}
    sx={{
      borderRadius: 5,
      border: `1px solid ${baseTheme.colors.grey40}`,
    }}
  >
    {props.children}
  </RebassSelect>
);

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`;
