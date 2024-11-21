import { axiosInstanceCUD } from './axiosInstance';

export const contactApi = {
    postContact: async (data) => {
        const res = await axiosInstanceCUD.post('/contact/contact-us', data);
        return res.data;
    },
};
