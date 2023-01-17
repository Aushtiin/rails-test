import * as React from "react";
import * as R from "ramda";
import { Card } from "rebass";
import { Avatar } from "./avatar";
import { TextNoMargin } from "./text";

import { useTranslation } from "react-i18next";

export const UserCard = ({
  firstName,
  lastName,
  email,
  avatarUrl,
  defaultAvatarColor,
  id,
}: UserCardProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        width: "200px",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Avatar
        defaultAvatarColor={defaultAvatarColor}
        firstName={firstName}
        lastName={lastName}
        avatarUrl={avatarUrl}
        marginLeft={"inherit"}
        marginRight={"8px"}
      />
      <div>
        <TextNoMargin
          letterSpacing={"0em"}
          fontSize={1}
          fontWeight={"bold"}
        >{`${firstName} ${lastName}`}</TextNoMargin>
        <TextNoMargin letterSpacing={"0em"} fontSize={1}>{`${email}`}</TextNoMargin>
      </div>
    </Card>
  );
};

interface UserCardProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  defaultAvatarColor?: string;
}
