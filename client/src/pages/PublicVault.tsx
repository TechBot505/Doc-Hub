import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { usePdfContext } from "../context/PdfContext";

function PublicVault() {
  const { allPdfs, setAllPdfs } = usePdfContext();

  const getPdfName = (pdf: string) => {
    const match = pdf.match(/^\d+/);
    if (match) {
      pdf = pdf.slice(match[0].length);
    }
    return pdf;
  }

  const showPdf = (pdf: any) => {
    getPdfName(pdf);
    window.open(`http://localhost:5000/assets/${pdf}`, "_blank", "noreferrer");
  };

  useEffect(() => {
    const getAllPdf = async () => {
      try {
        const result = await axios.get("http://localhost:5000/get-files");
        console.log(result.data.data);
        setAllPdfs(result.data.data);
      } catch (error) {
        console.error("Error fetching PDF files:", error);
      }
    };
    getAllPdf();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 mx-4 my-4 gap-4">
          {allPdfs &&
            allPdfs.map((data, index) => (
              <div
                key={index}
                className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <h6 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.title}
                </h6>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                  Owner: {data.name}
                </p>
                <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                  {getPdfName(data.pdf)}
                </p>
                <button
                  onClick={() => showPdf(data.pdf)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Show Pdf
                </button>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PublicVault;
