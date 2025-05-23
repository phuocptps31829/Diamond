import axios from "axios";
import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const authApi = {
  getProfileInfo: async () => {
    const res = await axiosInstanceGET.get(`/auth/get-user-by-token`);
    return res.data;
  },
  login: async ({ data, params }) => {
    const res = await axiosInstanceCUD.post(
      `/auth/login`,
      data,
      {
        params: {
          ...params
        }
      }
    );
    return res.data.data;
  },
  googleLogin: async (data) => {
    const res = await axios.get('https://diamond.id.vn/api/v1/auth/google', data);
    return res.data;
  },
  refreshToken: async (refreshToken) => {
    const res = await axiosInstanceCUD.post(`/auth/refresh-token?refreshToken=${refreshToken}`);
    return res.data;
  },
  changePassword: async ({ password, newPassword }) => {
    const res = await axiosInstanceCUD.put('/auth/change-password', {
      password,
      newPassword
    });
    return res.data;
  },
  registerSendOtp: async (data) => {
    const res = await axiosInstanceCUD.post('/auth/register', data);
    return res.data;
  },
  otpUserVerification: async (data) => {
    const res = await axiosInstanceCUD.post('/patients/add', data);
    return res.data;
  },
  sendOtpForgotPassword: async (phone) => {
    const res = await axiosInstanceCUD.post(`${'/auth/forgot-password/send-otp'}/${phone}`);
    return res.data;
  },
  checkOtpForgotPassword: async (data) => {
    const res = await axiosInstanceCUD.post('/auth/forgot-password/check-otp', data);
    return res.data;
  },
  changePasswordForgot: async (data) => {
    const res = await axiosInstanceCUD.put('/auth/forgot-password/reset-password', data);
    return res.data;
  },
};
