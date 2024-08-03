import { API_URL_GET_ALL_MEDICAL_PACKAGES,API_URL_GET_MEDICAL_PACKAGE_BY_ID } from "@/configs/varibles";
import axios from "axios";
export const getAllMedicalPackages = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_MEDICAL_PACKAGES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getMedicalPackageById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_MEDICAL_PACKAGE_BY_ID}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};