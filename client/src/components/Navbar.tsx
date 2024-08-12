import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faBars,
  faCross,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState<string | null>(null);

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    let token = localStorage.getItem("token") || "";
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const userName = JSON.parse(window.atob(base64)).name;
    setUser(userName);
  }, [])

  return (
    <header className="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
        <NavLink to="/home">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faFilePdf}
              className="width-[18px] height[18px]"
            />
            <span className="text-xl font-bold">Doc Hub</span>
          </div>
        </NavLink>

        <div
          id="collapseMenu"
          className="lg:ml-10 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <FontAwesomeIcon icon={faCross} className="w-[18px] h-[18px]" />
          </button>

          <ul className="lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <NavLink to="/home">
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    className="width-[18px] height[18px]"
                  />
                  <span className="text-xl font-bold">Doc Hub</span>
                </div>
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <NavLink
                to="/home"
                className='aria-[current=page]:text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold'
              >
                Upload File
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <NavLink
                to="/public"
                className="text-[#333] aria-[current=page]:text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold"
              >
                Public Vault
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <NavLink
                to="/private"
                className="text-[#333] aria-[current=page]:text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold"
              >
                Private Vault
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex gap-x-6 gap-y-4 ml-auto">
          <div className="flex border-2 focus-within:border-gray-400 rounded-full px-4 py-2 overflow-hidden max-lg:hidden">
            <span className="font-semibold">Welcome, {user}!</span>
          </div>

          <div className="flex items-center space-x-8">
            <button onClick={logoutUser} className="px-5 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]">
              Log Out
            </button>

            <button id="toggleOpen" className="lg:hidden">
              <FontAwesomeIcon icon={faBars} className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
