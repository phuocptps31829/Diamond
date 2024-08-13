import { API_VERIFY_OTP, API_REGISTER_SEND_OTP } from "@/configs/varibles";

import axios from "axios";

export const otpUserVerification = async (data) => {
  try {
    const res = await axios.post(API_VERIFY_OTP, data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerSendOtp = async (data) => {
  try {
    const res = await axios.post(API_REGISTER_SEND_OTP, data);
    console.log("res.data: ", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
