import Modal from "@/components/Modal";
import { TViewTicketDialogFC } from "./index.type";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { APP_DATE_TIME_FORMAT } from "@/constants";
import Button from "@/components/Button";
import { Chat } from "@mui/icons-material";

const ViewTicketDialog: TViewTicketDialogFC = ({ handleClose, selectedTicket, handleCreate }) => {
  return (
    <Modal title="View Details" handleClose={handleClose} opened size="xxl">
      <Typography fontWeight="bold" variant="h6" component="h1">
        {selectedTicket?.title}
      </Typography>
      <Typography display="inline-block" mt={1} fontStyle="italic" variant="body1" component="q">
        {selectedTicket?.content}
      </Typography>
      <Box mt={2}>
        <Typography variant="body2" component="p">
          Status : {selectedTicket?.status}
        </Typography>
        <Typography variant="body2" component="p">
          Created At : {moment(selectedTicket?.createdAt).format(APP_DATE_TIME_FORMAT)}
        </Typography>
        {selectedTicket?.closedAt && (
          <Typography variant="body2" component="p">
            Closed At : {moment(selectedTicket?.closedAt).format(APP_DATE_TIME_FORMAT)}
          </Typography>
        )}
      </Box>
      {selectedTicket?.childrens?.map((childrenTicket) => (
        <>{childrenTicket.title}</>
      ))}
      <Box mt={3}>
        <Button onClick={handleCreate}>
          <Chat fontSize="small" sx={{ marginRight: "4px" }} />
          Create New Ticket Based On This
        </Button>
      </Box>
    </Modal>
  );
};

export default ViewTicketDialog;
