import { API_GET_ALL_PATIENTS } from "@/configs/varibles";
import axios from "axios";

export const getAllPatients = async () => {
  try {
    const res = await axios.get(API_GET_ALL_PATIENTS);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
