import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";
import {
  API_URL_GET_ALL_APPOINTMENTS,
  API_URL_GET_APPOINTMENTS_BY_ID,
} from "@/configs/varibles";
import axios from "axios";
import {
  API_GET_TOTAL_PATIENTS_BY_SPECIALTY,
  API_GET_PATIENTS_BY_GENDER,
  API_GET_UPCOMING_APPOINTMENTS,
} from "@/configs/varibles";

export const get5UpcomingAppointments = async () => {
  try {
    const res = await axios.get(`${API_GET_UPCOMING_APPOINTMENTS}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPatientsByGender = async () => {
  try {
    const res = await axios.get(API_GET_PATIENTS_BY_GENDER);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_APPOINTMENTS);
    console.log(res.data.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAppointmentById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_APPOINTMENTS_BY_ID}/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTotalPatientsBySpecialty = async () => {
  try {
    const res = await axios.get(API_GET_TOTAL_PATIENTS_BY_SPECIALTY);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const appointmentApi = {
  getAppointmentByAges: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments/ages-dashboard");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
