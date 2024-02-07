"use client";

import { Typography } from "@mui/material";
import { TSummaryTextFC } from "./index.type";

const defaultStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
};

const SummaryText: TSummaryTextFC = ({ children, lineClamp }) => {
  const mainStyle = { ...defaultStyle, lineClamp, WebkitLineClamp: lineClamp };
  return (
    <Typography variant="body2" component="p" sx={mainStyle}>
      {children}
    </Typography>
  );
};

export default SummaryText;
