import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";

export const newsApi = {
  takeItAllNews: async () => {
    try {
      const res = await axiosInstanceGET.get("/news?limit=9999");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAllNews: async ({ page, limit }) => {
    try {
      const res = await axiosInstanceGET.get("/news", {
        params: {
          page,
          limit,
          notHidden: true,
        },
      });
      console.log("res.data.data: ", res.data.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getNewsById: async (id) => {
    try {
      const res = await axiosInstanceGET.get("/news/" + id);
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getNewsBySlug: async (slug) => {
    try {
      const res = await axiosInstanceGET.get("/news/slug/" + slug);
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createNews: async (data) => {
    try {
      const res = await axiosInstanceCUD.post("/news/add", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateNews: async (id, data) => {
    try {
      const res = await axiosInstanceCUD.post(
        `/news/update/${id}?_method=PUT`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  plusOneViewCount: async (id) => {
    try {
      const res = await axiosInstanceCUD.patch(`/news/plus-view-count/${id}`);
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteNews: async (id) => {
    try {
      const res = await axiosInstanceCUD.post(
        `/news/delete/${id}?_method=DELETE`,
      );
      console.log("res.data.data: ", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
