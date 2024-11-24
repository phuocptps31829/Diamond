import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const resultsApi = {
  getAllResults: async () => {
    const res = await axiosInstanceGET.get("/results");
    return res.data;
  },

  addResult: async (data) => {
    const res = await axiosInstanceCUD.post("/results/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },
  addResultAndPrescription: async (data) => {
    const res = await axiosInstanceCUD.post("/results/result-prescription/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },
  deleteResult: async (id) => {
    const res = await axiosInstanceCUD.delete(`/results/delete/${id}`);
    return res.data;
  },
};
