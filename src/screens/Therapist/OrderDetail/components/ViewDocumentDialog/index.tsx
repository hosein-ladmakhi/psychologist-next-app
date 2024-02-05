import Modal from "@/components/Modal";
import { TViewDocumentDialogFC } from "./index.type";
import PDFViewer from "@/components/PDFViewer";
import { API_URL } from "@/constants";

const ViewDocumentDialog: TViewDocumentDialogFC = ({ docURL, handleCloseViewDocDialog }) => {
  return (
    <Modal handleClose={handleCloseViewDocDialog} size="lg" title="View Documentation As PDF" opened>
      <PDFViewer file={`${API_URL}/upload/${docURL}`} />
    </Modal>
  );
};

export default ViewDocumentDialog;
