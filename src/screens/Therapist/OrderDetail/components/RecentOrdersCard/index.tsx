import { Box, Card, CardContent, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { TRecentOrdersCardFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import Link from "next/link";
import moment from "moment";
import { APP_DATE_FORMAT } from "@/constants";

const RecentOrdersCard: TRecentOrdersCardFC = ({ latestPatientOrders }) => {
  return (
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
  );
};

export default RecentOrdersCard;
