import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../authApi";
import axios from "axios";

const BACKEND_SECRET = process.env.EXPO_PUBLIC_BACKEND_SECRET;
const GET_API_URL = process.env.EXPO_PUBLIC_GET_API_URL;
const CUD_API_URL = process.env.EXPO_PUBLIC_CUD_API_URL;

export const axiosInstanceGET = axios.create({
  baseURL: GET_API_URL,
});

export const axiosInstanceCUD = axios.create({
  baseURL: CUD_API_URL,
  headers: {
    secret: BACKEND_SECRET,
  },
});

const interceptors = (axiosInstance) => {
  let isRefreshing = false;
  let refreshSubscribers = [];

  function onRefreshed(token) {
    refreshSubscribers.map((callback) => callback(token));
  }

  function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
  }

  axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (refreshToken) {
        if (    
          err.response &&
          err.response.status === 401 &&
          !originalRequest._retry
        ) {
          if (isRefreshing) {
            return new Promise((resolve) => {
              addRefreshSubscriber((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const response = await authApi.refreshToken(refreshToken);
            const newAccessToken = response.data.accessToken.token;
            const newRefreshToken = response.data.refreshToken.token;

            await AsyncStorage.setItem("accessToken", newAccessToken);
            await AsyncStorage.setItem("refreshToken", newRefreshToken);


            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            isRefreshing = false;
            onRefreshed(newAccessToken);
            refreshSubscribers = [];

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            refreshSubscribers = [];
            return Promise.reject(refreshError);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

interceptors(axiosInstanceGET);
interceptors(axiosInstanceCUD);
