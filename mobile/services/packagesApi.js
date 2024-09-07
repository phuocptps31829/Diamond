import { API_URL_GET_ALL_MEDICAL_PACKAGES } from "../configs/varibles";
import axios from "axios";

export const getAllPackages = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_MEDICAL_PACKAGES);

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
