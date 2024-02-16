import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const FetchToken = async (email, password, fetchToken) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
      Accept: "application/json",
    },
  });

  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    if (response.status === 200) {
      fetchToken(response.data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    toast.error(`${error.response.data}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return false;
  }
};

export const AuthAxiosInstance = (token) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
    headers: {
      Accept: "application/json",
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log("Error in request interceptor", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle successful responses here
      return response;
    },
    (error) => {
      console.log("Error in response interceptor", error);

      if (error.response) {
        toast.error(`${error.response.status} : ${error.response.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.request) {
        console.log("Request data:", error.request);
      } else {
        console.log("Error message:", error.message);
      }

      toast.error(`${error.response.status} : ${error.response.data}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.href = "/login";
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
