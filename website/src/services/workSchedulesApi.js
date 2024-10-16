import { axiosInstanceGET } from "./axiosInstance";

export const workScheduleApi = {
  getWorkSchedulesByDoctors: async (doctorId) => {
    const res = await axiosInstanceGET.get(`/work-schedules/doctor?doctorID=${doctorId}`);
    return res.data;
  }
};