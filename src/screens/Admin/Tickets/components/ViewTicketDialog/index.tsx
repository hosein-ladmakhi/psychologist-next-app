import Modal from "@/components/Modal";
import { TAnswerTicketyFormValidation, TViewTicketDialogFC } from "./index.type";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import moment from "moment-jalaali";
import { APP_DATE_TIME_FORMAT } from "@/constants";
import FlexBox from "@/components/FlexBox";
import { useTransition } from "react";
import { errorNotify, successNotify } from "@/utils/notify";
import { getAttachmentsAsZipFile } from "@/services/ticket.service";
import { getTicketStatusEnum } from "@/utils/getEnumTransformer";
import { answerTicketAction } from "@/app/(admin)/tickets/actions";

const ViewTicketDialog: TViewTicketDialogFC = ({ handleClose, selectedTicket }) => {
  const { control, handleSubmit } = useForm<TAnswerTicketyFormValidation>({ defaultValues: { answer: selectedTicket?.answer || "" } });
  const [loading, handleTransition] = useTransition();

  const onSubmit = handleSubmit((data) => {
    handleTransition(async () => {
      const res = await answerTicketAction(selectedTicket?.id, data);
      if (res) successNotify("پاسخ شما با موفقیت ثبت گردید");
      else errorNotify("عملیات ثبت و ارسال پاسخ با شکست مواجعه شد دوباره تلاش کنید");
      handleClose();
    });
  });

  const downloadZipFile = async () => {
    const bufferFile = await getAttachmentsAsZipFile(selectedTicket?.id);
    console.log(123, bufferFile);
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
    <Modal title="نمایش جزئیات تیکت" opened handleClose={handleClose} size="xxxl">
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
              یکسری اطلاعات تکمیلی درمورد این تیکت ساخت شده
            </Typography>
            <Typography variant="caption" component="span">
              سازنده این تیکت : {selectedTicket?.patient?.firstName} {selectedTicket?.patient?.lastName}
            </Typography>
            <Typography variant="caption" component="span">
              وضعیت این تیکت : {getTicketStatusEnum(selectedTicket?.status!)}
            </Typography>
            <Typography variant="caption" component="span">
              تاریخ ثبت تیکت : <Box component="span" display="inline-block" dir="ltr">{moment(selectedTicket?.createdAt).format(APP_DATE_TIME_FORMAT)}</Box>
            </Typography>
            {selectedTicket?.closeAt && (
              <Typography variant="caption" component="span">
                تاریخ بسته شدن تیکت : <Box component="span" display="inline-block" dir="ltr">{moment(selectedTicket?.closeAt).format(APP_DATE_TIME_FORMAT)}</Box>
              </Typography>
            )}
            {selectedTicket?.answerAt && (
              <Typography variant="caption" component="span">
                تاریخ ثبت پاسخ :
                <Box component="span" display="inline-block" dir="ltr"> {moment(selectedTicket?.answerAt).format(APP_DATE_TIME_FORMAT)}</Box>
              </Typography>
            )}
            {selectedTicket?.attachments?.length > 0 && (
              <Box mt={2}>
                <Button onClick={downloadZipFile} size="small">
                  دانلود فایل های پیوست
                </Button>
              </Box>
            )}
          </FlexBox>

          {selectedTicket?.childrens?.length > 0 && (
            <>
              <Typography mt={5} mb={2} variant="body1" component="h1" fontWeight="bold">
                لیست تیکت های زیر مجموعه
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
            <TextInput control={control} label="متن پاسخ مربوط به این تیکت" name="answer" type="text" rows={15} multiline />
            <Box mt={1}>
              <Button loading={loading} type="submit" fullWidth>
                ارسال و ثبت پاسخ
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ViewTicketDialog;
