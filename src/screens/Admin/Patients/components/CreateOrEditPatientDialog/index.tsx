import { FC, useEffect, useTransition } from 'react';
import {
  ICreateOrEditPatientDialogProps,
  TCreateOrEditPatientFormValidation,
} from './index.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createNewPatientAction,
  editPatientAction,
} from '@/app/(admin)/admin/patients/actions';
import toast from 'react-hot-toast';
import Modal from '@/components/Modal';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import {
  UPSERT_PATIENT_SUBJECT,
  createOrEditPatientFormValidation,
} from './index.constant';

const CreateOrEditPatientDialog: FC<ICreateOrEditPatientDialogProps> = ({
  onClose,
  selectedPatient,
}) => {
  const [pending, handleTransition] = useTransition();
  const { register, handleSubmit, formState, setValue } =
    useForm<TCreateOrEditPatientFormValidation>({
      resolver: zodResolver(createOrEditPatientFormValidation),
      defaultValues: {
        firstName: '',
        lastName: '',
        phone: '',
      },
      criteriaMode: 'all',
      mode: 'all',
      reValidateMode: 'onBlur',
    });

  useEffect(() => {
    if (selectedPatient) {
      setValue('firstName', selectedPatient?.firstName);
      setValue('lastName', selectedPatient?.lastName);
      setValue('phone', selectedPatient?.phone);
    }

    return () => {
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('phone', '');
    };
  }, [selectedPatient]);

  const onCreatePatient = (data: TCreateOrEditPatientFormValidation) => {
    createNewPatientAction(data).then((res) => {
      if (res) {
        toast.success('New Patient Created Successfully ...');
        onClose();
      } else {
        toast.error('Creating New Patient Process has Failed ...');
      }
    });
  };

  const onEditPatient = (data: TCreateOrEditPatientFormValidation) => {
    editPatientAction(selectedPatient?.id!, data).then((res) => {
      if (res) {
        toast.success('Edit Patient Finished Successfully ...');
        onClose();
      } else {
        toast.error('Edit Patient Process has Failed ...');
      }
    });
  };

  const onCreateOrEditPatient = handleSubmit((data) => {
    handleTransition(() => {
      if (selectedPatient) onEditPatient(data);
      else onCreatePatient(data);
    });
  });

  const getFormError = (name: keyof TCreateOrEditPatientFormValidation) =>
    formState.errors?.[name]?.message;

  const modalTitle = selectedPatient ? 'Edit Patient' : 'Create New Patient';

  return (
    <Modal title={modalTitle} size="lg" subject={UPSERT_PATIENT_SUBJECT}>
      <form onSubmit={onCreateOrEditPatient}>
        <TextField
          {...register('firstName')}
          fullWidth
          label="First Name"
          placeholder="Enter Your First Name"
          error={!!getFormError('firstName')}
          helperText={getFormError('firstName')}
          margin="dense"
        />
        <TextField
          {...register('lastName')}
          fullWidth
          margin="dense"
          label="Last Name"
          placeholder="Enter Your Last Name"
          error={!!getFormError('lastName')}
          helperText={getFormError('lastName')}
        />
        <TextField
          {...register('phone')}
          fullWidth
          margin="dense"
          label="Phone Number"
          placeholder="Enter Your Phone Number"
          error={!!getFormError('phone')}
          helperText={getFormError('phone')}
        />
        <Box mt={4}>
          <Button type="submit" size="large" fullWidth>
            {pending ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateOrEditPatientDialog;
