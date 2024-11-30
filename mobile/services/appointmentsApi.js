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
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createAppointment: async ({ data, provider }) => {
        let endpoint = null;
        switch (provider) {
            case "vnpay":
                endpoint = "/invoices/payment/vnpay";
                break;
            case "momo":
                endpoint = "/invoices/payment/momo";
                break;
            case "cod":
                endpoint = "/invoices/payment/cod";
                break;
            default:
                break;
        }

        console.log("data", data);
        console.log("provider", provider);

        const res = await axiosInstanceCUD.post(endpoint, data);
        console.log(res.data);
        return res.data;
    },
};
