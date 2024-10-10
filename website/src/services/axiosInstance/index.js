import axios from "axios";
import Cookies from 'js-cookie';
import { refreshTokenApi } from "../authApi";

const GET_API_URL = import.meta.env.VITE_GET_API_URL;
const CUD_API_URL = import.meta.env.VITE_CUD_API_URL;

export const axiosInstanceGET = axios.create({
    baseURL: GET_API_URL
});

export const axiosInstanceCUD = axios.create({
    baseURL: CUD_API_URL
});

const interceptors = (axiosInstance) => {
    axiosInstance.interceptors.request.use((config) => {
        console.log('in req', config);
        const accessToken = Cookies.get('accessToken');

        if (accessToken && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    axiosInstance.interceptors.response.use(res => res, async err => {
        const originalRequest = err.config;

        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
            if (err.response && err.response.status === 403) {
                Cookies.remove("refreshToken");
            }

            if (err.response && err.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const response = await refreshTokenApi(refreshToken);

                    Cookies.set('accessToken', response.data.accessToken.token, {
                        expires: new Date(response.data.accessToken.expires * 1000)
                    });
                    Cookies.set('refreshToken', response.data.refreshToken.token, {
                        expires: new Date(response.data.refreshToken.expires * 1000)
                    });

                    originalRequest.headers["Authorization"] = 'Bearer ' + response.data.accessToken.token;

                    return axiosInstance(originalRequest);
                } catch (error) {
                    return Promise.reject(err);
                }
            }
        }

        throw err;
    });
};

interceptors(axiosInstanceGET);
interceptors(axiosInstanceCUD);