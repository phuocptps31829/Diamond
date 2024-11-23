import { axiosInstanceCUD } from "./axiosInstance";

export const imageApi = {
  createImage: async (formData) => {
    try {
      const res = await axiosInstanceCUD.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("error", error.response.data);
    }
  },
};
