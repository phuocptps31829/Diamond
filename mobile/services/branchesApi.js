import { axiosInstanceCUD, axiosInstanceGET } from './axiosInstance';

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

    getBranchesById: async (id) => {
        const res = await axiosInstanceGET.get(`/branches/${id}`);
        return res.data.data;
    },

    getAllBranchesBySpecialty: async (id) => {
        const res = await axiosInstanceGET.get(`/branches/specialty/${id}`);
        return res.data;
    },

    addBranch: async (branchData) => {
        const res = await axiosInstanceCUD.post('/branches/add', branchData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data.data;
    },

    updateBranch: async (id, branchData) => {
        const res = await axiosInstanceCUD.put(`/branches/update/${id}`, branchData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data.data;
    },

    deleteBranch: async (id) => {
        const res = await axiosInstanceCUD.delete(`/branches/delete/${id}`);
        console.log('res.data.data: ', res.data.data);
        return res.data.data;
    },
};
