import { API_URL_GET_PATIENTS_BY_ID } from "@/configs/varibles";
import axios from "axios";

export const getPatientsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_PATIENTS_BY_ID}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
