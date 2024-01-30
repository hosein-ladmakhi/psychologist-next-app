"use client";

import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { TOrderDetailScreenFC } from "./index.type";
import { Person, Phone } from "@mui/icons-material";
import FlexBox from "@/components/FlexBox";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";
import Link from "next/link";
import { getDate } from "@/utils/getDate";

const OrderDetailScreen: TOrderDetailScreenFC = ({ order, latestPatientOrders }) => {
  console.log(order);
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <Box component={Card} mb={2}>
          <CardContent>
            <FlexBox justifyContent="space-between">
              <Typography fontWeight="bold" mb={3} variant="h5" component="h1">
                The Order Information
              </Typography>
              <Button size="small">Finish This Order</Button>
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
        <Box mt={5}>
          <FlexBox mb={3} justifyContent="space-between">
            <Typography fontWeight="bold" variant="h6">
              Documentation Of This Therapy
            </Typography>
            <Button>Upload New Document</Button>
          </FlexBox>
          {order.documentation.length > 0 ? (
            <Grid container columnSpacing={1.5}>
              {order.documentation.map((document) => (
                <Grid key={document.id} lg={6} item>
                  <Box component={Card} mb={2}>
                    <CardContent>
                      <Typography variant="body1" component="p">
                        Uploader : {document.order.therapist.firstName} {document.order.therapist.lastName}
                      </Typography>
                      <Typography mb={2} variant="body1" component="p">
                        File Name : {document.file}
                      </Typography>
                      <Button color="secondary" size="small">
                        View The Document
                      </Button>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" component="p">
              No Documentation Uploaded Yet
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box mb={2} component={Card}>
          <CardContent>
            <Typography mb={2} fontWeight="bold" variant="h5" component="h1">
              Patient Information Detail
            </Typography>
            <FlexBox my={1} justifyContent="flex-start" gap={0.6}>
              <Person />
              <Typography variant="body1" component="h1">
                {order?.patient?.firstName} {order?.patient?.lastName}
              </Typography>
            </FlexBox>
            <FlexBox my={1} justifyContent="flex-start" gap={0.6}>
              <Phone />
              <Typography variant="body1" component="h1">
                {order.patient?.phone}
              </Typography>
            </FlexBox>
          </CardContent>
        </Box>
        <Box mb={2} component={Card}>
          <CardContent>
            <Typography mb={2} fontWeight="bold" variant="h5" component="h1">
              The Latest Therapy Session
            </Typography>
            {latestPatientOrders?.length === 0 && (
              <Typography variant="body1" component="p">
                No Therapy Session Exist
              </Typography>
            )}
            <List disablePadding>
              {latestPatientOrders?.map((order) => (
                <ListItem key={order.id} disablePadding disableGutters>
                  <ListItemButton LinkComponent={Link} href={`/therapist/orders/${order.id}`}>
                    <FlexBox alignItems="flex-start" flexDirection="column">
                      <Typography variant="body1" component="p">
                        Date : {moment(order.date).format(APP_DATE_FORMAT)}
                      </Typography>
                      <Typography variant="body1" component="p">
                        Time : {order.startHour}_{order.endHour}
                      </Typography>
                      <Typography variant="body1" component="p">
                        Therapist : {order.therapist.firstName} {order.therapist.lastName}
                      </Typography>
                      <Typography variant="body1" component="p">
                        Categories : {order.categories.map(({ enName }) => enName).join(" , ")}
                      </Typography>
                    </FlexBox>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderDetailScreen;
