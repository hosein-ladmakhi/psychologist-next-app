import { MouseEvent } from "react";
import { Card, CardContent, IconButton, Modal as MuiModal, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { TModalFC } from "./index.type";
import { modalWidthSize } from "./index.constant";
import FlexBox from "../FlexBox";

const Modal: TModalFC = ({ children, size = "xs", title, handleClose = () => {}, opened = false }) => {
  const onClose = () => {
    handleClose();
  };
  const onPreventModalClose = (event: MouseEvent) => event.stopPropagation();

  return (
    <MuiModal open={opened} onClose={onClose}>
      <FlexBox flexDirection="column" height="100%" width="100%" onClick={onClose}>
        <Card onClick={onPreventModalClose} style={{ width: modalWidthSize[size] }}>
          <CardContent>
            <FlexBox justifyContent="space-between" mb={3}>
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </FlexBox>
            {children}
          </CardContent>
        </Card>
      </FlexBox>
    </MuiModal>
  );
};

export default Modal;
