import {
  API_URL_GET_ALL_SERVICES,
  API_URL_GET_SERVICE_BY_ID,
} from "@/configs/varibles";
import axios from "axios";
export const getAllServices = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_SERVICES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getServiceById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_SERVICE_BY_ID}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
