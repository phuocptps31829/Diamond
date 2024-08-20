import {
  API_GET_PROFILE_PATIENTS,
  API_VERIFY_OTP,
  API_REGISTER_SEND_OTP,
  API_LOGIN,
  API_SEND_OTP_FORGOT_PASSWORD,
  API_CHECK_OTP_FORGOT_PASSWORD,
  API_CHANGE_PASSWORD,
  API_LOGOUT,
} from "@/configs/varibles";
import axios from "axios";

export const getProfilePatients = async (accessToken) => {
  try {
    const res = await axios.get(API_GET_PROFILE_PATIENTS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch profile patients:", error);
    throw error;
  }
};

export const otpUserVerification = async (data) => {
  try {
    const res = await axios.post(API_VERIFY_OTP, data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    throw error;
  }
};

export const registerSendOtp = async (data) => {
  try {
    const res = await axios.post(API_REGISTER_SEND_OTP, data);
    return res.data;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(API_LOGIN, data);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};

export const sendOtpForgotPassword = async (phone) => {
  try {
    const res = await axios.post(`${API_SEND_OTP_FORGOT_PASSWORD}/${phone}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error;
  }
};

export const checkOtpForgotPassword = async (data) => {
  try {
    const res = await axios.post(API_CHECK_OTP_FORGOT_PASSWORD, data);
    return res.data.data;
  } catch (error) {
    console.error("Failed to check OTP:", error);
    throw error;
  }
};

export const changePasswordForgot = async (data) => {
  try {
    const res = await axios.put(API_CHANGE_PASSWORD, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
};

export const logoutApi = async (accessToken) => {
  try {
    const res = await axios.post(API_LOGOUT, null, {
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
