import axios from "axios";
import Cookies from 'js-cookie';
import { refreshTokenApi } from "../authApi";

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

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
                    expires: new Date(response.data.accessToken.exp)
                });
                Cookies.set('refreshToken', response.data.refreshToken.token, {
                    expires: new Date(response.data.refreshToken.exp)
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