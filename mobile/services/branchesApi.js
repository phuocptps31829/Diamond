import { axiosInstanceGET } from './axiosInstance';

export const branchApi = {
    getAllBranches: async () => {
        try {
            const res = await axiosInstanceGET.get('/branches?noPaginated=true');
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
