import { API_URL_GET_ALL_APPOINTMENTS } from "@/configs/varibles";
import axios from "axios";
export const getAllAppointments = async ({ page, limit }) => {
  try {
    const res = await axios.get(API_URL_GET_ALL_APPOINTMENTS, {
      params: {
        page,
        limit,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
