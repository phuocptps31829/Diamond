import {
  API_CREATE_APPOINTMENT_MOMO,
  API_CREATE_APPOINTMENT_VNPAY,
} from "@/configs/varibles";
import axios from "axios";

export const createAppointment = async (data, provider) => {
  console.log(data);
  let endpoint = null;
  switch (provider) {
    case 'vnpay':
      endpoint = API_CREATE_APPOINTMENT_VNPAY;
      break;
    case 'momo':
      endpoint = API_CREATE_APPOINTMENT_MOMO;
      break;
    default:
      break;
  }

  console.log(endpoint);

  try {
    const res = await axios.post(endpoint, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};