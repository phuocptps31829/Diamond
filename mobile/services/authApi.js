import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const authApi = {
  refreshToken: async (refreshToken) => {
    const res = await axiosInstanceCUD.post(
      `/auth/refresh-token?refreshToken=${refreshToken}`
    );
    return res.data;
  },

  login: async (data) => {
    const res = await axiosInstanceCUD.post(`/auth/login`, data);
    return res.data.data;
  },

  registerSendOtp: async (data) => {
    const res = await axiosInstanceCUD.post('/auth/register', data);
    return res.data;
  },

  otpUserVerification: async (data) => {
    const res = await axiosInstanceCUD.post('/patients/add', data);
    return res.data;
  },
};
