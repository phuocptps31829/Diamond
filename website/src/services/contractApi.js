import { axiosInstanceGET, axiosInstanceCUD } from "./axiosInstance";

export const contractApi = {
  getAllContracts: async () => {
    const res = await axiosInstanceGET.get("/contracts?noPaginated=true");
    return res.data.data;
  },
  getAllContractsAdmin: async (filter) => {
    const res = await axiosInstanceGET.get("/contracts", {
      params: {
        ...filter,
      },
    });
    return res.data;
  },

  createContractDoctor: async (data) => {
    const res = await axiosInstanceCUD.post("/contracts/add/doctor", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
  createContractHealthCare: async (data) => {
    const res = await axiosInstanceCUD.post("/contracts/add/health", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
  exportContract: async (id) => {
    const res = await axiosInstanceCUD.get(`/contracts/export/${id}`);
    return res.data.data;
  },
  deleteContract: async (id) => {
    const res = await axiosInstanceCUD.delete(`/contracts/delete/${id}`);
    return res.data.data;
  },
};
