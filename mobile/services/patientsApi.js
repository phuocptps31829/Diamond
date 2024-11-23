import { axiosInstanceCUD } from "./axiosInstance";

export const patientApi = {
  updatePatient: async (id, data) => {
    try {
      const res = await axiosInstanceCUD.put(`/patients/update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("error", error.response.data);
    }
  },

  updateAvatar: async (id, data) => {
    try {
      const res = await axiosInstanceCUD.put(`/patients/update/avatar/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("error", error.response.data);
    }
  },
};
