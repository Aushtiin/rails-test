import * as React from "react";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "../app/javascript/themes/base";
import { GlobalStyles } from "../app/javascript/components/global-styles";

export const themeDecorator = (storyFn) => {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      {storyFn()}
    </ThemeProvider>
  );
};
