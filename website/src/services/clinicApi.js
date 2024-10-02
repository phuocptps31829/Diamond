import { API_URL_GET_ALL_CLINICS } from "@/configs/varibles";
import axios from "axios";

export const getAllClinics = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_CLINICS);
    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClinicsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_CLINICS}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
