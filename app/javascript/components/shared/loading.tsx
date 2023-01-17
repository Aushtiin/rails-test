import * as React from "react";

import { ClipLoader } from "react-spinners";
import { baseTheme } from "~/themes/base";

export const Loading = props => (
  <ClipLoader size={24} color={baseTheme.colors.primary100} loading={true} />
);
