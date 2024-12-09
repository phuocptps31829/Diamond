import { axiosInstanceCUD, axiosInstanceGET } from "./axiosInstance";

export const prescriptionApi = {
    getAllPrescriptions: async () => {
        const res = await axiosInstanceGET.get("/prescriptions");
        return res.data;
    },

    addPrescription: async (data) => {
        const res = await axiosInstanceCUD.post("/prescriptions/add", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data.data;
    },
    deletePrescription: async (id) => {
        const res = await axiosInstanceCUD.delete(`/prescriptions/delete/${id}`);
        return res.data;
    },
    deletePrescriptionMultiple: async (ids) => {
        const res = await axiosInstanceCUD.post(`/v1/prescriptions/-id`,
            {
                ids: [...ids],
            }
        );
        return res.data;
    },
    exportPrescription: async (id) => {
        const res = await axiosInstanceCUD.get(`/prescriptions/export/${id}`);
        return res.data;
    },
};
