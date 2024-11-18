import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";
import { axiosInstanceIMG } from "./axiosInstance";


export const specialtyApi = {
  // Get all
  getAllSpecialties: async () => {
    const res = await axiosInstanceGET.get(
      '/specialties',
      { params: { notHidden: true } }
    );
    return res.data.data;
  },
  getNoPaginate: async () => {
    const res = await axiosInstanceGET.get('/specialties?limit=9999');
    return res.data.data;
  },
  getSpecialtiesById: async (id) => {
    const res = await axiosInstanceGET.get(`/specialties/${id}`);
    console.log("specialties data by id: ", res.data.data);
    return res.data.data;
  },
  createSpecialty: async (newSpecialty) => {
    const res = await axiosInstanceCUD.post(
      '/specialties/add',
      newSpecialty,
      {
        headers: {
          "Content-Type": 'application/json'
        }
      }
    );
    console.log("Specialty data create: ", res.data);
    return res.data;
  },
  // Up img
  uploadIMG: async (newIMG) => {
    const formData = new FormData();
    formData.append("file", newIMG);
    console.log("FormData:", Array.from(formData));
    try {
      const res = await axiosInstanceIMG.post('', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("img data create: ", res.data);
      return res.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
  // Del
  deleteSpecialty: async (id) => {
    const res = await axiosInstanceCUD.post(
      '/specialties/delete/' + id + '?_method=DELETE',
    );
    console.log("specialty data: ", res.data.data);
    return res.data.data;
  },
  updateSpecialty: async ({ updatedSpecialty, id }) => {
    console.log(updatedSpecialty, id);
    const res = await axiosInstanceCUD.put(
      `/specialties/update/${id}`,
      updatedSpecialty,
      {
        headers: {
          "Content-Type": 'application/json',
        },
      }
    );
    console.log("Specialtys data updated: ", res.data);
    return res.data;
  },
};