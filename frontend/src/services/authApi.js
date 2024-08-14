import {
  API_GET_PROFILE_PATIENTS,
  API_VERIFY_OTP,
  API_REGISTER_SEND_OTP,
  API_LOGIN,
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
    return res.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};
