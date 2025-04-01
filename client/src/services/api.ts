import axios, { AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "@/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("API Error:", errorMessage);
    return Promise.reject(error);
  },
);

export default api;
