import { API_URL_GET_ALL_MEDICAL_PACKAGES, API_URL_GET_MEDICAL_PACKAGE_BY_ID } from "../configs/variables";
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

export const getPackageByID = async (id) => {
  try {
    const res = await axios.get(API_URL_GET_MEDICAL_PACKAGE_BY_ID + '/' + id);

    return res.data.data;
  } catch (error) {
    throw error;
  }
};
