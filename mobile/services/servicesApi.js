import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const servicesApi = {
  getAllServices: async () => {
    const res = await axiosInstanceGET.get("/services?noPaginated=true");
    return res.data.data;
  },

  getServiceByID: async (id) => {
    const res = await axiosInstanceGET.get(`/services/${id}`);
    return res.data.data;
  },
}


