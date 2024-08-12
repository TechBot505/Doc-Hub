import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTag } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import PdfViewer from "../components/PdfViewer";
import { usePdfContext } from "../context/PdfContext";
import axios from "axios";

const Home: React.FC = () => {
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer | null>(null);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File>();
  const { allPdfs, setAllPdfs } = usePdfContext();
  const [privateFile, setPrivateFile] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    let token = localStorage.getItem("token") || "";
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const userName = JSON.parse(window.atob(base64)).name;
    console.log(userName);
    setUser(userName);
    getAllPdf();
  }, []);

  const getAllPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files");
      console.log(result.data.data);
      setAllPdfs(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files: ", error);
    }
  };

  async function onSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file as Blob);
    formData.append("private", String(privateFile));
    formData.append("name", String(user));

    console.log(formData);

    try {
      const result = await axios.post("http://localhost:5000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        setTitle("");
        getAllPdf();
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading the file:", error);
      alert("An error occurred while uploading the file.");
    }
  }

  const handleFileChange = async (e: ChangeEvent) => {
    const { files} = e.target as HTMLInputElement;
    const selectedFiles = files as FileList;
    const file = selectedFiles[0];
    setFile(file);
    if (file) {
      const arrayBuffer = await readAsyncFile(file);
      setPdfArrayBuffer(arrayBuffer);
    }
  };

  const readAsyncFile = (file: any): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        if(reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <>
      <Navbar />
      <div className="flex gap-10 justify-center items-center bg-gray-100 font-[sans-serif] min-h-screen h-full p-4">
        <div className="grid justify-center max-w-md mx-auto">
          <div>
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full object-cover rounded-2xl"
              alt="login-image"
            />
          </div>

          <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-blue-600 text-center">
                Upload File
              </h3>
            </div>

            <div className="relative flex items-center">
              <input
                name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter Title"
              />
              <FontAwesomeIcon
                className="w-[18px] h-[18px] absolute right-2"
                icon={faTag}
              />
            </div>

            <div className="mt-4">
              <div className="relative flex items-center">
                <input
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                />
                <FontAwesomeIcon
                  className="w-[18px] h-[18px] absolute right-2"
                  icon={faFilePdf}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="relative flex items-center">
                <input
                  id="private"
                  name="private"
                  type="checkbox"
                  onChange={(e) => setPrivateFile(e.target.checked)}
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-gray-800 ml-3 block text-sm">
                  Private
                </label>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Upload
              </button>
            </div>

            <hr className="my-4 border-gray-300" />
          </form>
        </div>
        <div className="w-1/2 grid">
          {pdfArrayBuffer && <PdfViewer pdfArrayBuffer={pdfArrayBuffer} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
