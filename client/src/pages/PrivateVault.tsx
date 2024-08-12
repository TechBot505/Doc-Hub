import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Pdf } from "../context/PdfContext";

function PrivateVault() {
  const [user, setUser] = useState(null);
  const [userPdfs, setUserPdfs] = useState<Pdf[]>();

  const getPdfName = (pdf: string) => {
    const match = pdf.match(/^\d+/);
    if (match) {
      pdf = pdf.slice(match[0].length);
    }
    return pdf;
  }

  const showPdf = (pdf: string) => {
    getPdfName(pdf);
    window.open(`http://localhost:5000/assets/${pdf}`, "_blank", "noreferrer");
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const userName = JSON.parse(window.atob(base64)).name;
    console.log(userName);
    setUser(userName);
    getUserPdf(userName);
  }, []);

  const getUserPdf = async (user: string) => {
    try {
      const result = await axios.get(
        "http://localhost:5000/get-files-by-name/" + user
      );
      console.log(result.data.data);
      setUserPdfs(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 mx-4 my-4 gap-4">
          {userPdfs &&
            userPdfs.map((data, index) => (
              <div
                key={index}
                className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <h6 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.title}
                </h6>
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

export default PrivateVault;
