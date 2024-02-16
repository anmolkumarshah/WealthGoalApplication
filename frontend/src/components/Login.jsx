import React, { useState } from "react";
import { AuthAxiosInstance, FetchToken } from "../utils/customAxiosInstance";
import { useDispatch } from "react-redux";
import { addToken, addUser } from "../utils/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let tempResp = "";
  const fetchToken = (responseData) => {
    tempResp = responseData;
    dispatch(addToken(responseData));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    const response = await FetchToken(email, password, fetchToken);

    if (response === true && tempResp !== "") {
      const data = await AuthAxiosInstance(tempResp.jwtToken).get(
        (tempResp.authorities === "ROLE_ADVISOR"
          ? "/advisor/data?email="
          : "/customer/data?email=") + tempResp.username
      );

      // console.log(data);

      if (data.status === 200) {
        dispatch(addUser(data.data));
        toast.success(
          `Welcome Back, ${data.data.name == null
            ? data.data.personalDetail.name
            : data.data.name
          } `,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        navigate(
          tempResp.authorities === "ROLE_ADVISOR"
            ? "/advisor/dashboard"
            : "/user/dashboard"
        );
      } else {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-2 h-screen bg-gray-200">
        <div className="hidden md:block md:w-1/2 lg:w-2/3 xl:w-2/3">
          <img
            src="https://i.pinimg.com/564x/6a/63/71/6a637169809ef1d9820ac1d3ecec93b0.jpg"
            // src={background}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-1 items-center  justify-center w-full p-">
          <form className="bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Login</h1>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="true"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Log in
            </button>
            <div className="flex justify-end py-2 text-gray-500">
              <Link to={"/registration"}>create new account!</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
