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
    <Modal handleClose={onClose} size="xxxxl" opened title="پرونده سلامت بیمار">
      <Grid container spacing={2}>
        <Grid lg={5} item>
          <Typography mb={2} fontWeight="bold" variant="body1" component="h1">
            شما لیستی از داکیومنت های آپلود شده برای این نوبت رزرو را مشاهده میکنید, برای دیدن فایل داکیومنت کلیک کنید
          </Typography>
          <List disablePadding>
            {selectedOrder?.documentation?.map((document, documentIndex) => (
              <ListItem onClick={handleSelectedDocument.bind(null, document)} key={document.id} disablePadding disableGutters>
                <ListItemButton>داکیومنت شماره {documentIndex + 1}</ListItemButton>
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
