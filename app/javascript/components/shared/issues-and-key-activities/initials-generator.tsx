import * as React from "react";
import { InitialsText, StyledIcon } from "./scheduled-group-selector";

interface IInitialsGeneratorProps {
  name: string;
  iconSize?: string;
  fontSize?: string;
  fontColor?: string;
}

export const InitialsGenerator = ({
  name,
  iconSize,
  fontSize,
  fontColor,
}: IInitialsGeneratorProps): JSX.Element => {
  if (name == "Backlog") {
    return <StyledIcon icon={"Master"} size={iconSize || "16px"} iconColor={fontColor} />;
  } else {
    const splittedName = name.split(" ");

    let initials = "";
    if (name == "Tomorrow") {
      initials = "TM";
    } else if (splittedName.length == 1) {
      initials = splittedName[0].substring(0, 1).toUpperCase();
    } else {
      initials = `${splittedName[0].substring(0, 1).toUpperCase()}${splittedName[1]
        .substring(0, 1)
        .toUpperCase()}`;
    }

    return (
      <InitialsText fontSize={fontSize} fontColor={fontColor}>
        {initials}
      </InitialsText>
    );
  }
};
