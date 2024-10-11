import { axiosInstanceGET } from "./axiosInstance";

export const doctorApi = {
  getAllDoctors: async () => {
    try {
      const res = await axiosInstanceGET.get("/users/get-by-role/DOCTOR");
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getDoctorById: async (id) => {
    try {
      const res = await axiosInstanceGET.get(`/users/get-by-id/${id}`);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getDoctorsByBranch: async (branchId, specialtyId) => {
    try {
      const res = await axiosInstanceGET.get(`/doctors/get-by-branch-and-specialty?specialtyID=${specialtyId}&branchID=${branchId}`);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}