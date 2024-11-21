import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const authApi = {
  getProfileInfo: async () => {
    const res = await axiosInstanceGET.get(`/auth/get-user-by-token`);
    return res.data;
  },
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

  sendOtpForgotPassword: async (phone) => {
    const res = await axiosInstanceCUD.post(`${'/auth/forgot-password/send-otp'}/${phone}`);
    return res.data;
  },

  otpUserVerification: async (data) => {
    const res = await axiosInstanceCUD.post('/patients/add', data);
    return res.data;
  },

  checkOtpForgotPassword: async (data) => {
    const res = await axiosInstanceCUD.post('/auth/forgot-password/check-otp', data);
    return res.data;
  },

  changePasswordForgot: async (data) => {
    const res = await axiosInstanceCUD.put('/auth/forgot-password/reset-password', data);
    return res.data;
  }
};
