import * as React from "react";
import { Flex, Box } from "rebass";
import { TextNoMargin } from "~/components/shared/text";

import styled from "styled-components";

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: lightgrey;
`;

interface TableProps {
  columns: number;
  headers: Array<string>;
  data: Array<JSX.Element>;
  styling?: any;
}

export const Table = (props: TableProps) => {
  const { columns, headers, data, styling } = props;
  //if styling widths is passed in [2, 2, 1, 2]
  let widthCalc = index => 1 / columns;
  if (styling && styling.widths) {
    widthCalc = index => styling.widths[index] / styling.widths.reduce((a, b) => a + b);
  }

  return (
    <Box width={[1, 1, 1]} sx={{ minWidth: 480 }}>
      <Flex flexWrap="wrap">
        {headers.map((item, index) => {
          return (
            <Box key={`header-${index}`} px={2} width={widthCalc(index % columns)}>
              <TextNoMargin fontSize={2} color={"black"}>
                {item}
              </TextNoMargin>
            </Box>
          );
        })}
        <Divider />
        {data.map((item, index) => {
          return (
            <React.Fragment key={`data-${index}`}>
              <Box px={2} width={widthCalc(index % columns)}>
                {item}
              </Box>
              {(index + 1) % columns == 0 ? <Divider /> : <></>}
            </React.Fragment>
          );
        })}
      </Flex>
    </Box>
  );
};
