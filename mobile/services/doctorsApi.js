import { API_URL_GET_ALL_DOCTORS } from "../configs/variables";
import axios from "axios";

export const getAllDoctors = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_DOCTORS);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_DOCTORS}/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
