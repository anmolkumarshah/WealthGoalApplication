import React, { useRef, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PdfFile from "./PdfFile";
import { useSelector } from "react-redux";
import { useNetwordCall } from "../../utils/hooks/useNetwordCall";
import { LoadingSpinner } from "../common/LoadingSpinner";
import Button from "../common/Button";

function File() {
  const pdfRef = useRef();

  const [viewPdf, setViewPdf] = useState(true);

  const store = useSelector((store) => store.auth);
  const userId = store?.user?.id;

  const { data, error, loading } = useNetwordCall(
    "get",
    `customer/generate/${userId}`
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleViewPdf = () => {
    setViewPdf(true);
  };

  return (
    <div className="">
      {!viewPdf && (
        <div className="px-5 py-5 overflow-scroll ">
          <pre className="font-sans">{data}</pre>
          <hr />
          {!viewPdf && (
            <div className="flex justify-start mt-5">
              <Button callBackFunction={handleViewPdf}>Export To PDF</Button>
            </div>
          )}
        </div>
      )}
      {viewPdf && (
        <div className="h-screen">
          <PDFViewer ref={pdfRef} width="100%" height="100%">
            <PdfFile data={data} />
          </PDFViewer>
        </div>
      )}
    </div>
  );

  // return (
  //   <div
  //     style={{
  //       height: "100vh",
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     {/* Button to download PDF */}

  // {!viewPdf && (
  //   <div>
  //     {/* <button onClick={handleDownload}>Download PDF</button> */}
  //     <button onClick={handleViewPdf}>Export to Pdf</button>
  //   </div>
  // )}

  //     {/* PDF Viewer */}
  // {viewPdf && (
  //   <div style={{ height: "100%", width: "100%" }}>
  //     <PDFViewer ref={pdfRef} width="100%" height="100%">
  //       <PdfFile />
  //     </PDFViewer>
  //   </div>
  // )}
  //   </div>
  // );
}

export default File;
