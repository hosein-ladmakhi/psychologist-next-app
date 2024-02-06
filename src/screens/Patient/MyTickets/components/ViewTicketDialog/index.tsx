import Modal from "@/components/Modal";
import { TViewTicketDialogFC } from "./index.type";
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, colors } from "@mui/material";
import moment from "moment";
import { APP_DATE_TIME_FORMAT } from "@/constants";
import Button from "@/components/Button";
import { Chat, Delete, Person } from "@mui/icons-material";
import FlexBox from "@/components/FlexBox";
import { ITicket } from "@/types/ticket.model";

const ViewTicketDialog: TViewTicketDialogFC = ({ handleClose, selectedTicket, handleCreate, handleDelete }) => {
  const handleChildrenTicketClick = (ticket: ITicket) => {
    if (ticket?.patient?.id === selectedTicket?.patient?.id) {
      handleDelete(ticket);
      handleClose();
    }
  };

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
      {selectedTicket?.childrens?.length === 0 ? (
        <Box mt={2}>
          <Typography fontWeight="bold" variant="body1" component="h1">
            No Related Tickets Exists
          </Typography>
        </Box>
      ) : (
        <Box mt={5}>
          <Typography variant="h6" component="h1">
            Related Tickets
          </Typography>
          <List>
            {selectedTicket?.childrens?.map((childrenTicket) => (
              <ListItem sx={{ background: colors.grey[800], borderRadius: "4px", marginBlock: "6px" }} key={childrenTicket.id}>
                <FlexBox justifyContent="flex-start" gap={1}>
                  <IconButton onClick={handleChildrenTicketClick.bind(null, childrenTicket)} size="small">
                    {childrenTicket?.patient?.id !== selectedTicket?.patient?.id ? <Person /> : <Delete />}
                  </IconButton>
                  <ListItemText secondary={childrenTicket.title} />
                </FlexBox>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
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
