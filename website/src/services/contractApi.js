import { axiosInstanceGET, axiosInstanceCUD } from "./axiosInstance";

export const contractApi = {
  getAllContracts: async () => {
    const res = await axiosInstanceGET.get("/contracts?limit=9999");
    return res.data.data;
  },
  getAllContractsAdmin: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };

    const res = await axiosInstanceGET.get("/contracts", {
      params: Object.keys(params).length > 0 ? params : undefined,
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
    const res = await axiosInstanceCUD.post(`/contracts/export/${id}`);
    return res.data.data;
  },
};
