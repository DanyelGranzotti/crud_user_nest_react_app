import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshToken } from "../modules/auth/state/authSlice";
import { store } from "../state/store";

/**
 * Configuração do axios com interceptadores para adicionar o token de autenticação e lidar com a atualização do token.
 */
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().rootReducer.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      const result = await store.dispatch(refreshToken());
      const data = unwrapResult(result);
      const newToken = data.token;

      error.config.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
