import { API_URL_GET_ALL_PACKAGES } from "@/configs/varibles";
import axios from "axios";
export const getAllMedicalPackages = async () => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_PACKAGES}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
