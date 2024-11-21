import { axiosInstanceGET, axiosInstanceCUD } from './axiosInstance';


export const contractApi = {
  getAllContracts: async () => {
    try {
      const res = await axiosInstanceGET.get("/contracts?limit=9999");
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }


  },
  createContractDoctor: async (data) => {
    try {
      const res = await axiosInstanceCUD.post("/contracts/add/doctor", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createContractHealthCare: async (data) => {
    try {
      const res = await axiosInstanceCUD.post("/contracts/add/health", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  exportContract: async (id) => {
    try {
      const res = await axiosInstanceCUD.post(`/contracts/export/${id}`);
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
