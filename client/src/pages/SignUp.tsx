import React, { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 font-[sans-serif] h-full md:min-h-screen p-4">
      <div className="grid justify-center max-w-md mx-auto">
        <div>
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full object-cover rounded-2xl"
            alt="login-image"
          />
        </div>

        <form
          onSubmit={registerUser}
          className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-extrabold text-blue-600">Register</h3>
          </div>

          <div className="relative flex items-center">
            <input
              name="username"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              placeholder="Enter username"
            />
            <FontAwesomeIcon
              className="w-[18px] h-[18px] absolute right-2"
              icon={faUser}
            />
          </div>

          <div className="mt-4">
            <div className="relative flex items-center">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter email"
              />
              <FontAwesomeIcon
                className="w-[18px] h-[18px] absolute right-2"
                icon={faEnvelope}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter password"
              />
              <FontAwesomeIcon
                className="w-[18px] h-[18px] absolute right-2"
                icon={faLock}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              onSubmit={registerUser}
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
            <p className="text-sm text-center mt-6">
              Already have an account{" "}
              <Link
                to="/"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Login here
              </Link>
            </p>
          </div>

          <hr className="my-4 border-gray-300" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
