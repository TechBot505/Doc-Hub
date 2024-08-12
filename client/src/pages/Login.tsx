import React, { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      navigate("/home");
    } else {
      alert("Please check your username and password");
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
          onSubmit={loginUser}
          className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-extrabold text-blue-600">Login</h3>
          </div>

          <div className="relative flex items-center">
            <input
              name="email"
              value={email}
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              placeholder="Enter email"
            />
            <FontAwesomeIcon
              className="w-[18px] h-[18px] absolute right-2"
              icon={faEnvelope}
            />
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
              onSubmit={loginUser}
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign in
            </button>
            <p className="text-sm text-center mt-6">
              Don't have an account{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Register here
              </Link>
            </p>
          </div>

          <hr className="my-4 border-gray-300" />
        </form>
      </div>
    </div>
  );
};

export default Login;
