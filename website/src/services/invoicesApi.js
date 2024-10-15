import { axiosInstanceGET } from './axiosInstance';

export const invoicesApi = {
    getAllInvoices: async () => {
        const res = await axiosInstanceGET.get('/invoices?limit=9999');
        return res.data;
    },
};
