import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";

export const clinicsApi = {
  getAllClinics: async ({ page, limit }) => {
    try {
      const res = await axiosInstanceGET.get("/clinics", {
        params: {
          page,
          limit,
        },
      });
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getClinicsById: async (id) => {
    try {
      const res = await axiosInstanceGET.get(`/clinics/${id}`);
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createClinic: async (data) => {
    try {
      const res = await axiosInstanceCUD.post("/clinics/add", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateClinic: async (id, data) => {
    try {
      const res = await axiosInstanceCUD.post(
        `/clinics/update/${id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteClinic: async (id) => {
    try {
      const res = await axiosInstanceCUD.post(
        `/clinics/delete/${id}?_method=DELETE`,
      );
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
