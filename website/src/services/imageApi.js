import { axiosInstanceCUD } from "./axiosInstance";

export const imageApi = {
  createImage: async (formData) => {
    const res = await axiosInstanceCUD.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  createImages: async (formData) => {
    const res = await axiosInstanceCUD.post("/images/upload-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};
