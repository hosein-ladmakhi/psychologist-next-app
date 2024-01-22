import { Box } from "@mui/material";
import { TFlexBoxFC } from "./index.type";

const FlexBox: TFlexBoxFC = ({ justifyContent = "center", alignItems = "center", gap = 0, flexDirection = "row", children, ...props }) => {
  return (
    <Box display="flex" justifyContent={justifyContent} alignItems={alignItems} gap={gap} flexDirection={flexDirection} {...props}>
      {children}
    </Box>
  );
};

export default FlexBox;
