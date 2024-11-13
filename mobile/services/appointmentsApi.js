import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const appointmentApi = {
    getAppointmentByPatient: async (params) => {
        const res = await axiosInstanceGET.get(`/appointments/get-by-patient`, {
            params
        });
        return res.data;
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
};
