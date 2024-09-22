import { API_CREATE_APPOINTMENT } from "@/configs/varibles";
import { axiosInstance } from "./axiosInstance";

export const createAppointment = async (data) => {
    try {
        const res = await axiosInstance.post(API_CREATE_APPOINTMENT, data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};