"use client";

import { Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { TDocumentationDialogFC } from "./index.type";
import Modal from "@/components/Modal";
import { useState } from "react";
import { IDocumentation } from "@/types/documentation.model";
import { API_URL } from "@/constants";
import PDFViewer from "@/components/PDFViewer";

const DocumentationDialog: TDocumentationDialogFC = ({ onClose, selectedOrder }) => {
  const [selectedDocument, setSelectedDocument] = useState<IDocumentation>();
  const handleSelectedDocument = (document: IDocumentation) => setSelectedDocument(document);

  return (
    <Modal handleClose={onClose} size="xxxxl" opened title="Docuemtation Of Order">
      <Grid container spacing={2}>
        <Grid lg={5} item>
          <Typography mb={2} fontWeight="bold" variant="body1" component="h1">
            You Can See All Documentation And Select Them To See
          </Typography>
          <List disablePadding>
            {selectedOrder?.documentation?.map((document, documentIndex) => (
              <ListItem onClick={handleSelectedDocument.bind(null, document)} key={document.id} disablePadding disableGutters>
                <ListItemButton>Document Number {documentIndex + 1}</ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid lg={7} item>
          {selectedDocument?.file && <PDFViewer file={`${API_URL}/upload/${selectedDocument?.file}`} />}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DocumentationDialog;
