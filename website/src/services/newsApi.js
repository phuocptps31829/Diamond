import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";

export const newsApi = {
  takeItAllNews: async () => {
    const res = await axiosInstanceGET.get("/news?limit=9999");
    return res.data.data;
  },
  getAllNews: async (filter) => {
    const { page, limit } = filter;
    const params = {
      ...(page !== undefined && page !== null && { page }),
      ...(limit !== undefined && limit !== null && { limit }),
    };

    const res = await axiosInstanceGET.get("/news", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return res.data;
  },
  getNewsById: async (id) => {
    const res = await axiosInstanceGET.get("/news/" + id);
    return res.data.data;
  },

  getNewsBySlug: async (slug) => {
    const res = await axiosInstanceGET.get("/news/slug/" + slug);
    return res.data.data;
  },

  createNews: async (data) => {
    const res = await axiosInstanceCUD.post("/news/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },

  updateNews: async (id, data) => {
    const res = await axiosInstanceCUD.post(
      `/news/update/${id}?_method=PUT`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.data;
  },

  plusOneViewCount: async (id) => {
    const res = await axiosInstanceCUD.patch(`/news/plus-view-count/${id}`);
    return res.data.data;
  },

  deleteNews: async (id) => {
    const res = await axiosInstanceCUD.post(
      `/news/delete/${id}?_method=DELETE`
    );
    return res.data.data;
  },
};
