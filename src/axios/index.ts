import axios, { CreateAxiosDefaults } from "axios";
import { errorCatch, getContentType } from "./axios.helper";
import { getAccessToken, removeFromStorage } from "./services";
import { authService } from "@/services/auth/authService";
import { getServerCookie } from "./services/getServerCokie";
import { parseCookies } from "nookies";

const isServer = () => typeof window === "undefined";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: isServer(),
};

const getCookie = async (name: string) => {
  return isServer() ? await getServerCookie(name) : parseCookies()[name];
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getCookie("accessToken");

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error?.response?.status == 401 ||
        errorCatch(error) == "jwt expired" ||
        errorCatch(error) == "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return axiosInstance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) == "jwt expired") removeFromStorage();
        return Promise.reject(error);
      }
    }

    // ← this was missing — all non-401 errors were silently swallowed
    return Promise.reject(error);
  },
);

export default axiosInstance;
