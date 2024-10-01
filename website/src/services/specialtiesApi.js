import {
  API_URL_GET_ALL_SPECIALTIES,
  API_URL_GET_SPECIALTY_WITH_SERVICES,
  API_TAKE_IT_ALL_SPECIALTIES,
} from "@/configs/varibles";
import axios from "axios";

export const takeItAllSpecialties = async () => {
  try {
    const res = await axios.get(API_TAKE_IT_ALL_SPECIALTIES);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllSpecialties = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_SPECIALTIES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSpecialtyById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_SPECIALTIES}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllSpecialtiesWithServices = async () => {
  try {
    const res = await axios.get(API_URL_GET_SPECIALTY_WITH_SERVICES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
