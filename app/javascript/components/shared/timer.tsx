import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color, ColorProps, space, SpaceProps, typography, TypographyProps } from "styled-system";

export interface ITimerProps extends SpaceProps {
  secondsElapsed: number;
}

export const Timer = ({ secondsElapsed, ...restProps }: ITimerProps): JSX.Element => {
  const padNumber = number => (number <= 9 ? `0${number}` : number);

  const hours = padNumber(Math.floor(secondsElapsed / 3600));
  const minutes = padNumber(Math.floor(secondsElapsed / 60) - hours * 60);
  const seconds = padNumber(secondsElapsed % 60);

  return (
    <Container {...restProps}>
      <TimeDiv color={"primary100"} fontWeight={600} fontSize={"24px"}>
        {hours}:
      </TimeDiv>
      <TimeDiv color={"primary80"} fontWeight={600} fontSize={"24px"}>
        {minutes}:
      </TimeDiv>
      <TimeDiv color={"primary80"} fontWeight={400} fontSize={"24px"}>
        {seconds}
      </TimeDiv>
    </Container>
  );
};

const Container = styled.div<SpaceProps>`
  ${space}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeDiv = styled.div<ColorProps & TypographyProps>`
  ${color}
  ${typography}
`;
