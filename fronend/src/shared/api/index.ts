import { handleErrorMsg } from "../utils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (r) => r,
  (error) => {
    return Promise.reject(handleErrorMsg(error.response.data));
  },
);

export default axiosInstance;
