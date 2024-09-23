import { API_CREATE_APPOINTMENT_MOMO, API_CREATE_APPOINTMENT_VNPAY } from "@/configs/varibles";
import { axiosInstance } from "./axiosInstance";

export const createAppointment = async (data, provider) => {
    let endpoint = null;
    switch (provider) {
        case 'vnpay':
            endpoint = API_CREATE_APPOINTMENT_VNPAY;
            break;
        case 'momo':
            endpoint = API_CREATE_APPOINTMENT_MOMO;
            break;

        default:
            break;
    }

    try {
        const res = await axiosInstance.post(endpoint, data);
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};