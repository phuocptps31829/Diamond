import { axiosInstanceGET } from "./axiosInstance";

export const appointmentApi = {
  get5UpcomingAppointments: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments/upcoming");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getPatientsByGender: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments/gender-years");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAllAppointments: async () => {
    try {
      const res = await axiosInstanceGET.get("/appointments");
      console.log(res.data.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getAppointmentById: async (id) => {
    try {
      const res = await axiosInstanceGET.get(`/appointments/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTotalPatientsBySpecialty: async () => {
    try {
      const res = await axiosInstanceGET.get("/patients/total-by-specialty");
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
