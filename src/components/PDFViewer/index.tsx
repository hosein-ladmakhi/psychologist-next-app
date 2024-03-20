"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { TPDFViewerFC } from "./index.type";
import { useEffect, useState } from "react";
import { ButtonGroup } from "@mui/material";
import Button from "../Button";
import FlexBox from "../FlexBox";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const PDFViewer: TPDFViewerFC = ({ file }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    return () => {
      setCurrentPage(1);
    };
  }, [file]);

  const handleTotalPages = (document: any) => setTotalPages(document.numPages);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <>
      <Document onLoadSuccess={handleTotalPages} noData options={options} file={file} onLoadError={(e) => console.log("onLoadError", e)}>
        <Page pageNumber={currentPage} />
      </Document>

      <FlexBox my={2}>
        <ButtonGroup>
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            صفحه قبل
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            صفحه بعد
          </Button>
        </ButtonGroup>
      </FlexBox>
    </>
  );
};

export default PDFViewer;
