import { axiosInstanceGET } from './axiosInstance';
import { axiosInstanceCUD } from './axiosInstance';

export const doctorApi = {
    getAllDoctors: async () => {
        const res = await axiosInstanceGET.get('/doctors');
        return res.data.data;
    },
    getDoctorById: async (id) => {
        try {
            const res = await axiosInstanceGET.get(`/doctors/${id}`);
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getDoctorsByBranch: async (branchId, specialtyId) => {
        try {
            const res = await axiosInstanceGET.get(
                `/doctors/get-by-branch-and-specialty?specialtyID=${specialtyId}&branchID=${branchId}`
            );
            console.log(res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createDoctors: async (newDoctors) => {
        console.log(newDoctors);
        const res = await axiosInstanceCUD.post('/doctors/add', newDoctors, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('doctors data: ', res.data);
        return res.data;
    },

    updateDoctors: async (id, updatedDoctors) => {
        const res = await axiosInstanceCUD.post(
            '/doctors/update/' + id + '?_method=PUT',
            updatedDoctors,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return res.data.data;
    },

    deleteDoctors: async (id) => {
        const res = await axiosInstanceCUD.post('/doctors/delete/' + id + '?_method=DELETE');
        return res.data.data;
    },
};
