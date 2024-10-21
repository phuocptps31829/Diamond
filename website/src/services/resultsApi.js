import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const resultsApi = {
  getAllResults: async () => {
    const res = await axiosInstanceGET.get("/results");
    return res.data;
  },

  addResult: async (data) => {
    try {
      const res = await axiosInstanceCUD.post("/results/add", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteResult: async (id) => {
    try {
      const res = await axiosInstanceCUD.delete(`/results/delete/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
