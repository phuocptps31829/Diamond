import { axiosInstanceCUD, axiosInstanceGET } from './axiosInstance';

export const workScheduleApi = {
    getAllWorkSchedules: async () => {
        const res = await axiosInstanceGET.get('/work-schedules');
        return res.data;
    },
    getWorkSchedulesByDoctors: async (doctorId) => {
        const res = await axiosInstanceGET.get(`/work-schedules/doctor?doctorID=${doctorId}`);
        return res.data;
    },
    getWorkSchedulesByDoctorID: async (doctorId) => {
        const res = await axiosInstanceGET.get(
            `/work-schedules/get-by-doctor-id/${doctorId}`
        );
        return res.data;
    },
    createWorkSchedule: async (data) => {
        const res = await axiosInstanceCUD.post('/work-schedules/add', data);
        return res.data;
    },
    updateWorkSchedule: async ({ data, id }) => {
        const res = await axiosInstanceCUD.put('/work-schedules/update/' + id, data);
        return res.data;
    }
};
