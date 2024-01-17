import { IPatient } from '@/types/patient.model';
import { Typography } from '@mui/material';
import { FC } from 'react';

const DeletePatientConfirmation: FC<IPatient> = ({
  firstName,
  lastName,
  phone,
}) => {
  return (
    <>
      <Typography my={1} variant="body1" component="p">
        Full Name : {firstName} {lastName}
      </Typography>
      <Typography my={1} variant="body1" component="p">
        Phone Number: {phone}
      </Typography>
    </>
  );
};

export default DeletePatientConfirmation;
