import React from "react";

interface PdfViewerProps {
    pdfArrayBuffer: ArrayBuffer;
  }

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfArrayBuffer }) => {
  const renderPdf = () => {
    const pdfData = new Blob([new Uint8Array(pdfArrayBuffer)], {
      type: "application/pdf",
    });
    const pdfUrl = URL.createObjectURL(pdfData);

    return (
      <iframe
        id="pdfFrame"
        title="PDF Viewer"
        src={pdfUrl}
        className="w-full lg:w-2/3 h-96 lg:h-500"
      />
    );
  };

  return renderPdf();
};

export default PdfViewer;
