import {
  API_URL_GET_ALL_SPECIALTIES,
  API_URL_GET_SPECIALTY_WITH_SERVICES,
  API_TAKE_IT_ALL_SPECIALTIES,
} from "@/configs/varibles";
import axios from "axios";
import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";
import { axiosInstanceIMG } from "./axiosInstance";


export const specialtyApi = {
  // Get all
  getAllSpecialties: async () =>{
    const res = await axiosInstanceGET.get('/specialties/');
    return res.data.data;
  },
  getSpecialtiesById:  async (id) => {
    const res = await axiosInstanceGET.get(`/specialties/${id}`);
    console.log("specialties data by id: ", res.data.data);
    return res.data.data;
  },
  createSpecialty: async (newSpecialty)=>{
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
updateSpecialty: async ({ updateSpecialty, id }) => {
  console.log(updateSpecialty, id);
  const res = await axiosInstanceCUD.put(
      `/specialties/update/${id}`, 
      updateSpecialty,
      {
          headers: {
              "Content-Type": 'application/json',
          },
      }
  );
  console.log("Specialtys data updated: ", res.data);
  return res.data;
},
}



// Old API
export const takeItAllSpecialties = async () => {
  try {
    const res = await axios.get(API_TAKE_IT_ALL_SPECIALTIES);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllSpecialties = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_SPECIALTIES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSpecialtyById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_SPECIALTIES}/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAllSpecialtiesWithServices = async () => {
  try {
    const res = await axios.get(API_URL_GET_SPECIALTY_WITH_SERVICES);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
