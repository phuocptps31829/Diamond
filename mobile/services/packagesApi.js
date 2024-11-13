import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";


export const packagesApi = {
  getAllPackages: async () => {
    const res = await axiosInstanceGET.get("/medical-packages");
    return res.data.data;
  },

  getPackageByID: async (id) => {
    const res = await axiosInstanceGET.get(`/medical-packages/${id}`);
    return res.data.data;
  },
}

