import { API_URL_GET_ALL_DOCTORS, API_URL_GET_ALL_DOCTORS_BY_BRANCHES } from "@/configs/varibles";
import axios from "axios";

export const getAllDoctors = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_DOCTORS);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_DOCTORS}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getDoctorsByBranch = async (branchId, specialtyId) => {
  
  try {
    const res = await axios.post(`${API_URL_GET_ALL_DOCTORS_BY_BRANCHES}?specialtyID=${specialtyId}&branchID=${branchId}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
