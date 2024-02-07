import Modal from "@/components/Modal";
import { TAnswerTicketyFormValidation, TViewTicketDialogFC } from "./index.type";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import moment from "moment";
import { APP_DATE_TIME_FORMAT } from "@/constants";
import FlexBox from "@/components/FlexBox";
import { useTransition } from "react";
import { answerTicketAction } from "@/app/(admin)/admin/tickets/actions";
import { errorNotify, successNotify } from "@/utils/notify";
import { getAttachmentsAsZipFile } from "@/services/ticket.service";

const ViewTicketDialog: TViewTicketDialogFC = ({ handleClose, selectedTicket }) => {
  const { control, handleSubmit } = useForm<TAnswerTicketyFormValidation>({ defaultValues: { answer: selectedTicket?.answer || "" } });
  const [loading, handleTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const res = await answerTicketAction(selectedTicket?.id, data);
      if (res) successNotify("Your Answer Saved ...");
      else errorNotify("Something went wrong in saving answer try again");
      handleClose();
    });
  });

  const downloadZipFile = async () => {
    const bufferFile = await getAttachmentsAsZipFile(selectedTicket?.id);
    const buffer = Buffer.from(bufferFile);
    const blob = new Blob([buffer]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "download.zip";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <Modal title="View Tickets" opened handleClose={handleClose} size="xxxl">
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Typography mb={2} variant="body1" component="h1" fontWeight="bold">
            {selectedTicket?.title}
          </Typography>
          <Typography variant="body1" component="q">
            {selectedTicket?.content}
          </Typography>
          <FlexBox my={2} flexDirection="column" alignItems="flex-start">
            <Typography fontWeight="bold" variant="caption" component="span">
              Some Details About This Ticket
            </Typography>
            <Typography variant="caption" component="span">
              Creator : {selectedTicket?.patient?.firstName} {selectedTicket?.patient?.lastName}
            </Typography>
            <Typography variant="caption" component="span">
              Status : {selectedTicket?.status}
            </Typography>
            <Typography variant="caption" component="span">
              Created Date : {moment(selectedTicket?.createdAt).format(APP_DATE_TIME_FORMAT)}
            </Typography>
            {selectedTicket?.closeAt && (
              <Typography variant="caption" component="span">
                Closed Date : {moment(selectedTicket?.closeAt).format(APP_DATE_TIME_FORMAT)}
              </Typography>
            )}
            {selectedTicket?.answerAt && (
              <Typography variant="caption" component="span">
                Answer Date : {moment(selectedTicket?.answerAt).format(APP_DATE_TIME_FORMAT)}
              </Typography>
            )}
            {selectedTicket?.attachments?.length > 0 && (
              <Box mt={2}>
                <Button onClick={downloadZipFile} size="small">
                  Download Attchments
                </Button>
              </Box>
            )}
          </FlexBox>

          {selectedTicket?.childrens?.length > 0 && (
            <>
              <Typography mt={5} mb={2} variant="body1" component="h1" fontWeight="bold">
                Sub Tickets Lists
              </Typography>

              {selectedTicket?.childrens?.map((ticket) => (
                <Box variant="outlined" mb={1} key={ticket.id} component={Card}>
                  <CardContent>
                    <Typography variant="body1" component="p">
                      {ticket.title}
                    </Typography>
                    <Typography variant="caption" component="p">
                      {ticket.content}
                    </Typography>
                  </CardContent>
                </Box>
              ))}
            </>
          )}
        </Grid>
        <Grid item md={4}>
          <form onSubmit={onSubmit}>
            <TextInput control={control} label="Message Or Ticket Answer" name="answer" type="text" rows={15} multiline />
            <Box mt={1}>
              <Button loading={loading} type="submit" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ViewTicketDialog;
