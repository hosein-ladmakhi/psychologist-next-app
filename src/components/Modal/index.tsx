import { MouseEvent } from "react";
import { Card, CardContent, IconButton, Modal as MuiModal, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { TModalFC } from "./index.type";
import { modalWidthSize } from "./index.constant";
import { useStoreSelector } from "@/hooks/useStoreSelector";
import { useStoreDispatch } from "@/hooks/useStoreDispatch";
import { closeModal } from "@/store/slices/modalSlices";
import FlexBox from "../FlexBox";

const Modal: TModalFC = ({ subject, children, size = "xs", title, handleClose = () => {} }) => {
  const dispatch = useStoreDispatch();
  const currentModalSubject = useStoreSelector((store) => store.modalReducers.currentSubject);

  const opened = subject === currentModalSubject;
  const onClose = () => {
    dispatch(closeModal());
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
