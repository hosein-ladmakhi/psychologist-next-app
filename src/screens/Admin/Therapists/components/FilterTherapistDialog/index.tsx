import Modal from '@/components/Modal';
import { FC } from 'react';
import { FILTER_THERAPIST_SUBJECT } from './index.constant';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  IFilterTherapistDialogProps,
  TFilterTherapistFormValidation,
} from './index.type';

const FilterTherapistDialog: FC<IFilterTherapistDialogProps> = ({
  onClose,
  onChangeFilters,
}) => {
  const { register, handleSubmit, reset } =
    useForm<TFilterTherapistFormValidation>();
  const onSubmit = handleSubmit((data) => {
    onClose();
    onChangeFilters(data);
    reset();
  });

  return (
    <Modal size="sm" subject={FILTER_THERAPIST_SUBJECT} title="Filter Tables">
      <form onSubmit={onSubmit}>
        <TextField
          {...register('firstName')}
          fullWidth
          label="First Name"
          margin="dense"
        />
        <TextField
          {...register('lastName')}
          fullWidth
          margin="dense"
          label="Last Name"
        />
        <TextField
          {...register('phone')}
          fullWidth
          margin="dense"
          label="Phone Number"
        />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            Search
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default FilterTherapistDialog;
