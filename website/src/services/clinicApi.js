import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";

export const clinicsApi = {
  getAllClinics: async ({ page, limit }) => {
    const res = await axiosInstanceGET.get("/clinics", {
      params: {
        page,
        limit,
      },
    });
    return res.data.data;
  },
  getAllClinicsAdmin: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };

    const res = await axiosInstanceGET.get("/clinics", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },

  getClinicBySpecialtyAndBranch: async ({ branchID, specialtyID }) => {
    const res = await axiosInstanceGET.get(
      "/clinics/get-by-specialty-and-branch",
      {
        params: {
          branchID,
          specialtyID,
        },
      },
    );
    return res.data.data;
  },

  getClinicsById: async (id) => {
    const res = await axiosInstanceGET.get(`/clinics/${id}`);
    console.log("res.data.data: ", res.data.data);
    return res.data.data;
  },

  createClinic: async (data) => {
    const res = await axiosInstanceCUD.post("/clinics/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },

  updateClinic: async (id, data) => {
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
  },

  deleteClinic: async (id) => {
    const res = await axiosInstanceCUD.post(
      `/clinics/delete/${id}?_method=DELETE`,
    );
    return res.data.data;
  },
};
