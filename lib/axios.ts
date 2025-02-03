import axios from "axios";

import { baseURL } from "@/config";
import { errorEmitter } from "@/utils/eventEmitter";

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use(
  (response) => {
    const data = response?.data;
    const status = response.status;
    const success = data?.success;

    if (status === 401) {
      errorEmitter.emit("error", data);
    }

    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      const pathname = window?.location?.href;
      const data = error?.response?.data;
      const status = error?.response?.status;

      if (status === 401) {
        errorEmitter.emit("error", data);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
