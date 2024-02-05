import Button from "@/components/Button";
import FlexBox from "@/components/FlexBox";
import Modal from "@/components/Modal";
import { Check, Close, Cloud, HourglassEmpty } from "@mui/icons-material";
import { Box, Card, CardContent, CircularProgress, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";
import { IDocumentFile, TDocumentFileStatus, TUploadDocumentDialogFC } from "./index.type";
import { uploadOrderDocumenation } from "@/services/documenation.service";
import { useParams } from "next/navigation";
import { revalidateOrderPage } from "@/app/(therapist)/therapist/orders/[id]/actions";

const UploadDocumentDialog: TUploadDocumentDialogFC = ({ handleClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id: orderId } = useParams<{ id: string }>();
  const [selectedFiles, setSelectedFiles] = useState<IDocumentFile[]>([]);
  const [pending, handleTransition] = useTransition();

  useEffect(() => {
    const changeQueueItemStatus = (index: number, status: TDocumentFileStatus) => {
      setSelectedFiles((selectedFilesState) => {
        const state = [...selectedFilesState];
        state[index].status = status;
        return state;
      });
    };

    if (selectedFiles && selectedFiles.length > 0 && !selectedFiles.find((file) => file.status === "inprogress")) {
      const pendingQueueItemIndex = selectedFiles.findIndex((file) => file.status === "pending");
      if (pendingQueueItemIndex > -1) {
        const queueItem = selectedFiles[pendingQueueItemIndex];
        const data = new FormData();
        data.append("files", queueItem.file);
        data.append("order", +orderId as any);
        changeQueueItemStatus(pendingQueueItemIndex, "inprogress");
        uploadOrderDocumenation(data)
          .then(() => {
            changeQueueItemStatus(pendingQueueItemIndex, "done");
          })
          .catch(() => {
            changeQueueItemStatus(pendingQueueItemIndex, "failed");
          });
      }
    }
  }, [selectedFiles, orderId]);

  const handleOpenFileExplorer = () => {
    inputRef?.current?.click();
  };

  const handleSelectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    const arrFiles = Array.from(files);
    setSelectedFiles(arrFiles.map((file) => ({ file, id: Math.floor(Math.random() * 10000000), status: "pending" })));
  };

  const handleCloseDialog = () => {
    handleTransition(() => {
      revalidateOrderPage(+orderId);
      handleClose();
    });
  };

  return (
    <Modal handleClose={handleCloseDialog} title="Upload New Document" opened size="md">
      {selectedFiles.length === 0 && (
        <>
          <FlexBox flexDirection="column" justifyContent="center" alignItems="center">
            <Cloud sx={{ fontSize: "100px" }} />
            <Typography mb={3} mt={1} variant="h6" align="center" component="h1">
              Upload Documents As PDF File And Wait To Upload Completely ...
            </Typography>
            <Button onClick={handleOpenFileExplorer} size="large" fullWidth>
              Open File Dialog
            </Button>
          </FlexBox>
          <input onChange={handleSelectFiles} type="file" multiple hidden accept="application/pdf" ref={inputRef} />
        </>
      )}

      {selectedFiles.map((selectedFile) => (
        <Box key={selectedFile.id} my={2} component={Card} variant="outlined">
          <CardContent>
            <FlexBox justifyContent="flex-start" gap={1}>
              {selectedFile.status === "done" && <Check fontSize="medium" />}
              {selectedFile.status === "failed" && <Close fontSize="medium" />}
              {selectedFile.status === "inprogress" && <CircularProgress size="1rem" />}
              {selectedFile.status === "pending" && <HourglassEmpty fontSize="medium" />}
              <Typography variant="body2" component="h1">
                File : {selectedFile.file.name}
              </Typography>
            </FlexBox>
          </CardContent>
        </Box>
      ))}

      {selectedFiles?.length > 0 && selectedFiles?.every((file) => file.status !== "pending") && (
        <Button loading={pending} loadingSpinnerSize="1.2rem" onClick={handleCloseDialog} fullWidth size="large">
          Okey, Close The Documentation Explorer
        </Button>
      )}
    </Modal>
  );
};

export default UploadDocumentDialog;
