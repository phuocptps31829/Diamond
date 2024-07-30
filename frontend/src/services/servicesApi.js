import { API_URL_GET_ALL_SERVICES } from "@/configs/varibles";
import axios from "axios";
export const getAllServices = async () => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_SERVICES}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
