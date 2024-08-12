import React from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTag } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-gray-100 font-[sans-serif] h-full md:min-h-screen p-4">
        <div className="grid justify-center max-w-md mx-auto">
          <div>
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full object-cover rounded-2xl"
              alt="login-image"
            />
          </div>

          <form className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-blue-600 text-center">
                Upload File
              </h3>
            </div>

            <div className="relative flex items-center">
              <input
                name="title"
                type="text"
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
      </div>
      <Footer />
    </>
  );
}

export default Home;
