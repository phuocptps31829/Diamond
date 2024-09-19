import { API_URL_GET_WORK_SCHEDULES_BY_DOCTOR } from "@/configs/varibles";
import axios from "axios";

export const getWorkSchedulesByDoctors = async (doctorId,branchId) => {
    try {
      const res = await axios.get(`${API_URL_GET_WORK_SCHEDULES_BY_DOCTOR}?doctorID=${doctorId}&branchID=${branchId}`);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };