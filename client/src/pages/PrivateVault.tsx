import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Pdf } from "../context/PdfContext";

function PrivateVault() {
  const [user, setUser] = useState(null);
  const [userPdfs, setUserPdfs] = useState<Pdf[]>();
  const [searchText, setSearchText] = useState<string>("");

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

  const handleOnClick = () => {
    if (searchText === "") {
      setUserPdfs(userPdfs);
      return;
    }
    const findUsers = userPdfs && userPdfs.filter((pdf) => pdf.title.includes(searchText));
    setUserPdfs(findUsers);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
      <div className="mt-4 mb-8">
          <div className="flex rounded-full border-2 border-blue-600 overflow-hidden max-w-sm mx-auto font-[sans-serif]">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Something..."
              className="w-full outline-none bg-white text-sm px-5 py-3"
              onClick={handleOnClick}
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="18px"
                className="fill-white"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </div>
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
