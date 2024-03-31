import Modal from "@/components/Modal";
import { TDoneOrderDialogFC } from "./index.type";
import { Box, Chip, Grid, LinearProgress, Typography } from "@mui/material";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import { useRef, useTransition } from "react";
import { errorNotify, successNotify } from "@/core/notification";
import { getDayOfWeekName } from "@/utils/getDate";
import { getOrderStatusEnum, getScheduleTypeEnum } from "@/utils/getEnumTransformer";
import { uploadDocumentationAndDoneOrderAction } from "@/app/(admin)/orders/actions";
import { dateTool } from "@/core/dates";

const DoneOrderDialog: TDoneOrderDialogFC = ({ selectedOrder, onClose }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, handleTransition] = useTransition();

  const handleOpenFileExplorer = () => fileRef?.current?.click();

  const printDetail = (title: string, desc: string | number) => (
    <Typography variant="body1" component="h3">
      {title} : <Box display="inline-block">{desc}</Box>
    </Typography>
  );

  const handleDoneOrder = () => {
    handleTransition(async () => {
      if (!fileRef?.current?.files?.length) {
        errorNotify("برای به اتمام رساندن نوبت رزرو باید یک فایلی در قالب شرح این نوبت آپلود کنید");
        return;
      }
      const formdata = new FormData();
      formdata.append("order", selectedOrder?.id as any);
      Array.from(fileRef?.current?.files!).map((file) => formdata.append("files", file! as any));
      const res = await uploadDocumentationAndDoneOrderAction(selectedOrder?.id, formdata);
      if (res) successNotify("داکیومنت این رزرو با موفقیت ثبت شد و تغییر وضعیت این رزرو با موفقیت ذخیره گردید");
      else errorNotify("تغییر وضعیت رزرو با شکست مواجعه شد دوباره تلاش کنید");
      onClose();
    });
  };

  return (
    <Modal handleClose={onClose} size="md" opened title="به اتمام رساندن رزرو">
      <Typography mb={1} fontWeight="bold" variant="h6" component="h1">
        شما برای تغییر وضعیت این رزرو باید یک شرح یا توضیحاتی در مورد این نوبت رزرو و بیمار آپلود کنید
      </Typography>
      {pending && (
        <Box mb={2}>
          <LinearProgress />
        </Box>
      )}
      {printDetail("تاریخ رزرو", dateTool.formatDate(selectedOrder?.date!))}
      {printDetail("روز رزرو", getDayOfWeekName(selectedOrder?.day!))}
      {printDetail("ساعت شروع", selectedOrder?.startHour)}
      {printDetail("ساعت پایان", selectedOrder?.endHour)}
      {printDetail("بیار", selectedOrder?.patient?.firstName + " " + selectedOrder?.patient?.lastName)}
      {printDetail("پزشک", selectedOrder?.therapist?.firstName + " " + selectedOrder?.therapist?.lastName)}
      {printDetail("شیوه برگزاری", getScheduleTypeEnum(selectedOrder?.type))}
      {printDetail("وضعیت این رزرو.", getOrderStatusEnum(selectedOrder?.status))}
      {printDetail("آدرس برگزاری", `${selectedOrder?.city} - ${selectedOrder?.address}`)}
      {printDetail("اتاق", selectedOrder?.room)}
      <FlexBox justifyContent="flex-start" gap={1}>
        <Typography variant="body1" component="h3">
          زمینه های تخصصی مرتبط :
        </Typography>
        {selectedOrder?.categories?.map((category) => (
          <Chip label={category.faName} key={category.faName} size="small" />
        ))}
      </FlexBox>
      <Grid mt={3} container spacing={2}>
        <Grid item lg={6}>
          <Button onClick={handleOpenFileExplorer} fullWidth>
            آپلود داکیومنت
          </Button>
        </Grid>
        <Grid item lg={6}>
          <Button color="secondary" onClick={handleDoneOrder} fullWidth>
            به اتمام رساندن رزرو
          </Button>
        </Grid>
      </Grid>
      <input type="file" multiple hidden ref={fileRef} accept="application/pdf" />
    </Modal>
  );
};

export default DoneOrderDialog;
