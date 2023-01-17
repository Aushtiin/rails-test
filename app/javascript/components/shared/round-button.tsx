import * as React from "react";
import { color } from "styled-system";
import styled from "styled-components";
import { motion } from "framer-motion";

type IconContainerType = {
  backgroundColor?: string;
};

const StyledButton = styled(motion.div)<IconContainerType>`
  ${color}
  height: 40px;
  width: 40px;
  border-radius: 50px;
  box-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: pointer;
  }
`;

export const RoundButton = props => {
  const { rotate, rotation, ...restProps } = props;
  return (
    <StyledButton
      {...restProps}
      animate={{
        transform: rotate ? `rotate(${rotation ? rotation : 45}deg)` : "rotate(0deg)",
      }}
      transition={{ ease: "easeOut", duration: 0.4 }}
    >
      {props.children}
    </StyledButton>
  );
};
