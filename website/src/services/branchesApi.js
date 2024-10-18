import { axiosInstanceGET, axiosInstanceCUD } from './axiosInstance';

export const branchApi = {
    getAllBranches: async ({ page, limit }) => {
        try {
            const res = await axiosInstanceGET.get('/branches', {
                params: {
                    page,
                    limit,
                },
            });
            return res.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getBranchesById: async (id) => {
        try {
            const res = await axiosInstanceGET.get(`/branches/${id}`);
            console.log('res.data.data: ', res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getAllBranchesBySpecialty: async (id) => {
        try {
            const res = await axiosInstanceGET.get(`/branches/specialty/${id}`);
            console.log('res.data.data: ', res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    addBranch: async (branchData) => {
        try {
            const res = await axiosInstanceCUD.post('/branches/add', branchData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('res.data.data: ', res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateBranch: async (id, branchData) => {
        try {
            const res = await axiosInstanceCUD.put(`/branches/update/${id}`, branchData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('res.data.data: ', res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteBranch: async (id) => {
        try {
            const res = await axiosInstanceCUD.delete(`/branches/delete/${id}`);
            console.log('res.data.data: ', res.data.data);
            return res.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
