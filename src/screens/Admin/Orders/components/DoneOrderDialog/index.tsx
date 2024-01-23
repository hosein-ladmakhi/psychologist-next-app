import Modal from "@/components/Modal";
import { TDoneOrderDialogFC } from "./index.type";
import { DONE_ORDER_DIALOG_SUBJECT } from "./index.constant";
import { Box, Chip, Grid, LinearProgress, Typography } from "@mui/material";
import { format } from "date-fns";
import { DATES } from "@/constants";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import { useRef, useTransition } from "react";
import { uploadDocumentationAndDoneOrderAction } from "@/app/(admin)/admin/orders/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const DoneOrderDialog: TDoneOrderDialogFC = ({ selectedOrder, onClose }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, handleTransition] = useTransition();

  const handleOpenFileExplorer = () => fileRef?.current?.click();

  const printDetail = (title: string, desc: string | number) => (
    <Typography variant="body1" component="h3">
      {title} : {desc}
    </Typography>
  );

  const handleDoneOrder = () => {
    handleTransition(async () => {
      if (!fileRef?.current?.files?.length) {
        errorNotify("You Must Select At Least One Document");
        return;
      }
      const formdata = new FormData();
      formdata.append("order", selectedOrder?.id as any);
      new Array(fileRef?.current?.files!).map((file) => formdata.append("files", file! as any));
      const res = await uploadDocumentationAndDoneOrderAction(selectedOrder?.id, formdata);
      if (res) successNotify("Your Order Done And Your Documentation Uploaded ...");
      else errorNotify("Something Went Wrong ...");
      onClose();
    });
  };

  return (
    <Modal handleClose={onClose} size="md" subject={DONE_ORDER_DIALOG_SUBJECT} title="Done Order">
      <Typography mb={1} fontWeight="bold" variant="h6" component="h1">
        You Must Upload Documentation File For Confirm Done Process Of This Session
      </Typography>
      {pending && (
        <Box mb={2}>
          <LinearProgress />
        </Box>
      )}
      {printDetail("Date", format(selectedOrder?.date!, "yyyy-MM-dd"))}
      {printDetail("Day", (DATES as any)[selectedOrder?.day!])}
      {printDetail("Start", selectedOrder?.startHour)}
      {printDetail("End", selectedOrder?.endHour)}
      {printDetail("Patient", selectedOrder?.patient?.firstName + " " + selectedOrder?.patient?.lastName)}
      {printDetail("Therapist", selectedOrder?.therapist?.firstName + " " + selectedOrder?.therapist?.lastName)}
      {printDetail("Type", selectedOrder?.type)}
      {printDetail("Status", selectedOrder?.status)}
      {printDetail("Location", `${selectedOrder?.city} - ${selectedOrder?.address}`)}
      {printDetail("Room", selectedOrder?.room)}
      <FlexBox justifyContent="flex-start" gap={1}>
        <Typography variant="body1" component="h3">
          Categories :
        </Typography>
        {selectedOrder?.categories?.map((category) => (
          <Chip label={category.enName} key={category.enName} size="small" />
        ))}
      </FlexBox>
      <Grid mt={3} container spacing={2}>
        <Grid item lg={6}>
          <Button onClick={handleOpenFileExplorer} fullWidth>
            Select Documents
          </Button>
        </Grid>
        <Grid item lg={6}>
          <Button color="secondary" onClick={handleDoneOrder} fullWidth>
            Done This Order
          </Button>
        </Grid>
      </Grid>
      <input type="file" multiple hidden ref={fileRef} />
    </Modal>
  );
};

export default DoneOrderDialog;
