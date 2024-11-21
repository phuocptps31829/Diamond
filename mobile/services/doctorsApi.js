import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const doctorApi = {
  getAllDoctors: async () => {
    const res = await axiosInstanceGET.get("/doctors");
    return res.data.data;
  },

  getDoctorById: async (id) => {
    const res = await axiosInstanceGET.get(`/doctors/${id}`);
    return res.data.data;
  },
}