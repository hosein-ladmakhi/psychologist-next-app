import Modal from '@/components/Modal';
import { FC } from 'react';
import { VIEW_THERAPIST_SUBJECT } from './index.constant';
import { IViewTherapistDialogProps } from './index.type';
import { Typography } from '@mui/material';

const ViewTherapistDialog: FC<IViewTherapistDialogProps> = ({
  selectedTherapist,
}) => {
  return (
    <Modal subject={VIEW_THERAPIST_SUBJECT} title="View Therapist" size="xl">
      <Typography variant="h6" component="h1">
        {selectedTherapist?.firstName} {selectedTherapist?.lastName}
      </Typography>
    </Modal>
  );
};

export default ViewTherapistDialog;
