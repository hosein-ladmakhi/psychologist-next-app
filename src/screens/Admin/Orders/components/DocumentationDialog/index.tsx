import { Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { DOCUMENTATION_DIALOG_SUBJECT } from "./index.constant";
import { TDocumentationDialogFC } from "./index.type";
import Modal from "@/components/Modal";

const DocumentationDialog: TDocumentationDialogFC = ({ onClose, selectedOrder }) => {
  console.log(selectedOrder);
  return (
    <Modal size="xxxl" subject={DOCUMENTATION_DIALOG_SUBJECT} title="Docuemtation Of Order">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography mb={2} fontWeight="bold" variant="body1" component="h1">
            You Can See All Documentation And Select Them To See
          </Typography>
          <List disablePadding>
            {selectedOrder?.documentation?.map((document, documentIndex) => (
              <ListItem key={document.id} disablePadding disableGutters>
                <ListItemButton>Document Number {documentIndex + 1}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </Modal>
  );
};

export default DocumentationDialog;
