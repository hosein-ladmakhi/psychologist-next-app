import Modal from '@/components/Modal';
import { FC } from 'react';
import { FILTER_PATIENT_SUBJECT } from './index.constant';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  IFilterPatientDialogProps,
  TFilterPatientFormValidation,
} from './index.type';

const FilterPatientDialog: FC<IFilterPatientDialogProps> = ({
  onClose,
  onChangeFilters,
}) => {
  const { register, handleSubmit } = useForm<TFilterPatientFormValidation>();
  const onSubmit = handleSubmit((data) => {
    onClose();
    onChangeFilters(data);
  });

  return (
    <Modal size="sm" subject={FILTER_PATIENT_SUBJECT} title="Filter Tables">
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

export default FilterPatientDialog;
