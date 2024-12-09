import { axiosInstanceGET, axiosInstanceCUD } from "./axiosInstance";

export const medicineApi = {

  getDataMedicines: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };
    const res = await axiosInstanceGET.get("/medicines", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },

  getDataMedicinesCategories: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };
    const res = await axiosInstanceGET.get("/medicine-categories", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },

  getAllMedicines: async (params) => {
    const res = await axiosInstanceGET.get("/medicines", {
      params
    });
    return res.data.data;
  },

  getMedicineById: async (id) => {
    const res = await axiosInstanceGET.get(`/medicines/${id}`);
    return res.data.data;
  },

  getAllMedicinesCategories: async (params) => {
    const res = await axiosInstanceGET.get("/medicine-categories", {
      params,
    });
    return res.data.data;
  },

  getMedicineCategoriesById: async (id) => {
    const res = await axiosInstanceGET.get(`/medicine-categories/${id}`);
    return res.data.data;
  },
  getMedicineByCategory: async (id) => {
    const res = await axiosInstanceGET.get(`/medicines/get-by-category/${id}`);
    return res.data.data;
  },

  createMedicine: async (data) => {
    const res = await axiosInstanceCUD.post("/medicines/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },

  updateMedicine: async (id, data) => {
    const res = await axiosInstanceCUD.post(
      `/medicines/update/${id}?_method=PUT`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data.data;
  },

  deleteMedicine: async (id) => {
    const res = await axiosInstanceCUD.post(
      `/medicines/delete/${id}?_method=DELETE`,
    );
    return res.data;
  },

  createMedicineCategories: async (data) => {
    const res = await axiosInstanceCUD.post("/medicine-categories/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  },

  updateMedicineCategories: async (id, data) => {
    const res = await axiosInstanceCUD.post(
      `/medicine-categories/update/${id}?_method=PUT`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.data.data;
  },

  deleteMedicineCategories: async (id) => {
    const res = await axiosInstanceCUD.post(
      `/medicine-categories/delete/${id}?_method=DELETE`,
    );
    return res.data;
  },
};
