import { API_URL_GET_ALL_SPECIALTIES } from "@/configs/varibles";
import axios from "axios";

export const getAllSpecialties = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_SPECIALTIES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
