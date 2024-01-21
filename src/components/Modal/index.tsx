import { FC, MouseEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Modal as MuiModal,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { IModalProps } from './index.type';
import { modalWidthSize } from './index.constant';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { useStoreDispatch } from '@/hooks/useStoreDispatch';
import { closeModal } from '@/store/slices/modalSlices';

const Modal: FC<IModalProps> = ({
  subject,
  children,
  size = 'xs',
  title,
  handleClose = () => {},
}) => {
  const dispatch = useStoreDispatch();
  const currentModalSubject = useStoreSelector(
    (store) => store.modalReducers.currentSubject,
  );

  const opened = subject === currentModalSubject;
  const onClose = () => {
    dispatch(closeModal());
    handleClose();
  };
  const onPreventModalClose = (event: MouseEvent) => event.stopPropagation();

  return (
    <MuiModal open={opened} onClose={onClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
        width="100%"
        onClick={onClose}
      >
        <Card
          onClick={onPreventModalClose}
          style={{ width: modalWidthSize[size] }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h6" component="h1">
                {title}
              </Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
            {children}
          </CardContent>
        </Card>
      </Box>
    </MuiModal>
  );
};

export default Modal;
