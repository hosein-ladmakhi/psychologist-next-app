"use client";

import { Grid } from "@mui/material";
import { TOrderDetailScreenFC } from "./index.type";
import OrderInformationCard from "./components/OrderInformationCard";
import PatientInformationCard from "./components/PatientInformationCard";
import RecentOrdersCard from "./components/RecentOrdersCard";
import OrderDocumentation from "./components/OrderDocumentation";

const OrderDetailScreen: TOrderDetailScreenFC = ({ order, latestPatientOrders }) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <OrderInformationCard order={order} />
        <OrderDocumentation documentation={order.documentation} />
      </Grid>
      <Grid item md={4}>
        <PatientInformationCard patient={order.patient} />
        <RecentOrdersCard latestPatientOrders={latestPatientOrders} />
      </Grid>
    </Grid>
  );
};

export default OrderDetailScreen;
