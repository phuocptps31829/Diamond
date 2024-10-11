import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";
import { API_GET_ALL_PATIENTS } from "@/configs/varibles";
import axios from "axios";

export const getAllPatients = async () => {
  try {
    const res = await axios.get(API_GET_ALL_PATIENTS);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPatientsById = async (id) => {
  try {
    const res = await axios.get(`/patients/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patientApi = {
  getPatientsById: async (id) => {
    try {
      const res = await axiosInstanceGET.get(`/patients/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createPatient: async (data) => {
    const res = await axiosInstanceCUD.post("patients/admin-add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  },

  updatePatient: async (id, data) => {
    const res = await axiosInstanceCUD.put(`/patients/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },

  deletePatient: async (id) => {
    const res = await axiosInstanceCUD.post(
      `/patients/delete/${id}?_method=DELETE`,
    );
    return res.data;
  },
};
