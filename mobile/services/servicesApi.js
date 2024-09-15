import { API_URL_GET_ALL_SERVICES, API_URL_GET_SERVICE_BY_ID } from "../configs/variables";
import axios from "axios";

export const getAllServices = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_SERVICES);

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getServiceByID = async (id) => {
  try {
    const res = await axios.get(API_URL_GET_SERVICE_BY_ID + '/' + id);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
