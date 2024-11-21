import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";


export const specialtiesApi = {
  getAllSpecialties: async () => {
    const res = await axiosInstanceGET.get("/specialties");
    return res.data.data;
  },

  getSpecialtyById: async (id) => {
    const res = await axiosInstanceGET.get(`/specialties/${id}`);
    return res.data.data;
  },

  getAllSpecialtiesWithServices: async () => {
    const res = await axiosInstanceGET.get("/specialties/specialties-with-services");
    return res.data.data;
  }
}
