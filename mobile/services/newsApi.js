import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const newsApi = {
  getAllNews: async () => {
    const res = await axiosInstanceGET.get("/news?noPaginated=true");
    return res.data.data;
  },

  getNewsById: async (id) => {
    const res = await axiosInstanceGET.get(`/news/${id}`);
    return res.data.data;
  },
}



