import {
  API_GET_PROFILE_PATIENTS,
  API_VERIFY_OTP,
  API_REGISTER_SEND_OTP,
  API_LOGIN,
  API_SEND_OTP_FORGOT_PASSWORD,
  API_CHECK_OTP_FORGOT_PASSWORD,
  API_CHANGE_PASSWORD,
  API_LOGOUT,
  API_REFRESH_TOKEN,
} from "@/configs/varibles";
import { axiosInstance } from "./axiosInstance";


export const getProfilePatients = async () => {
  try {
    const res = await axiosInstance.get(API_GET_PROFILE_PATIENTS);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch profile patients:", error);
    throw error;
  }
};

export const otpUserVerification = async (data) => {
  try {
    const res = await axiosInstance.post(API_VERIFY_OTP, data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    throw error;
  }
};

export const registerSendOtp = async (data) => {
  try {
    const res = await axiosInstance.post(API_REGISTER_SEND_OTP, data);
    return res.data;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const res = await axiosInstance.post(API_LOGIN, data);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

export const sendOtpForgotPassword = async (phone) => {
  try {
    const res = await axiosInstance.post(`${API_SEND_OTP_FORGOT_PASSWORD}/${phone}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};

export const checkOtpForgotPassword = async (data) => {
  try {
    const res = await axiosInstance.post(API_CHECK_OTP_FORGOT_PASSWORD, data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to check OTP:", error);
    throw error;
  }
};

export const changePasswordForgot = async (data) => {
  try {
    const res = await axiosInstance.put(API_CHANGE_PASSWORD, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
};

export const logoutApi = async (accessToken) => {
  try {
    const res = await axiosInstance.post(API_LOGOUT, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};

export const refreshTokenApi = async (refreshToken) => {
  try {
    const res = await axiosInstance.post(API_REFRESH_TOKEN, {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
