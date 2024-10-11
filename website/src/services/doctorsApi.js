import { API_URL_GET_ALL_DOCTORS, API_URL_GET_ALL_DOCTORS_BY_BRANCHES } from "@/configs/varibles";
import axios from "axios";
import { axiosInstanceGET } from "./axiosInstance";
import { axiosInstanceCUD } from "./axiosInstance";
import { axiosInstanceIMG } from "./axiosInstance";


export const doctorApi = {
  getAllDoctors: async () => {
      const res = await axiosInstanceGET.get('/doctors');
      console.log("All doctors data: ", res.data.data);
      return res.data.data;
  },
  createDoctors: async (newDoctors) => {
    console.log(newDoctors);
    const res = await axiosInstanceCUD.post(
        '/doctors/add',
        newDoctors,
        {
            headers: {
                "Content-Type": 'application/json'
            }
        }
    );
    console.log("doctors data: ", res.data);
    return res.data;
  },
  // Delete Doctors
  deleteDoctors: async (id)=>{
    console.log(id);
    const res = await axiosInstanceCUD.post(
      '/doctors/delete/' + id + '?_method=DELETE',
    );
    console.log("doctors deleted data: ", res.data.data);
    return res.data.data;
  },
  
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
};




export const getAllDoctors = async () => {
  try {
    const res = await axios.get(API_URL_GET_ALL_DOCTORS + "/get-by-role/DOCTOR");
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const res = await axios.get(`${API_URL_GET_ALL_DOCTORS}/get-by-id/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getDoctorsByBranch = async (branchId, specialtyId) => {
  
  try {
    const res = await axios.post(`${API_URL_GET_ALL_DOCTORS_BY_BRANCHES}?specialtyID=${specialtyId}&branchID=${branchId}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
