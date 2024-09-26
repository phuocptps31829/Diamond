import { API_GET_ALL_APPOINTMENTS } from "@/configs/varibles";
import axios from "axios";

export const getAllAppointments = async () => {
  try {
    const res = await axios.get(API_GET_ALL_APPOINTMENTS);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
