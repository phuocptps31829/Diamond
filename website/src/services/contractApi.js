import { axiosInstanceCUD } from "./axiosInstance";

export const contractApi = {
  createContract: async (data) => {
    try {
      const res = await axiosInstanceCUD.post("/contracts/add", data, {
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
