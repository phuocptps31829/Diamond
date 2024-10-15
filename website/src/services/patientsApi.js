import { axiosInstanceCUD, axiosInstanceGET } from './axiosInstance';

export const patientApi = {
    getAllPatients: async () => {
        const res = await axiosInstanceGET.get('/patients');
        return res.data;
    },

    getRelatedPatient: async (id) => {
        const res = await axiosInstanceGET.get(`/patients/related-patient/${id}`);
        console.log(res.data);
        return res.data;
    },

    getPatientsById: async (id) => {
        try {
            const res = await axiosInstanceGET.get(`/patients/${id}`);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createPatient: async (data) => {
        const res = await axiosInstanceCUD.post('patients/admin-add', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    },

    updatePatient: async (id, data) => {
        const res = await axiosInstanceCUD.put(`/patients/update/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data.data;
    },

    deletePatient: async (id) => {
        const res = await axiosInstanceCUD.post(`/patients/delete/${id}?_method=DELETE`);
        return res.data;
    },
};
