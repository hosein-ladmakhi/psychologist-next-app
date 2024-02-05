"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { TOrderInformationCardFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import { getDate } from "@/utils/getDate";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import { EOrderStatus } from "@/types/order.model";
import { useTransition } from "react";
import { doneOrderStatusAction } from "@/app/(therapist)/therapist/orders/[id]/actions";
import { errorNotify, successNotify } from "@/utils/notify";

const OrderInformationCard: TOrderInformationCardFC = ({ order }) => {
  const [loading, handleTransition] = useTransition();
  const handleChangeOrderStatus = () => {
    handleTransition(async () => {
      const res = await doneOrderStatusAction(order.id);
      if (res) successNotify("Order done successfully ...");
      else errorNotify("Order Unable Change to success");
    });
  };

  return (
    <Box component={Card} mb={2}>
      <CardContent>
        <FlexBox justifyContent="space-between">
          <Typography fontWeight="bold" mb={3} variant="h5" component="h1">
            The Order Information
          </Typography>
          {order.status === EOrderStatus.Pending && (
            <Button loadingSpinnerSize="1rem" loading={loading} onClick={handleChangeOrderStatus} size="small">
              Finish This Order
            </Button>
          )}
        </FlexBox>
        <Typography mb={2} variant="h5" component="h1">
          Day : {getDate(order.day)}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Date : {moment(order.date).format(APP_DATE_FORMAT)}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Time : {order.startHour}_{order.endHour}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Therapist : {order.therapist.firstName} {order.therapist.lastName}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Status : {order.status}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Address : {order.city} {order.address}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Room Number : {order.room}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Therapy Type : {order.type}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Categories : {order.categories.map(({ enName }) => enName).join(" , ")}
        </Typography>
        <Typography mb={2} variant="h5" component="h1">
          Number Of Uploaded Document : {order.documentation.length}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default OrderInformationCard;
