import { axiosInstanceGET } from './axiosInstance';

export const locationApi = {
    getProvinces: async () => {
        const res = await axiosInstanceGET.get('/provinces');
        return res.data.data;
    },

    getDistricts: async (provinceId) => {
        const res = await axiosInstanceGET.get(`/provinces/districts/${provinceId}`);
        return res.data.data;
    },

    getWards: async (districtId) => {
        const res = await axiosInstanceGET.get(`/provinces/wards/${districtId}`);
        return res.data.data;
    },
};
