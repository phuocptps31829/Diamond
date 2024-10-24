import { axiosInstanceGET, axiosInstanceCUD } from "./axiosInstance";

export const medicineApi = {
  getAllMedicines: async () => {
    const res = await axiosInstanceGET.get("/medicines");
    return res.data.data;
  },

  getMedicineById: async (id) => {
    const res = await axiosInstanceGET.get(`/medicines/${id}`);
    return res.data.data;
  },

  getAllMedicinesCategories: async () => {
    const res = await axiosInstanceGET.get("/medicine-categories");
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
