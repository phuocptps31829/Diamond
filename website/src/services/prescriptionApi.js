import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const prescriptionApi = {
    getAllPrescriptions: async () => {
        const res = await axiosInstanceGET.get("/prescriptions");
        return res.data;
    },

    addPrescription: async (data) => {
        try {
            const res = await axiosInstanceCUD.post("/prescriptions/add", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deletePrescription: async (id) => {
        try {
            const res = await axiosInstanceCUD.delete(`/prescriptions/delete/${id}`);
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deletePrescriptionMultiple: async (ids) => {
        try {
            const res = await axiosInstanceCUD.post(`/v1/prescriptions/delete-in-id`,
                {
                    ids: [...ids],
                }
            );
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
