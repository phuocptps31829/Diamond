import { axiosInstanceGET } from "./axiosInstance"; // Giả sử bạn đã định nghĩa axiosInstanceGET
import {
  API_GET_ALL_PATIENTS,
  API_URL_GET_PATIENTS_BY_ID,
} from "@/configs/varibles";

export const patientApi = {
  getAllPatients: async () => {
    try {
      const res = await axiosInstanceGET.get(API_GET_ALL_PATIENTS);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getPatientsById: async (id) => {
    try {
      const res = await axiosInstanceGET.get(
        `${API_URL_GET_PATIENTS_BY_ID}/${id}`,
      );
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
