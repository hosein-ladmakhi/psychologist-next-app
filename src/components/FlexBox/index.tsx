import { Box, BoxProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export interface IFlexBoxProps extends BoxProps, PropsWithChildren {}

export type TFlexBoxFC = FC<IFlexBoxProps>;

const FlexBox: TFlexBoxFC = ({ justifyContent = "center", alignItems = "center", gap = 0, flexDirection = "row", children, ...props }) => {
  return (
    <Box display="flex" justifyContent={justifyContent} alignItems={alignItems} gap={gap} flexDirection={flexDirection} {...props}>
      {children}
    </Box>
  );
};

export default FlexBox;
