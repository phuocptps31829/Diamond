import { axiosInstanceGET } from './axiosInstance';

export const branchApi = {
    getAllBranches: async ({ page, limit }) => {
        try {
            const res = await axiosInstanceGET.get('/branches', {
                params: {
                    page,
                    limit,
                },
            });
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
