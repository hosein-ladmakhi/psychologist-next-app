import { Typography } from "@mui/material";
import { TDeletePatientConfirmationFC } from "./index.type";

const DeletePatientConfirmation: TDeletePatientConfirmationFC = ({ firstName, lastName, phone }) => {
  return (
    <>
      <Typography my={1} variant="body1" component="p">
        نام و نام خانوادگی بیمار : {firstName} {lastName}
      </Typography>
      <Typography my={1} variant="body1" component="p">
        شماره تماس بیمار: {phone}
      </Typography>
    </>
  );
};

export default DeletePatientConfirmation;
