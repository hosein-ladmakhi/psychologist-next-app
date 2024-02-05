import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { TOrderDocumentationFC } from "./index.type";
import FlexBox from "@/components/FlexBox";
import Button from "@/components/Button";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import ViewDocumentDialog from "../ViewDocumentDialog";

const UploadDocumentDialog = dynamic(() => import("../UploadDocumentDialog"));

const OrderDocumentation: TOrderDocumentationFC = ({ documentation }) => {
  const [uploadDocDialog, setUploadDocDialog] = useState<boolean>(false);
  const handleOpenUploadDocDialog = () => {
    setUploadDocDialog(true);
  };
  const handleCloseUploadDocDialog = () => {
    setUploadDocDialog(false);
  };

  const [selectedDocFile, setSelectedDocFile] = useState<string>();
  const [viewDocDialog, setViewDocDialog] = useState<boolean>(false);
  const handleOpenViewDocDialog = (docFileURL: string) => {
    setViewDocDialog(true);
    setSelectedDocFile(docFileURL);
  };
  const handleCloseViewDocDialog = () => {
    setViewDocDialog(false);
    setSelectedDocFile(undefined);
  };

  return (
    <Box mt={5}>
      {uploadDocDialog && (
        <Suspense fallback={<></>}>
          <UploadDocumentDialog handleClose={handleCloseUploadDocDialog} />
        </Suspense>
      )}
      <FlexBox mb={3} justifyContent="space-between">
        <Typography fontWeight="bold" variant="h6">
          Documentation Of This Therapy
        </Typography>
        <Button onClick={handleOpenUploadDocDialog}>Upload New Document</Button>
      </FlexBox>
      {documentation.length > 0 ? (
        <Grid container columnSpacing={1.5}>
          {documentation.map((document) => (
            <Grid key={document.id} lg={6} item>
              <Box component={Card} mb={2}>
                <CardContent>
                  <Typography variant="body1" component="p">
                    Uploader : {document.order.therapist.firstName} {document.order.therapist.lastName}
                  </Typography>
                  <Typography mb={2} variant="body1" component="p">
                    File Name : {document.file}
                  </Typography>
                  <Button onClick={handleOpenViewDocDialog.bind(null, document.file)} color="secondary" size="small">
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

      {viewDocDialog && selectedDocFile && (
        <Suspense fallback={<></>}>
          <ViewDocumentDialog handleCloseViewDocDialog={handleCloseViewDocDialog} docURL={selectedDocFile} />
        </Suspense>
      )}
    </Box>
  );
};

export default OrderDocumentation;
